define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common')
	mui.plusReady(function(){
		common.onNetChange("register.html");//检测网络信号
	})
	//获取验证码
	mui('#getChecked')[0].addEventListener('tap',function(){
		var mobile = mui("#username")[0].value;
//		alert(mobile);
		var url = getUrlParam()
		if(common.checkedPhone(mobile)){
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
						 "type":0
		    		},
			    	success: function(msg){
			    		console.log(JSON.stringify(msg));
			    		if(msg.msg=="该手机号码已经注册"){
			    			mui('#getChecked')[0].innerHTML = "获取验证码";
							$("#getChecked").removeAttr("disabled");
							clearInterval(timer);
							mui.toast(msg.msg);
			    		}else{
			    			mui.toast(msg.msg);
			    		}
			    		
			    		
			    	},error:function(a,b,c){
			    		common.timeOut();//网络请求超时
			    	}
			});
		}
	})
	
	//注册
	mui('#register')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var mobile = mui("#username")[0].value;
		var checkedNumber = mui('#checkedNumber')[0].value;
		var passwords = mui('#password')[0].value;
		var pwd =hex_md5(passwords);
		var surePassword = mui('#surePassword')[0].value;
		var url = getUrlParam();
		if(passwords==''){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("请输入密码");
		}else if(surePassword==''){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("请确认密码");
		}
		else if(passwords !==surePassword){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("两次密码不一致")
		}else if(6>passwords.length||passwords.length>16){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("密码格式不符合要求，");
			mui('#password')[0].value="";
			mui('#surePassword')[0].value="";
		}else if(checkedNumber==""){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("验证码不能为空")
		}
		else{
			mui.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:url+"/register",
		    	data:{
					"telephone":mobile,
					 "password":passwords,
					 "code":checkedNumber
	    		},
		    	success: function(msg){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		if(msg.status==0){
		    			mui.toast(msg.msg);
		    		}else{
		    			mui.ajax({
							type: "get",
								contentType:"application/json",
								dataType:"json",
							  	url:url+"/login",
						    	data:{
									"username":mobile,
									 "password":pwd
					    		},
						    	success: function(msg){
						    	
						    		if(msg.status==0){
						    			mui.toast(msg.msg);
						    		}else{
						    			plus.storage.setItem("handFlag", "true");
						    			plus.storage.setItem("user_id",msg.data.user_id);
						    			plus.storage.setItem("appkey",msg.data.appkey);
						    			plus.storage.setItem("password",msg.data.password);
						    			plus.storage.setItem("telephone",msg.data.telephone);
						    			plus.storage.setItem("username",msg.data.username);
						    			
						    			
						    		}
						    		console.log(JSON.stringify(msg))
						    		
						    	},error:function(a,b,c){
						    	}
						});
		    			plus.webview.currentWebview().hide();
		    			mui.toast("注册成功，欢迎加入87汇财")
		    			mui.openWindow({
							id: 'login.html',
							url: 'login.html',
							styles: {
							top: '0px',
							bottom: '0px'
						},
						extras:{
							pageId:"myacount.html"
						},
						createNew:true
						})
		    			mui.toast(msg.msg);
		    		}
		    		console.log(JSON.stringify(msg));
		    		
		    	},error:function(a,b,c){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		common.timeOut();//网络请求超时
		    	}
		});
		}
		
	})
	//跳转到登录页面
	mui("#loginBtn")[0].addEventListener('tap',function(){
		mui.openWindow({
			id: 'login.html',
			url: 'login.html',
			styles: {
			top: '0px',
			bottom: '0px'
		}
			
		})
	})
	//阅读用户注册协议
	mui('#registerAgreement')[0].addEventListener("tap",function(){
		var href = this.getAttribute('hrefs');
		mui.openWindow({
			url:"registeragreement.html",
			id:"registeragreement.html",
			styles:{
				top:0,
				bottom:0
			},
			extras:{
				tag:getUrlParam()+"/page.html?page="+href+""
			}
		})
	})
	
	//更换验证码
//	var ROOT = "http://www.87huicai.com";
//	mui('#changeBtn')[0].addEventListener('tap',function(){
//		refreachCode();	
//	})
	function refreachCode() {
	    var d = new Date();
	    $("#verifyImg").attr("src", ROOT + "/code/?" + d.getTime());
	}
	
	//监听阅读时间
	mui('#check')[0].addEventListener('change',function(){
		var value = this.checked?"true":"false";
		if(value=='true'){
			$('#register').removeAttr('disabled');
		}else{
			$('#register').attr('disabled',"disabled");
		}
//		var che = mui('#check')[0].getAttribute('checked');
//		alert(che)
		
	})
	
})