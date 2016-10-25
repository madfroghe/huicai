define(function(require,module,exports){
 	window.addEventListener('reLode',function(){
		window.location.reload();
	});//监听登录成功后刷新事件
 	var common = require('../major/common');
 	var user_id;
 	var appkey 
 	mui.plusReady(function(){
 		mui.toast("请输入原手势密码！")
 		common.onNetChange("checkedhandpwd.html");//检测网络信号
 		user_id = plus.storage.getItem("user_id");
		appkey = plus.storage.getItem("appkey");
		//忘记密码
		mui('#forgetHand')[0].addEventListener('tap',function(){
			mui.openWindow({
				url:"forgethandpwd.html",
				id:"forgethandpwd.html",
				styles:{
					top:0,
					bottom:0
				}
			})
			
			
		})
 	})

	(function($, doc) {
			var flag = 0;//手势密码输错次数 
				$.init();
				var holder = doc.querySelector('#holder'),
					alert = doc.querySelector('#alert'),
					record = [];
				//处理事件
				holder.addEventListener('done', function(event) {
					var rs = event.detail;
//					if (rs.points.length < 3) {
//						alert.innerText = '设定的手势太简单了';
//						record = [];
//						rs.sender.clear();
//						return;
//					}
					console.log(rs.points.join(''));
//					var pwd = hex_md5(rs.points.join(''));
					var pwd = hex_md5(rs.points.join(''));
					record.push(rs.points.join(''));
//					if (record.length >= 2) {
//						if (record[0] == record[1]) {
//							alert.innerText = '手势设定完成';
							var url = getUrlParam()+"/handPwd";
							 var datas = {"user_id":user_id,"appkey":appkey,"pwd":pwd,"action":0};
//							 var data = common.myAjax(url,datas,"get","gesture.html");
							  //获取数据
							 $.ajax({
								type: "get",
								contentType:"application/json",
								dataType:"json",
							  	url:url,
						    	data:datas,
						    	success: function(msg){
						    		if(msg.status==1){
						    			
						    			var data = msg;
						    			console.log(JSON.stringify(data));
										 if(data.data.result==1){
										 	mui.toast(data.data.msg);
										 	mui.openWindow({
										 		url:"handpwdchange.html",
										 		id:"handpwdchange.html",
										 		styles:{
										 			top:0,
										 			bottom:0
										 		},
										 		createNew:true,
										 		extras:{oldPwd:pwd}
										 	})
										 	setTimeout(function(){
										 		plus.webview.currentWebview().hide();
										 	},1000)
										 	
										 }else if(data.data.result==0){
										 	mui.toast(data.data.msg);
//										 	plus.webview.currentWebview().hide();
										 	
										 }else {
										 	mui.toast(data.data.msg);
										 	mui.openWindow({
										 		url:"servicepage.html",
										 		id:"servicepage.html",
										 		styles:{
										 			top:0,
										 			bottom:0
										 		}
										 	})
										 	var webviews = plus.webview.all();
									    	  mui.each(webviews,function(i,item){
									    	 	if(
									    	 		item.getURL().indexOf("pwdmanager.html")>0
									    	 	  ||item.getURL().indexOf("checkedhandpwd.html")>0
									    	 	){
									    	 		item.close();
									    	 	}
									    	 });
										 	
										 }
						    			
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
												extras:{pageId:"checkedhandpwd.html"}
												})
							    			}else{
							    				mui.toast(msg.msg);
							    			}
						    			
						    		}
						    		
						    		
						    	},error:function(e){
						    		common.timeOut();//网络请求超时
						    	}
							});
							 
							 
							 
							 
							 
							 
//						} else {
//							alert.innerText = '两次手势设定不一致';
//						}
						rs.sender.clear();
						record = [];
//					} else {
//						alert.innerText = '请确认手势设定';
//						rs.sender.clear();
//					}
				});
			}(mui, document));



})