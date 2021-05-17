/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.1.0 (2020/05/16 21:27 PM)
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
  /*
  *@var data
  *@type Object
  *@description - container of data main
  */
  var data = {},
  // link to Object.prototype.toString {}.toString
  toString = Object.prototype.toString,
  isObject = function( value ){
    /*
    *@var isObject
    *@type Function
    *@params
    *    value = value to compare
    *@return Boolean
    */
    return toString.call(value) === '[object Object]'
  },
  /*
  *@var isNull
  *@type Function
  *@params
  *    value = value to compare
  *@return Boolean
  */
  isNull = function( value){
    return toString.call(value) === '[object Null]'
  },
  /*
  *@var isString
  *@type Function
  *@params
  *    value = value to compare
  *@return Boolean
  */
  isString = function( value ){
    return toString.call(value) === '[object String]'
  },
  /*
  *@var isUndefined
  *@type Function
  *@params
  *    value = value to compare
  *@return Boolean
  */
  isUndefined = function( value ){
    return toString.call( value ) === '[object Undefined]'
  },
  // DECLARE Events from ppEvents if be include
  Events = isUndefined( ppEvents ) ? null :  new ppEvents(),
  // DECLARE MAIN FUNCTION OBJECT TO RETURN
  ppModel = function( defaults, __model ){
    if( isObject(defaults) ){ Object.assign(data,{...defaults}) }
    if( isObject(__model) ){ Object.assign(data,{...__model}) }
  },
  //DECLARE link to prototype
  proto = ppModel.prototype;
  // LINK FUNCTION ON
  proto.on = isNull(Events) ? function(){/*Include messague*/} : Events.on;
  // LINK FUNCTION EMIT
  proto.emit = isNull(Events) ? function(){/*Include messague*/} :  Events.emit;
  // LINK FUNCTION REMOVELISTENER
  proto.removeListener = isNull(Events) ? function(){/*Include messague*/} :  Events.removeListener;
  /*
  *@var get
  *@type Function
  *@description - get value from key of data main container
  *@return String
  */
  proto.get = function( key ){
    if( isString(key)){
      if( data.hasOwnProperty(key) ){
         return data[key];
      }
    }
  }
  /*
  *@var set
  *@type Function
  *@description - set value from key of data main conatiner
  *@return viod
  */
  proto.set = function( key ,value ){
      if( this.has(key) ){
          if( !isNull(Events) ){
            if( Events.checkOn('change:'+key) ){
              this.emit( 'change:' + key , data[key] , value , function(){
                  data[key] = value;
              });
            }else{data[key] = value;}
          }else{data[key] = value;}
      }
  }
  proto.stringify = function( replacer , space ){return JSON.stringify(data, replacer , space)}
// link Object.keys
  proto.keys = function(){return Object.keys( {...data} )}
  /*
  *@var has
  *@type Function
  *@description - check if exists property from data main
  *@return Boolean
  */
  proto.has = function(key){return isString(key) ? data.hasOwnProperty(key) : false ;}
  // link Object.values
  proto.values = function(){return Object.values( {...data} )}
  /*
  *@var getAll
  *@type Function
  *@description - return clone from data main
  *@return Object
  */
  proto.getAll = function(){
    return Object.assign({},{...data})
  }
  /*
  *@var isString
  *@type Function
  *@description - check if property from data main is String
  *@return Boolean
  */
  proto.isString = function( key ){
    return this.has(key) ? isString( data[key] ) :  false ;
  }
  /*
  *@var isBoolean
  *@type Function
  *@description - check if property from data main is Boolean
  *@return Boolean
  */
  proto.isBoolean = function( key ){
    return this.has(key) ? isBoolean(data[key]) :  false ;
  }
  proto.isEmpty = function( key ){
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
