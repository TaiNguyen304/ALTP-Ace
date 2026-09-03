(function() {
  // Global socket setup if io is available
  var socket = null;
  if (typeof io !== 'undefined') {
    try {
      socket = io();
    } catch(e) {
      console.warn('Socket.io connection failed', e);
    }
  }

  // BroadcastChannel for same-origin tabs
  var sharedBc = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      sharedBc = new BroadcastChannel('millionaire_sync_channel');
    } catch(e) {
      console.warn('BroadcastChannel not supported', e);
    }
  }

  var lastProcessedTs = 0;

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

  // Function to process incoming key press across all screens/roles
  function processIncomingKey(keyCode, ts) {
    if (window.isControllerPage) return;
    if (ts && ts <= lastProcessedTs) return;
    if (ts) lastProcessedTs = ts;

    window.isRemoteEvent = true;
    var keyNum = Number(keyCode);
    var keyStr = getKeyString(keyNum);
    var codeStr = getCodeString(keyNum);

    // 1. Dispatch native DOM KeyboardEvent (supports vanilla listeners like videowall)
    try {
      var nativeEv = new KeyboardEvent('keydown', {
        key: keyStr,
        keyCode: keyNum,
        which: keyNum,
        code: codeStr,
        bubbles: true,
        cancelable: true
      });
      Object.defineProperty(nativeEv, 'isSimulated', { value: true, enumerable: true });
      document.dispatchEvent(nativeEv);
    } catch(err) {
      try {
        var legacyEv = document.createEvent('Event');
        legacyEv.initEvent('keydown', true, true);
        legacyEv.keyCode = keyNum;
        legacyEv.which = keyNum;
        legacyEv.key = keyStr;
        legacyEv.isSimulated = true;
        document.dispatchEvent(legacyEv);
      } catch(e2) {}
    }

    // 2. Direct function call if handleGameKey is defined
    if (typeof window.handleGameKey === 'function') {
      try {
        window.handleGameKey(keyNum);
      } catch(err) {
        console.error('handleGameKey error:', err);
      }
    }

    // 3. Dispatch jQuery event if jQuery is available
    if (typeof $ !== 'undefined') {
      try {
        var jqEvent = $.Event('keydown', {
          keyCode: keyNum,
          which: keyNum,
          key: keyStr,
          isSimulated: true
        });
        $(document).trigger(jqEvent);
      } catch(err) {}
    }

    window.isRemoteEvent = false;
  }

  // Function to process host info message
  function processHostInfoMessage(text) {
    if (typeof $ !== 'undefined') {
      $('.hostinformationDiv .infoTd, .hostNoteTd, .message-display, .question-info').text(text || '');
    }
  }

  // Broadcast key press across all channels
  window.broadcastKeyPress = function(keyCode) {
    var ts = Date.now();
    var payload = { keyCode: Number(keyCode), ts: ts };

    // 1. LocalStorage
    try {
      localStorage.setItem('sharedKeyEvent', JSON.stringify(payload));
    } catch(err) {}

    // 2. BroadcastChannel
    if (sharedBc) {
      try {
        sharedBc.postMessage({ type: 'sharedKeyEvent', payload: payload });
      } catch(err) {}
    }

    // 3. Socket.io
    if (socket && socket.connected) {
      try {
        socket.emit('sharedKeyEvent', payload);
      } catch(err) {}
    }
  };

  // Broadcast level change across all channels
  window.broadcastLevelChange = function(lvl) {
    var ts = Date.now();
    var payload = { level: Number(lvl), ts: ts };

    processLevelChange(lvl);

    try {
      localStorage.setItem('levelChangeEvent', JSON.stringify(payload));
    } catch(err) {}

    if (sharedBc) {
      try {
        sharedBc.postMessage({ type: 'levelChangeEvent', payload: payload });
      } catch(err) {}
    }

    if (socket && socket.connected) {
      try {
        socket.emit('levelChangeEvent', payload);
      } catch(err) {}
    }
  };

  function processLevelChange(lvl) {
    if (window.isControllerPage) return;
    var numLvl = Number(lvl);
    if (isNaN(numLvl) || numLvl < 1) numLvl = 1;

    if (window.GameVariables) {
      window.GameVariables.QuestionLevel = numLvl;
    }
    if (typeof setStartingQuestionLevel === 'function') {
      setStartingQuestionLevel(numLvl);
    }
    if (typeof setLevelOnMoneyTree === 'function') {
      setLevelOnMoneyTree(numLvl);
    }
    if (typeof setQuestion === 'function') {
      setQuestion(false);
    }
  }

  // Broadcast host message
  window.broadcastHostNote = function(text) {
    var ts = Date.now();
    var payload = { text: text, ts: ts };

    processHostInfoMessage(text);

    try {
      localStorage.setItem('hostInfoMessage', JSON.stringify(payload));
    } catch(err) {}

    if (sharedBc) {
      try {
        sharedBc.postMessage({ type: 'hostInfoMessage', payload: payload });
      } catch(err) {}
    }

    if (socket && socket.connected) {
      try {
        socket.emit('hostInfoMessage', payload);
      } catch(err) {}
    }
  };

  // Listeners:
  // 1. LocalStorage storage event
  window.addEventListener('storage', function(e) {
    if (!e.newValue) return;

    if (e.key === 'sharedKeyEvent') {
      try {
        var data = JSON.parse(e.newValue);
        if (data && data.keyCode) {
          processIncomingKey(data.keyCode, data.ts);
        }
      } catch(err) {}
    } else if (e.key === 'levelChangeEvent') {
      try {
        var data = JSON.parse(e.newValue);
        if (data && data.level) processLevelChange(data.level);
      } catch(err) {}
    } else if (e.key === 'hostInfoMessage') {
      try {
        var data = JSON.parse(e.newValue);
        processHostInfoMessage(data.text);
      } catch(err) {}
    } else if (e.key === 'ATA_RESULT') {
      try {
        var data = JSON.parse(e.newValue);
        if (window.GameVariables) {
          window.GameVariables.AnswerAPercent = data.A;
          window.GameVariables.AnswerBPercent = data.B;
          window.GameVariables.AnswerCPercent = data.C;
          window.GameVariables.AnswerDPercent = data.D;
        }
        if (!window.isMasterController && typeof revealGraphPercentages === 'function') {
          revealGraphPercentages();
        }
      } catch(err) {}
    } else if (e.key === 'FF_RESULT') {
      try {
        var data = JSON.parse(e.newValue);
        if (data && data.removed && typeof removeAnswer === 'function') {
          data.removed.forEach(function(letter) {
            removeAnswer(letter);
          });
        }
      } catch(err) {}
    }
  });

  // 2. BroadcastChannel
  if (sharedBc) {
    sharedBc.onmessage = function(ev) {
      if (!ev.data) return;
      if (ev.data.type === 'sharedKeyEvent') {
        var p = ev.data.payload;
        if (p && p.keyCode) processIncomingKey(p.keyCode, p.ts);
      } else if (ev.data.type === 'levelChangeEvent') {
        var p = ev.data.payload;
        if (p && p.level) processLevelChange(p.level);
      } else if (ev.data.type === 'hostInfoMessage') {
        var p = ev.data.payload;
        processHostInfoMessage(p.text);
      }
    };
  }

  // 3. Socket.io
  if (socket) {
    socket.on('sharedKeyEvent', function(data) {
      if (data && data.keyCode) {
        processIncomingKey(data.keyCode, data.ts);
      }
    });

    socket.on('levelChangeEvent', function(data) {
      if (data && data.level) {
        processLevelChange(data.level);
      }
    });

    socket.on('hostInfoMessage', function(data) {
      if (data) {
        processHostInfoMessage(data.text);
      }
    });

    socket.on('ATA_RESULT', function(data) {
      if (data) {
        if (window.GameVariables) {
          window.GameVariables.AnswerAPercent = data.A;
          window.GameVariables.AnswerBPercent = data.B;
          window.GameVariables.AnswerCPercent = data.C;
          window.GameVariables.AnswerDPercent = data.D;
        }
        if (!window.isMasterController && typeof revealGraphPercentages === 'function') {
          revealGraphPercentages();
        }
      }
    });

    socket.on('FF_RESULT', function(data) {
      if (data && data.removed && typeof removeAnswer === 'function') {
        data.removed.forEach(function(letter) {
          removeAnswer(letter);
        });
      }
    });
  }

})();
