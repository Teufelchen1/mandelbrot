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

function mandelbrot(ctx, id)
{
	for (var x = -3; x < 0.8; x = x+0.005) {
		for (var y = -1; y < 1; y = y+0.005) {
			a = new complex(x,y);
			if (iter(a)) plot(ctx,id,x,y);
		}
	}
}



