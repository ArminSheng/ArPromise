/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class APromise {
    constructor(exec) {
        let self = this;

        this.state = 'pending';
        this.onFullfilled = null;
        this.onRejected = null;

        let resolve = function(val) {
            self.resolve(val);
        };

        let reject = function(err) {
            self.reject(err);
        };

        typeof exec === 'function' && exec(resolve, reject);
    }

    then(resolve, reject) {
        let promise = new APromise();

        this.onFullfilled = function(val) {
            val = resolve ? resolve(val) : val;
            if (val instanceof APromise) {
                val.then(function(res) {
                    promise.resolve(res);
                });
            } else {
                promise.resolve(val);
            }
        };

        this.onRejected = function(err) {
            err = reject ? reject(err) : err;
            promise.reject(err);
        };

        return promise;
    }

    resolve(val) {
        if (this.state === 'pending' || this.state === 'resolved') {
            this.state = 'resolved';
            this.onFullfilled && this.onFullfilled(val);
        }
    }

    reject(err) {
        if (this.state === 'pending' || this.state === 'rejected') {
            this.state = 'rejected';
            this.onRejected && this.onRejected(err);
        }
    }

    catch(reject) {
        return this.then(null, reject);
    }
};

APromise.resolve = function(obj) {
    var promise = new APromise();
    if (obj && typeof obj.then === 'function') {
        for (var i in promise) {
            obj[i] = promise[i];
        }
        return obj;
    }
    else {
        setTimeout(function () {
            promise.resolve(obj);
        });
        return promise;
    }
};

/* harmony default export */ __webpack_exports__["a"] = APromise;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Promise__ = __webpack_require__(0);


var promise = new __WEBPACK_IMPORTED_MODULE_0__src_Promise__["a" /* default */](function(resolve, reject) {
        setTimeout(function() {
            resolve('some msg');
        }, 1000);
    });

promise.then(function(res) {
    let ele = document.createElement('p');
    ele.innerHTML = res;
    document.body.appendChild(ele);
    console.log('result: ' + res);
    let pm = __WEBPACK_IMPORTED_MODULE_0__src_Promise__["a" /* default */].resolve('2th msg');
    // return pm;
}).then(function(res) {
    console.log('next: ' + res);
}).then(function(res) {
    console.log(res)
})
console.log(promise)

/***/ })
/******/ ]);