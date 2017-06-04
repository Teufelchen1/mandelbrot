function complex(real,ima)
{
	this.re = real;
	this.im = ima;
	this.add = function(z)
	{
		return new complex(this.re + z.re,this.im + z.im);
	}
	this.mul = function(z)
	{
		return new complex(this.re*z.re - this.im*z.im,this.re*z.im + this.im*z.re);
	}
	this.pow = function(i)
	{
		var k = new complex(this.re,this.im);
		var p = new complex(this.re,this.im);
		for (; i > 1; i--) {
			p = p.mul(k);
		}
		return p;
	}
	this.len = function()
	{
		return Math.sqrt(this.re*this.re + this.im*this.im);
	}
}

function iter(c)
{
	z = new complex(0,0);
	for (var i = 0; i < 40; i++) {
		z = c.add(z.pow(2));
		if (z.len() > 2) return false;
	}
	return true;
}

/*
function plot(ctx,id,i,c)
{
	// i == -3 -> x=0
	// i == -1.1 -> x=250
	// i == 0.8 -> x=500
	// c == 1 -> y=0
	// c == -1 -> y=500
	i = ((i+1.8)/(0.6+1.8)*500);
	c = ((c+1)/(1+1)*500);
	ctx.putImageData(id,i,c);
}

function draw(ctx,id,x,y)
{
	// viewport x: -2 <-> 0.8
	// viewport y: -1 <-> 1
	// len x: 0.8 - -2 = 2.8 ==> 2.8/500px = 0.0056/px
	// len y: 1 - -1 = 2 ==> 2/500px = 0.004/px
	//var lenx = 0.0076;
	var leny = 0.004;
	//x = (x+2)/lenx;
	y = (y+1)/leny;
	ctx.putImageData(id,x,y);
}*/

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
		for (var y = ymin; y < ymax; y += leny) {
			a = new complex(x,y);
			py = (y+yfacktor)/leny;
			if (iter(a)) ctx.putImageData(id,px,py);
		}
	}
}



