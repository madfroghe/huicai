define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');

	mui.plusReady(function(){
		mui('.mui-scroll-wrapper').scroll();
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		//数据获取
		var url = getUrlParam()+"/loseVirtualCash";
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:{
	    		"user_id":user_id,
	    		"appkey":appkey
	    		
	    		
	    	},
	    	success: function(msg){
	    		console.log(JSON.stringify(msg));
	    		var box =mui('#image-text-list-ul')[0];
	    		if(msg.status==1){
	    			var data = msg.data;
	    			box.innerHTML='';
					var productInfo = data.info;
					console.log(JSON.stringify(productInfo));
					if(productInfo==null){
						mui.toast("暂时没有");
						mui("#alreadyBox")[0].style.display="none";
					}else{
					if(productInfo.length>0){
						for(var i=0;i<productInfo.length;i++){
							var item = productInfo[i];
							var li = document.createElement('li');
							li.className ='mui-table-view-cell info info1 activeInfo';
			//				li.attributes('orderId',item.orderId);
							var html ='';
							html='<div class="clearfix">'
							html+='<h5 class="c_333 f18 mui-pull-left">'+item.title+'</h5>'	
							html+='<span class="newUserMoney mui-pull-right">'+item.cash+'</span>'	
							html+='</div>'
							html+='<div class="clearfix">'
							html+='<h5 class="f12 mui-pull-left">'+item.desc+'</h5>'
							html+='<span class="timeout mui-pull-right f12 " >过期</span>'
							html+='</div>'
							li.innerHTML=html;
							box.appendChild(li);
														
						}
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
							extras:{pageId:"myfinancial.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
	    		}
	    		
	    		
	    	},error:function(e){
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
		
	})

})