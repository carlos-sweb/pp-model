var ppModel = function(preOptions){	

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
				return Object.assign({...this.data},{})[key]
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

		 	   			this.emit("change:"+args[0],this.data[args[0]],args[1],()=>{

		 	   				this.data[args[0]] = args[1];
		 	   				
		 	   			});			 	   				 	   		

			 	   } 	
			 	}


			 }
			 

		}
		// -------------------------------------------------------------------
		this.has = function( key ){

			return this.data.hasOwnProperty(key);

		}
		// -------------------------------------------------------------------
		this.getAll = function(){

			return Object.assign({...this.data},{});

		}
		// -------------------------------------------------------------------
		this.keys = function(){
			return Object.keys( this.data );
		}
		// -------------------------------------------------------------------
		this.values = function(){

			return Object.values( this.data );

		}
		// -------------------------------------------------------------------
		this.isBoolean = function( key ){
			if( this.data.hasOwnProperty(key) ){
				return typeof this.data[key] == 'boolean';
			}

			return false;
		}
		// -------------------------------------------------------------------
		this.isString = function( key ){

			if( this.data.hasOwnProperty(key) ){

				return typeof this.data[key] == 'string';

			}

			return false;

		}
		// -------------------------------------------------------------------
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
	         result = {...this.data};
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