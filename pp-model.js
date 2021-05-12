/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.0.7 (2020/02/28 09:40 AM)
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

  var toString = Object.prototype.toString;
  var Events = toString.call(ppEvents)  ===  '[object Undefined]' ? null :  new ppEvents();
  var ppModel = function(){
    this.data = {
      hello:"HI!!!"
    };
  }
  var proto = ppModel.prototype;
  proto.on = toString.call(Events) === '[object Null]' ? function(){/*Include messague*/} : Events.on;
  proto.emit = toString.call(Events) === '[object Null]' ? function(){/*Include messague*/} :  Events.emit;
  proto.removeListener = toString.call(Events) === '[object Null]' ? function(){/*Include messague*/} :  Events.removeListener;
  proto.get = function( key ){
    if( toString.call(key) === '[object String]' ){
      if( this.data.hasOwnProperty(key) ){
         return this.data[key];
      }
    }
  }
  proto.set = function( key ,value ){
    if( toString.call(key) === '[object String]' ){
      if( this.data.hasOwnProperty(key) ){
          // Aqui deberiamos emitir alguna señal
          this.emit( 'change:' + key , this.data[key] , value );
          this.data[key] = value;
      }
    }
  }

  proto.stringify = function( replacer , space ){
    return JSON.stringify(this.data, replacer , space)
  }

  proto.keys = function(){
    return Object.keys( this.data )
  }

  proto.values = function(){
    return Object.values( this.data )
  }

  var prepareModel = function( options ){
    return this.main( options || {} );
  }

  prepareModel.prototype.main = function(){
    return ppModel;
  }

  return prepareModel;

}));
