//体现记录
define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var user_id;
	var appkey;
	var choosePage=1;
	var types=0;//状态标识
	mui.plusReady(function(){
		common.onNetChange("reflrecord.html");//检测网络信号
		if(plus.os.name=="Android"){
 			mui('#good-list')[0].style.marginTop="2.3rem";
 		}else{
 			mui('#good-list')[0].style.marginTop="5rem";
 		}
		
		
		var table = mui('#image-text-list-ul')[0];
		table.innerHTML='';
		 user_id = plus.storage.getItem("user_id");
		 appkey = plus.storage.getItem("appkey");
		 
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
	
	//监听按钮点击事件
	mui('.menus').on("tap","span",function(){
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

	//页面渲染
	function randerpage(){
		 var url = getUrlParam()+"/withdrawRecord";//提现记录Url
		var datas = {"user_id":user_id,"appkey":appkey,"pagesize":10,"p":choosePage,"type":types};
//		var data = common.myAjax(url,datas,"get","myinvestmentlist.html");
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
					var totalPages = data.data.page.totalPages;
					var productInfo = data.data.info;
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
							html+='<h4 class="mui-pull-left c_ff6">'+item.applyTime+'</h4>';			
							html+='</div>';	
							html+='<div class="contentBody clearfix">';
							html+='<div class="mui-pull-left">';
							html+='<p>提现银行： <span>'+item.applyBank+'</span></p>';
							html+='<p>提现卡号：<span>'+item.applyBankNo+'</span></p>';
							html+='<p>提现金额：<span class="c_c22">'+item.applyMoney+'</span></p>';
							html+='</div>';
							html+='<span class="status mui-pull-right" id='+item.id+'></span>';
							html+='</div>'	;						
							if(item.status==2){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.id)[0].innerHTML ="处理中"
								
							}else if(item.status==3){
								{li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.id)[0].innerHTML ="成功"}
								
							}else if(item.status==4){
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.id)[0].innerHTML ="失败"
							}
							else{
								li.innerHTML =html;
								table.appendChild(li);
								mui("#"+item.id)[0].innerHTML ="请求中"
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
							extras:{pageId:"reflrecord.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
	    		}
	    		
	    		
	    	},error:function(e){
	    		common.timeOut();//网络请求超时
	    	}
		});
		
			
		
	}

})