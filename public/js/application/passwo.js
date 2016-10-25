//设置交易密码
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
		
		 setTimeout(function(){
			var webviews = plus.webview.all();
	    	  mui.each(webviews,function(i,item){
	    	 	if(
	    	 	  item.getURL().indexOf("withdraw.html")>0
	    	 	){
	    	 		item.hide();
	    	 	}
	    	 });
		},200)
		mui('#getChecked')[0].addEventListener('tap',function(){
			var mobile = mui('#phone')[0].value;
			var passwords = hex_md5(mui('#password')[0].value);
			var surePassword =hex_md5(mui("#surePassword")[0].value);
	//		var mobile = plus.storage.getItem("telephone");
			var url = getUrlParam();
			if(mui('#password')[0].value==""){
				mui.toast("请输入交易密码");
			}else if(mui("#surePassword")[0].value==""){
				mui.toast("请确认交易密码");
			}else if(passwords===surePassword){
				if(common.checkedPhone(mobile)){
					var timer=null;
					var i=60;
					timer = setInterval(function(){
						i-=1;
						mui('#getChecked')[0].innerHTML = "("+i+"s)重新发送";
						$("#getChecked").attr("disabled","disabled");
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
								 "type":2
				    		},
					    	success: function(msg){
					    		
					    		mui.toast(msg.msg);
					    	},error:function(a,b,c){
					    		common.timeOut();//网络请求超时
					    	}
					});
				}
			}else{
				mui.toast("两次密码输入不一致！");
			}
			
		})
			
	//		设置
	mui('#butto1')[0].addEventListener('tap',function(){
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var user_id = plus.storage.getItem("user_id")
			var appkey = plus.storage.getItem("appkey")
			var checkedNumber = mui('#checkedNumber')[0].value;
			var passwords = hex_md5(mui('#password')[0].value);
			var surePassword =hex_md5(mui("#surePassword")[0].value);
			
			var url = getUrlParam();
			if(mui('#password')[0].value==""){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("请输入交易密码");
			}else if(mui("#surePassword")[0].value==""){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("请确认交易密码");
			}
			else if(checkedNumber==''){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("验证码不能为空");
			}else if(passwords===surePassword&&passwords!="d41d8cd98f00b204e9800998ecf8427e"&&surePassword!="d41d8cd98f00b204e9800998ecf8427e"){
				mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:url+"/setTrdePwd",
			    	data:{
			    		appkey:appkey,
			    		user_id:user_id,
			    		password:passwords,
			    		code:checkedNumber,
		    		},
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		console.log(JSON.stringify(msg));
			    		if(msg.status==0){
			    			mui.toast(msg.msg)
			    		}else{
			    			mui.toast(msg.msg);
			    			plus.webview.getWebviewById(pageId).show();
			    			mui.fire(plus.webview.getWebviewById(pageId),"reLode");
//			    			mui.openWindow({
//			    				url:pageId,
//			    				id:pageId,
//			    				styles:{
//			    					top:0,
//			    					bottom:0
//			    				}
//			    			})
			    			setTimeout(function(){
			    				plus.webview.currentWebview().hide();
			    			},100)
			    		}
					},
					error:function(e){
						nwaiting.close(); //新webview的载入完毕后关闭等待框
						common.timeOut();//网络请求超时
					}
			})
			}else{
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("两次密码输入不一致！");
			}
				
			
		})
			
		
		
		mui("#butto2")[0].addEventListener("tap",function(){
			mui.back();
		})
		
	})
})
	