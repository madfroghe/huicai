define(function(require, exports, module) {
	var common = require('../major/common');
	
	mui.plusReady(function(){
		var orderNo =1;
		var url = getUrlParam()+"/recharge";
		var money = plus.storage.getItem("rechargeMoney");//获取充值金额
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		
//		//确认充值
//		mui("#sureBtn")[0].addEventListener('tap',function(){
//			var paytool =document.body.querySelectorAll(".mui-selected");
////			if(paytool[0].id=="shenFuTong"){
//				mui('#middlePopover').popover('toggle');
////			}
//			
//			
//		})
//		//取消支付
//			mui('#cancel')[0].addEventListener('tap',function(){
//				mui('#middlePopover').popover('toggle');
//				mui('#trdePwd')[0].value = '';
//				
//			})
//			
//			//忘记交易密码
//		mui('#forgetTrade')[0].addEventListener('tap',function(){
//			
//			mui.openWindow({
//				id:"passwo_b.html",
//				url:"passwo_b.html",
//				styles:{
//					top:0,
//					bottom:0
//				}
//			})
//			
//		})
	
	//验证交易密码
		mui('#sureBtn')[0].addEventListener('tap',function(){
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var urls =getUrlParam()+"/checkCode";
//			var tradePwd = hex_md5(mui('#trdePwd')[0].value);
			mui.ajax({
				type:"get",
				url:urls,
				async:true,
				data:{
					"user_id":user_id,
					"appkey":appkey
				},
				success:function(msg){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					mui('#trdePwd')[0].value="";
					var data = JSON.parse(msg);
					console.log(JSON.stringify(JSON.parse(msg)));
					if(data.status){
						var is_sign_card =data.data.is_sign_card;
						if(is_sign_card==1){
							mui.openWindow({
							url:"pay.html",
							id:"pay.html",
							styles:{
								top:0,
								bottom:0
							},
							createNew:true
						})
						}else{
							mui.openWindow({
							url:"choosebank.html",
							id:"choosebank.html",
							styles:{
								top:0,
								bottom:0
							},
							createNew:true
						})
						}
					}else{
						if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
	    				mui.toast("登录超时，请重新登录");
	    				mui.openWindow({
							id: "login.html",
							url: "login.html",
							styles: {
							top: '0',
							bottom: '0'
							
						},
						extras:{pageId:"shengfutong.html"}
						})
	    			}else{
	    				mui.toast(data.msg);
	    			}
	    			
					}
				},error:function(){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					common.timeOut();//网络请求超时
				}
			});
			
		})
			
		
	})
	
	
	

})