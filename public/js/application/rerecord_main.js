//充值记录
define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var user_id;
	var appkey;
	var choosePage=1
	mui.plusReady(function(){
		common.onNetChange("rerecord.html");//检测网络信号
		 user_id = plus.storage.getItem("user_id");
		 appkey = plus.storage.getItem("appkey");
		 url = getUrlParam()+"/rechargeRecord";//提现记录Url
//		 var table = mui('#image-text-list-ul')[0];
//			table.innerHTML=''
	})
	mui.init({
		pullRefresh: {
			container: '#good-list',
			up: {
				contentrefresh: '正在加载...',
				callback: randerpage
			}
		}
	});
	setTimeout(function(){
		mui('#good-list').pullRefresh().pullupLoading();
	},300)
	
	//页面渲染
	function randerpage(){
		var datas = {"user_id":user_id,"appkey":appkey,"p":choosePage,"pagesize":10};
		var table = mui('#image-text-list-ul')[0];
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:url,
	    	data:datas,
	    	success: function(msg){
//	    	mui.toast(msg.msg)
	    		if(msg.status==1){
	    			var data = msg;
					var totalPages = data.data.page.totalPages;
					var productInfo = data.data.info
					if(productInfo==null){
						mui.toast("没有记录");
						mui('#good-list').pullRefresh().endPullupToRefresh(true);
					}else{
						if(productInfo.length>0){
							if(choosePage>totalPages){
									mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
									return false;
								}else{
									mui('#good-list').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
								}
							for(var i=0;i<productInfo.length;i++){
								var item = productInfo[i];
								var li = document.createElement('li');
								li.className ='mui-table-view-cell info';
				//				li.attributes('orderId',item.orderId);
								var html ='';
								html='<div class="title clearfix">';
								html+='<h4 class="mui-pull-left c_ff6">'+item.createTime+'</h4>';			
								html+='</div>';	
								html+='<div class="contentBody clearfix">';
								html+='<div class="mui-pull-left">';
								html+='<p>记录编号：<span>'+item.id+'</span></p>';
								html+='<p>充值金额：<span class="c_c22">'+item.accountCashIn+'</span></p>';
								html+='</div>';
								html+='</div>'	;						
								li.innerHTML =html;
								table.appendChild(li);	
								
							}
							choosePage=choosePage+1;
						}
					}
	    			
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
							extras:{pageId:"rerecord.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
	    		}
	    		
	    		console.log(JSON.stringify(msg))
	    		
	    	},error:function(e){
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
		
//		table.innerHTML=''
		
//		
		
	}
})