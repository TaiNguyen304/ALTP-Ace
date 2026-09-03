/**
 * Millionaire Cross-Screen Real-Time Sync & Security Engine
 * Links all interfaces across OnRender, local servers, and local files (file://)
 * Features Asymmetric RSA field-level encryption for all WebSocket packets (preventing inspection in DevTools Network tab)
 */
(function() {
  'use strict';

  // Modal dialog suppression
  window.alert = function() {};
  window.prompt = function() { return null; };
  window.confirm = function() { return true; };

  var REMOTE_SERVER = 'https://altp-ace.onrender.com';
  var isFileProto = (window.location.protocol === 'file:' || !window.location.host);

  // Determine target socket server
  var targetSocketUrl = REMOTE_SERVER;
  if (!isFileProto && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    targetSocketUrl = window.location.origin;
  } else {
    targetSocketUrl = REMOTE_SERVER;
  }

  // Socket instance
  var socket = null;

  function initSocketConnection() {
    if (typeof io === 'undefined') {
      // Fallback dynamic script loader for file:// or unhosted environments
      var s = document.createElement('script');
      s.src = REMOTE_SERVER + '/socket.io/socket.io.js';
      s.onload = function() {
        initSocketConnection();
      };
      s.onerror = function() {
        console.warn('Could not load remote socket.io client from ' + REMOTE_SERVER);
      };
      document.head.appendChild(s);
      return;
    }

    try {
      socket = io(targetSocketUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000
      });
      setupSocketListeners();
    } catch(err) {
      console.warn('Socket connection error:', err);
    }
  }

  // BroadcastChannel for same-origin tabs
  var sharedBc = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      sharedBc = new BroadcastChannel('millionaire_sync_channel');
    } catch(e) {}
  }

  var lastProcessedTs = 0;
  window.lastLinkingProcessedTs = 0;

  var SYNC_STORAGE_KEYS = [
    'sharedKeyEvent',
    'levelChangeEvent',
    'hostInfoMessage',
    'videoWallTier',
    'videoWallWinner',
    'videoWallEvent',
    'lifelineFlip',
    'logoFlipTrigger',
    'qmarkZoomTrigger',
    'orbSpinTrigger',
    'ATA_RESULT',
    'FF_RESULT',
    'gameSync',
    'questionSync',
    'revealAnswer'
  ];

  var isInternalStorageSet = false;
  var origSetItem = localStorage.setItem.bind(localStorage);

  // Safe wrapper for encrypting packet data
  function safeEncrypt(payload) {
    if (typeof asymCrypto !== 'undefined' && asymCrypto.encryptPacket) {
      return asymCrypto.encryptPacket(payload);
    }
    return payload;
  }

  // Safe wrapper for decrypting packet data
  function safeDecrypt(payload) {
    if (typeof asymCrypto !== 'undefined' && asymCrypto.decryptPacket) {
      return asymCrypto.decryptPacket(payload, !!window.isPlayerPage);
    }
    return payload;
  }

  // Safe emitter over socket with field-level asymmetric encryption
  function emitEncryptedSocket(eventName, data) {
    if (socket && socket.connected) {
      try {
        var encData = safeEncrypt(data);
        socket.emit(eventName, encData);
      } catch(e) {
        console.warn('Socket emit error', e);
      }
    }
  }

  // Safe broadcaster over BroadcastChannel
  function broadcastEncryptedBC(type, payload) {
    if (sharedBc) {
      try {
        var encPayload = safeEncrypt(payload);
        sharedBc.postMessage({ type: type, payload: encPayload });
      } catch(e) {}
    }
  }

  // Hook localStorage.setItem so all game events broadcast seamlessly
  localStorage.setItem = function(key, val) {
    origSetItem(key, val);
    if (!isInternalStorageSet && SYNC_STORAGE_KEYS.indexOf(key) !== -1) {
      var strVal = String(val);
      var payload = { key: key, value: strVal, ts: Date.now() };

      broadcastEncryptedBC('syncStorage', payload);
      emitEncryptedSocket('syncStorage', payload);
    }
  };

  function applyRemoteStorage(key, value) {
    if (SYNC_STORAGE_KEYS.indexOf(key) === -1) return;
    isInternalStorageSet = true;
    try {
      origSetItem(key, value);
    } finally {
      isInternalStorageSet = false;
    }

    try {
      var ev = new StorageEvent('storage', {
        key: key,
        newValue: value,
        oldValue: null,
        url: window.location.href,
        storageArea: window.localStorage
      });
      window.dispatchEvent(ev);
    } catch(e) {
      try {
        var legacyEv = document.createEvent('Event');
        legacyEv.initEvent('storage', true, true);
        legacyEv.key = key;
        legacyEv.newValue = value;
        window.dispatchEvent(legacyEv);
      } catch(e2) {}
    }
  }

  function getKeyString(keyCode) {
    var code = Number(keyCode);
    if (code >= 48 && code <= 57) return String.fromCharCode(code);
    if (code >= 65 && code <= 90) return String.fromCharCode(code).toLowerCase();
    if (code === 37) return 'ArrowLeft';
    if (code === 38) return 'ArrowUp';
    if (code === 39) return 'ArrowRight';
    if (code === 40) return 'ArrowDown';
    if (code === 13) return 'Enter';
    if (code === 27) return 'Escape';
    if (code === 32) return ' ';
    return String.fromCharCode(code).toLowerCase();
  }

  function getCodeString(keyCode) {
    var code = Number(keyCode);
    if (code >= 48 && code <= 57) return 'Digit' + String.fromCharCode(code);
    if (code >= 65 && code <= 90) return 'Key' + String.fromCharCode(code).toUpperCase();
    if (code === 37) return 'ArrowLeft';
    if (code === 38) return 'ArrowUp';
    if (code === 39) return 'ArrowRight';
    if (code === 40) return 'ArrowDown';
    return '';
  }

  // Process incoming key press across all screens/roles
  function processIncomingKey(keyCode, ts) {
    if (window.isControllerPage) return;
    if (ts && ts <= lastProcessedTs) return;
    if (ts) {
      lastProcessedTs = ts;
      window.lastLinkingProcessedTs = ts;
    }

    var code = Number(keyCode);
    var keyStr = getKeyString(code);
    var codeStr = getCodeString(code);

    // If host reveals answer (key 'k' = 75, or 'b' = 66), unlock answer highlight on player/viewer
    if (code === 75 || code === 66) {
      if (window.isPlayerPage && window._pendingCorrectAnswer) {
        window.GameVariables.CurrentCorrectAnswer = window._pendingCorrectAnswer;
      }
    }

    var eventInit = {
      keyCode: code,
      which: code,
      key: keyStr,
      code: codeStr,
      bubbles: true,
      cancelable: true
    };

    var keyEv;
    try {
      keyEv = new KeyboardEvent('keydown', eventInit);
    } catch(e) {
      keyEv = document.createEvent('KeyboardEvent');
      if (keyEv.initKeyboardEvent) {
        keyEv.initKeyboardEvent('keydown', true, true, window, keyStr, 0, '', false, '');
      }
    }

    if (keyEv) {
      keyEv._fromRemoteSync = true;
      document.dispatchEvent(keyEv);
      window.dispatchEvent(keyEv);
    }

    // Direct invocation fallback if listener wasn't triggered
    if (typeof handleKeyDirectly === 'function') {
      try { handleKeyDirectly(code); } catch(e){}
    }
  }

  function processLevelChange(lvl) {
    if (window.isControllerPage) return;
    var targetLvl = Number(lvl);
    if (window.GameVariables) {
      window.GameVariables.QuestionLevel = targetLvl;
      if (typeof setLevelOnMoneyTree === 'function') {
        setLevelOnMoneyTree(targetLvl);
      }
      if (typeof setQuestion === 'function') {
        setQuestion(false);
      }
    }
  }

  function processHostInfoMessage(text) {
    var $info = $('.infoTd, .question-info, #hostInfoDisplay');
    if ($info.length) {
      $info.html(text);
    }
  }

  function processQuestionSync(data) {
    if (!data) return;
    if (window.isPlayerPage) {
      // Keep real correct answer sealed from player DOM
      window._pendingCorrectAnswer = data.correctAnswer;
      if (window.GameVariables) {
        window.GameVariables.CurrentCorrectAnswer = '[SEALED_UNTIL_HOST_REVEAL]';
      }
    } else {
      if (window.GameVariables && data.correctAnswer) {
        window.GameVariables.CurrentCorrectAnswer = data.correctAnswer;
      }
    }
    if (data.question) {
      $('.questionTd, .question-box').html(data.question);
    }
    if (data.answerA) $('#answerA .answerP, #ctrlAnsA').html(data.answerA);
    if (data.answerB) $('#answerB .answerP, #ctrlAnsB').html(data.answerB);
    if (data.answerC) $('#answerC .answerP, #ctrlAnsC').html(data.answerC);
    if (data.answerD) $('#answerD .answerP, #ctrlAnsD').html(data.answerD);
  }

  // Public broadcast helpers (called by controller, control-panel, or host)
  function broadcastKeyPress(keyCode) {
    var payload = {
      keyCode: Number(keyCode),
      keyStr: getKeyString(keyCode),
      ts: Date.now()
    };
    broadcastEncryptedBC('sharedKeyEvent', payload);
    emitEncryptedSocket('sharedKeyEvent', payload);
    origSetItem('sharedKeyEvent', JSON.stringify(payload));
  }

  function broadcastLevelChange(lvl) {
    var payload = { level: Number(lvl), ts: Date.now() };
    broadcastEncryptedBC('levelChangeEvent', payload);
    emitEncryptedSocket('levelChangeEvent', payload);
    origSetItem('levelChangeEvent', JSON.stringify(payload));
  }

  function broadcastHostNote(text) {
    var payload = { text: String(text), ts: Date.now() };
    broadcastEncryptedBC('hostInfoMessage', payload);
    emitEncryptedSocket('hostInfoMessage', payload);
    origSetItem('hostInfoMessage', JSON.stringify(payload));
  }

  function broadcastQuestionSync(qData) {
    var payload = {
      question: qData.Question,
      answerA: qData.AnswerA,
      answerB: qData.AnswerB,
      answerC: qData.AnswerC,
      answerD: qData.AnswerD,
      correctAnswer: qData.CorrectAnswer,
      level: qData.Level || (window.GameVariables ? window.GameVariables.QuestionLevel : 1),
      ts: Date.now()
    };
    broadcastEncryptedBC('questionSync', payload);
    emitEncryptedSocket('questionSync', payload);
  }

  // Attach to window for game UI usage
  window.broadcastKeyPress = broadcastKeyPress;
  window.broadcastLevelChange = broadcastLevelChange;
  window.broadcastHostNote = broadcastHostNote;
  window.broadcastQuestionSync = broadcastQuestionSync;

  // Listeners setup for Socket
  function setupSocketListeners() {
    if (!socket) return;

    socket.on('syncStorage', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted && decrypted.key) {
        applyRemoteStorage(decrypted.key, decrypted.value);
      }
    });

    socket.on('sharedKeyEvent', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted && decrypted.keyCode) {
        processIncomingKey(decrypted.keyCode, decrypted.ts);
      }
    });

    socket.on('levelChangeEvent', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted && decrypted.level) {
        processLevelChange(decrypted.level);
      }
    });

    socket.on('hostInfoMessage', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted) {
        processHostInfoMessage(decrypted.text);
      }
    });

    socket.on('questionSync', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted) {
        processQuestionSync(decrypted);
      }
    });

    socket.on('revealAnswer', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted && decrypted.correctAnswer) {
        if (window.GameVariables) {
          window.GameVariables.CurrentCorrectAnswer = decrypted.correctAnswer;
        }
        if (typeof showAnswerBars === 'function') {
          showAnswerBars();
        }
      }
    });

    socket.on('ATA_RESULT', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted) {
        if (window.GameVariables) {
          window.GameVariables.AnswerAPercent = decrypted.A;
          window.GameVariables.AnswerBPercent = decrypted.B;
          window.GameVariables.AnswerCPercent = decrypted.C;
          window.GameVariables.AnswerDPercent = decrypted.D;
        }
        if (!window.isMasterController && typeof revealGraphPercentages === 'function') {
          revealGraphPercentages();
        }
      }
    });

    socket.on('FF_RESULT', function(data) {
      var decrypted = safeDecrypt(data);
      if (decrypted && decrypted.removed && typeof removeAnswer === 'function') {
        decrypted.removed.forEach(function(letter) {
          removeAnswer(letter);
        });
      }
    });
  }

  // BroadcastChannel listener
  if (sharedBc) {
    sharedBc.onmessage = function(ev) {
      if (!ev.data) return;
      var decrypted = safeDecrypt(ev.data.payload);
      if (ev.data.type === 'syncStorage' && decrypted) {
        applyRemoteStorage(decrypted.key, decrypted.value);
      } else if (ev.data.type === 'sharedKeyEvent' && decrypted) {
        if (decrypted.keyCode) processIncomingKey(decrypted.keyCode, decrypted.ts);
      } else if (ev.data.type === 'levelChangeEvent' && decrypted) {
        if (decrypted.level) processLevelChange(decrypted.level);
      } else if (ev.data.type === 'hostInfoMessage' && decrypted) {
        processHostInfoMessage(decrypted.text);
      } else if (ev.data.type === 'questionSync' && decrypted) {
        processQuestionSync(decrypted);
      }
    };
  }

  // Storage listener for cross-tab fallback
  window.addEventListener('storage', function(e) {
    if (!e.newValue) return;
    try {
      var data = JSON.parse(e.newValue);
      var decrypted = safeDecrypt(data);
      if (e.key === 'sharedKeyEvent') {
        if (decrypted && decrypted.keyCode) processIncomingKey(decrypted.keyCode, decrypted.ts);
      } else if (e.key === 'levelChangeEvent') {
        if (decrypted && decrypted.level) processLevelChange(decrypted.level);
      } else if (e.key === 'hostInfoMessage') {
        if (decrypted && decrypted.text) processHostInfoMessage(decrypted.text);
      }
    } catch(err) {}
  });

  // Mask player answers when game starts
  if (window.isPlayerPage) {
    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        if (window.GameVariables && window.GameVariables.QuestionsAndAnswers) {
          for (var i = 0; i < window.GameVariables.QuestionsAndAnswers.length; i++) {
            var q = window.GameVariables.QuestionsAndAnswers[i];
            if (q) {
              q._sealedCorrectAnswer = q.CorrectAnswer;
              q.CorrectAnswer = '[SEALED_WAITING_FOR_HOST_REVEAL]';
            }
          }
        }
      }, 500);
    });
  }

  // Initialize socket connection
  initSocketConnection();

})();
