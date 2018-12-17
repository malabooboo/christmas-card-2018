// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Defines DOM selectors */
var ELEMENT = {
  CARD_CONTENT: '.card__content',
  CONTINUE_BUTTON: '.card__continue',
  CARD_SECTION: 'card',
  OVERLAY: '.overlay',
  OVERLAY_IMAGE: '.overlay__image',
  OVERLAY_CAPTION: '.overlay__caption',
  OVERLAY_CLOSE: '.overlay__close',
  OVERLAY_LEFT: '.overlay__left-button',
  OVERLAY_RIGHT: '.overlay__right-button',
  PHOTOS: '.grid__photo'
  /** Defines names */

};
var CLASS_NAME = {
  CARD_SECTION: 'card',
  YEAR_SECTION: 'year',
  OVERLAY: 'overlay',
  OVERLAY_CLOSE: 'overlay__close',
  OVERLAY_LEFT: 'overlay__left-button',
  OVERLAY_RIGHT: 'overlay__right-button',
  PHOTOS: 'grid__photo'
  /** Defines Event types */

};
var EVENT = {
  CLICK: 'click',
  SCROLL: 'scroll',
  KEYDOWN: 'keydown'
  /** Defines state types */

};
var STATE = {
  SHOWN: '--shown',
  IN_VIEW: '--in-view'
};

var Card =
/*#__PURE__*/
function () {
  function Card() {
    _classCallCheck(this, Card);

    /** @private {number} Sets the initial scroll position */
    this.scrollPosition_ = 0;
    /** @private {Element} */

    this.cardContentEl_ = document.querySelector(ELEMENT.CARD_CONTENT);
    /** @private {Element} */

    this.continueButtonEl_ = document.querySelector(ELEMENT.CONTINUE_BUTTON);
    /** @private {Element} */

    this.cardSectionEl_ = document.getElementById(CLASS_NAME.CARD_SECTION);
    /** @private {number} */

    this.cardSectionHeight_ = this.cardSectionEl_.offsetHeight;
    /** @private {Element} */

    this.yearSectionEl_ = document.getElementById(CLASS_NAME.YEAR_SECTION);
    /** @private {Element} */

    this.overlayEl_ = document.querySelector(ELEMENT.OVERLAY);
    /** @private {Element} */

    this.overlayImageEl_ = document.querySelector(ELEMENT.OVERLAY_IMAGE);
    /** @private {Element} */

    this.overlayCaptionEl_ = document.querySelector(ELEMENT.OVERLAY_CAPTION);
    /** @private {Element} */

    this.overlayCloseEl_ = document.querySelector(ELEMENT.OVERLAY_CLOSE);
    /** @private {Element} */

    this.overlayLeftEl_ = document.querySelector(ELEMENT.OVERLAY_LEFT);
    /** @private {Element} */

    this.overlayRightEl_ = document.querySelector(ELEMENT.OVERLAY_RIGHT);
    /** @private {Nodelist} */

    this.photoEls_ = document.querySelectorAll(ELEMENT.PHOTOS);
    /** @private {array} */

    this.photoData_ = [];
    this.setImageHeights_();
    this.createEventListeners_();
    this.buildPhotoData_();
  }
  /**
   * Builds a photo data object from the <figure> elements on the page
   * @private
   */


  _createClass(Card, [{
    key: "buildPhotoData_",
    value: function buildPhotoData_() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.photoEls_[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var photoEl = _step.value;
          var photoUrl = photoEl.dataset.src; // let photoUrl = photoUrl.replace(/-800/i, '-1500');

          var photoCaption = photoEl.nextElementSibling.innerHTML.replace(/^\s+|\s+$/g, '');
          this.photoData_.push({
            'photoUrl': photoUrl,
            'photoCaption': photoCaption
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * Sets up all event listeners on the page
     * @private
     */

  }, {
    key: "createEventListeners_",
    value: function createEventListeners_() {
      var _this = this;

      // Adds scroll to year section from entire card content area.
      this.cardContentEl_.addEventListener(EVENT.CLICK, function (e) {
        _this.continueButtonEl_.click();
      }, false, this); // Adds scroll event listener.

      window.addEventListener(EVENT.SCROLL, function (e) {
        var startScrollPosition = _this.scrollPosition_; // Firefox doesn't support document.body.scrollTop.

        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        _this.scrollPosition_ = scrollPosition;

        _this.scrollHandler_(startScrollPosition, _this.scrollPosition_);
      }); // Adds an event listener for photos.

      this.yearSectionEl_.addEventListener(EVENT.CLICK, function (e) {
        _this.openOverlay_(e.target);
      }, false, this); // Adds an event listener for the overlay close, previous, and next buttons,
      // and overlay background.

      this.overlayEl_.addEventListener('click', function (e) {
        e.preventDefault();
        var clickedEl = e.target;

        if (clickedEl.classList.contains(CLASS_NAME.OVERLAY) || _this.findElementOrAncestorWithClass_(clickedEl, CLASS_NAME.OVERLAY_CLOSE)) {
          _this.closeOverlay_();
        } else if (_this.findElementOrAncestorWithClass_(clickedEl, CLASS_NAME.OVERLAY_LEFT)) {
          _this.previousOverlaySlide_();
        } else if (_this.findElementOrAncestorWithClass_(clickedEl, CLASS_NAME.OVERLAY_RIGHT)) {
          _this.nextOverlaySlide_();
        }
      }, false, this); // Adds event listeners for keyboard presses for the overlay.

      window.addEventListener(EVENT.KEYDOWN, function (e) {
        if (!_this.overlayEl_.classList.contains(CLASS_NAME.OVERLAY + STATE.SHOWN)) {
          return;
        }

        switch (e.keyCode) {
          case 37:
            _this.overlayLeftEl_.click();

            break;

          case 39:
            _this.overlayRightEl_.click();

            break;

          case 27:
            _this.overlayCloseEl_.click();

            break;
        }
      }, false);
    }
    /**
     * Handles scroll.
     * @param {number} startScrollPosition
     * @param {number} scrollPosition
     * @private
     */

  }, {
    key: "scrollHandler_",
    value: function scrollHandler_(startScrollPosition, scrollPosition) {
      var _this2 = this;

      var yearInView = CLASS_NAME.YEAR_SECTION + STATE.IN_VIEW;

      if (!this.ticking) {
        window.requestAnimationFrame(function () {
          if (_this2.scrollPosition_ > _this2.cardSectionHeight_ - _this2.cardSectionHeight_ / 2) {
            if (!_this2.yearSectionEl_.classList.contains(yearInView)) {
              _this2.yearSectionEl_.classList.add(yearInView);

              _this2.lazyLoadImages_();
            }
          }

          _this2.ticking = false;
        });
      }

      this.ticking = true;
    }
    /**
     * Starts loading images within a given month.
     * @private
     */

  }, {
    key: "lazyLoadImages_",
    value: function lazyLoadImages_() {
      var yearPhotoEls = this.yearSectionEl_.querySelectorAll(ELEMENT.PHOTOS); // for (let photo of yearPhotoEls) {

      for (var i = 0, photo; photo = yearPhotoEls[i]; i++) {
        photo.src = photo.dataset.src;
        photo.classList.add(CLASS_NAME.PHOTOS + STATE.SHOWN); // Removes data-src and height attributes after a staggered delay.

        setTimeout(function () {
          // Binds "this" to photo.
          delete this.dataset.src;
          this.removeAttribute('height');
        }.bind(photo, i), 200 * i);
      }
    }
    /**
     * Sets image initial heights manually before they have been lazy loaded.
     * @private
     */

  }, {
    key: "setImageHeights_",
    value: function setImageHeights_() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.photoEls_[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var imageEl = _step2.value;
          // Images are at a 3:2 ratio.
          var initialHeight = imageEl.offsetWidth * .67;
          imageEl.setAttribute('height', initialHeight);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    /**
     * Builds and shows overlay.
     * @param {string} photoUrl
     * @private
     */

  }, {
    key: "openOverlay_",
    value: function openOverlay_(photoEl) {
      this.lockScroll_();
      var overlayShown = CLASS_NAME.OVERLAY + STATE.SHOWN;
      var imgSource = photoEl;

      if (!photoEl.classList.contains(CLASS_NAME.PHOTOS)) {
        return;
      }

      var imgZoomSource = imgSource.getAttribute('src'); // imgZoomSource = imgZoomSource.replace(/-800/i, '-1500');

      var imgZoomCaption = imgSource.nextElementSibling.innerHTML;
      this.fillOverlayContent_(imgZoomSource, imgZoomCaption);
      this.overlayEl_.classList.add(overlayShown);
    }
    /**
     * Fills the overlay with content.
     * @param {string} photoUrl
     * @param {string} photoCaption
     * @private
     */

  }, {
    key: "fillOverlayContent_",
    value: function fillOverlayContent_(photoUrl, photoCaption) {
      this.overlayImageEl_.setAttribute('src', '');
      this.overlayImageEl_.setAttribute('src', photoUrl);
      this.overlayCaptionEl_.innerHTML = photoCaption;
    }
    /**
     * Closes the overlay
     * @private
     */

  }, {
    key: "closeOverlay_",
    value: function closeOverlay_() {
      this.unlockScroll_();
      var overlayShown = CLASS_NAME.OVERLAY + STATE.SHOWN;

      if (!this.overlayEl_.classList.contains(overlayShown)) {
        return;
      }

      this.overlayEl_.classList.remove(overlayShown);
    }
    /**
     * Advances the overlay content back based on photo data.
     * @private
     */

  }, {
    key: "previousOverlaySlide_",
    value: function previousOverlaySlide_() {
      var currentUrl = this.overlayImageEl_.getAttribute('src');
      var nextSlideUrl;
      var nextSlideCaption;

      for (var slide in this.photoData_) {
        // Matches the overlay's current photo with it's position in the array.
        if (this.photoData_[slide]['photoUrl'] == currentUrl) {
          var previousSlide = void 0;

          if (slide - 1 < 0) {
            previousSlide = this.photoEls_.length - 1;
          } else {
            previousSlide = slide - 1;
          }

          nextSlideUrl = this.photoData_[previousSlide]['photoUrl'];
          nextSlideCaption = this.photoData_[previousSlide]['photoCaption'];
          this.fillOverlayContent_(nextSlideUrl, nextSlideCaption);
          break;
        }
      }
    }
    /**
     * Advances the overlay content forward based on photo data.
     * @private
     */

  }, {
    key: "nextOverlaySlide_",
    value: function nextOverlaySlide_() {
      var currentUrl = this.overlayImageEl_.getAttribute('src');
      var nextSlideUrl;
      var nextSlideCaption;

      for (var slide in this.photoData_) {
        // Matches the overlay's current photo with it's position in the array.
        if (this.photoData_[slide]['photoUrl'] == currentUrl) {
          var nextSlide = void 0;

          if (parseFloat(slide) + 1 == this.photoEls_.length) {
            nextSlide = 0;
          } else {
            nextSlide = parseFloat(slide) + 1;
          }

          nextSlideUrl = this.photoData_[nextSlide]['photoUrl'];
          nextSlideCaption = this.photoData_[nextSlide]['photoCaption'];
          this.fillOverlayContent_(nextSlideUrl, nextSlideCaption);
          break;
        }
      }
    }
    /**
     * Locks scroll.
     * @private
     */

  }, {
    key: "lockScroll_",
    value: function lockScroll_() {
      if (document.body.classList.contains('scroll-locked')) {
        return;
      }

      document.body.classList.add('scroll-locked');
    }
    /**
     * Unlocks scroll.
     * @private
     */

  }, {
    key: "unlockScroll_",
    value: function unlockScroll_() {
      if (!document.body.classList.contains('scroll-locked')) {
        return;
      }

      document.body.classList.remove('scroll-locked');
    }
    /**
     * Traverses up the DOM to find an ancestor with a class.
     * @param {Element} element The element to start searching.
     * @param {string} className The class name to match.
     * @private
     */

  }, {
    key: "findElementOrAncestorWithClass_",
    value: function findElementOrAncestorWithClass_(element, className) {
      if (!element || element.length === 0) {
        return false;
      }

      var parent = element;

      do {
        if (parent === document) {
          break;
        }

        if (parent.classList.contains(className)) {
          return true;
        }
      } while (parent = parent.parentNode);

      return false;
    }
  }]);

  return Card;
}();

exports.default = Card;
console.log('card', Card);
},{}],"../../../.nvm/versions/node/v11.0.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45465" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.nvm/versions/node/v11.0.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/base.js"], null)
//# sourceMappingURL=/base.928c6d63.map