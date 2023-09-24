/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.2.7 (2023/11/24 00:44 AM)
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

  const hasOwnProperty$1 = Object.prototype.hasOwnProperty,
  hasOwn = (val, key) => hasOwnProperty$1.call(val, key)

  var ppModel = function( defaults, __model ){
    // =============================================================================================
    // DECLARE Events from ppEvents if be include
    this.Events = ppIs.isUndefined( ppEvents ) ? null :  new ppEvents()
    this.on = ppIs.isNull(this.Events) ? ()=>{/*Include messague*/} : this.Events.on;
    this.emit = ppIs.isNull(this.Events) ? ()=>{/*Include messague*/} :  this.Events.emit;
    // =============================================================================================
    /*
    *@name data
    *@type Object
    *@description data main contactiner 
    */
    var data = {};    
    // =============================================================================================
    if( ppIs.isObject(defaults) ){ Object.assign(data,{...defaults}) }
    // =============================================================================================
    if( ppIs.isObject(__model) ){ Object.assign(data,{...__model}) }    
    // ============== EXTEND ALL FUNCTION FROM ppIs ================================================    
    
    const ppIsKey =  Object.keys(ppIs);
    for( var i = 0; i < ppIsKey.length; i++ ){
          const key   = ppIsKey[i];
          // ppIs[ key ]  = _ppis // Es la referencia
          this[ key ] = function( _ppis , _key ,_done ){
            return hasOwn(data,_key) ? _ppis( data[ _key ] , _done ) : _ppis( undefined , _done );
          }.bind( this , ppIs[ key ] )
    }
    // =============================================================================================
    /*
    *@var get
    *@type Function
    *@description - get value from key of data main container
    *@return String
    */
    this.get = (key)=>this.has(key) ? data[key] : null
    /*
    *@var set
    *@type Function
    *@description - set value from key of data main conatiner
    *@return viod
  */
  // Se podria depurar aun mas esta funcion
  // Trabajando Aqui
  /**
   * @type {Function}
   * @param {String} key - name from data to set
   * @param {*} value - value to change
   * @description - Function set value from data main
   */
  this.set = (key,value)=>{
    const _kWord3 = `change:${key}`,
    _kWord2 = `changed`,
    _kWord1 = `${_kWord2}:${key}`,
    _check=(_kWord)=>this.Events.checkOn(_kWord),
    _emit=()=>{
      data[key] = value
      _check(_kWord1)&&this.emit(_kWord1,value)
      _check(_kWord2)&&this.emit(_kWord2,key,value)
    },
    _runSet=()=>{
      _check(_kWord3) ? this.emit(_kWord3,value,data[key], _emit ):_emit()
    }    
    this.has(key)&&_runSet();
  }
  /**
   * 
   * @param {*} replacer 
   * @param {*} space 
   * @returns {String}
   */
  this.stringify = (replacer,space)=>JSON.stringify(data, replacer , space)  
  /**
   * @type {Function}
   * @description - return keys from Object
   * @returns {Array}
   */
  this.keys = ()=>Object.keys( {...data} )
  /**
  * 
  * @param {String} key 
  * @type {Function}
  * @description - check if exists property from data main
  * @returns {Boolean}
  */
  this.has = (key)=>ppIs.isString(key) ? hasOwn(data,key):false
  //this.has = function(key){return  ;}
  // link Object.values
  this.values = ()=>Object.values({...data})
  /*
  *@var getAll
  *@type Function
  *@description - return clone from data main
  *@return Object
  */
  this.getAll = ()=>Object.assign({},{...data})
  // ===========================================================================
  const pick_omit = (way , ...args)=>Object.fromEntries(Object.entries(data).filter(([key])=>args.includes(key)===way))
  this.pick = (...args)=>pick_omit(true,...args)
  this.omit = (...args)=>pick_omit(false,...args)
  /**
   * 
   * @param {Object} rules 
   * @description Function extends validate 
   * @returns boolean
   */
  this.validate = (rules)=>ppIs.isFunction( ppValidate ) && ppIs.isObject(rules) ? ppValidate( this.getAll() , rules ) : null
  // ---------------------------------------------------------------------------------------------
  }
  // ---------------------------------------------------------------------------------------------
  var prepareModel = function( initializeData ){
    this.main =  function( preOptions ){
      var defaults = null;
      if( ppIs.isObject(preOptions) ){
         if( hasOwn(preOptions,'defaults')  ){
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
