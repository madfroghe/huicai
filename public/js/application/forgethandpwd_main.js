//忘记手势密码
define(function(require,exports,module){
	
	window.addEventListener('reLode',function(){
		window.location.reload();
	});//监听登录成功后刷新事件
	var common = require('../major/common');
	var flag=0;
 	var pageId="pwdmanager.html";
	mui.plusReady(function(){
		
		common.onNetChange("forgethandpwd.html");//检测网络信号
		var user_id = plus.storage.getItem("user_id");
		 var appkey = plus.storage.getItem("appkey");
		 var self = plus.webview.currentWebview();
		 pageId = self.pageId;
		 flag = self.flag;	
		//获取验证码
		var url = getUrlParam();
		
		mui('#getChecked')[0].addEventListener('tap',function(){
			
			var mobile = mui("#username")[0].value;	
			var telephone =plus.storage.getItem("telephone");
			
			if(common.checkedPhone(mobile)){
				if(mobile!==telephone){
					mui.confirm("请输入注册时的手机号");
				}else{
				var timer=null;
				var i=60;
				timer = setInterval(function(){
					i-=1;
					$("#getChecked").attr("disabled","disabled");
					mui('#getChecked')[0].innerHTML = "("+i+"s)重新发送";
					if(i==0){
					clearInterval(timer);
					mui('#getChecked')[0].innerHTML = "获取验证码";
					$("#getChecked").removeAttr("disabled");
					}
				},1000);
				mui.ajax({
					type: "get",
						contentType:"application/json",
						dataType:"json",
					  	url:url+"/getVerificationCode",
				    	data:{
							"telephone":mobile,
							 "type":4
			    		},
				    	success: function(msg){
				    		if(msg.status==1){
				    			mui.toast(msg.msg);
				    		}else{
				    			mui.toast(msg.msg);
				    		}
				    		
				    	},error:function(a,b,c){
				    		common.timeOut();//网络请求超时
				    	}
				});
				}
			}
		})
		
		//设置手势密码
		mui('#forget')[0].addEventListener('tap',function(){
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var code =mui('#checkedNumber')[0].value;
			if(code==""){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("验证码不能为空")
			}else{
				$.ajax({
				type:"get",
				url:url+"/clearHandPwd",
				async:true,
				data:{"code":code,"user_id":user_id,"appkey":appkey},
				success:function(msg){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					var data = JSON.parse(msg)
					console.log(JSON.stringify(JSON.parse(msg)))
					if(data.status==1){
						plus.webview.getWebviewById("forgethandpwd.html").hide();
						mui.toast(data.msg);
						mui.openWindow({
							url:"gesture.html",
							id:"gesture.html",
							styles:{
								top:0,
								bottom:0
							},
							extras:{
								code:code,
								pageId:pageId,
								flag:flag
							}
						})
					}else{
						mui.toast(data.msg);
						if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
		    				mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"forgethandpwd.html"}
							})
		    			}
					}
					
				},
				error:function(e){
					mui.toast(JSON.stringify(e))
					common.timeOut();//网络请求超时
//					nwaiting.close(); //新webview的载入完毕后关闭等待框
					
					
				}
			});
			}
			
			
			
		})
	})
	
	
})