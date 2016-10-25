define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		common.onNetChange("recharge.html");//检测网络信号
      		var user_id = plus.storage.getItem("user_id");
			var appkey = plus.storage.getItem("appkey");
			//获取账户余额
			var self = plus.webview.currentWebview();
      		var availableMoney = self.availableMoney;
      		$('#availableMoney').html(availableMoney);
      		$("#rechargeMoney").on("keyup",function(){
      			var rechargeMoney = mui('#rechargeMoney')[0];
      			clearNoNum(rechargeMoney)
      		})
	        //跳转充值页面
	        mui('#rechargeBtn')[0].addEventListener('tap',function(){
		        	var rechargeMoney = mui('#rechargeMoney')[0].value;
//		        	var re =/^[1-9]\$/
		        	plus.storage.setItem("rechargeMoney",rechargeMoney);
		        	if(mui('#rechargeMoney')[0].value==''){
		        		mui.toast("请输入充值金额");
		        	}
		        	 else if(Number(rechargeMoney)>0){
		        		mui.openWindow({
			        		url:"shengfutong.html",
			        		id:"shengfutong.html",
			        		styles:{
			        			top:"0px",
			        			bottom:0
			        		},
			        		extras:{
			        			money:rechargeMoney
			        		},
			        		createNew:true
			        		
			        		
			        	})
		        		plus.storage.setItem("rechargeMoney",rechargeMoney);
		        	}else{
		        		mui.toast("充值金额需大于零")
		        	}
	        })
	        //数字格式化
	        function clearNoNum(obj){
				obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
				obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
				obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
				obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
				obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
				}
      	});

})