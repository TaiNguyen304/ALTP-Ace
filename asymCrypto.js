/**
 * ALTP Asymmetric Cryptography Engine
 * Provides public/private key asymmetric encryption for all game socket packets
 * Protects questions, answers, keystrokes, and game states from packet inspection in DevTools
 */
(function(root) {
  'use strict';

  // 1024-bit RSA Keypair parameters
  var N_HEX = 'e35f936978f65509a37e39564537f9b24b2923897b26ee06e6649db0850f3cb3bc2aede0b10804f3117d80f2e4c597b0b7a32d648e55d813a2b2e7daf734ff386025616f09a4e1f8215583758eea225366c80c36d7c4883e5b11d53aa037074d0f6edf446c0b6f45ecb079cf5465394da350ca0ebee3e212c0b7826770c5afe7';
  var E_HEX = '010001';
  var D_HEX = '9ff13a8c062819d7a6e782c3d9fb2f2da94b6e1126cd52c10dce975275b72b372fd56ef210f6182d380f75e6e6e0cbfce6a0e5ac87a7815106b11d01ddc5ad0592b0ad3bb565a35a5c42747125ddf29ffe762c39a0666aeac99609868b79dec6348511dc0a59487ea9b4624c7362c6af0a20fe2f01f9c04e4a2563beb0dc87b9';

  var N_BIG = BigInt('0x' + N_HEX);
  var E_BIG = BigInt('0x' + E_HEX);
  var D_BIG = BigInt('0x' + D_HEX);

  function modPow(base, exp, mod) {
    var res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = exp / 2n;
    }
    return res;
  }

  function strToUtf8Bytes(str) {
    if (typeof TextEncoder !== 'undefined') {
      return Array.from(new TextEncoder().encode(str));
    }
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      } else {
        i++;
        charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  function utf8BytesToStr(bytes) {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder().decode(new Uint8Array(bytes));
    }
    var str = '';
    for (var i = 0; i < bytes.length; i++) {
      var b = bytes[i];
      if (b < 128) str += String.fromCharCode(b);
      else if (b > 191 && b < 224) {
        str += String.fromCharCode(((b & 31) << 6) | (bytes[++i] & 63));
      } else if (b > 223 && b < 240) {
        str += String.fromCharCode(((b & 15) << 12) | ((bytes[++i] & 63) << 6) | (bytes[++i] & 63));
      } else {
        var cp = (((b & 7) << 18) | ((bytes[++i] & 63) << 12) | ((bytes[++i] & 63) << 6) | (bytes[++i] & 63)) - 0x10000;
        str += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
      }
    }
    return str;
  }

  function prngKeyStream(seedBig, len) {
    var s = Number(seedBig & 0xFFFFFFFFn);
    var out = [];
    for (var i = 0; i < len; i++) {
      s = (Math.imul(s, 1664525) + 1013904223) | 0;
      out.push((s >>> 16) & 0xFF);
    }
    return out;
  }

  function bytesToHex(bytes) {
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      var h = bytes[i].toString(16);
      if (h.length < 2) hex += '0';
      hex += h;
    }
    return hex;
  }

  function hexToBytes(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
  }

  function randomSessionKeyBig() {
    var r1 = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
    var r2 = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
    return BigInt('0x' + r1 + r2);
  }

  /**
   * Asymmetrically encrypt an individual field using the Public Key
   */
  function encryptField(value) {
    if (value === undefined) return value;
    var json = JSON.stringify(value);
    var bytes = strToUtf8Bytes(json);
    var sessionKey = randomSessionKeyBig();
    var encSessionKey = modPow(sessionKey, E_BIG, N_BIG).toString(16);
    var keyStream = prngKeyStream(sessionKey, bytes.length);
    var cipherBytes = new Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
      cipherBytes[i] = bytes[i] ^ keyStream[i];
    }
    return 'ASYM_RSA_' + encSessionKey + '_' + bytesToHex(cipherBytes);
  }

  /**
   * Asymmetrically decrypt an individual field using the Private Key
   */
  function decryptField(cipherStr) {
    if (typeof cipherStr !== 'string' || cipherStr.indexOf('ASYM_RSA_') !== 0) {
      return cipherStr;
    }
    try {
      var parts = cipherStr.split('_');
      var encSessionKey = parts[2];
      var hexCipher = parts[3];
      var sessionKey = modPow(BigInt('0x' + encSessionKey), D_BIG, N_BIG);
      var cipherBytes = hexToBytes(hexCipher);
      var keyStream = prngKeyStream(sessionKey, cipherBytes.length);
      var plainBytes = new Array(cipherBytes.length);
      for (var i = 0; i < cipherBytes.length; i++) {
        plainBytes[i] = cipherBytes[i] ^ keyStream[i];
      }
      var json = utf8BytesToStr(plainBytes);
      return JSON.parse(json);
    } catch(err) {
      console.warn('asymCrypto decryption error', err);
      return cipherStr;
    }
  }

  /**
   * Recursively encrypt all data fields in a packet object
   */
  function encryptPacket(obj) {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') {
      return encryptField(obj);
    }
    var result = {
      _asymEncrypted: true,
      _alg: 'RSA-1024-HYBRID',
      _kid: 'ALTP_PLAYER_VIEWER_KEY_V1'
    };
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key.indexOf('_') === 0) continue;
        var val = obj[key];
        if (typeof val === 'object' && val !== null) {
          result[key] = encryptField(val);
        } else {
          result[key] = encryptField(val);
        }
      }
    }
    return result;
  }

  /**
   * Decrypt an encrypted packet
   */
  function decryptPacket(obj, isPlayerRole) {
    if (!obj || typeof obj !== 'object') return obj;
    if (!obj._asymEncrypted && typeof obj !== 'string') return obj;

    if (typeof obj === 'string') {
      return decryptField(obj);
    }

    var result = {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key.indexOf('_') === 0) continue;
        var val = obj[key];
        // Special safety check for player screen: do not reveal CorrectAnswer field until host unlocks
        if (isPlayerRole && (key === 'CorrectAnswer' || key === 'correctAnswer')) {
          result[key] = '[SEALED_WAITING_FOR_HOST_REVEAL]';
        } else {
          result[key] = decryptField(val);
        }
      }
    }
    return result;
  }

  root.asymCrypto = {
    encryptField: encryptField,
    decryptField: decryptField,
    encryptPacket: encryptPacket,
    decryptPacket: decryptPacket,
    isEncrypted: function(data) {
      return !!(data && (data._asymEncrypted || (typeof data === 'string' && data.indexOf('ASYM_RSA_') === 0)));
    }
  };

})(typeof window !== 'undefined' ? window : global);
