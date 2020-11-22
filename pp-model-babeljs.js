"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.0.0 (2020/01/01 03:18 PM)
 * Released under the MIT License
 */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('ppModel', factory) : (global = global || self, function () {
    var exports = global.ppModel = factory();
  }());
})(void 0, function () {
  return function (preOptions) {
    var preOptions = preOptions || {};
    /**
     * A namespace.
     * @namespace ppModel
     */

    return function (options) {
      /**
       *@property {object} events - Container of events
       *@author Carlos Illesca <c4rl0sill3sc4@gmail.com>
       *@memberof ppModel
       */
      this.events = {};
      /**
      *on
      *@param {string} eventName - name event 
      *@param {function} callbacks - Function for execute when emit event name
      *@author Carlos Illesca <c4rl0sill3sc4@gmail.com>
      *@memberof ppModel
      *@returns {void} 
      */

      this.on = function (eventName, callbacks) {
        if (typeof eventName == "string") {
          if (typeof callbacks == "function") {
            if (!this.events.hasOwnProperty(eventName)) {
              this.events[eventName] = [];
            }

            this.events[eventName].push(callbacks);
          }
        }
      };
      /**
      *emit
      *@param {string} eventName - name for events call
      *@memberof ppModel
      *@returns {void}	    
      */


      this.emit = function (eventName) {
        var i,
            listeners,
            length,
            args = [].slice.call(arguments, 1);

        if (_typeof(this.events[eventName]) === 'object') {
          listeners = this.events[eventName].slice();
          length = listeners.length;

          for (i = 0; i < length; i++) {
            listeners[i].apply(this, args);
          }
        }
      };
      /**
      *@property {object} data - container for all data
      *@memberof ppModel	    
      */


      this.data = {}; // -------------------------------------------------------------------

      Object.assign(this.data, preOptions.defaults || {}); // -------------------------------------------------------------------

      Object.assign(this.data, options || {}); // -------------------------------------------------------------------

      /**
      *get
      *@param {string} key - name key for find
      *@memberof ppModel
      *@returns {(string|number|boolean)}
      */

      this.get = function (key) {
        if (this.data.hasOwnProperty(key)) {
          return Object.assign(_objectSpread({}, this.data), {})[key];
        } else {
          if (typeof key == "undefined") {
            return Object.assign(_objectSpread({}, this.data), {});
          } else {
            return null;
          }
        }
      };
      /**
      *set
      *@memberof ppModel
      *@returns {void}
      */


      this.set = function () {
        var _this = this;

        var args = [].slice.call(arguments);
        var data = {};

        if (args.length == 1) {
          if (_typeof(args[0]) == "object" && typeof args[0].forEach != 'function') {
            Object.assign(this.data, args[0]);
          }
        } else if (args.length == 2) {
          if (typeof args[0] == "string") {
            if (this.data.hasOwnProperty(args[0])) {
              if (this.events.hasOwnProperty("change:" + args[0])) {
                if (this.events["change:" + args[0]].length > 0) {
                  this.emit("change:" + args[0], this.data[args[0]], args[1], function () {
                    _this.data[args[0]] = args[1];
                  });
                }
              } else {
                this.data[args[0]] = args[1];
              }
            }
          }
        }
      };
      /**
      *has
      *@param {string} key - key for check if exists
      *@memberof ppModel
      *@description - funcion que verifica la existencia de una llave en la data
      */


      this.has = function (key) {
        return this.data.hasOwnProperty(key);
      };
      /**
      *getAll		
      *@description - funcion que retorna una copia de la data completa
      *@memberof ppModel
      *@returns {object} - return copy from data
      */


      this.getAll = function () {
        return Object.assign(_objectSpread({}, this.data), {});
      };
      /**
      *keys
      *@description - function que retorna un array con todas las llaves
      *@memberof ppModel
      *@returns {array}
      */


      this.keys = function () {
        return Object.keys(this.data);
      };
      /**
      *@values
      *@description - function que retorna un array con todos los valores
      *@memberof ppModel
      *@returns {array} - return array from values of data
      */


      this.values = function () {
        return Object.values(this.data);
      };
      /**https://github.com/jimbrittain/isBoolean/blob/master/isBoolean.js*/

      /**
      *isBoolean
      *@param {string} key - key from validate
      *@memberof ppModel
      *@description - verifica si es boolean la llave consultada
      *
      */


      this.isBoolean = function (key) {
        if (this.data.hasOwnProperty(key)) {
          return typeof this.data[key] == 'boolean';
        }

        return false;
      };
      /**
      *isString
      *@param {string} key - key for compare
      *@memberof ppModel
      *@description - function that check in data for key if value is string
      */


      this.isString = function (key) {
        if (this.data.hasOwnProperty(key)) {
          return typeof this.data[key] == 'string';
        }

        return false;
      };
      /**
      *isEmpty
      *@param {string} key - name from object
      *@description - funcion que verifica si la llave consultada esta vacia
      *@memberof ppModel
      *@author Carlos Illesca <c4rl0sill3sc4@gmail.com>
      *@returns {boolean}
      */


      this.isEmpty = function (key) {
        var value = this.data[key] || "";

        if (value == null) {
          return !0;
        }

        if (typeof value == 'string') {
          return value.length == 0 ? !0 : !1;
        }

        if (_typeof(value) == 'object' || typeof value == 'array') {
          if (typeof value.length == 'undefined') {
            return Object.values(value).length == 0 ? !0 : !1;
          } else {
            return value.length == 0 ? !0 : !1;
          }
        }
      };
      /**
      *pick		
      *@description - funcion que retorna solmanete las llaves solicitadas
      *@memberof ppModel
      *@author Carlos Illesca <c4rl0sill3sc4@gmail.com>
      *@returns {object}
      */


      this.pick = function () {
        var _this2 = this;

        var args = [].slice.call(arguments);
        var result = {};

        if (args.length > 0) {
          if (_typeof(this.data) == 'object') {
            args.forEach(function (arg) {
              if (typeof arg == 'string') {
                if (_this2.data.hasOwnProperty(arg)) {
                  result[arg] = _this2.data[arg];
                }

                ;
              }

              ;
            });
          }

          return Object.assign(_objectSpread({}, result), {});
        } else {
          return result;
        }

        ;
      };
      /**
      *omit
      *@description - Function que omite keys dadas para un objeto
      *@memberof ppModel
      *@author Carlos Illesca <c4rl0sill3sc4@gmail.com>
      *@returns {object}
      */


      this.omit = function () {
        var _this3 = this;

        var args = [].slice.call(arguments);
        var result = {};

        if (args.length > 0) {
          if (_typeof(this.data) == 'object') {
            //result = {...this.data};
            args.forEach(function (arg) {
              if (typeof arg == 'string') {
                if (_this3.data.hasOwnProperty(arg)) {
                  delete result[arg];
                }

                ;
              }

              ;
            });
          }

          return Object.assign(_objectSpread({}, result), {});
        } else {
          return result;
        }

        ;
      };
      /**
      *stringify
      *@param {(number|null)} nose - nose que pasa aqui 
      *@param {string} separador - el separador o tabulador
      *@description - esta funcion retorna el json en formato de texto
      *@memberof ppModel
      *@author Carlos Illesca <c4rl0sill3sc4@gmail.com>
      *@returns {string}
      */


      this.stringify = function (opt1, opt2) {
        return JSON.stringify(this.data, opt1, opt2);
      }; // -------------------------------------------------------------------		

    };
  }; //-----------------------------------------------------------------------------
});
