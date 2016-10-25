//修改交易密码
define(function(require, exports, module) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	
//	mui('#getChecked')[0].addEventListener('tap',function(){
//		var mobile = mui('#phoneNumber')[0].value;
//		var passwords = hex_md5(mui('#password')[0].value);
//		var passwordsa = hex_md5(mui('#surePassword')[0].value);
//		var passw = hex_md5(mui('#passw')[0].value);
////		var mobile = plus.storage.getItem("telephone");
//		var url = getUrlParam();
//		if(mui('#passw')[0].value==''){
//			mui.toast("请输入原交易密码!");
//		}
//		else if(mui('#password')[0].value==''){
//			mui.toast("请输入新交易密码!");
//		}else if(mui('#surePassword')[0].value==''){
//			mui.toast("请重复新交易密码");
//		}
//		else if(mui('#password')[0].value!==mui('#surePassword')[0].value){
//			mui.toast("两次密码输入不一致！");
//		}else if(mui('#passw')[0].value===mui('#password')[0].value){
//			mui.toast("新交易密码与原交易密码不能相同");
//		}
//		else{
//			if(common.checkedPhone(mobile)){
//				var timer=null;
//				var i=60;
//				timer = setInterval(function(){
//					i-=1;
//					$("#getChecked").attr("disabled","disabled");
//					mui('#getChecked')[0].innerHTML = "("+i+"s)重新发送";
//					if(i==0){
//						clearInterval(timer);
//						mui('#getChecked')[0].innerHTML = "获取验证码";
//						$("#getChecked").removeAttr("disabled");
//					}
//				},1000);
//				mui.ajax({
//					type: "get",
//						contentType:"application/json",
//						dataType:"json",
//					  	url:url+"/getVerificationCode",
//				    	data:{
//							"telephone":mobile,
//							 "type":3
//			    		},
//				    	success: function(msg){
//				    		
//				    		mui.toast(msg.msg);
//				    	},error:function(a,b,c){
//				    		common.timeOut();//网络请求超时
//				    	}
//				});
//			}
//		}
//		
//	})
		
//		设置
mui('#butto1')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var user_id = plus.storage.getItem("user_id")
		var appkey = plus.storage.getItem("appkey")
		var passwor = plus.storage.getItem("password")
//		var checkedNumber = mui('#checkedNumber')[0].value;
		var passwords = hex_md5(mui('#password')[0].value);
		var passwordsa = hex_md5(mui('#surePassword')[0].value);
		var passw = hex_md5(mui('#passw')[0].value);
		var url = getUrlParam();
//alert(passw)
//if(passwor===passw){
		
		if(mui('#passw')[0].value==''){
			nwaiting.close(); 
			mui.toast("请输入原交易密码!");
		}
		else if(mui('#password')[0].value==''){
			nwaiting.close(); 
			mui.toast("请输入新交易密码!");
		}else if(mui('#surePassword')[0].value==''){
			nwaiting.close(); 
			mui.toast("请重复新交易密码");
		}
		else if(mui('#password')[0].value!==mui('#surePassword')[0].value){
			nwaiting.close(); 
			mui.toast("两次新密码输入不一致！");
		}else if(mui('#passw')[0].value===mui('#password')[0].value){
			nwaiting.close(); 
			mui.toast("新旧交易密码不能相同");
		}
		else{
			mui.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:url+"/updateTrdePwd",
		    	data:{
		    		appkey:appkey,
		    		user_id:user_id,
		    		password:passwords,
		    		oldPassword:passw
		    		
	    		},
		    	success: function(msg){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		console.log(JSON.stringify(msg))
		    		if(msg.status==0){
		    			
		    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
	    				mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"passwo_a.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
		    		}else{
		    			plus.webview.getWebviewById("pwdmanager.html").hide();
		    			mui.toast(msg.msg);
		    			mui.openWindow({
		    				url:"pwdmanager.html",
		    				id:"pwdmanager.html",
		    				styles:{
		    					top:0,
		    					bottom:0
		    				},
		    				createNew:true
		    			})
		    			plus.webview.currentWebview().hide();
		    		}
				},error:function(e){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					common.timeOut();//网络请求超时
				}
		})
		
		}
		
//		}else{
//			alert('您输入的旧密码不正确！！')
//		}
	})
		
	mui('#butto2')[0].addEventListener('tap',function(){
		mui.back();
	})
	
})