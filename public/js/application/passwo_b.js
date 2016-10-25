//找回交易密码
define(function(require, exports, module) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var self;
	var pageId;
	mui.plusReady(function(){
		self = plus.webview.currentWebview();
		 pageId = self.pageId;
		mui('#getChecked')[0].addEventListener('tap',function(){
		var telephone = plus.storage.getItem("telephone");
		var mobile = mui('#number')[0].value;
		var passwords = hex_md5(mui('#password')[0].value);
		var passwordsa = hex_md5(mui('#surePassword')[0].value);
		var url = getUrlParam();
//		if(mui('#password')[0].value==""){
//			mui.toast("交易密码不能为空!");
//		}
//		else if(mui('#surePassword')[0].value==""){
//			mui.toast("确认交易密码不能为空!");
//		}
//		else if(passwordsa!==passwords){
//			mui.toast("两次密码输入不一致！");
//		}else{
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
						 "type":1
		    		},
			    	success: function(msg){
			    		mui.toast(msg.msg);
			    	},error:function(a,b,c){
			    		common.timeOut();//网络请求超时
			    	}
			});
			}
		}
//		}
		
	})
		
	//重新设置交易密码
	mui('#butto1')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var user_id = plus.storage.getItem("user_id")
		var appkey = plus.storage.getItem("appkey")
		
		var checkedNumber = mui('#checkedNumber')[0].value;
		var passwords = hex_md5(mui('#password')[0].value);
		var passwordsa = hex_md5(mui('#surePassword')[0].value);
		var url = getUrlParam()
//if(passwor==passw){

		if(passwords!==passwordsa||passwords=="d41d8cd98f00b204e9800998ecf8427e"||passwordsa=="d41d8cd98f00b204e9800998ecf8427e"){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.confirm("两次密码不一致")
		}
		else{
			mui.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:url+"/modifyTrdePwd",
		    	data:{
		    		appkey:appkey,
		    		user_id:user_id,
		    		password:passwords,
		    		code:checkedNumber,
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
							extras:{pageId:"passwo_b.html"}
							})
		    			}
		    		}else{
		    			mui.toast(msg.msg);
		    			plus.webview.getWebviewById(pageId).show();
//		    			mui.openWindow({
//		    				url:pageId,
//		    				id:pageId,
//		    				styles:{
//		    					top:0,
//		    					bottom:0
//		    				}
//		    			})
		    			plus.webview.currentWebview().hide();
		    		}
				},error:function(e){
					common.timeOut();//网络请求超时
					nwaiting.close(); //新webview的载入完毕后关闭等待框
				}
		})
		
		}
		
		
	})
		mui("#butto2")[0].addEventListener("tap",function(){
			mui.back();
		})
		
	})
	
})