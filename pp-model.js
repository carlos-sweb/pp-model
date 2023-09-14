/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.2.6 (2023/10/14 01:17 AM)
 * Released under the MIT License
 */
(function(global , factory ){
  var root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global;
  if (typeof define === 'function' && define.amd) {
    define(['ppEvents','ppIs','ppValidate'], function( ppEvents, ppIs , ppValidate ) {
      root.ppModel = factory( ppEvents , ppIs , ppValidate);
    });
  } else if (typeof exports !== 'undefined') {
    var ppEvents = {},
    ppIs = {},
    ppValidate = {};
    try { ppEvents = require('pp-events'); } catch (e) {}
    try { ppIs = require('pp-is'); } catch (e) {}
    try { ppValidate = require('pp-validate'); } catch (e) {}
    module.exports = factory(ppEvents , ppIs , ppValidate );
  } else {
    root.ppModel = factory( root.ppEvents , root.ppIs , root.ppValidate );
  }

})( this,(function(  ppEvents , ppIs , ppValidate ) {
  

  
  var ppModel = function( defaults, __model ){

    // DECLARE Events from ppEvents if be include
    this.Events = ppIs.isUndefined( ppEvents ) ? null :  new ppEvents()
    this.on = ppIs.isNull(this.Events) ? function(){/*Include messague*/} : this.Events.on;
    this.emit = ppIs.isNull(this.Events) ? function(){/*Include messague*/} :  this.Events.emit;
    // Data main container
    var data = {};

    if( ppIs.isObject(defaults) ){ Object.assign(data,{...defaults}) }
    if( ppIs.isObject(__model) ){ Object.assign(data,{...__model}) }

    // ===========================================================================
    // ============== EXTEND ALL FUNCTION FROM ppis
    var ppIsKey =  Object.keys(ppIs);
    // ---------------------------------------------------------------------------    
    for( var i = 0; i < ppIsKey.length; i++  ){

          var key   = ppIsKey[i];
      
          this[ key ] = function( func , _key ,_done ){                          

              return data.hasOwnProperty(_key) ? func( data[ _key ] , _done ) : func( undefined , _done );

          }.bind( this , ppIs[ key ] )
      
    }


    /*
    *@var get
    *@type Function
    *@description - get value from key of data main container
    *@return String
    */
    this.get = function( key ){
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
  this.set = function( key ,value ){
      if( this.has(key) ){
          if( !ppIs.isNull(this.Events) ){
            if( this.Events.checkOn('change:'+key) || this.Events.checkOn('changed:'+key)  ){
              // new code for check and review
              if( this.Events.checkOn('change:'+key)  ){
                this.emit( 'change:' + key , value , data[key] , function(){
                    data[key] = value;
                    if( this.Events.checkOn('changed:'+key) ){
                      this.emit('changed:'+ key , value );
                    }
                }.bind(this));
              }else{
                  data[key] = value;
                  if( this.Events.checkOn('changed:'+key) ){
                    this.emit('changed:'+ key , value );
                  }
              }
              // new code for check and review
            }else{data[key] = value;this.emit('changed:'+ key , value );}
          }else{data[key] = value;}
      }
  }



  this.stringify = function( replacer , space ){return JSON.stringify(data, replacer , space)}
// link Object.keys
  this.keys = function(){return Object.keys( {...data} )}
  /*
  *@var has
  *@type Function
  *@description - check if exists property from data main
  *@return Boolean
  */
  this.has = function(key){return ppIs.isString(key) ? data.hasOwnProperty(key) : false ;}
  // link Object.values
  this.values = function(){return Object.values( {...data} )}
  /*
  *@var getAll
  *@type Function
  *@description - return clone from data main
  *@return Object
  */
  this.getAll = function(){
    return Object.assign({},{...data})
  }

  
  // ===========================================================================
  this.pick = function(){
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
  
  this.omit = function(){
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

  this.validate = function( rules  ){

       if( ppIs.isFunction( ppValidate ) ){
          return ppValidate( this.getAll() , rules  );
       }else{
         // When ppValidate no include
         return null;
       }
  }



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
