/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca
 * @version 1.0.0 (2020/01/01 03:18 PM)
 * Released under the MIT License
 */
 (function(factory){
  
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global;
  
  if (typeof define === 'function' && define.amd) {  	
    define(['exports'], function(exports) {
      
      root.ppModel = factory(root, exports);
      module.exports = root.ppModel;
    });
  
  } else if (typeof exports !== 'undefined') {  
    factory(root, exports);
  // Finally, as a browser global.
  } else {
    root.ppModel = factory(root, {});
  }
})(function(root, ppModel) {

return function(preOptions){	

	return function( options ){
		// -------------------------------------------------------------------
		/*
		*@var events
		*@type {Object}
		*@description - Contenedor de las llaves y su funcion para ser
		*ejecutadas en el momento de ser llamadas
		*/
		this.events = {};
		// -------------------------------------------------------------------
		/**
		*@var on
		*@type {Function}
		*@description - Función que se encarga de almacenar en el objeto 
		* events las llaves y la funcion de llamada
		*/
		this.on = function( eventName , callbacks ){
	        if( typeof eventName == "string" ){
	          if( typeof callbacks == "function" ){            
	            if( !this.events.hasOwnProperty(eventName) ){
	              this.events[ eventName ] = [];
	            }            
	            this.events[ eventName ].push( callbacks );
	          }
	        }        
	    }
	    // -------------------------------------------------------------------
	    /*
	    *@var emit
	    *@type {Function}
	    *@description - Función para ejecutar la funcion relacionada a la llave
	    * que se esta emitiendo
	    */
		this.emit = function( eventName ){        
	        var i, listeners, length, args = [].slice.call(arguments, 1);
	        if (typeof this.events[eventName] === 'object') {
	          listeners = this.events[eventName].slice();         
	          length = listeners.length;
	          for (i = 0; i < length; i++) {
	              listeners[i].apply(this, args);
	          }
	        }
	    }
	    // -------------------------------------------------------------------
	    /*
	    *@var data
	    *@type {Object}
	    *@description - Este es el contenedor de la data a guardar 
	    * para usar el modelo
	    */
		this.data = {};
		// -------------------------------------------------------------------
		Object.assign( this.data , preOptions.defaults || {} );
		// -------------------------------------------------------------------
		Object.assign( this.data , options  || {});
		// -------------------------------------------------------------------
		/**
		*@var get
		*@type {Function}
		*@description - funcion que obtiene el valor de data segun la llave que 
		* se consulta
		*/
		this.get = function( key ){
			
			if( this.data.hasOwnProperty(key) ){
				return Object.assign({...this.data},{})[key];
			}else{
				if( typeof key == "undefined" ){
					return Object.assign({...this.data},{});
				}else{
					return null;
				}
			}
		}
		// -------------------------------------------------------------------
		/**
		*@var set
		*@type {Function}
		*/
		this.set = function(){

			 var args = [].slice.call(arguments);
			 var data = {};

			 if( args.length == 1 ){

			 	if( typeof args[0] == "object" && typeof args[0].forEach != 'function' ){ 
			 		Object.assign(this.data,args[0]);	
			 	}


			 }else if( args.length == 2 ){

			 	if( typeof args[0] == "string" ){

			 	   if( this.data.hasOwnProperty( args[0] ) ){

			 	   		if( this.events.hasOwnProperty("change:"+args[0]) ){
			 	   			if( this.events["change:"+args[0]].length > 0 ){
			 	   				this.emit("change:"+args[0],this.data[args[0]],args[1],()=>{

		 	   						this.data[args[0]] = args[1];

		 	   					});
			 	   			}			 	   			
			 	   		}else{
								this.data[args[0]] = args[1];				 	   			
			 	   		}

			 	   } 	
			 	}


			 }
			 

		}
		// -------------------------------------------------------------------
		/*
		*@var has
		*@type {Function}
		*@description - funcion que verifica la existencia de una llave en la data
		*/
		this.has = function( key ){

			return this.data.hasOwnProperty(key);

		}
		// -------------------------------------------------------------------
		/*
		*@var getAll
		*@type {Function}
		*@description - funcion que retorna una copia de la data completa
		*/
		this.getAll = function(){

			return Object.assign({...this.data},{});

		}
		// -------------------------------------------------------------------
		/*
		*@var keys
		*@type {Function}
		*@description - function que retorna un array con todas las llaves
		*/
		this.keys = function(){
			return Object.keys( this.data );
		}
		// -------------------------------------------------------------------
		/*
		*@var values
		*@type {Function}
		*@description - function que retorna un array con todos los valores
		*/
		this.values = function(){

			return Object.values( this.data );

		}
		// -------------------------------------------------------------------
		/*
		*@var
		*@type {Function}
		*@description - verifica si es boolean la llave consultada
		*/
		this.isBoolean = function( key ){
			if( this.data.hasOwnProperty(key) ){
				return typeof this.data[key] == 'boolean';
			}

			return false;
		}
		// -------------------------------------------------------------------
		/*
		*@var isString
		*@type {Function}
		*@description - funcion que verifica se la llave consultada es una cadena
		*/
		this.isString = function( key ){

			if( this.data.hasOwnProperty(key) ){

				return typeof this.data[key] == 'string';

			}

			return false;

		}
		// -------------------------------------------------------------------
		/*
		*@var isEmpty
		*@type {Function}
		*@description - funcion que verifica si la llave consultada esta vacia
		*/
		this.isEmpty = function( key ){

			var value = this.data[key] || "";	

			if( value == null ){
				return !0;
			}

			if( typeof value == 'string' ){
				return value.length == 0 ? !0:!1; 
			}

			if( typeof value == 'object' || typeof value == 'array' ){
				if( typeof value.length == 'undefined' ){
					return Object.values(value).length == 0 ? !0:!1; 
				}else{
					return value.length == 0 ? !0:!1; 
				}
			}

		}
		// -------------------------------------------------------------------
		/*
		*@var pick
		*@type {Function}
		*@description - funcion que retorna solmanete las llaves solicitadas
		*/
		this.pick = function(){
	      var args = [].slice.call(arguments);
	      var result = {};
	      if( args.length > 0 ){         
	       if( typeof this.data == 'object' ){
	         args.forEach(( arg )=>{
	           if( typeof arg == 'string' ){             
	              if( this.data.hasOwnProperty(arg) ){
	                  result[arg] = this.data[arg];
	              };  
	           };
	         });
	       }      
	       return Object.assign({...result},{});
	      }else{
	        return result;
	      };
	    }
	    // -------------------------------------------------------------------
	    /*
	    *@var omit
	    *@type Function
	    *@description - Function que omite keys dadas para un objeto
	    */
	    this.omit = function(){
	      var args = [].slice.call(arguments);     
	      var result = {};      
	      if( args.length > 0 ){      
	       if( typeof this.data == 'object' ){
	         //result = {...this.data};
	         args.forEach(( arg )=>{
	           if( typeof arg == 'string' ){            	
	              if( this.data.hasOwnProperty(arg) ){
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
	    // -------------------------------------------------------------------
	    /*
	    *@var stringify
	    *@type {Function}
	    *@description - esta funcion retorna el json en formato de texto
	    */
	    this.stringify = function( opt1 , opt2 ){
	    	return JSON.stringify(this.data,opt1,opt2);
	    }
	    // -------------------------------------------------------------------
		
	}

}
//-----------------------------------------------------------------------------
});