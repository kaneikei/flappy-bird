window.onload=function()
{
	var bird={x:140,y:264,w:40,h:40};
	var guandao=[  {top:{x:300,y:0,w:80,h:200},
					bottom:{x:300,y:480,w:80,h:88}},
					{top:{x:520,y:0,w:80,h:170},
					bottom:{x:520,y:480,w:80,h:118}}
				]
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");

	ctx.fillRect(bird.x,bird.y,bird.w,bird.h);

	var a=1;

	var draw=function()
	{	
		ctx.clearRect(0,0,320,568);
		
		//画小鸟
		a+=0.04;
		bird.y+=a*a;;
		ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
		
		//画管道
		
		var vs;
		for(var i=0;i<guandao.length;i++)
		{
			var zhuzi=guandao[i];
			zhuzi.top.x-=3;
			zhuzi.bottom.x-=3;
			ctx.fillRect(zhuzi.top.x,zhuzi.top.y,zhuzi.top.w,zhuzi.top.h);
			ctx.fillRect(zhuzi.bottom.x,zhuzi.bottom.y,zhuzi.bottom.w,zhuzi.bottom.h);

			if(recvsrec(bird,zhuzi.top) || recvsrec(bird,zhuzi.bottom) )
			{
				vs=true;
			}

			if(zhuzi.top.x<=-zhuzi.top.w)
			{
				zhuzi.top.x=320;
				zhuzi.bottom.x=320;

				zhuzi.top.h=Math.random()*250+50;
				zhuzi.bottom.y=zhuzi.top.h+280;
				zhuzi.bottom.h=568-zhuzi.top.h-280;
			}
			
		}

		if(vs)
		{
			return
		}
		

		//边界判断
		if(bird.y>=528)
		{
			ctx.fillRect(140,528,bird.w,bird.h)
		}
		else if(bird.y<=0)
		{
			ctx.fillRect(140,0,bird.w,bird.h)
		}
		else
		{
			window.requestAnimationFrame(draw);
		}
		
	}
	requestAnimationFrame(draw);

	canvas.onclick=function()
	{	
		a=1;
		bird.y-=40;
	}

	// 检测矩形之间的碰撞
	//{x,y,w,h}  {w,y,w,h}
	var recvsrec =  function(rect0,rect1){
	  if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
	    return false;
	  } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
	    return false;
	  } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
	    return false;
	  } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
	    return false;
	  }
	  return true;
	};

	
	  var upspeed  = 30;

	canvas.addEventListener('click',function(e){
	    bird.y -= upspeed;
	  },false);
	  canvas.addEventListener('touchend',function(e){
	    bird.y -= upspeed;
	  },false);
	
}