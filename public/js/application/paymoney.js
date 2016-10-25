define(function(require, exports, module) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var amount = plus.storage.getItem("rechargeMoney");
		var self = plus.webview.currentWebview();
		var code = self.code;
		var bankName = self.bankName;
		mui('#bankName')[0].innerHTML =bankName
		
	//获取订单号
	var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:"http://192.168.0.106/51fbao/api1.0/createPaymentOrder",
			    	data:{
			    		"appkey":appkey,
			    		"user_id":user_id,
			    		'amount':amount
		    		},
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		console.log(JSON.stringify(msg))
//			    		alert(JSON.stringify(msg))
						if(msg.status==1){
							$('#sure').removeAttr("disabled");
							mui.toast(msg.msg);
						}else{
							if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"){
			    				mui.openWindow({
									id: "login.html",
									url: "login.html",
									styles: {
									top: '0',
									bottom: '0'
									
								},
								extras:{pageId:"myacount.html"}
								})
			    			}
							mui.toast(msg.msg);
						}
			    		
			    	},error:function(a,b,c){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		common.timeOut();//网络请求超时
			    	}
			});
	
	
	
	
	//银行卡验证
	$("#bankCard").on("blur",function(){
		var cardNum = mui('#bankCard')[0].value;
		var reg = /^\d{16}|\d{19}$/;
		if(cardNum==''||!reg.test(cardNum)){
			mui.toast("银行卡号输入错误");
		}else if(cardNum.length!=16&&cardNum.length!=19){
			mui.toast("银行卡号输入错误");
		}
		
		
	})
	//验证身份证号
	$("#cardId").on("blur",function(){
		var cardId = mui('#cardId')[0].value;
		var reg =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号验证
		if(cardId==''){
			mui.toast("身份证号不能为空");
		}else if(!reg.test(cardId)){
			mui.toast("身份证号输入错误");
		}
		
		
	})
	
	//获取验证码
	var flag = 1//是否为重发消息
	mui('#getBtn')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var mobile = mui("#phoneNumber")[0].value;
		var idNo=mui('#cardId')[0].value;//省份证号
		var realName = mui('#userName')[0].value;
		var bankCardNo=mui('#bankCard')[0].value;
		if(flag ==1){
			var isResendValidateCode =false;
			flag = 0;
		}else{
			var isResendValidateCode =true;
		}
		
//		alert(mobile);
		var url = getUrlParam()
		if(common.checkedPhone(mobile)){
			var timer=null;
			var i=60;
			timer = setInterval(function(){
				i-=1;
				$("#getBtn").attr("disabled","disabled");
				mui('#getBtn')[0].innerHTML = "("+i+"s)重新发送";
				if(i==0){
				clearInterval(timer);
				
				mui('#getBtn')[0].innerHTML = "获取验证码";
				$("#getBtn").removeAttr("disabled");
				}
			},1000);
			mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:"http://192.168.0.106/51fbao/api1.0/precheckForSign",
			    	data:{
			    		"appkey":appkey,
			    		"user_id":user_id,
						"mobileNo":mobile,
						 "isResendValidateCode":isResendValidateCode,
						 "idNo":idNo,
						 "realName":realName,
						 "bankCardNo":bankCardNo,
						 "bankCode":code
		    		},
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		console.log(JSON.stringify(msg))
//			    		alert(JSON.stringify(msg))
						if(msg.status==1){
							$('#sure').removeAttr("disabled");
							mui.toast(msg.msg);
						}else{
							if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"){
			    				mui.openWindow({
									id: "login.html",
									url: "login.html",
									styles: {
									top: '0',
									bottom: '0'
									
								},
								extras:{pageId:"myacount.html"}
								})
			    			}
							mui.toast(msg.msg);
						}
			    		
			    	},error:function(a,b,c){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		common.timeOut();//网络请求超时
			    	}
			});
		}
	})
	
	//确认签约
	mui('#sure')[0].addEventListener("tap",function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var validateCode = mui("#checkedNumber")[0].value;
		mui.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:"http://192.168.0.106/51fbao/api1.0/signConfirm",
		    	data:{
					"validateCode":validateCode,
					"appkey":appkey,
			    	"user_id":user_id,
	    		},
		    	success: function(msg){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		console.log(123)
		    		console.log(JSON.stringify(msg))
	//			    		alert(JSON.stringify(msg))
					if(msg.status==1){
						mui.openWindow({
							url:"paymoney.html",
							id:"paymoney.html",
							styles:{
								top:0,
								bottom:0
							},
							extras:{
								 bankName: bankName
							}
						})
						mui.toast(msg.msg);
					}else{
						if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"){
			    				mui.openWindow({
									id: "login.html",
									url: "login.html",
									styles: {
									top: '0',
									bottom: '0'
									
								},
								extras:{pageId:"myacount.html"}
								})
			    			}
						mui.toast(msg.msg);
					}
		    		
		    	},error:function(a,b,c){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		common.timeOut();//网络请求超时
		    	}
		});
		
		
	})
	
	})
	
	

})