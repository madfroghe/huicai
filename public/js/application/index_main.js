define(function(require, exports, module) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
		
	mui.init({
//		preloadPages:[
//		    {
//		      url:'invest_home.html',
//		      id:'invest_home.html',
//		      styles:{
//		    	top:"38px",
//		    	bottom:"50px"
//		    }
//		    },
//		    {
//		      url:'more_main.html',
//		      id:'more_main.html',
//		      styles:{
//		    	top:"38px",
//		    	bottom:"50px"
//		    }
//		    },
//		  ]
	})
	var common = require('../major/common');
	var circle = require("../major/circleProgress");
	var convert = require("../major/convert");
	
	$(function(){
		
		
		
		
	})
	
	
	mui.plusReady(function(){
		
		common.onNetChange("index_main.html");
//		common.backApp();//检测app是否进入过休眠状态
//		common.LoadAnimation();//启动加载动画
			loadbanner();
			//分享plus事件处理
//			getBand();
			setTimeout(function(){
				plus.navigator.closeSplashscreen();//关闭启动图片
			},5000)
		//ajax 请求产品数据
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async: false,
		  	url:getUrlParam()+"/homePageData",
	    	success: function(msg){
	    		var data = msg.data;
	    		console.log(1233543)
	    		console.log(JSON.stringify(msg))
	    		for(var i =0 ; i <data.length;i++){
	    			var item = data[i];
	    			item.deadline = item.deadline.substr(0,1);
					var productName =item.productName.substr(0,3);
					console.log(productName)
	    			item.productStatus = convert.statusConvert(item.productStatus);
	    			var html = document.getElementById("productTemplate").innerHTML;
			        $("#productListPanel")[0].innerHTML +=common.formatTemplate(item,html);
//			        if(productName=="众星宝"){
//			        	$(".float").css("display","inline-block");
//			        }
	    		}
	    		
	    		
	    	},error:function(e){
	    		
	    		common.timeOut();//网络请求超时
	    	}
		});
//		//依次渲染圆形进度条
//		for(var i = 0 ; i < $(".chart").length;i++){
//			circle.circleProgress({
//		        id: $(".chart")[i].id, 
//		        scheduleColor: 'rgb(255, 102, 0)', // default: 'rgb(255, 102, 0)'
//		        bgColor: 'rgb(219, 219, 219)', // default: 'rgb(230, 230, 230)'
//		        textColor: 'rgb(122, 122, 122)', // default: 'black'
//		      	fullColor:'#FFF',
//			});
//		}
		
		//点击跳转
		mui("#productListPanel").on("tap",".productMain",function(e){
			var  title = $(".title",$(this)).html();
			var  id = this.getAttribute("pid");
			common.openDetail(id);
		})
		
		//跳转到列表页
		mui('.recommendForYou').on('tap',".more",function(){
			var detailPage = null;
			plus.webview.getWebviewById("invest_home.html").show();
			plus.webview.currentWebview().hide();
			if(!detailPage){
			    detailPage = plus.webview.getLaunchWebview();
			 }
			mui.fire(detailPage,"tabChange",{id:"invest_home.html"});
//			mui.openWindow({
//				id:"a_invest_main.html",
//				url:"../../../page/web/user/a_invest_main.html"
//				
//			});
		})
		
		
		
		//首页返回键处理
			 //处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {
				var homeView = plus.webview.getWebviewById("index_main.html");
				var curretnView = plus.webview.currentWebview();
				if(homeView==curretnView){
					//首次按键，提示‘再按一次退出应用’
//					first=first+1;//判断是否首次打开提示框
//					if(first==1){
//						common.extNotice();
//						mui("#sure_Btn")[0].addEventListener("tap",function(){
//							plus.runtime.quit();
//							mui('body')[0].removeChild(mui('#ext_Cover')[0]);
//							first=0;
//						});
//						mui("#cancel_Btn")[0].addEventListener("tap",function(){
////							mui("#ext_Cover")[0].style.display="none";
//							mui('body')[0].removeChild(mui('#ext_Cover')[0]);
//							first=0;
//						})
//					}
//					
					
					//首次按键，提示‘再按一次退出应用’
					if (!first) {
						first = new Date().getTime();
						mui.toast('再按一次退出应用');
						setTimeout(function() {
							first = null;
						}, 2000);
					} else {
						if (new Date().getTime() - first < 2000) {
							plus.runtime.quit();
						}
					}
					

				}else{
					homeView.show();
					plus.webview.currentWebview().hide();
				}
			}
			
			//品牌宣传位跳转
			mui(".menuLeader").on('tap','.trande',function(){
				
				var href = this.getAttribute('href');
				mui.openWindow({
					id: href,
					url: href,
					styles: {
					top: '0px',
					bottom: '0px'
				}
				})
				
			})
		
		
	})
	

	/*广告位banner*/
	function loadbanner(){
			mui.ajax({
			type: "GET",
		    dataType: "json",
		    url:getUrlParam()+"/banner",
		    data:{  
		    	type:1
		    }, 
		    success: function(data){
		    	var imgArr = data.data.imgInfo;
		    	console.log(12132121)
		    	console.log(JSON.stringify(imgArr));
		    	var arr = [];
				var html =''
				var imgsrc1 =imgArr[imgArr.length-1].imagePath;
				html += '<div class="mui-slider-item mui-slider-item-duplicate">';
				html += '<a href="#" ><img src="'+imgsrc1+'"></a>';
				html += '</div>';	
				imgBox.innerHTML+= html;
				mui.each(imgArr,function(i,item){
					var data ={};
					data.imgSrc = item.imagePath;
					data.activitieUrl = item.activitieUrl;
					//console.log(item.activitieUrl);
					var html = document.getElementById("detailPicTemplete").innerHTML;
					arr.push(common.formatTemplate(data,html)); 
					if(i==0){
						mui("#imgbtn")[0].innerHTML+='<div class="mui-indicator mui-active"></div>'
					}else{
						mui("#imgbtn")[0].innerHTML+='<div class="mui-indicator"></div>'
					}
				});
				imgBox.innerHTML+=arr.join('');
				var html2 ='';
				var imgsrc2 =imgArr[0].imagePath;
				html2 += '<div class="mui-slider-item mui-slider-item-duplicate">';
				html2 += '<a href="#"><img src="'+imgsrc2+'"></a>';
				html2 += '</div>';	
				imgBox.innerHTML+= html2;
				//图片轮播
				var gallery = mui('.mui-slider');
					gallery.slider({
					interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
				mui('.mui-slider-item').on('tap','.bannerDetail',function(){
					//点击banner图片的后续操作
					//TODO
					var href = this.getAttribute('hrefs');
					if(href!=''){
						mui.openWindow({
							url:"webviepage.html",
							id:"webviepage.html",
							extras:{
								tag:href
							}
						})
					}
					
				})
			},error:function(){
				common.timeOut();//网络请求超时
			}
		});
	}
	
	//获取品牌宣传数据
//	function getBand(){
//			mui.ajax({
//			type: "GET",
//		    dataType: "json",
//		    url:getUrlParam()+"/banner",
//		    data:{  
//		    	type:3
//		    }, 
//		    success: function(data){
//		    	console.log(123);
//		    	console.log(JSON.stringify(data));
//		    	if(data.status==1){
//		    		var imgInfo = data.data.imgInfo;
//		    		for(var i=0;i<imgInfo.length;i++){
//		    			var item =imgInfo[i];
//		    			var num = imgInfo[i].type;
//		    			switch(num){
//		    				case 0:
//		    				plus.storage.setItem("mig51",imgInfo[i].imagePath);
//		    				break;
//		    				case 1:
//		    				plus.storage.setItem("safeImg",imgInfo[i].imagePath);
//		    				break;
//		    				case 2:
//		    				plus.storage.setItem("newImg",imgInfo[i].imagePath);
//		    				break;
//		    			}
//		    		}
//		    		
//		    	}
//			},error:function(){
//				common.timeOut();//网络请求超时
//			}
//		});
//	}


	
});