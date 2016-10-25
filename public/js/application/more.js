define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		if(plus.os.name=="Android"){
   			mui('#update')[0].style.display="block";
   		}
		setTimeout(function(){
			preloadPages:[
		    {
		      url:'index_main.html',
		      id:'index_main.html',
		      styles:{
		    	top:"39px",
		    	bottom:"50px"
		    }
		    }
		    
		  ]
		},1000)
		common.onNetChange("more_main.html");//检测网络信号
		var version = plus.runtime.version; // 版本检测
		//检测版本更新
		mui('#update')[0].addEventListener('tap',function(){
			common.upDate(version);
		})
		mui('#checks')[0].innerHTML =version;
		
		
//	})
		
	})
	
	

	//列表点击调到相应页面
	$('.my-list-li').on('tap',function(){
		var href = this.getAttribute('hrefs');
		mui.openWindow({
			id: href,
			url: href,
			styles: {
			top: '0px',
			bottom: '0px'
		}
		})
	})
	//打开账户管理
	mui("#acountInfo")[0].addEventListener("tap",function(){
		var loginFlag = plus.storage.getItem("password");//判断用户是否登录标志
		if(loginFlag==null){
			mui.toast("请登录后操作！");
			mui.openWindow({
					id: "login.html",
					url: "login.html",
					styles: {
					top: '0',
					bottom: '0'
					
					},
					extras:{
						pageId:"more_main.html"
					}
				})
			
		}else{
			var detailPage = null;
			mui.openWindow({
				id: "acuntmanager.html",
				url: "acuntmanager.html",
				styles: {
				top: '0',
				bottom: '0'
			},
			 show:{
		      autoShow:true//页面loaded事件发生后自动显示，默认为true
		    },
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		       options:{
			       background:"rgba(0,0,0,0.8)"//等待框背景色
			      
			      }
		     } 
			})
//			var detailPage = null;
//			if(!detailPage){
//				    detailPage = plus.webview.getLaunchWebview();
//				 }
//				mui.fire(detailPage,"tabChange",{id:"myacount.html"});
//				setTimeout(function(){
//					plus.webview.currentWebview().hide();
//				},1000)
		}
		
	})
	//点击登录
//	mui('#enterw')[0].addEventListener('tap',function(){
//		mui.openWindow({
//				id: "login.html",
//				url: "login.html",
//				styles: {
//				top: '0',
//				bottom: '0'
//				
//			},
//			extras:{pageId:"more_main.html"}
//			})
//		
//	})
	
//	var first = null;
//			mui.back = function() {
//				var homeView = plus.webview.getWebviewById("more_main.html");
//				var curretnView = plus.webview.currentWebview();
//				$("#ext_Cover").css("display","block");
//				mui("#sure_Btn")[0].addEventListener("tap",function(){
//					plus.runtime.quit();
//				});
//				mui("#cancel_Btn")[0].addEventListener("tap",function(){
//					$("#ext_Cover").css("display","none");
//				
//				})
//				
//
//			}	
			var first = null;
			mui.back = function() {
				var homeView = plus.webview.getWebviewById("more_main.html");
				var curretnView = plus.webview.currentWebview();
				if(homeView==curretnView){
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

	
})
