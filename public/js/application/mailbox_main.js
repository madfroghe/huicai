define(function(require,module,exports){
 	window.addEventListener('reLode',function(){
		window.location.reload();
	});//监听登录成功后刷新事件
 	var common = require('../major/common');
	mui.plusReady(function(){
		common.onNetChange("mailbox.html");//检测网络信号
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		mui('#butto')[0].addEventListener('tap',function(){
				var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var webviews = plus.webview.all();
		    	  mui.each(webviews,function(i,item){
		    	 	if(
		    	 	  item.getURL().indexOf("acuntmanager.html")>0
		    	 	){
		    	 		item.hide();
		    	 	}
		    	 });
		
			 reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			 var mailNumber = mui('#mailNumber')[0].value;
			 if(mailNumber==''){
			 	nwaiting.close(); //新webview的载入完毕后关闭等待框
			 	mui.toast("邮箱不能为空");
			 }else if(!reg.test(mailNumber)){
			 	nwaiting.close(); //新webview的载入完毕后关闭等待框
			 	mui.toast("邮箱格式不正确");
			 	
			 }else{
			 	var url = getUrlParam()+"/emailAuth";
				 var datas = {"user_id":user_id,"appkey":appkey,"email":mailNumber};
				$.ajax({
					type: "get",
					contentType:"application/json",
					dataType:"json",
					async:false,
				  	url:url,
			    	data:datas,
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		if(msg.status==1){
			    			plus.webview.getWebviewById("mailbox.html").hide();
							mui.openWindow({
								url:"acuntmanager.html",
								id:"acuntmanager.html",
								styles:{
									top:0,
									bottom:0
								},
								 createNew:true
							})
							mui.toast(msg.msg);
			    			
			    		}else{
			    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
				    				mui.toast("登录超时，请重新登录");
				    				mui.openWindow({
										id: "login.html",
										url: "login.html",
										styles: {
										top: '0',
										bottom: '0'
										
									},
									extras:{pageId:"mailbox.html"}
									})
				    			}else{
				    				mui.toast(msg.msg);
				    			}
				    			
			    		}
			    		
			    		console.log(JSON.stringify(msg));
			    		
			    	},error:function(e){
			    		common.timeOut();//网络请求超时
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    	}
				});
				 
			 }
			
			
		})
		
	})



})