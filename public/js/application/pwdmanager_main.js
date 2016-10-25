define(function(require, module, exports) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui('#loginPwd')[0].addEventListener('tap', function() {
		mui.openWindow({
			id: "changepwd.html",
			url: "changepwd.html",
			styles: {
				top: '0',
				bottom: '0'

			},
			 createNew:true
		})
		
	});
	mui.plusReady(function() {
		common.onNetChange("pwdmanager.html");//检测网络信号
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var urls = getUrlParam();
//		var urls = "http://192.168.3.135:81/huicai/api2.0/index.php/User"
//	 var urls = "http://192.168.3.108:81/huicai/api2.0/index.php/User"

//			mui.ajax({
//				type: "get",
//				dataType: "json",
//				url: getUrlParam()+"/accountInfo",
//				data: {
//					user_id: user_id,
//					appkey: appkey
//				},
//				success: function(data) {
//					nwaiting.close(); //新webview的载入完毕后关闭等待框
//					if(data.status==0){
//						if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
//	    				mui.toast("登录超时，请重新登录");
//		    				mui.openWindow({
//								id: "login.html",
//								url: "login.html",
//								styles: {
//								top: '0',
//								bottom: '0'
//								
//							},
//							extras:{pageId:"pwdmanager.html"}
//							})
//		    			}else{
//		    				mui.toast(data.msg);
//		    			}
//		    			
//					}else{
//						isSetTradePassword = data.data.isSetTradePassword;
//						isHandPwd = data.data.isHandPwd;
//						if(isSetTradePassword==0){
//							$('#tradePwd').text("设置交易密码");
//						}else if(isSetTradePassword==1){
//							$('#tradePwd').text("重置交易密码");
//						}
////						if(isHandPwd==0){
////							$('#handPwd').text("设置手势密码");
////						}else if(isHandPwd==1){
////							$('#handPwd').text("重置手势密码");
////						}
//					
//					}
//				},error:function(e){
//					nwaiting.close(); //新webview的载入完毕后关闭等待框
//					common.timeOut();//网络请求超时
//				}
//
//			})
			
			//交易密码
			mui("#passwor")[0].addEventListener("tap", function() {
				var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
				//判断是否绑卡
				mui.ajax({
					type:"get",
					contentType:"application/json",
					dataType:"json",
				  	url:urls+"/checkBindCardAndPsw",
				  	data:{
				  		user_id:user_id,
				  		appkey:appkey
						},
					success:function(msg){
						nwaiting.close();
						console.log(JSON.stringify(msg));
						if(msg.status==1){
							
						
						if(msg.data.code==100){
							//修改交易密码
							mui.openWindow({
								id: "passwo_a.html",
								url: "passwo_a.html"
								
							})
			//				
						}else if(msg.data.code==2006){
							//绑定银行卡
							mui.toast("请先绑定银行卡,绑卡需充值0.01元!");
							mui.openWindow({
								url:"choosebank.html",
								id:"choosebank.html",
								styles:{
									top:0,
									bottom:0
								},
								waiting:{
									autoShow:true
								},
								extras:{
									pageId:"pwdmanager.html"
								}
							})
							setTimeout(function(){
								plus.webview.currentWebview().hide();
							},500)
						}else if(msg.data.code==2007){
							//设置交易密码
							mui.toast("请先设置交易密码");
							mui.openWindow({
								url:"passwo.html",
								id:"passwo.html",
								styles:{
									top:0,
									bottom:0
								},
								waiting:{
									autoShow:true
								},
								extras:{
									pageId:"pwdmanager.html"
								}
							})
							setTimeout(function(){
								plus.webview.currentWebview().hide();
							},500)
						}
						}else{
							
							mui.toast(msg.msg);
						 if(msg.msg=="缺少用户唯一编码"||msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
							mui.toast("登录超时，请重新登录");
							mui.openWindow({
								url:"login.html",
								id:"login.html",
								styles:{
									top:0,
									bottom:0
								},
								waiting:{
									autoShow:false
								},
								extras:{
									pageId:"pwdmanager.html"
								}
							}) 
						}
						}
					},
					error:function(e){
						nwaiting.close();
						console.log(JSON.stringify(e))
					}
				})
				
				
				
				
				
//					if (isSetTradePassword == 0) {
//						
//						mui.openWindow({
//							id: "passwo.html",
//							url: "passwo.html",
//							extras:{
//								pageId:"pwdmanager.html"
//							},
//							createNew:true
//						})
//						
//					} else if(isSetTradePassword == 1) {
////						1是设置了的
//							mui.openWindow({
//								id: "passwo_a.html",
//								url: "passwo_a.html",
//								createNew:true
//							})
//							
//					}
			})
			
			//手势密码
//			mui("#gesture")[0].addEventListener("tap", function() {
//				if (isHandPwd == 0) {
//						mui.openWindow({
//							id: "gesture.html",
//							url: "gesture.html",
//						})
//						
//					} else if(isHandPwd==1){
////						1是设置了的
//							mui.openWindow({
//							id: "checkedhandpwd.html",
//							url: "checkedhandpwd.html",
//						})
//							
//					}else if(isHandPwd==2){
//						mui.toast("手势密码已锁请联系客服！");
//						mui.openWindow({
//							url:"servicepage.html",
//							id:"servicepage.html",
//							styles:{
//								top:0,
//								bottom:0
//							}
//						})
//						
//					}
//				
//				
//			})
		})	
})