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
	setTimeout(function(){
		mui('#good-list').pullRefresh().pullupLoading();
	},300);
	//点击获取type值
	var types=0;
	var choosePage=1;
	var user_id;
	var appkey;
	mui.plusReady(function(){
		common.onNetChange("myinvestmentlist.html");//检测网络信号
		var self = plus.webview.currentWebview();
			types = self.status;
			switch(types){
				case "1":
				$('.status').eq(2).addClass("active");
				$('.status').eq(2).siblings().removeClass('active');
				break;
				case "2":
				$('.status').eq(3).addClass("active");
				$('.status').eq(3).siblings().removeClass('active');
				break;
				case "3":
				$('.status').eq(1).addClass("active");
				$('.status').eq(1).siblings().removeClass('active');
				break
				
			}
		if(plus.os.name=="Android"){
 			mui('#good-list')[0].style.marginTop="2.3rem";
 		}else{
 			mui('#good-list')[0].style.marginTop="4rem";
 		}
		
		
		
		
		user_id = plus.storage.getItem("user_id");
		appkey = plus.storage.getItem("appkey");
	})
	mui('.menu').on("tap","span",function(){
		var table = mui('#image-text-list-ul')[0];
		table.innerHTML='';
		var btn =mui('span');
		for(var i=0;i<btn.length;i++){
			btn[i].className = "";
		}
		types = this.getAttribute("status");
		this.className = "active";
		mui('#good-list').pullRefresh().refresh(true);
		choosePage=1;
		randerpage();
		
	})
	
	function randerpage(type){
		var url = getUrlParam()+"/myInvestRecord";
		
		var datas = {"user_id":user_id,"appkey":appkey,"pagesize":10,"p":choosePage,"type":types};
		var table = mui('#image-text-list-ul')[0];
		//数据请求
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		if(msg.status==1){
	    			var data = msg;
	    			console.log(JSON.stringify(msg));
	    			var totalPages = data.data.page.totalPages;
					var productInfo = data.data.info;
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
							li.className ='mui-table-view-cell info';
							var accumulativeMoney = item.makeMoney+"";
		    			var money =accumulativeMoney.substring(0,accumulativeMoney.indexOf(".")+3);
			//				li.attributes('orderId',item.orderId);
							var html ='';
							html='<div class="title clearfix">';
							html+='<h4 class="mui-pull-left">'+item.productName+'</h4>';
							html+='<span class="status mui-pull-right" id='+item.orderId+' status ='+item.investStatus+'>已收益</span>';
							html+='</div>';
							html+='<div class="contentBody clearfix">';
							html+='<div class="mui-pull-left">';
							html+='<p>投资金额</p>';
							html+='<p>'+item.investMoney+'</p>';
							html+='</div>';
							html+='<div class="mui-pull-left" style="border-left: 1px solid #000;border-right: 1px solid #000;">';
							html+='<p>收益率</p>';
							html+='<p>'+item.yeild+'%</p>';
							html+='</div>'
							html+='<div class="mui-pull-left">';
							html+='<p>总收益(元)</p>';
							html+='<p>'+money+'</p>';
							html+='</div>';
							html+='</div>';
							html+='<div>';
							html+='<span class="f12">计息日：</span><span class="f12">'+item.startTime+'</span>';
							html+='&nbsp;&nbsp;'
							html+='<span class="f12">到期日期：</span><span class="f12">'+item.endTime+'</span>';			
							html+='</div>';
							if(item.investStatus==2){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="收益中"
								
							}else if(item.investStatus==3){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="已收益"
								
							}else{
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.orderId)[0].innerHTML ="待计算收益"
							}
														
						}
						
					}
					choosePage=choosePage+1;
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
							extras:{pageId:"myinvestmentlist.html"}
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
	
	//跳转到投资记录
	mui('#recharge')[0].addEventListener('tap',function(){
//		alert(11)
		mui.openWindow({
			id: "investmentrecord.html",
			url: "investmentrecord.html",
			styles: {
			top: '0',
			bottom: '0'
			
			}
		})
	})
	
	
	
})