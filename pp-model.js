/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.2.2 (2020/08/10 08:56 AM)
 * Released under the MIT License
 */
(function(global , factory ){
  var root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global;
  if (typeof define === 'function' && define.amd) {
    define(['ppEvents','ppIs','exports'], function( ppEvents, ppIs , exports ) {
      root.ppModel = factory(root, exports, ppEvents , ppIs );
    });
  } else if (typeof exports !== 'undefined') {
    var ppEvents = {};
    var ppIs = {};
    try { ppEvents = require('pp-events'); } catch (e) {}
    try { ppIs = require('pp-is'); } catch (e) {}
    module.exports = factory(root, exports, ppEvents , ppIs );
  } else {

    root.ppModel = factory(root, {}, root.ppEvents , root.ppIs );
  }

})( this,(function( root , exports , ppEvents , ppIs ) {
  /*
  *@var data
  *@type Object
  *@description - container of data main
  */
  var data = {},
  // DECLARE Events from ppEvents if be include
  Events = ppIs.isUndefined( ppEvents ) ? null :  new ppEvents(),
  // DECLARE MAIN FUNCTION OBJECT TO RETURN
  ppModel = function( defaults, __model ){
    if( ppIs.isObject(defaults) ){ Object.assign(data,{...defaults}) }
    if( ppIs.isObject(__model) ){ Object.assign(data,{...__model}) }
  },
  //DECLARE link to prototype
  proto = ppModel.prototype;
  // LINK FUNCTION ON
  proto.on = ppIs.isNull(Events) ? function(){/*Include messague*/} : Events.on;
  // LINK FUNCTION EMIT
  proto.emit = ppIs.isNull(Events) ? function(){/*Include messague*/} :  Events.emit;
  // LINK FUNCTION REMOVELISTENER
  proto.removeListener = ppIs.isNull(Events) ? function(){/*Include messague*/} :  Events.removeListener;
  /*
  *@var get
  *@type Function
  *@description - get value from key of data main container
  *@return String
  */
  proto.get = function( key ){
    if( ppIs.isString(key)){
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
  // Se podria depurar aun mas esta funcion
  proto.set = function( key ,value ){
      if( this.has(key) ){
          if( !ppIs.isNull(Events) ){
            if( Events.checkOn('change:'+key) ){
              this.emit( 'change:' + key , value , data[key] , function(){
                  data[key] = value;
                  this.emit('changed:'+ key , value );
              }.bind(this));
            }else{data[key] = value;this.emit('changed:'+ key , value );}
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
  proto.has = function(key){return ppIs.isString(key) ? data.hasOwnProperty(key) : false ;}
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
  // ===========================================================================
  // ============== EXTEND ALL FUNCTION FROM ppis
  var ppIsKey =  Object.keys(ppIs);
  // ---------------------------------------------------------------------------
  //
  for( var i = 0; i < ppIsKey.length; i++  ){
        var key   = ppIsKey[i];
        proto[ key ] = function( func , _key ,_done ){

            return data.hasOwnProperty(_key) ? func( data[ _key ] , _done ) : func( undefined , _done );

        }.bind( this , ppIs[ key ] )
  }
  // ===========================================================================
  proto.pick = function(){
    var args = [].slice.call(arguments);
        var result = {};
        if( args.length > 0 ){
         if(  ppIs.isObject(data) ){
           args.forEach(( arg )=>{
             if( ppIs.isString(arg) ){
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
         if( ppIs.isObject(data) ){
           result = Object.assign({},{...data});
           args.forEach(( arg )=>{
             if( ppIs.isString(arg) ){
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


  var prepareModel = function( initializeData ){
    this.main =  function( preOptions ){
      var defaults = null;
      if( ppIs.isObject(preOptions) ){
         if( preOptions.hasOwnProperty('defaults') ){
           if( ppIs.isObject(preOptions.defaults) ){
              defaults = Object.assign({},preOptions.defaults)
           }
         }
      }
      return ppModel.bind(this,defaults);
    }

    return this.main( initializeData || {} );
  }

  return prepareModel;

}));
