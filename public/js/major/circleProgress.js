define(function(require,exports,module){
	exports.circleProgress = function(options){
	var canvas = document.getElementById(options.id);
	var bgColor = options.bgColor||"rgb(219,219,219)";//背景颜色 底部线条
	var scheduleColor = options.scheduleColor||"rgb(255,102,0)";//进度条颜色
	var fullColor = options.fullColor || "#fff";
	var textColor = options.textColor || "#e74c3c";
	var radius = canvas.parentNode.offsetHeight >canvas.parentNode.offsetWidth
				 ?canvas.parentNode.offsetWidth/2*0.8
				 :canvas.parentNode.offsetHeight/2*0.8;
	var cricle = {
		x: canvas.parentNode.offsetWidth/2,//x坐标
		y: canvas.parentNode.offsetHeight/2*0.8,//y坐标
		radius :radius //半径
	};
	//text 就是60%
    var num = canvas.innerHTML.trim().substring(0, canvas.innerHTML.trim().length-1);
	//加载速度 
	var i =  0;
	var t = setInterval(function(){
		if(i<num){
			
		i++;
//		alert(i)
		var text=i+"%";
		var process = i; 
		// 拿到绘图上下文,目前只支持"2d"
	    var context = canvas.getContext('2d');  
		// 将绘图区域清空,如果是第一次在这个画布上画图,画布上没有东西,这步就不需要了  
	    context.clearRect(0, 0, canvas.parentNode.offsetWidth, canvas.parentNode.offsetHeight);  
		// ***开始画一个灰色的圆  
	    context.beginPath();  
        // 坐标移动到圆心  
	    context.moveTo(cricle.x, cricle.y);  
        // 画圆,圆心是50,50,半径50,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
	    context.arc(cricle.x, cricle.y, cricle.radius, 0, Math.PI * 2, false);  
	    context.closePath();  
        // 填充颜色  
	    context.fillStyle = bgColor;   
	    context.fill();  
        // ***灰色的圆画完  
	      
	    // 画进度  
	    context.beginPath();  
        // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
	    context.moveTo(cricle.x, cricle.y);  
        // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
	    context.arc(cricle.x, cricle.y, cricle.radius, 0, Math.PI * 2 * process / 100, false);  
	    context.closePath(); 
	    context.fillStyle = scheduleColor;  
	    context.fill();  
	    
        // 画内部空白  
	    context.beginPath();  
	    context.moveTo(cricle.x, cricle.y);  
	    context.arc(cricle.x, cricle.y, cricle.radius-3, 0, Math.PI * 2, true);  
	    context.closePath();  
	    context.fillStyle = fullColor;  
	    context.fill();  
	      
		// 画一条线  
	    context.beginPath();  
	    
	    context.arc(cricle.x, cricle.y, cricle.radius-6, 0, Math.PI * 2, true);  
	    context.closePath();  
        // 与画实心圆的区别,fill是填充,stroke是画线  
	    context.strokeStyle = '#ddd';  
	    context.stroke();  
        //在中间写字  
	    context.font = "bold 16px Arial";  
	    context.fillStyle = textColor;  
	    context.textAlign = 'center';  
	    context.textBaseline = 'middle';  
	    context.moveTo(cricle.x, cricle.y);  
	    context.fillText(text, cricle.x, cricle.y);  
		}else{
			clearInterval(t);
		}
	},20);
	}
})