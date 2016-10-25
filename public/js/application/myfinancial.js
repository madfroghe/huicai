define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var types;
	var user_id;
	var appkey; 
	mui.plusReady(function(){
//		mui('.mui-scroll').scroll();
		user_id = plus.storage.getItem("user_id");
		appkey = plus.storage.getItem("appkey");
		//初始切换Tab
		var self = plus.webview.currentWebview();
			types = self.types;
			show(types);
			switch(types){
				case "0":
				standBox(types);
				$('.status').eq(0).addClass("active");
				$('.status').eq(0).siblings().removeClass('active');
				break;
				case "1":
				alreadyBox(types);
				$('.status').eq(1).addClass("active");
				$('.status').eq(1).siblings().removeClass('active');
				break;
				case "2":
				alreadyUse(types);
				$('.status').eq(2).addClass("active");
				$('.status').eq(2).siblings().removeClass('active');
				break
				case "3":
				finaMoney(types)
				$('.status').eq(3).addClass("active");
				$('.status').eq(3).siblings().removeClass('active');
				break
				
			}
		//切换Tab
		$('.status').on("tap",function(){
			var item = $(this);
			var staus =item.attr("status");
			item.addClass("active");
			item.siblings().removeClass("active");
			types =staus;
			
			show(staus);
			mui.back=function(){
				plus.webview.getWebviewById("myacount.html").show();
				plus.webview.currentWebview().hide();
			}
		})
		//跳转页面
		mui(".mui-scroll").on("tap",".look",function(){
			mui.openWindow({
				url:"pasmoney.html",
				id:"pasmoney.html",
				styles:{
					top:0,
					bottom:0
				}
			})
			
			
		})
		
		mui('#goinvert')[0].addEventListener("tap",function(){
			mui.openWindow({
				url:"a_invest_main.html",
				id:"a_invest_main.html",
				styles:{
					top:0,
					bottom:0
				}
			})
			setTimeout(function(){
				plus.webview.currentWebview().hide();
			},1000)
			
			
//			plus.webview.getWebviewById("invest_main.html").show();
//			var webviews = plus.webview.all();
//		    	  mui.each(webviews,function(i,item){
//		    	 	if(
//		    	 		item.getURL().indexOf("index_main.html")>0
//		    	 	  ||item.getURL().indexOf("myacount.html")>0
//		    	 	  ||item.getURL().indexOf("myfinancial.html")>0
//		    	 	){
//		    	 		item.hide();
//		    	 	}
//		    	 });
		})
		var flagShow=1;
		mui("#help")[0].addEventListener("tap",function(){
			if(flagShow==1){
				mui('#explain')[0].style.display="block";
				flagShow=0
			}else{
				mui('#explain')[0].style.display="none";
				flagShow=1;
			}
				
			})
		mui(".mui-table-view").on("tap",".activeInfo",function(){
			mui.openWindow({
				url:"a_invest_main.html",
				id:"a_invest_main.html",
				styles:{
					top:0,
					bottom:0
				}
			})
			setTimeout(function(){
				plus.webview.currentWebview().hide();
			},1000);
			
//			plus.webview.getWebviewById("invest_main.html").show();
//			var webviews = plus.webview.all();
//		    	  mui.each(webviews,function(i,item){
//		    	 	if(
//		    	 		item.getURL().indexOf("index_main.html")>0
//		    	 	  ||item.getURL().indexOf("myacount.html")>0
//		    	 	  ||item.getURL().indexOf("myfinancial.html")>0
//		    	 	){
//		    	 		item.hide();
//		    	 	}
//		    	 });
		})
	})
	
	function show(staus){
		switch(staus){
				case "0":
				standBox(staus);
				mui("#standBox")[0].style.display="block";
				mui("#alreadyBox")[0].style.display="none";
				mui("#alreadyUse")[0].style.display="none";
				mui("#finaMoney")[0].style.display="none";
				break;
				case "1":
				alreadyBox(staus);
				mui("#standBox")[0].style.display="none";
				mui("#alreadyBox")[0].style.display="block";
				mui("#alreadyUse")[0].style.display="none";
				mui("#finaMoney")[0].style.display="none";
				break;
				case "2":
				alreadyUse(staus);
				mui("#standBox")[0].style.display="none";
				mui("#alreadyBox")[0].style.display="none";
				mui("#alreadyUse")[0].style.display="block";
				mui("#finaMoney")[0].style.display="none";
				break;
				case "3":
				finaMoney(staus);
				mui("#standBox")[0].style.display="none";
				mui("#alreadyBox")[0].style.display="none";
				mui("#alreadyUse")[0].style.display="none";
				mui("#finaMoney")[0].style.display="block";
				break;
				
				
			}
	}
	
	function alreadyUse(types){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/userVirtualCash";
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:{
	    		"type":types,
	    		"user_id":user_id,
	    		"appkey":appkey
	    		
	    		
	    	},
	    	success: function(msg){
	    		nwaiting.close();
	    		console.log(JSON.stringify(msg));
	    		var box =mui('#box1')[0];
	    		var useMoney = mui('#useMoney')[0];
	    		if(msg.status==1){
	    			var data = msg.data;
	    			box.innerHTML='';
					var productInfo = data.info;
					console.log(JSON.stringify(productInfo));
					if(productInfo==null){
						mui.toast("暂时没有");
					}else{
						useMoney.innerHTML=data.hadUseTotal
					if(productInfo.length>0){
						for(var i=0;i<productInfo.length;i++){
							var item = productInfo[i];
							var li = document.createElement('li');
							li.className ='mui-table-view-cell info info1';
			//				li.attributes('orderId',item.orderId);
							var html ='';
							html='<div class="clearfix">';
							html+='<div>';	
							html+='<div class="clearfix">';		
							html+='<h5 class="mui-pull-left  c_333 f18" >'+item.product_name+'</h5>'			
							html+='<span class="c_ff7 mui-pull-right">'+item.buy_cash_total+'</span>'			
							html+='</div>'		
							html+='<div class="clearfix productInfo"  >'		
							html+='<div class="mui-pull-left">'			
							html+='<div class="money c_ff7">'+item.unit_price+'</div>'				
							html+='<div class="introduce c_999">起投资金</div>'				
							html+='</div>'			
							html+='<div class="mui-pull-left">'			
							html+='<div class="money f14">'+item.item_name+'</div>'				
							html+='<div class="introduce c_999">封闭期</div>'				
							html+='</div>'			
							html+='<div class="mui-pull-left">'			
							html+='<div class="money c_ff7 f16">'+item.annualized_return*100+'%</div>'				
							html+='<div class="introduce c_999">年化收益</div>'				
							html+='</div>'			
							html+='</div>'		
							html+='</div>'	
							html+='<div class="timeBox clearfix">'	
							html+='<div class="mui-pull-left">'		
							html+='<p>计息日：'+item.close_time_begin+'</p>'			
							html+='<p>还款日：'+item.close_time_end+'</p>'			
							html+='</div>'		
							html+='<div class="mui-pull-right tr">'		
							html+='<span>收益(元)</span><br />'			
							html+='<span class="c_ff7" style="line-height: 1.5rem;">'+item.userEaring+'</span>'			
							html+='</div>'		
							html+='</div>'	
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
	    		nwaiting.close();
	    		common.timeOut();//网络请求超时
	    	}
		});
	}
	//理财金收益
	function finaMoney(types){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/userVirtualCash";
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:{
	    		"type":types,
	    		"user_id":user_id,
	    		"appkey":appkey
	    		
	    		
	    	},
	    	success: function(msg){
	    		nwaiting.close();
	    		console.log(JSON.stringify(msg));
	    		var box =mui('#box2')[0];
	    		var useMoney = mui('#fina')[0];
	    		if(msg.status==1){
	    			var data = msg.data;
	    			box.innerHTML='';
					var productInfo = data.info;
					console.log(JSON.stringify(productInfo));
					if(productInfo==null){
						mui.toast("暂时没有");
						mui("#alreadyUse")[0].style.display="none";
					}else{
						useMoney.innerHTML=data.userEaringTotal
					if(productInfo.length>0){
						for(var i=0;i<productInfo.length;i++){
							var item = productInfo[i];
							var li = document.createElement('li');
							li.className ='mui-table-view-cell info info1';
			//				li.attributes('orderId',item.orderId);
							var html ='';
							html='<div class="clearfix">';
							html+='<div>';	
							html+='<div class="clearfix">';		
							html+='<h5 class="mui-pull-left  c_333 f18" >'+item.product_name+'</h5>'			
							html+='<span class="c_ff7 mui-pull-right">'+item.buy_cash_total+'</span>'			
							html+='</div>'		
							html+='<div class="clearfix productInfo"  >'		
							html+='<div class="mui-pull-left">'			
							html+='<div class="money c_ff7">'+item.unit_price+'</div>'				
							html+='<div class="introduce c_999">起投资金</div>'				
							html+='</div>'			
							html+='<div class="mui-pull-left">'			
							html+='<div class="money f14">'+item.item_name+'</div>'				
							html+='<div class="introduce c_999">封闭期</div>'				
							html+='</div>'			
							html+='<div class="mui-pull-left">'			
							html+='<div class="money c_ff7 f16">'+item.annualized_return*100+'%</div>'				
							html+='<div class="introduce c_999">年化收益</div>'				
							html+='</div>'			
							html+='</div>'		
							html+='</div>'	
							html+='<div class="timeBox clearfix">'	
							html+='<div class="mui-pull-left">'		
							html+='<p>计息日：'+item.close_time_begin+'</p>'			
							html+='<p>还款日：'+item.close_time_end+'</p>'			
							html+='</div>'		
							html+='<div class="mui-pull-right tr">'		
							html+='<span>收益(元)</span><br />'			
							html+='<span class="c_ff7" style="line-height: 1.5rem;">'+item.userEaring+'</span>'			
							html+='</div>'		
							html+='</div>'	
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
	    		nwaiting.close();
	    		common.timeOut();//网络请求超时
	    	}
		});
	}
	
	
	
	function standBox(types){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/userVirtualCash";
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:{
	    		"type":types,
	    		"user_id":user_id,
	    		"appkey":appkey
	    		
	    		
	    	},
	    	success: function(msg){
	    		nwaiting.close();
	    		console.log(JSON.stringify(msg));
	    		var box =mui('#box3')[0];
	    		var useMoney = mui('#standMoney')[0];
	    		if(msg.status==1){
	    			var data = msg.data;
	    			box.innerHTML='';
					var productInfo = data.info;
					console.log(JSON.stringify(productInfo));
					if(productInfo==null){
						mui.toast("暂时没有");
						mui("#standBox")[0].style.display="none";
					}else{
						useMoney.innerHTML=data.preActiveTotal
					if(productInfo.length>0){
						for(var i=0;i<productInfo.length;i++){
							var item = productInfo[i];
							var li = document.createElement('li');
							li.className ='mui-table-view-cell info preInfo';
							li.setAttribute("activeRuler",item.active_condition_desc);
			//				li.attributes('orderId',item.orderId);
							var html ='';
							html='<div class="clearfix">'
							html+='<h5 class="c_333 f18 mui-pull-left">'+item.title+'</h5>'	
							html+='<span class="newUserMoney mui-pull-right">'+item.cash+'</span>'	
							html+='</div>'
							html+='<div class="clearfix">'
							
							if(item.lose_time==null){
								html+='<h5 class="f12 mui-pull-left">'+item.active_condition_desc+'</h5>'
								html+='<span class="timeout mui-pull-right f12 " >'+item.create_time+'</span>'	
								html+='</div>'
							}else if(item.create_time==null){
								html+='<h5 class="f12 mui-pull-left">'+item.active_condition_desc+'</h5>'
								html+='<span class="timeout mui-pull-right f12 " id="timeout">'+item.lose_time+'过期</span>'	
								html+='</div>'
							}
							else{
								html+='<h5 class="f12 mui-pull-left">'+item.active_condition_desc+'</h5>'
//								html+='<span class="timeout mui-pull-right f12 " >'+item.lostTime+'过期</span>'	
								html+='</div>'
							}
							li.innerHTML=html;
							box.appendChild(li);
														
						}
//						mui(".mui-table-view").on("tap",".preInfo",function(){
//							var item =this;
//							var activeRuler =item.getAttribute("activeRuler");
//							mui("#activeRuler")[0].innerHTML=activeRuler;
//							mui("#ext_Cover")[0].style.display="block";
//							
//						})
//						mui("#sure_Btn")[0].addEventListener("tap",function(){
//							mui("#ext_Cover")[0].style.display="none";
//						})
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
	    		nwaiting.close();
	    		common.timeOut();//网络请求超时
	    	}
		});
	}
	
	
	function alreadyBox(types){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/userVirtualCash";
		//数据请求
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:{
	    		"type":types,
	    		"user_id":user_id,
	    		"appkey":appkey
	    		
	    		
	    	},
	    	success: function(msg){
	    		nwaiting.close();
	    		console.log(JSON.stringify(msg));
	    		var box =mui('#box4')[0];
	    		var useMoney = mui('#alreadyActive')[0];
	    		if(msg.status==1){
	    			var data = msg.data;
	    			box.innerHTML='';
					var productInfo = data.info;
					console.log(JSON.stringify(productInfo));
					if(productInfo==null){
						mui.toast("暂时没有");
						mui("#alreadyBox")[0].style.display="none"
					}else{
						useMoney.innerHTML=data.availableCash
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
							if(item.lose_time==null){
								html+='<h5 class="f12 mui-pull-left">'+item.desc+'</h5>'
								html+='<span class="timeout mui-pull-right f12 " >'+item.create_time+'</span>'	
								html+='</div>'
							}else if(item.create_time==null){
								html+='<h5 class="f12 mui-pull-left">'+item.desc+'</h5>'
								html+='<span class="timeout mui-pull-right f12 " id="timeout">'+item.lose_time+'过期</span>'	
								html+='</div>'
							}
							else{
								html+='<h5 class="f12 mui-pull-left">'+item.desc+'</h5>'
//								html+='<span class="timeout mui-pull-right f12 " >'+item.lostTime+'过期</span>'	
								html+='</div>'
							}
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
	    		nwaiting.close();
	    		common.timeOut();//网络请求超时
	    	}
		});
	}

})