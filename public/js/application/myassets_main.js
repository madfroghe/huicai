//我的资产

define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		common.onNetChange("myassets.html");//检测网络信号
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
	var url = getUrlParam();
	var user_id = plus.storage.getItem("user_id");
	var appkey = plus.storage.getItem("appkey");
	$.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:url+"/personalAssets",
		    	data:{
					"user_id":user_id,
					 "appkey":appkey
					
	    		},
		    	success: function(data){
		    		nwaiting.close();
		    		console.log(JSON.stringify(data))
		    		if(data.status==1){
		    			var total = $('#totalAssets');
		    			var available =$('#availableMoney');
		    			var waitM =$('#waitMoney');
		    			var waitP =$('#waitPrincipal');
		    			var freez =$('#freezeMoney');
		    			var dataInfo = data.data;
		    			var totalAssets =dataInfo.totalAssets;
		    			var availableMoney =dataInfo.availableMoney;
		    			var waitMoney =dataInfo.waitMoney;
		    			var freezeMoney =dataInfo.freezeMoney;
		    			var waitPrincipal = dataInfo.waitPrincipal;
		    			freez.html(freezeMoney);
		    			total.html(totalAssets);
		    			available.html(availableMoney);
		    			waitM.html(waitMoney);
		    			waitP.html(waitPrincipal);
		    			
		    			
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
							extras:{pageId:"myassets.html"}
							})
		    			}else{
		    				mui.toast(data.msg);
		    			}
		    			
		    		}
		    	},error:function(e){
		    		nwaiting.close();
		    		common.timeOut();//网络请求超时
		    	}
		    	
		    	
		});
	
	})
	
	//跳转到充值页面
	mui('#recharge')[0].addEventListener('tap',function(){
		mui.openWindow({
			id:"recharge.html",
			url:"recharge.html",
			styles:{
				top:0,
				bottom:0
			},
			createNew:true
		})
		
		
	})
	
	//跳转到提现页面
	mui('#draw')[0].addEventListener('tap',function(){
		mui.openWindow({
			id:"withdraw.html",
			url:"withdraw.html",
			styles:{
				top:0,
				bottom:0
			},
			createNew:true
		})
		
		
	})
	
	
	
})