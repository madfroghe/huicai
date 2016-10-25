define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	//验证交易密码
	var common = require('../major/common');
	mui.plusReady(function(){
		var self = plus.webview.currentWebview();
		var pageId = self.pageId;
		common.onNetChange("checkedtradepwd.html");//检测网络信号
		mui("#nextBtn")[0].addEventListener('tap',function(){
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var user_id = plus.storage.getItem("user_id");
			 var appkey = plus.storage.getItem("appkey");
			 var passwords = hex_md5(mui('#password')[0].value);
			 var url = getUrlParam()+"/verifyTradePassWord";
			 var datas = {"user_id":user_id,"appkey":appkey,"password":passwords};
			 common.timeOver();//请求超过10秒关闭等待框
			 //获取数据
			 $.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		if(msg.status==1){
	    			console.log(112)
					mui.openWindow({
						id:"addbankcard.html",
						url:"addbankcard.html",
						styles:{
							top:0,
							bottom:0
						},
						extras:{
								pageId:pageId
							}
					});	
	    		}else{	
	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
		    				mui.toast("登录超时，请重新登录")
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"checkedtradepwd.html"}
						})
		    		}else{
		    			mui.toast(msg.msg);
		    		}
		    			
	    		}
	    		
	    		console.log(JSON.stringify(msg));
	    		
	    	},error:function(e){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		common.timeOut();//网络请求超时
	    	}
		});
			 
			 
			
		})
		
		
		
		
	})
	
	


})