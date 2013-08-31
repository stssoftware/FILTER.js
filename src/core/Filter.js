/**
*
* Filter SuperClass
* @package FILTER.js
*
**/
(function(FILTER){

    // typed arrays substitute 
    FILTER.Array32F = (typeof Float32Array !== "undefined") ? Float32Array : Array,
    FILTER.Array64F = (typeof Float64Array !== "undefined") ? Float64Array : Array,
    FILTER.Array8I = (typeof Int8Array !== "undefined") ? Int8Array : Array,
    FILTER.Array16I = (typeof Int16Array !== "undefined") ? Int16Array : Array,
    FILTER.Array32I = (typeof Int32Array !== "undefined") ? Int32Array : Array,
    FILTER.Array8U = (typeof Uint8Array !== "undefined") ? Uint8Array : Array,
    FILTER.Array16U = (typeof Uint16Array !== "undefined") ? Uint16Array : Array,
    FILTER.Array32U = (typeof Uint32Array !== "undefined") ? Uint32Array : Array
    ;
    
    // Constants
    FILTER.CONSTANTS={
        SQRT2: Math.SQRT2,
        toRad : Math.PI/180, 
        toDeg : 180/Math.PI
    };
    
    //
    //
    // Abstract Filter
    FILTER.Filter=function() { };
    FILTER.Filter.prototype={
        apply : function(image) { /* do nothing here, override */ }
    };
    
    //
    //
    // Composite Filter Stack
    FILTER.CompositeFilter=function(filters) 
    { 
        this._stack=(typeof filters!='undefined' && filters.length) ? filters : [];
    };
    
    FILTER.CompositeFilter.prototype={
        _stack : [],
        
        apply : function(image) {
            
            if (!this._stack.length) return;
            
            var _filterstack=this._stack, _stacklength=_filterstack.length, fi=0, filter;
                
            while (fi<_stacklength)
            {
                filter=_filterstack[fi++]; 
                if (filter) filter.apply(image);
            }
        },
        
        filters : function(f) {
            if (f) this._stack=f;
            return this;
        },
        
        push : function(filter) {
            this._stack.push(filter);
            return this;
        },
        
        pop : function() {
            return this._stack.pop();
        },
        
        remove : function(filter) {
            var i=this._stack.length;
            while (--i>=0) { if (filter===this._stack[i]) this._stack.splice(i,1); }
            return this;
        }
    };
    
    var _canvas=null, _ctx=null;
    
    // static methods
    FILTER.static={
        createImageData : function(w, h) {
            if (!_canvas)
            {
                _canvas=document.createElement('canvas');
                _ctx=_canvas.getContext('2d');
            }
            return _ctx.createImageData(w, h);
        }
    };
    
})(FILTER);