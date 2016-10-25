define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
//	mui.init({
//	  pullRefresh : {
//	    container:"#good-list",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
//	    up : { 
//	      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//	      callback :getMyBank //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
//	    }
//	  } 
//	});
	
	var url =getUrlParam();
	mui.plusReady(function(){
		
		$("#surePay").removeAttr("disabled");
		var sessionToken;
		var orderNumber;
		var bankIds;
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var amount = plus.storage.getItem("rechargeMoney");
		mui("#rechargeMoney")[0].innerHTML =amount; 
	//获取银行卡列表
	//定时器 自动执行下拉操作
	getMyBank();
//		setTimeout(function(){
//			mui('#good-list').pullRefresh().pullupLoading();
//		},50)
	//获取订单号
	var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
//	setTimeout(function(){
		mui.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:url+"/createPaymentOrder",
		    	data:{
		    		"appkey":appkey,
		    		"user_id":user_id,
		    		'amount':amount
	    		},
		    	success: function(msg){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		console.log(1234);
		    		console.log(JSON.stringify(msg))
	//			    		alert(JSON.stringify(msg))
					if(msg.status==1){
						sessionToken = msg.data.sessionToken;
						orderNumber = msg.data.merchantOrderNo;
						mui.toast(msg.msg);
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
							extras:{pageId:"myacount.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
						
					}
		    		
		    	},error:function(a,b,c){
		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		common.timeOut();//网络请求超时
		    	}
		});
//	},1000)
		
		
		
		//获取验证码
	var flag = 1//是否为重发消息
	mui('#getBtn')[0].addEventListener('tap',function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		if(flag ==1){
			var isResendValidateCode =false;
			flag = 0;
		}else{
			var isResendValidateCode =true;
		}
		
//		alert(mobile);
//		var url = getUrlParam()
//		if(common.checkedPhone(mobile)){
			var timer=null;
			var i=60;
			timer = setInterval(function(){
				i-=1;
				$("#getBtn").attr("disabled","disabled");
				mui('#getBtn')[0].innerHTML = "("+i+"s)重新发送";
				if(i==0){
				clearInterval(timer);
				
				mui('#getBtn')[0].innerHTML = "获取验证码";
				$("#getBtn").removeAttr("disabled");
				}
			},1000);
			mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:url+"/paymentPrecheck",
			    	data:{
			    		"appkey":appkey,
			    		"user_id":user_id,
			    		"isResendValidateCode":isResendValidateCode,
						"sessionToken":sessionToken,
						 "merchantOrderNo":orderNumber,
						 "id":bankIds
		    		}, 
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		console.log(JSON.stringify(msg))
//			    		alert(JSON.stringify(msg))
						if(msg.status==1){
							mui.toast(msg.msg);
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
								extras:{pageId:"pay.html"}
								})
			    			}else{
			    				mui.toast(msg.msg);
			    			}
							
						}
			    		
			    	},error:function(a,b,c){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		common.timeOut();//网络请求超时
			    	}
			});
//		}
	})
		
		//确认支付
		mui('#surePay')[0].addEventListener("tap",function(){
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var checkedNumber = mui("#checkedNumber")[0].value;
			if(checkedNumber==''){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("验证码不能为空");
			}else{
				mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:url+"/paymentConfirm",
			    	data:{
			    		"appkey":appkey,
			    		"user_id":user_id,
			    		'sessionToken':sessionToken,
			    		"validateCode":checkedNumber
		    		},
			    	success: function(msg){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		console.log(1234);
			    		console.log(JSON.stringify(msg));
						if(msg.status==1){
							mui.openWindow({
								url:"rechargesuccess.html",
								id:"rechargesuccess.html",
								styles:{
									top:0,
									bottom:0
								}
							})
							mui.toast(msg.msg);
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
								extras:{pageId:"pay.html"}
								})
			    			}else{
			    				mui.toast(msg.msg);
			    				mui.openWindow({
								url:"rechargefalse.html",
								id:"rechargefalse.html",
								styles:{
									top:0,
									bottom:0
								}
							})
			    				setTimeout(function(){
			    					plus.webview.currentWebview().hide();
			    				},1000)
			    			}
							
						}
			    		
			    	},error:function(e){
			    		console.log(125);
			    		console.log(JSON.stringify(e));
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		common.timeOut();//网络请求超时
			    	}
			});
			}
			
		})
		
		mui('#bankCard')[0].addEventListener("tap",function(){
			mui('#middlePopover').popover('toggle');
		})
		
		//跳转到更多银行卡页面
		mui("#chooseMore")[0].addEventListener("tap",function(){
			mui('#middlePopover').popover('toggle');
			mui.openWindow({
				url:"choosebank.html",
				id:"choosebank.html",
				styles:{
					top:0,
					bottom:0
				}
			})
			
		})
		
		
		//监听阅读时间
	mui('#check')[0].addEventListener('change',function(){
		var value = this.checked?"true":"false";
		if(value=='true'){
			$("#surePay").removeAttr("disabled");
		}else{
			$('#surePay').attr('disabled',"disabled");
		}
//		var che = mui('#check')[0].getAttribute('checked');
//		alert(che)
		
	})
	
	//获取个人银行列表
	function getMyBank(){
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		mui.ajax({
				type: "get",
					contentType:"application/json",
					dataType:"json",
				  	url:url+"/getUserPaySign",
			    	data:{
			    		"appkey":appkey,
			    		"user_id":user_id
		    		},
			    	success: function(msg){
			    		var bankBox = mui("#mui-list")[0];
			    		bankBox.innerHTML='';
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
			    		console.log(1233);
			    		console.log(JSON.stringify(msg))
						if(msg.status==1){
							if(msg.data.length>0){
								mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
								for(var i=0;i<msg.data.length;i++){
									var item =msg.data[i];
									if(i==0){
										bankIds =item.id;
										mui('#bankInfo')[0].innerHTML=''
										var html ='';
							    		html='<span class="bankName">'+item.bankName+'</span>|';
										html+='<span class="bankcode">'+item.bankCardNo+'</span>|'; 
										html+='<span class="bankClass">储蓄卡</span>';
										mui('#bankInfo')[0].innerHTML=html;
									}
				    				
				    				var li =document.createElement('li');
				    				li.className ="mui-table-view-cell clearfix info"
						    		li.setAttribute("id",item.id);
						    		var html ='';
						    		html='<span class="bankName">'+item.bankName+'</span>|';
									html+='<span class="bankcode">'+item.bankCardNo+'</span>|'; 
									html+='<span class="bankClass">储蓄卡</span>';
									li.innerHTML=html;
									bankBox.appendChild(li);
			    				}
								//获取银行卡信息
								mui('.mui-table-view').on('tap','.info',function(){
									bankIds = this.getAttribute("id");
									mui('#bankInfo')[0].innerHTML=this.innerHTML;
						//				bankId = this.getAttribute("banks");
									mui('#middlePopover').popover('toggle');
								})
														
							}
							mui.toast(msg.msg);
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
								extras:{pageId:"myacount.html"}
								})
			    			}else{
			    				mui.toast(msg.msg);
			    			}
							
						}
			    		
			    	},error:function(a,b,c){
			    		nwaiting.close(); //新webview的载入完毕后关闭等待框
			    		common.timeOut();//网络请求超时
			    	}
			});
	}
		
	})
	
	
})