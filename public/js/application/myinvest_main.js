//我要投资
define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var unitPrice;
	var unit_price;
	mui.plusReady(function(){
		var screenHeight = plus.screen.resolutionHeight;
		mui("#covers")[0].style.height=(screenHeight+15)+'px';
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		
		Date.prototype.Format = function(fmt)   
		{ //author: meizz   
		  var o = {   
		    "M+" : this.getMonth()+1,                 //月份   
		    "d+" : this.getDate(),                    //日   
		    "h+" : this.getHours(),                   //小时   
		    "m+" : this.getMinutes(),                 //分   
		    "s+" : this.getSeconds(),                 //秒   
		    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
		    "S"  : this.getMilliseconds()             //毫秒   
		  };   
		  if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		  for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		  return fmt;   
		} 
		var self = plus.webview.currentWebview();
		 var goodId = self.goodId;//产品Id;
		 var piId
		 var url = getUrlParam()+"/productDetails";
		var datas = {"pid":goodId};
		
		
		common.onNetChange("myinvest.html");//检测网络信号
		//获取账户余额
		 
		 var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		
		var urls = getUrlParam();
//		var urls = "http://192.168.3.108:81/huicai/api2.0/index.php/User"
//		var urls = "http://192.168.3.135:81/huicai/api2.0/index.php/User"
		//验证用户是否认证
		var isSetRealName;
		var isValidMail;
		var isSetTradePassword;
  		mui.ajax({
				type: "get",
			    dataType: "json",
			    url:urls+"/checkBindCardAndPsw",
			    data:{
			    	user_id:user_id,
			    	appkey:appkey
			    }, 
			    success:function(data){ 
			    	console.log(JSON.stringify(data));
			    	if(data.status==1){
			    		if(data.data.code==2006){
							//绑定银行卡
							mui.toast("请先绑定银行卡,绑卡需充值0.01元!");
							mui.openWindow({
								url:"choosebank.html",
								id:"choosebank.html",
								styles:{
									top:0,
									bottom:0
								},
								waiting:{
									autoShow:true
								},
								extras:{
									pageId:"myinvest.html"
								}
							})
							setTimeout(function(){
								plus.webview.currentWebview().hide();
							},500)
						}else if(data.data.code==2007){
							//设置交易密码
							mui.toast("请先设置交易密码");
							mui.openWindow({
								url:"passwo.html",
								id:"passwo.html",
								styles:{
									top:0,
									bottom:0
								},
								waiting:{
									autoShow:true
								},
								extras:{
									pageId:"myinvest.html"
								}
							})
							setTimeout(function(){
								plus.webview.currentWebview().hide();
							},500)
						
				    	}else if(data.data.code==100){
				    		
				    		setTimeout(function(){
								getAvribel(user_id,appkey);
							},100)
				    		
				    		//绑定数据
							$.ajax({
								type:"get",
								contentType:"application/json",
								dataType:"json",
							  	url:url,
						    	data:datas,
						    	success: function(msg){
						    		$("#sureBtn").removeAttr("disabled");
						    		nwaiting.close();
						    		console.log(12);
						    		console.log(JSON.stringify(msg));
						    		if(msg.status==1){
						    			var data = msg;
						    			var item = data.data;
										//绑定页面数据
										var closeBegin = item.item[0].close_time_begin.slice(0,10);//计息时间
										 var closeEnd = item.item[0].close_time_end.slice(0,10);//归还时间
										 var annualized_return = Number(item.item[0].annualized_return)/100//年化收益
										 mui("#retureyiid")[0].innerHTML=item.item[0].annualized_return_show;
										 var item_name = item.item[0].item_name.slice(0,2)//投资周期
										 mui("#time")[0].innerHTML=item.item[0].item_name
										 piId = item.item[0].id;//子产品id
										  unitPrice = item.item[0].limit_cash_buy;//项目最大投资金额
										  mui("#buyNow")[0].innerHTML=common.formatNum(unitPrice);
										  unit_price =item.item[0].unit_price;
										  mui("#invsetMoney")[0].setAttribute("placeholder",""+unit_price+"元起投");
										 var productName = item.product_name;
										 var days = Number(item.item[0].product_close_days);//投资天数
										 var yearRutrun = days/365;
										 var beginTime = item.buy_time_begin;//开始购时间
										var endTime = item.buy_time_end;//结束购时间
										var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");//系统当前时间  
										 $('#closeEnd').html(closeEnd);
										 $('#closeBegin').html(closeBegin);
										 $('#productName').html(productName);
										 $('#unitPrice').html(unitPrice);//项目最大投资金额
//										 plus.webview.currentWebview().show();
										 if(time2>endTime){
											mui.toast('购买时间已结束')
											$("#sureBtn").attr('disabled','disabled');
										}else if(time2<beginTime){
											mui.toast("亲，敬请期待哟！");
											$("#sureBtn").attr('disabled','disabled');
										}else{
											$("#sureBtn").removeAttr("disabled");
										}
										 //监听投资金额变化改变到期本息信息
										$('#invsetMoney').on('keyup',function(){
											var invsetMoney =Number($('#invsetMoney').val());
											var tmp=invsetMoney*annualized_return*yearRutrun+invsetMoney+""; 
											var result =tmp.substring(0,tmp.indexOf(".")+3);
											$('#returnMoney').val(result);
										});
										mui('#invsetMoney')[0].addEventListener('change',function(){
											var invsetMoney =Number($('#invsetMoney').val());
											var tmp=invsetMoney*annualized_return*yearRutrun+invsetMoney+""; 
											var result =tmp.substring(0,tmp.indexOf(".")+3);
											$('#returnMoney').val(result);
										})
						    		}else{
						    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
					//	    				mui.toast("请登录后操作")
												nwaiting.close();
							    				mui.openWindow({
													id: "login.html",
													url: "login.html",
													styles: {
													top: '0',
													bottom: '0'
													
												},
												extras:{pageId:"myinvest.html"}
												})
							    				setTimeout(function(){
							    					plus.webview.currentWebview().hide();
							    				},1000)
							    		}else if(data.msg=="用户不存在"){
							    			nwaiting.close();
						    				mui.toast("您还没登录，投资请先登录");
							    				mui.openWindow({
													id: "login.html",
													url: "login.html",
													styles: {
													top: '0',
													bottom: '0'
													
												},
												createNew:true,
												extras:{pageId:"myinvest.html"}
												
												})
							    				setTimeout(function(){
							    					plus.webview.currentWebview().hide();
							    				},1000)
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
			    	}else{
			    		
			    		mui.toast(data.msg);
			    	
			    		 if(data.msg=="缺少用户唯一编码"||data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
		    				mui.toast("您还没登录，投资请先登录");
		    				
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							 show:{
						      autoShow:true,//页面loaded事件发生后自动显示，默认为true
						      aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
						      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
						   },
							extras:{pageId:"myinvest.html"}
							})
		    				setTimeout(function(){
		    					plus.webview.currentWebview().hide();
		    				},1000)
		    				
		    			}else if(data.msg=="用户不存在"){
		    				
		    				mui.toast("您还没登录，投资请先登录");
			    				mui.openWindow({
									id: "login.html",
									url: "login.html",
									styles: {
									top: '0',
									bottom: '0'
									
								},
								createNew:true,
								extras:{pageId:"myinvest.html"}
								})
			    				setTimeout(function(){
		    					plus.webview.currentWebview().hide();
		    				},1000)
			    				
		    			}
			    	
			    	}
				    
			    },
			    error:function(e){
			    	
			    	console.log("er=="+JSON.stringify(e))
			    }
			     
  		})
		
		
		
		
		 
		 
		 
		 
		 
		 
//		 var closeBegin = self.closeBegin;//计息时间
//		 var closeEnd = self.closeEnd;//归还时间
//		 var annualized_return = self.annualized_return//年化收益
//		 var item_name = Number(self.item_name)//投资周期
//		 var piId = self.piId;//子产品id
//		 var unitPrice = self.unitPrice;//起投金额
//		 var productName = self.productName;
//		 var days = Number(self.days);//投资天数
//		 var yearRutrun = days/365;
//		 $('#closeEnd').html(closeEnd);
//		 $('#closeBegin').html(closeBegin);
//		 $('#productName').html(productName);
//		 $('#unitPrice').html(unitPrice);//项目最大投资金额
//		 //监听投资金额变化改变到期本息信息
//		$('#invsetMoney').on('keyup',function(){
//			var invsetMoney =Number($('#invsetMoney').val());
//			var tmp=invsetMoney*annualized_return*yearRutrun+invsetMoney+""; 
//			var result =tmp.substring(0,tmp.indexOf(".")+3);
//			$('#returnMoney').val(result);
//		});
//		mui('#invsetMoney')[0].addEventListener('change',function(){
//			var invsetMoney =Number($('#invsetMoney').val());
//			var tmp=invsetMoney*annualized_return*yearRutrun+invsetMoney+""; 
//			var result =tmp.substring(0,tmp.indexOf(".")+3);
//			$('#returnMoney').val(result);
//		})
//		
		//确定投资
		mui('#sureBtn')[0].addEventListener('tap',function(){
			
			var invsetMoney = $('#invsetMoney').val();//投资金额
			if(invsetMoney==''){
				mui.toast("请输入投资金额");
			}
			else if(Number(invsetMoney)<0){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("投资金额必须大于零");
				$('#invsetMoney').val("");
				$('#returnMoney').val("");
			}
			else if(Number(invsetMoney)>Number(unitPrice)){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("投资金额需小于最大投资金额！");
			}
			else if(Number(availableMoney)<Number(invsetMoney)){
				mui.toast('账户余额不足,请充值')
				mui.openWindow({
					id:"investfalse1.html",
					url:"investfalse1.html",
					styles:{
						top:0,
						bottom:0
					},
					extras:{
						availableMoney:availableMoney
					}
				})
			}else if(Number(invsetMoney)<Number(unit_price)){
				mui.toast("投资金额需是大于起投金额"+unit_price);
			}
			else if(Number(invsetMoney)<100){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				mui.toast("投资金额不可低于100,请重新输入");
			}
			else{
				mui('#middlePopover').popover('toggle');
			}
			
			
			
			
			
		})
			mui('.mui-scroll-wrapper').scroll();
			mui('body').on('shown', '.mui-popover', function(e) {
				//console.log('shown', e.detail.id);//detail为当前popover元素
			});
			mui('body').on('hidden', '.mui-popover', function(e) {
				//console.log('hidden', e.detail.id);//detail为当前popover元素
			});
			//取消提交订单
			mui('#cancel')[0].addEventListener('tap',function(){
				mui('#middlePopover').popover('toggle');
				$('#trdePwd').val(''); 
				
			})
			//提交订单
			mui('#sure')[0].addEventListener('tap',function(){
				var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
//				if(isSetRealName==0){
//					nwaiting.close(); //新webview的载入完毕后关闭等待框
//			    	mui("#covers")[0].style.display = "block";
//					mui.toast("请先实名认证！");
//						mui('#goApprove')[0].addEventListener("tap",function(){
//							mui("#covers")[0].style.display = "none";
//							plus.webview.getWebviewById("myinvest.html").close();
//							mui.openWindow({
//							url:"approve.html",
//							id:"approve.html",
//							styles:{
//								top:0,
//								bottom:0
//							}
//							
//							
//						})
//					})
//					
//				}else if(isSetRealName==-1){
//					nwaiting.close(); //新webview的载入完毕后关闭等待框
//					mui.toast('请实名认证审核通过后再购买！');
//					plus.webview.getWebviewById("myinvest.html").close();
//				}else{
					
						var invsetMoney = $('#invsetMoney').val();//投资金额
						var payment = hex_md5($('#trdePwd').val());//交易密码
					
						
						if($('#trdePwd').val()==''){
							nwaiting.close(); //新webview的载入完毕后关闭等待框
							mui.toast("交易密码不能为空")
						}else{
							
							var url = getUrlParam()+"/probuying";
							var datas = {"user_id":user_id,"appkey":appkey,"pid":goodId,"piid":piId,"payment":payment,"buytotal":invsetMoney};
							
							//获取数据
							$.ajax({
								type: "get",
								contentType:"application/json",
								dataType:"json",
							  	url:url,
						    	data:datas,
						    	success: function(msg){
						    		mui('#middlePopover').popover('toggle');
						    		$('#trdePwd').val('');
						    		nwaiting.close(); //新webview的载入完毕后关闭等待框
						    		if(msg.status==1){
						    			mui.openWindow({
						    				url:"investsuccess.html",
						    				id:"investsuccess.html",
						    				styles:{
						    					top:0,
						    					bottom:0
						    				}
						    			})
						    			setTimeout(function(){
					    					plus.webview.currentWebview().hide();
					    				},1000)
						    			
						    			mui.toast(msg.msg);
						    		}else{
						    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登录"){
						    				mui.toast("登录超时，请重新登录");
						    				mui.openWindow({
												id: "login.html",
												url: "login.html",
												styles: {
												top: '0',
												bottom: '0'
												
											},
											extras:{pageId:"myinvest.html"}
											})
							    		}else{
							    			mui.toast(msg.msg);
							    			mui.openWindow({
						    				url:"investfalse.html",
						    				id:"investfalse.html",
						    				styles:{
						    					top:0,
						    					bottom:0
						    				}
						    			})
						    			
							    		}
							    			
						    		}
						    		
						    		console.log(JSON.stringify(msg))
						    		
						    	},error:function(e){
						    		$('#trdePwd').val('');
						    		nwaiting.close(); //新webview的载入完毕后关闭等待框
						    		common.timeOut();//网络请求超时
						    	}
							});
							
						}
				
//				}
				
//				
				
			})
			
			//查看产品交易协议
			mui("#lookAgreement")[0].addEventListener("tap",function(){
				 var user_id = plus.storage.getItem("user_id");
				var appkey = plus.storage.getItem("appkey");
				mui.openWindow({
					url:"buyagreement.html.html",
					id:"buyagreement.html.html",
					styles:{
						top:0,
						bottom:0
					},
					extras:{
						tag:getUrlParam()+"/agreement.html?user_id="+user_id+"&appkey="+appkey
					}
				})
			})
				//监听阅读时间
	mui('#check')[0].addEventListener('change',function(){
		var value = this.checked?"true":"false";
		if(value=='true'){
			$("#sureBtn").removeAttr("disabled");
		}else{
			$('#sureBtn').attr('disabled',"disabled");
		}
//		var che = mui('#check')[0].getAttribute('checked');
//		alert(che)
		
	})
	});
	//获取账户余额
	var availableMoney
	function getAvribel(user_id,appkey){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/availableMoney";
		var datas = {"user_id":user_id,"appkey":appkey};
		//获取数据
		
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		if(msg.status==1){
	    			var data = msg;
					availableMoney = data.data.availableMoney
					if(availableMoney==null){
							mui('#availableMoney')[0].innerHTML= 0;
						}else{
							mui('#availableMoney')[0].innerHTML= availableMoney;
						}
	    			
	    		}else{
	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"){
	    				mui.toast("登录超时，请重新登录");
	    				mui.openWindow({
							id: "login.html",
							url: "login.html",
							styles: {
							top: '0',
							bottom: '0'
							
						},
						extras:{pageId:"myinvest.html"}
						})
	    				setTimeout(function(){
	    					plus.webview.currentWebview().hide();
	    				},1000)
		    		}else{
		    			mui.toast(msg.msg);
		    		}
		    			
	    		}
	    		
	    		console.log(JSON.stringify(msg))
	    		
	    	},error:function(e){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
		
		
		
	}
	
	
	//监听跳转事件
	mui('#iRecharge')[0].addEventListener('tap',function(){
		mui.openWindow({
			id:"recharge.html",
			url:"recharge.html",
			styles:{
				top:0,
				bottom:0
			},
			extras:{
				availableMoney:availableMoney
			}
		})
		
	});
	//监听跳转事件
	mui('#forgetTrade')[0].addEventListener('tap',function(){
		
		mui.openWindow({
			id:"passwo_b.html",
			url:"passwo_b.html",
			styles:{
				top:0,
				bottom:0
			},
			extras:{
				pageId:"myinvest.html"
			}
		})
		mui('#middlePopover').popover('toggle');
		$('#trdePwd').val(''); 
		
		
	})
	
	



})