/*function complex(real,ima)
{
	this.re = real;
	this.im = ima;
	this.add = function(z){
		return new complex(this.re + z.re,this.im + z.im);
	}
	this.mul = function(z){
		return new complex(this.re*z.re - this.im*z.im,this.re*z.im + this.im*z.re);
	}
	this.pow = function(i){
		var k = new complex(this.re,this.im);
		var p = new complex(this.re,this.im);
		for (; i > 1; i--) {
			p = p.mul(k);
		}
		return p;
	}
	this.len = function(){
		return Math.sqrt(this.re*this.re + this.im*this.im);
	}
}*/

//(function(root) {
	function Complex(a,b){
		this.re = a;
		this.im = b;
	}
	Complex.prototype = {
		'add': function(z) {
			return new Complex(this.re + z.re, this.im + z.im);
		},
		'mul' : function(z) {
			return new Complex(this.re*z.re - this.im*z.im,this.re*z.im + this.im*z.re);
		},
		'pow' : function(i){
			var k = new Complex(this.re,this.im);
			var p = new Complex(this.re,this.im);
			for (; i > 1; i--) {
				p = p.mul(k);
			}
			return p;
		},
		'len' : function(){
			return Math.sqrt(this.re*this.re + this.im*this.im);
		}
	}
//})(this);



function iter(c)
{
	z = new Complex(0,0);
	for (var i = 0; i < 20; i++) {
		z = c.add(z.pow(2));
		z = c.add(z.pow(2));
		if ((z.re*z.re + z.im*z.im) > 4) return false;
	}
	return true;
}


function mandelbrot(ctx, id, xmin, xmax, ymin, ymax)
{
	var lenx = (Math.sqrt(xmin*xmin)+Math.sqrt(xmax*xmax))/500;
	var leny = (Math.sqrt(ymin*ymin)+Math.sqrt(ymax*ymax))/500;
	var bxmin = Math.sqrt(xmin*xmin);
	var bymin = Math.sqrt(ymin*ymin);
	var xfacktor = 0;
	var yfacktor = 0;
	if (xmin < 0) xfacktor = bxmin;
	if (ymin < 0) yfacktor = bymin;
	var px = 0;
	var py = 0;
	console.log(lenx);
	for (var x = xmin; x < xmax; x += lenx) {
		px = (x+xfacktor)/lenx;
		for (var y = 0; y < ymax; y += leny) {
			a = new Complex(x,y);
			if (iter(a)){
				py = (y+yfacktor)/leny;
				ctx.putImageData(id,px,py);
				ctx.putImageData(id,px,500-py);
				console.log(500-py);
			}
		}
	}
}



