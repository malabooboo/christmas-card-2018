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
})({"js/zenscroll-min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "function" == typeof define && define.amd ? define([], e()) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.zenscroll = e();
}(this, function () {
  "use strict";

  var t = function t(_t) {
    return "getComputedStyle" in window && "smooth" === window.getComputedStyle(_t)["scroll-behavior"];
  };

  if ("undefined" == typeof window || !("document" in window)) return {};

  var e = function e(_e, n, o) {
    n = n || 999, o || 0 === o || (o = 9);

    var i,
        r = function r(t) {
      i = t;
    },
        c = document.documentElement,
        u = function u() {
      return _e ? _e.scrollTop : window.scrollY || c.scrollTop;
    },
        l = function l() {
      return _e ? Math.min(_e.offsetHeight, window.innerHeight) : window.innerHeight || c.clientHeight;
    },
        a = function a(t) {
      return _e ? t.offsetTop : t.getBoundingClientRect().top + u() - c.offsetTop;
    },
        s = function s() {
      clearTimeout(i), r(0);
    },
        f = function f(o, i, a) {
      if (s(), t(_e ? _e : document.body)) (_e || window).scrollTo(0, o), a && a();else {
        var f = u(),
            d = Math.max(o, 0) - f;
        i = i || Math.min(Math.abs(d), n);
        var h = new Date().getTime();
        !function t() {
          r(setTimeout(function () {
            var n = Math.min((new Date().getTime() - h) / i, 1),
                o = Math.max(Math.floor(f + d * (n < .5 ? 2 * n * n : n * (4 - 2 * n) - 1)), 0);
            _e ? _e.scrollTop = o : window.scrollTo(0, o), n < 1 && l() + o < (_e || c).scrollHeight ? t() : (setTimeout(s, 99), a && a());
          }, 9));
        }();
      }
    },
        d = function d(t, e, n) {
      var i = a(t) - o;
      return f(i, e, n), i;
    },
        h = function h(t, e, n) {
      var i = t.getBoundingClientRect().height,
          r = a(t),
          c = r + i,
          s = l(),
          h = u(),
          w = h + s;
      r - o < h || i + o > s ? d(t, e, n) : c + o > w ? f(c - s + o, e, n) : n && n();
    },
        w = function w(t, e, n, o) {
      f(Math.max(a(t) - l() / 2 + (n || t.getBoundingClientRect().height / 2), 0), e, o);
    },
        m = function m(t, e) {
      t && (n = t), (0 === e || e) && (o = e);
    };

    return {
      setup: m,
      to: d,
      toY: f,
      intoView: h,
      center: w,
      stop: s,
      moving: function moving() {
        return !!i;
      },
      getY: u
    };
  },
      n = e();

  if ("addEventListener" in window && !t(document.body) && !window.noZensmooth) {
    "scrollRestoration" in history && (history.scrollRestoration = "manual", window.addEventListener("popstate", function (t) {
      t.state && t.state.scrollY && n.toY(t.state.scrollY);
    }, !1));

    var o = function o(t, e) {
      try {
        history.replaceState({
          scrollY: n.getY()
        }, ""), history.pushState({
          scrollY: e
        }, "", t);
      } catch (t) {}
    };

    window.addEventListener("click", function (t) {
      for (var e = t.target; e && "A" !== e.tagName;) {
        e = e.parentNode;
      }

      if (!(!e || 1 !== t.which || t.shiftKey || t.metaKey || t.ctrlKey || t.altKey)) {
        var i = e.getAttribute("href") || "";
        if (0 === i.indexOf("#")) if ("#" === i) t.preventDefault(), n.toY(0), o(window.location.href.split("#")[0], 0);else {
          var r = e.hash.substring(1),
              c = document.getElementById(r);
          c && (t.preventDefault(), o("#" + r, n.to(c)));
        }
      }
    }, !1);
  }

  return {
    createScroller: e,
    setup: n.setup,
    to: n.to,
    toY: n.toY,
    intoView: n.intoView,
    center: n.center,
    stop: n.stop,
    moving: n.moving
  };
});
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36247" + '/');

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
},{}]},{},["../../../.nvm/versions/node/v11.0.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/zenscroll-min.js"], null)
//# sourceMappingURL=/zenscroll-min.05ab795b.map