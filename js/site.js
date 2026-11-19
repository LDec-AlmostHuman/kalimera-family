/* The live app (app/, the browser build with scripted answers) in one phone frame, and a short guided tour that
   presses the app's own buttons. The frame is on this site's origin and shares its storage, so it is prepared just
   before each load: English, United Kingdom, terms agreed, the chosen look, the screen following the system.
   If storage is blocked, the app opens with its defaults; the page still works. */
(function () {
  'use strict';
  var APP = 'app/index.html?mockModels=ready';
  var STEP_MS = 7500;
  var look = 'b';
  var playing = false;
  var timer = null;
  var run = 0;

  var frame = document.getElementById('phone');
  if (!frame) return;

  function prepare() {
    try {
      localStorage.setItem('kalimera.locale', 'en');
      localStorage.setItem('kalimera.country', JSON.stringify({ en: 'GB' }));
      localStorage.setItem('kalimera_terms_v1', 'agreed');
      localStorage.setItem('kalimera.skin', look);
      localStorage.removeItem('kalimera.theme');
    } catch (e) {
      /* storage blocked */
    }
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /** Loads the app fresh on its Home screen. */
  function reload() {
    return new Promise(function (resolve) {
      prepare();
      frame.addEventListener('load', function () {
        watchTouches();
        wait(400).then(resolve);
      }, { once: true });
      frame.src = APP + '&t=' + Date.now();
    });
  }

  function doc() {
    try { return frame.contentDocument; } catch (e) { return null; }
  }

  /** The app's button with this exact text or label. */
  function button(text) {
    var d = doc();
    if (!d) return null;
    var all = d.querySelectorAll('button');
    for (var i = 0; i < all.length; i++) {
      var b = all[i];
      var label = (b.getAttribute('aria-label') || '').trim();
      var own = b.textContent.replace(/\s+/g, ' ').trim();
      if (own === text || label === text) return b;
    }
    return null;
  }

  /** Waits until the app shows a button with this text (or the time runs out). */
  function waitFor(text, ms) {
    var until = Date.now() + ms;
    return new Promise(function (resolve) {
      (function check() {
        if (button(text) || Date.now() > until) return resolve();
        setTimeout(check, 150);
      })();
    });
  }

  function press(text) {
    var b = button(text);
    if (b) b.click();
    return wait(450);
  }

  /** Types into the app's question box the way a person would, then sends it. */
  function typeAndSend(text) {
    var d = doc();
    var input = d && d.querySelector('input[type="text"], input:not([type]), textarea');
    if (!input) return wait(0);
    var view = d.defaultView;
    var proto = input.tagName === 'TEXTAREA' ? view.HTMLTextAreaElement.prototype : view.HTMLInputElement.prototype;
    var setValue = Object.getOwnPropertyDescriptor(proto, 'value').set;
    var i = 0;
    return new Promise(function (resolve) {
      (function next() {
        i += 1;
        setValue.call(input, text.slice(0, i));
        input.dispatchEvent(new view.Event('input', { bubbles: true }));
        if (i < text.length) return setTimeout(next, 45);
        setTimeout(function () {
          if (input.form) input.form.requestSubmit();
          resolve();
        }, 350);
      })();
    });
  }

  var STEPS = {
    speak: function () { return reload().then(function () { return press('Speak'); }); },
    bleeding: function () {
      // The Speak screen holds the Type button; the short spoken example finishes first (Stop would answer it too).
      return reload()
        .then(function () { return press('Speak'); })
        .then(function () { return waitFor('Speak again', 9000); })
        .then(function () { return press('Type'); })
        .then(function () { return typeAndSend('How do I stop heavy bleeding?'); });
    },
    help: function () { return reload().then(function () { return press('Emergency help'); }); },
    story: function () { return reload().then(function () { return press('Call from the bank'); }); },
    dark: function () { return reload().then(function () { return press('Switch to the dark screen'); }); },
    meadow: function () { setLook('e'); return reload(); },
  };
  var ORDER = ['speak', 'bleeding', 'help', 'story', 'dark', 'meadow'];

  function mark(name) {
    var steps = document.querySelectorAll('.tour__step');
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].getAttribute('data-step') === name) steps[i].setAttribute('aria-current', 'step');
      else steps[i].removeAttribute('aria-current');
    }
  }

  function setLook(id) {
    look = id;
    var looks = document.querySelectorAll('.look');
    for (var i = 0; i < looks.length; i++) looks[i].setAttribute('aria-pressed', String(looks[i].getAttribute('data-look') === id));
  }

  function show(name) {
    mark(name);
    var step = STEPS[name];
    return step ? step() : Promise.resolve();
  }

  function stop() {
    playing = false;
    run += 1;
    clearTimeout(timer);
    var play = document.getElementById('tour-play');
    if (play) play.textContent = 'Play the tour';
  }

  function play() {
    stop();
    playing = true;
    var mine = run;
    var playButton = document.getElementById('tour-play');
    if (playButton) playButton.textContent = 'Stop the tour';
    setLook('b');
    var i = 0;
    (function next() {
      if (!playing || mine !== run) return;
      if (i >= ORDER.length) return stop();
      show(ORDER[i]).then(function () {
        i += 1;
        timer = setTimeout(next, STEP_MS);
      });
    })();
  }

  /** A tap inside the phone stops the tour, so the visitor can try the app. */
  function watchTouches() {
    var d = doc();
    if (d) d.addEventListener('pointerdown', function (e) { if (e.isTrusted && playing) stop(); });
  }

  function bringPhoneIntoView() {
    var r = frame.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) frame.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  document.addEventListener('click', function (event) {
    var t = event.target;
    var step = t.closest('[data-step]');
    var lookButton = t.closest('[data-look]');
    if (step) {
      stop();
      bringPhoneIntoView();
      show(step.getAttribute('data-step'));
    } else if (lookButton) {
      stop();
      mark('');
      setLook(lookButton.getAttribute('data-look'));
      reload();
    } else if (t.closest('#tour-play')) {
      if (playing) stop(); else { bringPhoneIntoView(); play(); }
    } else if (t.closest('#tour-reset')) {
      stop();
      mark('');
      setLook('b');
      reload();
    }
  });

  /* Load the app when the tour comes near the screen. */
  var target = document.getElementById('try');
  if ('IntersectionObserver' in window && target) {
    var seen = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { seen.disconnect(); reload(); }
    }, { rootMargin: '400px 0px' });
    seen.observe(target);
  } else {
    reload();
  }
})();
