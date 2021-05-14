/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.0.9 (2020/05/14 12:41 PM)
 * Released under the MIT License
 */
(function(global , factory ){
  var root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global;
  if (typeof define === 'function' && define.amd) {
    define(['ppEvents','exports'], function(ppEvents, exports) {
      root.ppModel = factory(root, exports,ppEvents);
    });
  } else if (typeof exports !== 'undefined') {
    var ppEvents = {};
    try { ppEvents = require('ppEvents'); } catch (e) {}
    factory(root, exports, ppEvents );
  } else {
    root.ppModel = factory(root, {}, root.ppEvents );
  }

})( this,(function( root , example , ppEvents ) {
  var data = {},
  toString = Object.prototype.toString,
  isObject = function( value ){return toString.call(value) === '[object Object]'},
  isNull = function( value){return toString.call(value) === '[object Null]'},
  isString = function( value ){return toString.call(value) === '[object String]'},
  isUndefined = function( value ){return toString.call( value ) === '[object Undefined]'},
  Events = isUndefined( ppEvents ) ? null :  new ppEvents(),
  ppModel = function( defaults, __model ){
    if( isObject(defaults) ){ Object.assign(data,{...defaults}) }
    if( isObject(__model) ){ Object.assign(data,{...__model}) }
  },
  proto = ppModel.prototype;
  proto.on = isNull(Events) ? function(){/*Include messague*/} : Events.on;
  proto.emit = isNull(Events) ? function(){/*Include messague*/} :  Events.emit;
  proto.removeListener = isNull(Events) ? function(){/*Include messague*/} :  Events.removeListener;
  proto.get = function( key ){
    if( isString(key)){
      if( data.hasOwnProperty(key) ){
         return data[key];
      }
    }
  }
  proto.set = function( key ,value ){
    if( isString(key)){
      if( data.hasOwnProperty(key) ){
          if( !isNull(Events) ){
            if( Events.checkOn('change:'+key) ){
              this.emit( 'change:' + key , data[key] , value , function(){
                  data[key] = value;
              });
            }else{data[key] = value;}
          }else{data[key] = value;}
      }
    }
  }
  proto.stringify = function( replacer , space ){return JSON.stringify(data, replacer , space)}
  proto.keys = function(){return Object.keys( {...data} )}
  proto.has = function(key){return isString(key) ? data.hasOwnProperty(key) : false ;}
  proto.values = function(){return Object.values( {...data} )}
  proto.getAll = function(){return Object.assign({},{...data})}
  proto.isString = function( key ){return this.has(key) ? toString.call( key ) === '[object String]' :  false ;}
  proto.isBoolean = function(){return this.has(key) ? toString.call( key ) === '[object Boolean]' :  false ;}
  proto.isEmpty = function(){
    var value = data[key] || "";
      if( value == null ){
        return !0;
      }
      if( isString(value) ){
        return value.length == 0 ? !0:!1;
      }
      if( isObject(value) || typeof value == 'array' ){
        if( typeof value.length == 'undefined' ){
          return Object.values(value).length == 0 ? !0:!1;
        }else{
          return value.length == 0 ? !0:!1;
        }
      }
  }
  proto.pick = function(){
    var args = [].slice.call(arguments);
        var result = {};
        if( args.length > 0 ){
         if(  isObject(data) ){
           args.forEach(( arg )=>{
             if( isString(arg) ){
                if( data.hasOwnProperty(arg) ){
                    result[arg] = data[arg];
                };
             };
           });
         }
         return Object.assign({...result},{});
        }else{
          return result;
        };
  }
  proto.omit = function(){
     var args = [].slice.call(arguments);
        var result = {};
        if( args.length > 0 ){
         if( isObject(data) ){
           result = Object.assign({},{...data});
           args.forEach(( arg )=>{
             if( isString(arg) ){
                if( data.hasOwnProperty(arg) ){
                    delete result[arg];
                };
             };
           });
         }
         return Object.assign({...result},{});
        }else{
          return result;
        };
  }
  var prepareModel = function( initializeData ){return this.main( initializeData || {} );}
  prepareModel.prototype.main = function( preOptions ){
    var defaults = null;
    if( isObject(preOptions) ){
       if( preOptions.hasOwnProperty('defaults') ){
         if( isObject(preOptions.defaults) ){
            defaults = Object.assign({},preOptions.defaults)
         }
       }
    }
    return ppModel.bind(this,defaults);
  }
  return prepareModel;
}));
