(function(win, doc){

	function DOM(node){
		this.element = doc.querySelectorAll(node);
	}

	DOM.prototype.on = function on(eve, action){
		Array.prototype.forEach.call(this.element, function(nodeActual){
			nodeActual.addEventListener(eve, action, false);
		})
	}
	DOM.prototype.off = function off(eve, action){
		Array.prototype.forEach.call(this.element, function(nodeActual){
			nodeActual.removeEventListener(eve, action, false);
		})
	}
	DOM.prototype.get = function get(){
		return Array.prototype.map.call(this.element, function(nodeActual){
			return nodeActual;
		})
	} 
	DOM.prototype.forEach = function forEach(){
		return Array.prototype.forEach.apply(this.element, arguments);
	}
	DOM.prototype.map = function map(){
		return Array.prototype.map.apply(this.element, arguments);
	}
	DOM.prototype.reduce = function reduce(){
		return Array.prototype.reduce.apply(this.element, arguments);
	}
	DOM.prototype.reduceRight = function reduceRight(){
		return Array.prototype.reduceRight.apply(this.element, arguments);
	}
	DOM.prototype.every = function every(){
		return Array.prototype.every.apply(this.element, arguments);
	}
	DOM.prototype.some = function some(){
		return Array.prototype.some.apply(this.element, arguments);
	}
	DOM.prototype.isArray = function isArray(tst){
		return Object.prototype.toString.call(tst) === "[object Array]";
	}
	DOM.prototype.isObject = function isObject(tst){
		return Object.prototype.toString.call(tst) === "[object Object]";
	}
	DOM.prototype.isFunction = function isFunction(tst){
		return Object.prototype.toString.call(tst) === "[object Function]";
	}
	DOM.prototype.isNumber = function isNumber(tst){
		return typeof tst === "number";
	}
	DOM.prototype.isString = function isString(tst){
		return typeof tst === "string";
	}
	DOM.prototype.isBoolean = function isBoolean(tst){
		return typeof tst === "boolean";
	}
	DOM.prototype.isNull = function isNull(tst){
		return tst === null || tst === undefined;
	}

	win.DOM = DOM;

})(window, document);