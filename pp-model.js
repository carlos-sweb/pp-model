/*!!
 * Power Panel Model <https://github.com/carlos-sweb/pp-model>
 * @author Carlos Illesca <c4rl0sill3sc4@gmail.com>
 * @version 1.0.0 (2020/01/01 03:18 PM)
 * Released under the MIT License
 */
(function(global , factory ){
  	
  	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  	
  	typeof define === 'function' && define.amd ? define('ppModel', factory) :
	
	(global = global || self, (function () {
        
    var exports = global.ppModel = factory();    

	}()

));

})( this,(function() {

return function(preOptions){

	var preOptions = preOptions || {};

	return function( options ){	
		
		/**
		 *@property {object} events - Container of events
		 */
		this.events = {};
		/**
		*on
		*@param {string} eventName - name event 
		*@param {function} callbacks - Function for execute when emit event name
		*@returns {void} 
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
	    /**
	    *emit
		*@param {string} eventName - name for events call
		*@returns {void}	    
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
	    /**
	    *@property {object} data - container for all data	    
	    */
		this.data = {};
		// -------------------------------------------------------------------
		Object.assign( this.data , preOptions.defaults || { } );
		// -------------------------------------------------------------------
		Object.assign( this.data , options  || { });
		// -------------------------------------------------------------------
		/**
		*get
		*@param {string} key - name key for find
		*@returns {(string|number|boolean)}
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
		/**
		*has
		*@param {string} key - key for check if exists
		*@description - funcion que verifica la existencia de una llave en la data
		*/
		this.has = function( key ){
			return this.data.hasOwnProperty(key);
		}		
		/**
		*getAll		
		*@description - funcion que retorna una copia de la data completa
		*@returns {object} - return copy from data
		*/
		this.getAll = function(){
			return Object.assign({...this.data},{});
		}		
		/**
		*@var keys
		*@type {Function}
		*@description - function que retorna un array con todas las llaves
		*/
		this.keys = function(){
			return Object.keys( this.data );
		}		
		/**
		*@values
		*@description - function que retorna un array con todos los valores
		*@returns {array} - return array from values of data
		*/
		this.values = function(){

			return Object.values( this.data );

		}		
		/**
		*@var
		*@type {Function}
		*@description - verifica si es boolean la llave consultada
		* Check https://github.com/jimbrittain/isBoolean/blob/master/isBoolean.js
		*/
		this.isBoolean = function( key ){
			if( this.data.hasOwnProperty(key) ){
				return typeof this.data[key] == 'boolean';
			}

			return false;
		}		
		/**
		*isString
		*@param {string} key - key for compare
		*@description - function that check in data for key if value is string
		*/
		this.isString = function( key ){

			if( this.data.hasOwnProperty(key) ){

				return typeof this.data[key] == 'string';

			}

			return false;

		}		
		/**
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
		/**
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
	    /**
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
	    /**
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
}));