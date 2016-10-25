define(function(require,module,exports){
 	window.addEventListener('reLode',function(){
		window.location.reload();
	});//监听登录成功后刷新事件
 	var common = require('../major/common');
 	
 	mui.plusReady(function(){
// 		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
// 		mui.confirm("请输入手势密码！")
 		common.onNetChange("checkedhandpwd.html");//检测网络信号
 		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var handFlg = plus.storage.getItem("hands");//判断是否首次输入锁屏密码
//		if(handFlg=="true"){
//			var flags = 0;//手势密码输错次数 
//			(function($, doc) {
//				$.init();
//				var holder = doc.querySelector('#holder'),
//					alert = doc.querySelector('#alert'),
//					record = [];
//				//处理事件
//				holder.addEventListener('done', function(event) {
//					var rs = event.detail;
//					console.log(rs.points.join(''));
//					var pwd = hex_md5(rs.points.join(''));
//					record.push(rs.points.join(''));
////						var url = getUrlParam()+"/handPwd";
////						var datas = {"user_id":user_id,"appkey":appkey,"pwd":pwd,"action":0};
//						//获取数据
//						var handPwd=plus.storage.getItem("handPwd");
//						if(handPwd===pwd){
//							
//							flags = 0;
//							plus.webview.currentWebview().hide();
//							rs.sender.clear();
//							record = [];
//						}else{
//							rs.sender.clear();
//							record = [];
//							mui.toast("手势密码错误");
//							flags=flags+1;
//							if(flags==2){
//								mui.confirm("亲，你已输错两次，输错三次您的手势密码将被锁定！");
//							}
//							
//						}
//						
//				});
//			}(mui, document));
//		}else{
//			var isHandPwd;
//			mui.ajax({
//				type: "get",
//				dataType: "json",
//				url: getUrlParam()+"/accountInfo",
//				data: {
//					user_id: user_id,
//					appkey: appkey
//				},
//				success: function(data) {
//					
//					if(data.status==0){
//						nwaiting.close();
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
//							extras:{pageId:"greenlocker.html"}
//							})
//		    			}else if(data.msg=="用户不存在"){
//		    				mui.toast("请注册后操作");
//			    				mui.openWindow({
//									id: "register.html",
//									url: "register.html",
//									styles: {
//									top: '0',
//									bottom: '0'
//									
//								}
//								})
//		    			}
//						else{
//		    				mui.toast(data.msg);
//		    			}
//		    			
//					}else{
//						nwaiting.close();
//						isHandPwd = data.data.isHandPwd;
//						if(isHandPwd==0){
//							mui.openWindow({
//								url:"gesture.html",
//								id:"gesture.html",
//								styles:{
//									top:0,
//									bottom:0
//								},
//								extras:{
//									flag:1,
//									pageId:"greenlocker.html"
//								}
//							})
//						}else if(isHandPwd==2){
//							mui.toast("手势密码已锁请联系客服！");
//							mui.openWindow({
//								url:"servicepage.html",
//								id:"servicepage.html",
//								styles:{
//									top:0,
//									bottom:0
//								}
//							})
//						}
//						else{
//							nwaiting.close();
							var flags = 0;//手势密码输错次数 
							(function($, doc) {
								
									$.init();
									var holder = doc.querySelector('#holder'),
										alert = doc.querySelector('#alert')
									//处理事件
									holder.addEventListener('done', function(event) {
										var rs = event.detail;
										var pwd = hex_md5(rs.points.join(''));
				
												var url = getUrlParam()+"/handPwd";
												 var datas = {"user_id":user_id,"appkey":appkey,"pwd":pwd,"action":0};
												 rs.sender.clear();
												var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
												common.timeOver();//请求超过10秒关闭等待框
												  //获取数据
												 $.ajax({
													type: "get",
													contentType:"application/json",
													dataType:"json",
												  	url:url,
											    	data:datas,
											    	success: function(msg){
											    		nwaiting.close(); 
											    		if(msg.status==1){
											    			var data = msg;
											    			console.log(JSON.stringify(data));
															 if(data.data.result==1){
															 	flags = 0;
															 	rs.sender.clear();
																record = [];
															 	plus.storage.setItem("handPwd",pwd);
															 	plus.storage.setItem("hands","true");
															 	
															 	plus.webview.currentWebview().hide();
															 	
															 }else if(data.data.result==0){
															 	rs.sender.clear();

															 	flags=flags+1;
															 	if(flags==2){
															 		rs.sender.clear();
																	
															 		mui.confirm("亲，你已输错两次，输错三次您的手势密码将被锁定！");
															 	}
															 	mui.toast(data.data.msg);
															 	
															 	
															 }else {
															 	rs.sender.clear();
																
															 	mui.toast(data.data.msg);
															 	flags=0;
															 	mui.openWindow({
															 		url:"servicepage.html",
															 		id:"servicepage.html",
															 		styles:{
															 			top:0,
															 			bottom:0
															 		}
															 	})
															 	
															 }
											    			
											    		}else{
											    			rs.sender.clear();
															
											    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
												    				mui.toast("登录超时，请重新登录");
												    				mui.openWindow({
																		id: "login.html",
																		url: "login.html",
																		styles: {
																		top: '0',
																		bottom: '0'
																		
																	},
																	extras:{
																		pageId:"greenlocker.html"
																		
																	}
																	})
												    			}else{
												    				mui.toast(msg.msg);
												    			}
											    			
											    		}
											    		
											    		
											    	},error:function(e){
											    		rs.sender.clear();
													
											    		nwaiting.close(); 
											    		common.timeOut();//网络请求超时
											    	}
												});
											
									});
								}(mui, document));
//						}
					
//					}
//				},error:function(e){
//					plus.nativeUI.closeWaiting(); 
//					common.timeOut();//网络请求超时
//				}
//
//			})
//			}
		
		mui('#forgetHand')[0].addEventListener('tap',function(){
			mui.openWindow({
				url:"forgethandpwd.html",
				id:"forgethandpwd.html",
				styles:{
					top:0,
					bottom:0
				},
				createNew:true,
				extras:{
					pageId:"greenlocker.html",
					flag:1,
				}
			})
			
			
		})
		mui.back=function(){
			return false;
		}
 	})

	//检测是否设置收拾密码
	function checkHand(){
		
	}

		

})