define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	//登录
	var self;
	var pageId;
	var flag;
	mui.plusReady(function(){
		common.onNetChange("login.html");//检测网络信号
		self = plus.webview.currentWebview();
		 pageId = self.pageId;
		 flag=self.flag;
	
//		 setTimeout(function(){
//		 	 var webviews = plus.webview.all();
//	    	  mui.each(webviews,function(i,item){
//	    	 	if(
//	    	 	  item.getURL().indexOf(pageId)>0
//	    	 	){
//	    	 		item.hide();
//	    	 	}
//	    	 });
//		 },500)	
		 mui("#username")[0].value = plus.storage.getItem("telephone")
		
	})
	var url = getUrlParam();
	
//	alert(pageId)
	
	mui('#login')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var username = mui("#username")[0].value;
//		var passwords = mui('#password')[0].value;
		var passwords = hex_md5(mui('#password')[0].value);
		console.log(passwords);
		mui.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:url+"/login",
		    	data:{
					"username":username,
					 "password":passwords
	    		},
		    	success: function(msg){
		    		console.log(JSON.stringify(msg))
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		mui('#password')[0].value='';
		    		if(msg.status==0){
		    			if(msg.msg=="用户不存在"){
		    				mui.toast("您还未加入87汇财，先去注册吧！")
		    			}
		    			else{
		    				mui.toast(msg.msg);
		    			}
		    		}else{
		    			mui.toast("登录成功，马上开始理财吧！");
		    			plus.storage.setItem("handFlag", "true");
		    			plus.storage.setItem("user_id",msg.data.user_id);
		    			plus.storage.setItem("appkey",msg.data.appkey);
		    			plus.storage.setItem("password",msg.data.password);
		    			plus.storage.setItem("telephone",msg.data.telephone);
		    			plus.storage.setItem("username",msg.data.username);
		    			if(flag==2){
		    				
		    				setTimeout(function(){
		    					var webviews = plus.webview.all();
		    	  				mui.each(webviews,function(i,item){
					    	 	if(
					    	 		item.getURL().indexOf("login.html")>0
					    	 	  ||item.getURL().indexOf("register.html")>0
					    	 	  ||item.getURL().indexOf("gesture.html")>0
					    	 	){
					    	 		item.hide();
					    	 	}
					    	 });
		    				},1000)
		    				
		    				mui.openWindow({
		    					url:"acuntmanager.html",
		    					id:"acuntmanager.html",
		    					styles:{
		    						top:0,
		    						bottom:0
		    					}
		    				})
		    				setTimeout(function(){
									plus.webview.currentWebview().hide();
								},1000)
		    			}else if(pageId=="index_main.html"){
		    				var webviews = plus.webview.all();
		    	  				mui.each(webviews,function(i,item){
					    	 	if(
					    	 		item.getURL().indexOf("index_main")>0
					    	 	  ||item.getURL().indexOf("index_main.html")>0
					    	 	 
					    	 	){
					    	 		item.show();
					    	 	}
					    	 });
		    				plus.webview.getLaunchWebview().show();
//		    				plus.webview.getWebviewById("index_main").show();
		    				var detailPage = null;
							if(!detailPage){
								    detailPage = plus.webview.getLaunchWebview();
								 }
								mui.fire(detailPage,"tabChange",{id:"index_main"});
								setTimeout(function(){
									plus.webview.currentWebview().hide();
								},1000)
		    			}else if(pageId=="myacount.html"){
		    				setTimeout(function(){
		    					var webviews = plus.webview.all();
		    	  				mui.each(webviews,function(i,item){
					    	 	if(
					    	 		item.getURL().indexOf("login.html")>0
					    	 	  ||item.getURL().indexOf("register.html")>0
					    	 	  ||item.getURL().indexOf("gesture.html")>0
					    	 	){
					    	 		item.hide();
					    	 	}
					    	 });
		    				},1000)
		    				mui.openWindow({
								url:"myacount.html",
								id:"myacount.html",
								styles:{
									top:"38px",
									bottom:"52px"
								},
								createNew:true
								
							})
		    				var detailPage = null;
							if(!detailPage){
								    detailPage = plus.webview.getLaunchWebview();
								 }
								mui.fire(detailPage,"tabChange",{id:"myacount.html"});
								setTimeout(function(){
									plus.webview.currentWebview().hide();
								},500)
		    			}
		    			else{
		    				mui.fire(plus.webview.getWebviewById(pageId),"reLode");
		    				mui.back();
		    				setTimeout(function(){
									plus.webview.currentWebview().hide();
								},1000)
		    			}
		    			
		    		}
		    		console.log(JSON.stringify(msg))
		    		
		    	},error:function(a,b,c){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    	}
		});
	})
	
	//跳转到注册页面
	mui("#registerBtn")[0].addEventListener('tap',function(){
		mui.openWindow({
			id: 'register.html',
			url: 'register.html',
			styles: {
			top: '0px',
			bottom: '0px'
		}
		})
		setTimeout(function(){
			plus.webview.currentWebview().hide();
		},1000);
	})
	
	//跳转到忘记密码
	
	mui('#forgetBtn')[0].addEventListener('tap',function(){
		
		mui.openWindow({
			id: 'forgetpwd.html',
			url: 'forgetpwd.html',
			styles: {
			top: '0px',
			bottom: '0px'
		}
		})
		setTimeout(function(){
			plus.webview.currentWebview().hide();
		},1000);
		
	})
	
	
})