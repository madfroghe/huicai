define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	
	var common = require('../major/common')
	mui.plusReady(function(){
		common.onNetChange("forgetpwd.html");//检测网络信号
	})
	//获取验证码
	var url = getUrlParam()
	mui('#getChecked')[0].addEventListener('tap',function(){
		
		var mobile = mui("#username")[0].value;	
		var telephone =plus.storage.getItem("telephone");
		
		if(common.checkedPhone(mobile)){
//			if(mobile!==telephone){
//				mui.confirm("请输入注册时的手机号");
//			}else{
				
			
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
//			}
		}
	})
	
	//修改密码
	mui('#forget')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var mobile = mui("#username")[0].value;
		var checkedNumber = mui('#checkedNumber')[0].value;
		var passwords = hex_md5(mui('#password')[0].value);
		var length =mui('#password')[0].value.length
		var surePwd = hex_md5(mui('#surePassWord')[0].value);
		if(surePwd!==passwords){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("两次密码输入不一致！");
		}else if(checkedNumber==""){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("验证码不能为空")
		}else if(6>length||length>16){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("密码格式不符合要求，");
			mui('#password')[0].value="";
			mui('#surePassWord')[0].value="";
		}else{
			common.timeOver();//请求超过10秒关闭等待框
			mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:url+"/forgetPassword",
			    	data:{
						"telephone":mobile,
						 "password":passwords,
						 "code":checkedNumber
		    		},
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		console.log(JSON.stringify(msg));
			    		mui.toast(msg.msg);
			    		if(msg.status==1){
			    			mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							createNew:true,
							extras:{pageId:"index_main.html"}
							})
			    			setTimeout(function(){
			    				plus.webview.currentWebview().hide();
			    			},1000)
			    		}
			    		
			    		console.log(JSON.stringify(msg))
			    		
			    	},error:function(a,b,c){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		common.timeOut();//网络请求超时
			    	}
			});
		}
	
		
	})
	
	
})