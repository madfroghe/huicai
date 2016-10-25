define(function(require, exports, module) {
	var common = require('../major/common');
	mui.back = function() {};
			mui.plusReady(function() {
				
//				if(mui.os.ios){
					plus.navigator.setFullscreen(true);
				loadbanner();
			});
			
	function loadbanner(){
		var urlad =getUrlParam()+'/rest/o2o/api/store/advert_store';
			mui.ajax({
			type: "GET",
		    dataType: "json",
		    url:getUrlParam()+"/banner",
		    data:{  
		    	type:0
		    }, 
		    success: function(data){
		    	console.log(JSON.stringify(data));
		    	var imgBox =mui('#imgBox')[0];
		    	var imgArr = data.data.imgInfo;
		    	var arr = [];
		    	for(var i=0;i<imgArr.length;i++){
		    		var item=imgArr[i];
		    		if(i==imgArr.length-1){
		    			html = '<div class="mui-slider-item">';
						html += '<a href="#" ><img src="'+item.imagePath+'"></a>';
						html +='<div class="animate">';
						html +='<button id="close" class="mui-btn mui-btn-warning mui-btn-outlined">立即体验</button>';			
						html +='</div>';
						html += '</div>';
							imgBox.innerHTML+= html;
		    		}else{
		    			html = '<div class="mui-slider-item">';
						html += '<a href="#" ><img src="'+item.imagePath+'"></a>';
						html += '</div>';
						imgBox.innerHTML+= html;
		    		}
		    	}
		    	
				mui.each(imgArr,function(i,item){
					if(i==0){
						mui("#imgbtn")[0].innerHTML+='<div class="mui-indicator mui-active"></div>'
					}else{
						mui("#imgbtn")[0].innerHTML+='<div class="mui-indicator"></div>'
					}
				});
				//图片轮播
				var gallery = mui('.mui-slider');
					gallery.slider({
					interval:0//自动轮播周期，若为0则不自动播放，默认为0；
				});
				//立即体验按钮点击事件
			mui("#close")[0].addEventListener('tap', function(event) {
//				alert(mui(".mui-slider-item").length)
				plus.storage.setItem("lauchFlag", "true");
				plus.navigator.setFullscreen(false);
				
//				mui.openWindow({
//					url: 'page/web/user/index_main.html',
//					id: 'index_main.html',
//					styles: {
//						top: '38px',
//						bottom: '50px'
//						
//					}
//				})
				plus.webview.currentWebview().hide();
			}, false);
			}
		});
	}


})