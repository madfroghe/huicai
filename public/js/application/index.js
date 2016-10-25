define(function(require, exports, module) {
	window.addEventListener('tabChange',function(e){
		var titleElem = document.getElementById('title');
		var navalist = mui("#mynav")[0].getElementsByTagName("a");
		mui.each(navalist,function(i,item){
			item.style.color="#929292";
			item.getElementsByTagName("img")[0].style.display="none";
			item.getElementsByTagName("img")[1].style.display="block";
		})
		
//		var href = this.getAttribute('href');
		var id =e.detail.id;
		if(id=="index_main.html"||id=="index_main.html"){
			titleElem.innerHTML="87汇财";
			mui("#myShare")[0].style.display="none";
			mui('#'+id)[0].getElementsByTagName("img")[0].style.display="none";
			mui('#'+id)[0].getElementsByTagName("img")[1].style.display="block";
			mui('.invest')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.invest')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="none";
		}
		 else if(id=="invest_home.html"){
			
			titleElem.innerHTML="投资理财";
			mui("#myShare")[0].style.display="none";
//			this.style.color="#ff7f00";
			navalist[1].style.color="#ff7f00";
			mui(".invest")[0].getElementsByTagName("img")[0].style.display="none";
			mui(".invest")[0].getElementsByTagName("img")[1].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="none";
//			
		}else if(id=="myacount.html"){
			titleElem.innerHTML="我的账户";
			mui("#myShare")[0].style.display="none";
			navalist[2].style.color="#ff7f00";
//			$(".myacount").find("span").eq(1).css("color","#ff7f00");
			mui(".invest")[0].getElementsByTagName("img")[0].style.display="block";
			mui(".invest")[0].getElementsByTagName("img")[1].style.display="none";
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="none";
			
			
		}else if(id=="more_main.html"){
			titleElem.innerHTML="更多";
			mui("#myShare")[0].style.display="none";
			navalist[3].style.color="#ff7f00";
			mui(".invest")[0].getElementsByTagName("img")[0].style.display="block";
			mui(".invest")[0].getElementsByTagName("img")[1].style.display="none";
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="block";
		}
		
		
		
		
		
		
		
//		window.location.reload();
	});//监听登录成功后刷新事件
	
	var common = require('../major/common');
//	require('./nitialize-index').nitialize();
	//检测登录
    //初始化首页
    mui.init({
  		swipeBack: false,
		statusBarBackground: '#ff7f00',
		subpages: [
				
				{
					url:'page/web/user/invest_home.html',
					id:'invest_home.html',
					styles: {
						top: '38px',
						bottom: '50px'
						
					},
					show:{
				      autoShow:false
				    }
				},
				{
					url:'page/web/user/more_main.html',
					id:'more_main.html',
					styles: {
						top: '38px',
						bottom: '50px'
						
					},
					show:{
				      autoShow:false
				    }
				},
				{
					url:'page/web/user/index_main.html',
					id:'index_main.html',
					styles: {
						top: '38px',
						bottom: '50px'
						
					},
					show:{
				      autoShow:true
				    }
				}
		
		]
      });
    mui.plusReady(function(){
    	mui(".index_main")[0].style.color="#ff7f00";
    
    
//  	updateSerivces();
//		if(plus.os.name=="Android"){
//			Intent = plus.android.importClass("android.content.Intent");
//			File = plus.android.importClass("java.io.File");
//			Uri = plus.android.importClass("android.net.Uri");
//			main = plus.android.runtimeMainActivity();
//		}
		if(plus.os.name=="Android"){
			var version = plus.runtime.version; // 版本检测
    		common.upDate1(version);
		}
		
    	
//  	alert(plus.screen.resolutionHeight)//获取屏幕分辨率
//  	common.onNetChange();
//  	require('./nitialize-index').nitialize();
    		//读取本地存储，检查是否为首次启动
		var showGuide = plus.storage.getItem("lauchFlag");
		var handFlags =plus.storage.getItem("handFlag");//是否是游客进入标志
		if(showGuide){
			//有值，说明已经显示过了，无需显示；
			//关闭splash页面；
//			plus.navigator.closeSplashscreen();
//			plus.navigator.setFullscreen(false);
//			if(handFlags){
//				common.loginApp()//判断手势密码
//			}
			

//			mui.openWindow({
//				id:'guide',
//				url:'page/web/user/guide.html',
//				show:{
//					aniShow:'none'
//				},
//				waiting:{
//					autoShow:false
//				}
//			});
//			
			//预加载
//				 require('./nitialize-index').nitialize();
			
		}else{
			//显示启动导航
			mui.openWindow({
				id:'guide.html',
				url:'page/web/user/guide.html',
				show:{
					aniShow:'none'
				},
				waiting:{
					autoShow:false
				}
			});
		}
		
    	
    	
    	
    })
    
   
    
    //监听点击事件 
    var template = null;
    var subWebview=null;
    var contentWebview = null;
    var titleElem = document.getElementById('title');
    var bar = document.getElementsByClassName('mui-bar');
    var aniShow = "fade-in";
	mui('.mui-bar-tab').on('tap','.mui-tab-item',function(){
		var navalist = mui("#mynav")[0].getElementsByTagName("a");
		mui.each(navalist,function(i,item){
			item.style.color="#929292";
			item.getElementsByTagName("img")[0].style.display="none";
			item.getElementsByTagName("img")[1].style.display="block";
		})
		this.style.color="#ff7f00";
		var href = this.getAttribute('href');
		var id =this.getAttribute('id');
		if(href=="page/web/user/index_main.html"){
			
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="none";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="block";
			mui('.invest')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.invest')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="none";
		}else if(id=="invest_home.html"){
			mui(".invest")[0].getElementsByTagName("img")[0].style.display="none";
			mui(".invest")[0].getElementsByTagName("img")[1].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="none";
//			
		}else if(id=="myacount.html"){
			mui(".invest")[0].getElementsByTagName("img")[0].style.display="block";
			mui(".invest")[0].getElementsByTagName("img")[1].style.display="none";
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="none";
			
			
		}else if(id=="more_main.html"){
			mui(".invest")[0].getElementsByTagName("img")[0].style.display="block";
			mui(".invest")[0].getElementsByTagName("img")[1].style.display="none";
			mui('.index_main')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.index_main')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.myacount')[0].getElementsByTagName("img")[0].style.display="block";
			mui('.myacount')[0].getElementsByTagName("img")[1].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[0].style.display="none";
			mui('.mores')[0].getElementsByTagName("img")[1].style.display="block";
		}
		
		var title = this.innerText;
		
		if(href=="page/web/user/myacount.html"){
//			common.checkedLogin();
			if(href=="page/web/user/myacount.html"){
				var pageId="myacount.html";
			}else{
				var pageId="more_main.html";
			}
			var loginFlag = plus.storage.getItem("password");//判断用户是否登录标志
			console.log(loginFlag)
			if(loginFlag==null){
				mui.toast("请登录后操作！");
				mui.openWindow({
					id: "login.html",
					url: "page/web/user/login.html",
					styles: {
					top: '0',
					bottom: '0'
					
					},
					extras:{
						pageId:pageId
					}
				})
			}else{
				titleElem.innerHTML = title;
				mui("#myShare")[0].style.display="none";
				mui.openWindow({
					id: id,
					url: href,
					styles: {
						top: '38px',
						bottom: '50px'
						
					},
					show: {
						autoShow:true,//页面loaded事件发生后自动显示，默认为true
						aniShow: aniShow,
						duration:100
					},
					waiting: {
						autoShow: false
					},
					 createNew:true
				});
			}
		}else{
			if(href=="page/web/user/index_main.html"){
				titleElem.innerHTML="87汇财";
				mui("#myShare")[0].style.display="none";
				plus.webview.getWebviewById("index_main.html").show();
			}else{
				titleElem.innerHTML = title;
				mui("#myShare")[0].style.display="none";
			}
			
			var webview_style = {
				popGesture: "close"
			};
			plus.webview.getWebviewById(id).show();
			var webviews = plus.webview.all();
		    	  mui.each(webviews,function(i,item){
		    	 	if(
		    	 		item.getURL().indexOf("myacount.html")>0
		    	 	  
		    	 	){
		    	 		item.close();
		    	 	}
		    	 });
		}
			

	})
	mui("#myShare")[0].addEventListener("tap",function(){
		shareShow();
//		var href = this.getAttribute('href');
//		var id =this.getAttribute('id');
//		mui.openWindow({
//			url:href,
//			id:id,
//			styles:{
//				top:0,
//				bottom:0
//			}
//		})
	})
	var shares=null,bhref=false;
	var Intent=null,File=null,Uri=null,main=null;
	/**
	 * 更新分享服务
	 */
	function updateSerivces(){
		plus.share.getServices( function(s){
			shares={};
			for(var i in s){
				var t=s[i];
				shares[t.id]=t;
			}
		}, function(e){
			console.log( "获取分享服务列表失败："+e.message );
		} );
	}
	
	/**
   * 分享操作
   * @param {String} id
   */
	function shareAction(id,ex) {
		var s=null;
//		console.log( "分享操作：" );
		if(!id||!(s=shares[id])){
			console.log( "无效的分享服务！" );
			return;
		}
		if ( s.authenticated ) {
			console.log( "---已授权---" );
			shareMessage(s,ex);
		} else {
			console.log( "---未授权---" );
			s.authorize( function(){
					shareMessage(s,ex);
				},function(e){
				console.log( "认证授权失败："+e.code+" - "+e.message );
			});
		}
	}
	
	/**
   * 发送分享消息
   * @param {plus.share.ShareService} s
   */
	function shareMessage(s,ex){
//		var url="../../img/add.png";
//		plus.io.resolveLocalFileSystemURL(url,function(entry){
//			pic.src=entry.toLocalURL();
//			pic.realUrl=url;
//		},function(e){
//			console.log("读取Logo文件错误："+e.message);
//		} );
		var msg={extra:{scene:ex}};
		 	msg.href = "www.baidu.com";
      		msg.title = "北京双融宝有限公司APP";
      		msg.content = "北京双融宝有限公司手机APP正式启用了，快来下载啊!";
//		if(bhref){
//			msg.href=sharehref.value;
//			if(sharehrefTitle&&sharehrefTitle.value!=""){
//				msg.title=sharehrefTitle.value;
//			}
//			if(sharehrefDes&&sharehrefDes.value!=""){
//				msg.content+= "；下载地址：" +  "www.baidu.com";
//			}
//			msg.thumbs=["../../img/balimilogo.png"];
//			msg.pictures=["../../img/balimilogo.png"];
//		}
		msg.thumbs=["http://img.87money.com/51fbao/app/balimilogo.png"];
		msg.pictures=["../../img/balimilogo.png"];
		console.log(JSON.stringify(msg));
		s.send( msg, function(){
			console.log( "分享到\""+s.description+"\"成功！ " );
		}, function(e){
			alert( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
		} );
	}
	
	// 打开分享
	function shareShow(){
		bhref=false;
		var ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"sinaweibo"}],
		bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"},{title:"分享到新浪微博"}];
		if(plus.os.name=="iOS"){
			ids.push({id:"qq"});
			bts.push({title:"分享到QQ"});
		}
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var i=e.index;
				if(i>0){
					shareAction(ids[i-1].id,ids[i-1].ex);
				}
			}
		);
	}
    
});