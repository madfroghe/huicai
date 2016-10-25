//投资记录
define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	
	mui.init({
		pullRefresh: {
			container: '#good-list',
			up: {
				contentrefresh: '正在加载...',
				callback: randerpage
			}
		}
	});
	var choosePage=1;
	var user_id;
	var appkey; 
	mui.plusReady(function(){
		common.onNetChange("investmentrecord.html");//检测网络信号
		if(plus.os.name=="Android"){
 			mui('#good-list')[0].style.marginTop="0rem";
 		}else{
 			mui('#good-list')[0].style.marginTop="2.8rem";
 		}
		user_id = plus.storage.getItem("user_id");
		appkey = plus.storage.getItem("appkey");
		var table = mui('#image-text-list-ul')[0];
		table.innerHTML='';
		
		
	})
	setTimeout(function(){
		mui('#good-list').pullRefresh().pullupLoading();
	},300)
	//点击获取type值
	
	
	function randerpage(){
		var url = getUrlParam()+"/inverstRecord";
		var datas = {"user_id":user_id,"appkey":appkey,"p":choosePage,"pagesize":10};
		var table = mui('#image-text-list-ul')[0];
		
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		if(msg.status==1){
	    			var data = msg;
	    			var totalPages = data.data.page.totalPages;
					var productInfo = data.data.info;
					console.log(JSON.stringify(productInfo));
					if(productInfo==null){
						mui.toast("您尚未投资，去投资理财看看吧");
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
							li.className ='info';
			//				li.attributes('orderId',item.orderId);
							var html ='';
							html ='<div class="title clearfix">';
							html+='<span class="c_666">订单状态：</span>';
							html+='<span class="status c_e43" id='+item.orderId+'></span>';
							html+='<div class="clearfix">'
							html+='<p class="orderId mui-pull-left c_999">'+item.orderNum+'</p>';
							html+='<p class="orderId agreement mui-pull-right c_999" style="display:none" id='+item.orderId+item.pid+' pid='+item.pid+' piid='+item.id+'>查看《产品交易协议》</p>';
							html+='</div>'
							html+='</div>';			
							html+='<div class="contentBody clearfix">';
							html+='<div class="clearfix">';
		
							html+='<div class=" f14 c_666">'+item.productName+'</div>';
							html+='<div class=" f14 c_999">投资产品</div>';
							html+='</div>';	
							html+='<div class="clearfix">';
							
							html+='<div class=" f14 c_666">'+item.investMoney+'</div>';
							html+='<div class=" f14 c_999">投资金额</div>';
							html+='</div>';
							html+='<div class="clearfix ">';
							html+='<div class="f12 c_666">'+item.investTime+'</div><div class="f14 c_999">交易时间</div>';
							html+='</div>';
							html+='</div>'	
			//				alert(item.investStatus);
							if(item.investStatus==2){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="收益中";
								$("#"+item.orderId+item.pid)[0].style.display="block";
								
							}else if(item.investStatus==3){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="已回款";
								
							}else if(item.investStatus==4){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="去付款";
							}else if(item.investStatus==5){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="已收益";
								$("#"+item.orderId+item.pid)[0].style.display="block";
							}
							else{
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="募集中";
							}
							
														
						}
						choosePage=choosePage+1;
			//			mui('#good-list').pullRefresh().endPullupToRefresh(false);
						mui(".info").on("tap",".agreement",function(){
							mui.openWindow({
								url:"buyagreement.html.html",
								id:"buyagreement.html.html",
								styles:{
									top:0,
									bottom:0
								},
								extras:{
									tag:getUrlParam()+"/agreement.html?user_id="+user_id+"&appkey="+appkey+"&pid="+pid+"&piid="+piid
								}
							})
							var urls = getUrlParam()+"/agreement";
							var pid=this.getAttribute("pid");
							var piid=this.getAttribute("piid");
							var datas = {"user_id":user_id,"appkey":appkey,"pid":pid,"piid":piid};
//							$.ajax({
//								type:"get",
//								contentType:"application/json",
//								dataType:"json",
//							  	url:urls,
//						    	data:datas,
//						    	success:function(msg){
//						    		console.log(JSON.stringify(parent(msg)));
//						    	},error:function(e){
//						    		console.log(JSON.stringify(e))
//						    	}
//						    })
						})
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
							extras:{pageId:"investmentrecord.html"}
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
		
})