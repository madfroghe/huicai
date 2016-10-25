define(function(require,module,exports){
 	window.addEventListener('reLode',function(){
		window.location.reload();
	});//监听登录成功后刷新事件
 	var common = require('../major/common');
 	var user_id;
 	var appkey ;
 	var oldPwd;
 	mui.plusReady(function(){
 		
 		common.onNetChange("handpwdchange.html");//检测网络信号
 		mui.toast("请设置新密码");
 		user_id = plus.storage.getItem("user_id");
		appkey = plus.storage.getItem("appkey");
		var self = plus.webview.currentWebview();
		 oldPwd = self.oldPwd;
 		
 		
 		
 	})

	(function($, doc) {
				$.init();
				var holder = doc.querySelector('#holder'),
					alert = doc.querySelector('#alert'),
					record = [];
				//处理事件
				holder.addEventListener('done', function(event) {
					var rs = event.detail;
					if (rs.points.length < 3) {
						mui.toast('设定的手势太简单了');
						record = [];
						rs.sender.clear();
						return;
					}
					console.log(rs.points.join(''));
					var pwd = hex_md5(rs.points.join(''));
					record.push(rs.points.join(''));
					if (record.length >= 2) {
						if (record[0] == record[1]) {
//							mui.confirm('手势设定完成');
							var url = getUrlParam()+"/handPwd";
							console.log(user_id)
							 var datas = {"user_id":user_id,"appkey":appkey,"pwd":oldPwd,"new_pwd":pwd,"action":2};
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
										 		url:"pwdmanager.html",
										 		id:"pwdmanager.html",
										 		styles:{
										 			top:0,
										 			bottom:0
										 		}
										 	})
										 	plus.webview.currentWebview().hide();
										 }else{
										 	mui.toast(data.msg)
										 	
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
												extras:{pageId:"handpwdchange.html"}
												})
							    			}
						    		}
						    		
						    		console.log(JSON.stringify(msg))
						    		
						    	},error:function(e){
						    		common.timeOut();//网络请求超时
						    	}
							});
							 
							 
							 
						} else {
							mui.toast('两次手势设定不一致');
						}
						rs.sender.clear();
						record = [];
					} else {
						mui.toast('请确认新手势密码');
						rs.sender.clear();
					}
				});
			}(mui, document));
})