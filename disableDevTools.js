/**
 * DevTools Protection & Anti-Inspection Module
 * Disables DevTools shortcuts, right-click context menu, and suppresses browser dialogs
 */
(function() {
  'use strict';

  // 1. Completely eliminate alert, prompt, and confirm dialogs
  window.alert = function() {};
  window.prompt = function() { return null; };
  window.confirm = function() { return true; };

  // 2. Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, true);

  // 3. Block keyboard shortcuts for DevTools & source inspection
  window.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode || e.which;
    var isCtrl = e.ctrlKey || e.metaKey;
    var isShift = e.shiftKey;

    // F12
    if (keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspect, Console, Element Picker)
    if (isCtrl && isShift && (keyCode === 73 || keyCode === 74 || keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (View Source)
    if (isCtrl && (keyCode === 85 || keyCode === 117)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S (Save Page)
    if (isCtrl && (keyCode === 83 || keyCode === 115)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // 4. DevTools detection and console suppression
  var devtoolsOpen = false;
  var threshold = 160;

  function checkDevTools() {
    var widthDiff = window.outerWidth - window.innerWidth > threshold;
    var heightDiff = window.outerHeight - window.innerHeight > threshold;
    if (widthDiff || heightDiff) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
      }
      try {
        if (typeof console !== 'undefined' && console.clear) {
          console.clear();
        }
      } catch(e) {}
    } else {
      devtoolsOpen = false;
    }
  }

  setInterval(checkDevTools, 1000);
  window.addEventListener('resize', checkDevTools);

})();
