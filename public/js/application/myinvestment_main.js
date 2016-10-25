//我的投资

define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		common.onNetChange("myinvestment.html");//检测网络信号
		pageInfo();
	})
	
	function pageInfo(){
		
		var url = getUrlParam()+"/myInvestInfo";
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var datas = {"user_id":user_id,"appkey":appkey};
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
//	    	mui.toast(msg.msg)
	    		if(msg.status==1){
	    			var data = msg;
	    			var totalEarnings = data.data.totalEarnings;
					var hasBenefitsProject =data.data.hasBenefitsProject;
					var earningsProject =data.data.earningsProject;
					var financingProject =data.data.financingProject;
					var totalInvestMoney =data.data.totalInvestMoney;
					$('#total').html(totalEarnings);
					$('#totalInvest').html(totalInvestMoney);
					$('#hasBene').html(hasBenefitsProject);
					$('#financing').html(financingProject);
					$('#earnings').html(earningsProject);
	    			
	    		}else{
	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
	    				mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"myinvestment.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
	    		}
	    		
	    		console.log(JSON.stringify(msg));
	    		
	    	},error:function(e){
	    		common.timeOut();//网络请求超时
	    	}
		});
		
	}
	mui('.mui-table-view-cell').on('tap','.btnLook',function(){
		var status = this.getAttribute("status"); 
		mui.openWindow({
			id:"myinvestmentlist.html",
			url:"myinvestmentlist.html",
			styles:{
				top:0,
				bottom:0
			},
			extras:{
				status:status
			}
		})
	})
	
	
	
})