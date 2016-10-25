define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	
	//获取账户余额
	var availableMoney
	mui.plusReady(function() {
//		setTimeout(function(){
//			
//			plus.nativeUI.closeWaiting();
//		},200)
		mui('.mui-scroll-wrapper').scroll();
		common.onNetChange("withdraw.html");//检测网络信号
		var amountFee=0;//账户可免费提现额度
		var withdrawalFee=0.005;//提现手续费
		var withdrawalAmount =0;//可提金额
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var bankId;
  		//验证用户是否认证 
		var isSetRealName;
		var isSetTradePassword;
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		randerPage();	
	//忘记交易密码
	mui('#forgetTrade')[0].addEventListener('tap',function(){
		
		mui.openWindow({
			id:"passwo_b.html",
			url:"passwo_b.html",
			styles:{
				top:0,
				bottom:0
			},
			extras:{
				pageId:"withdraw.html"
			}
		})
		setTimeout(function(){
			plus.webview.currentWebview().hide();
		},1000)
		
	})
	//取消提现
	mui('#cancel')[0].addEventListener('tap',function(){
		mui('#middlePopover').popover('toggle');
		$('#trdePwd').val(''); 
		
	})	
	//打开我的银行卡列表
//	mui('#bank')[0].addEventListener("tap",function(){
//		mui('#bankList').popover('toggle');
//		
//		
//	})
	 
	//获取银行卡
	function randerPage(){
		
	mui.ajax({
		type: "get",
		dataType: "json",
		url: getUrlParam()+"/withdrawCashConfig",
		data: {
			user_id: user_id,
			appkey: appkey
		},
		success: function(data) {
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			var box =mui('#mui-list')[0];
			if(data.msg=='唯一码失效，请重新登录'||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
				mui.toast("登录超时，请重新登录");
				mui.openWindow({
					id:"login.html",
					url:"login.html",
					styles:{
						top:0,
						bottom:0
					},
					extras:{
						pageId:"withdraw.html"
					}
				})
			}else{
							console.log(JSON.stringify(data)) 
				mui('#available')[0].innerHTML=data.data.withdrawalAmount;//可提金额
				withdrawalAmount =data.data.withdrawalAmount; 
				withdrawalFee = data.data.withdrawalFee;
				amountFee=data.data.amountFee;
				mui('#actual_b')[0].innerText =amountFee;
				plus.webview.currentWebview().show();
				html="";
				var item=data.data.bankList;
				bankId=item.bankId;
				mui('#bank')[0].value=item.cardNo;
//				if(data.data.bankList==null){
//					var btnArray = ['是','否'];
//					mui.confirm('请你还未添加银行卡,请添加银行卡！', '提示', btnArray, function(e) {
//							if (e.index == 0) {
//									nwaiting.close();
//								mui.openWindow({
//									url:"choosebank.html",
//									id:"choosebank.html",
//									styles:{
//										top:0,
//										bottom:0
//									}
//								});
//								plus.webview.currentWebview().hide();
//							}else{
//								mui.back();
//							}
//						})
//				}else{
//					if(data.data.bankList.length>0){
////						mui('#bankList').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
//						for(var i = 0,len = data.data.bankList.length;i<len;i++) {
//							var item=data.data.bankList[i]
//							var li = document.createElement('li');
//							li.id=item.bankId;
//							li.className ='mui-table-view-cell info';
//							li.setAttribute("cardNo",item.cardNo);
//							li.setAttribute("bankName",item.bankName);
//							if(i==0){
//								bankId=item.bankId;
//								mui('#bank')[0].value=item.cardNo;
//								html='<p class="bankName">'+item.bankName+'</p>';
//								html+='<span>'+item.cardNo+'</span>'
//								li.innerHTML=html;
//								box.appendChild(li);
//							}else{
//								html='<p class="bankName">'+item.bankName+'</p>';
//								html+='<span>'+item.cardNo+'</span>'
//								li.innerHTML=html;
//								box.appendChild(li);
//							}
//							
//						}	
//					}
//					
//				}
				
//				mui('#addition_b')[0].innerHTML= html;
				
				mui('.mui-table-view').on('tap','.info',function(){
					bankId=this.getAttribute('id');
					mui('#bank')[0].value=this.getAttribute('cardNo');
					mui('#bankList').popover('toggle');
					
				});
				
				
					
						

					}
				
				
				},error:function(e){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					common.timeOut();//网络请求超时
				}

			})	
	}
	
	
	
	
	
	
//提现金额变化动态改变数据
$('#withdrawal').on("keyup",function(){
	var feeMoney = 0
	var withdrawl =mui("#withdrawal")[0]
	var withdrawalMoney =  mui("#withdrawal")[0].value;//提现金额
	common.clearNoNum(withdrawl);
	if(amountFee>=Number(withdrawalMoney)){
		mui('#actual')[0].innerText=withdrawalMoney;//实际到账金额
		mui('#actual_a')[0].innerText=feeMoney;//提现手续费
	}else{
		feeMoney = (withdrawalMoney-amountFee)*withdrawalFee+"";
		var result =feeMoney.substring(0,feeMoney.indexOf(".")+3);
		mui('#actual_a')[0].innerText=result;
		mui('#actual')[0].innerText=withdrawalMoney-result;
	}
//	mui('#actual_a')[0].innerText=data.data.withdrawalFee;
//	mui('#actual')[0].innerText=cash-data.data.withdrawalFee;
	
	 
	
})
$('#withdrawal').on("change",function(){
	var feeMoney = 0
	var withdrawl =mui("#withdrawal")[0]
	var withdrawalMoney =  mui("#withdrawal")[0].value;//提现金额
	common.clearNoNum(withdrawl);
	if(amountFee>=Number(withdrawalMoney)){
		mui('#actual')[0].innerText=withdrawalMoney;//实际到账金额
		mui('#actual_a')[0].innerText=feeMoney;//提现手续费
	}else{
		feeMoney = (withdrawalMoney-amountFee)*withdrawalFee+"";
		var result =feeMoney.substring(0,feeMoney.indexOf(".")+3);
		mui('#actual_a')[0].innerText=result;
		mui('#actual')[0].innerText=withdrawalMoney-result;
	}
	//	mui('#actual_a')[0].innerText=data.data.withdrawalFee;
	//	mui('#actual')[0].innerText=cash-data.data.withdrawalFee;

	 
	
})
	
	mui('#confirm')[0].addEventListener('tap',function(){
			
			var cash=mui('#withdrawal')[0].value;//提现金额
			if(cash==''){
				mui.toast("请输入提现金额");
			}else if(Number(cash)>withdrawalAmount){
				mui.toast("提现金额需小于可用金额");
				return false;
			}else if(Number(cash)<100){
				mui.toast("最低提现金额为100元,请重新输入")
			}else{
				mui('#middlePopover').popover('toggle');
			}
		})
	
	
	//提交
mui('#sure')[0].addEventListener('tap',function(){
	var cash=mui('#withdrawal')[0].value;//提现金额
	var trdePassword=hex_md5(mui('#trdePwd')[0].value);//交易密码
	if(mui('#trdePwd')[0].value==''){
		mui.toast("请输入交易密码");
	}
	else{
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			
			console.log(trdePassword)
			mui.ajax({
				type: "get",
				dataType: "json",
				url: getUrlParam()+"/withdrawCash",
				data: {
					user_id: user_id,
					appkey: appkey,
					cash:cash,
					trdePassword:trdePassword,
					bankId:bankId
				},
				success: function(data) {
					mui('#middlePopover').popover('toggle');
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					mui('#trdePwd')[0].value ="";
					if(data.status==1){
						
						mui.toast(data.msg);
						mui.openWindow({
							id: "withdrawsuccsse.html",
							url: "withdrawsuccsse.html",
							styles: {
							top: '0',
							bottom: '0'
							}
						})
						setTimeout(function(){
								plus.webview.currentWebview().hide();
							},1000)
						
					}else{
						console.log(JSON.stringify(data))
						if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
							mui.toast("登录超时，请重新登录");
							mui.openWindow({
								id:"login.html",
								url:"login.html",
								styles:{
									top:0,
									bottom:0
								},
								extras:{
									pageId:"withdraw.html"
								}
							})
						
						}else{
							mui.openWindow({
							id: "withdrawflase.html",
							url: "withdrawflase.html",
							styles: {
							top: '0',
							bottom: '0'
							}
						})
							setTimeout(function(){
								plus.webview.currentWebview().hide();
							},1000)
						}
						
						mui.toast(data.msg);
					}
					
					
				},error:function(e){
					console.log(JSON.stringify(e))
					mui('#middlePopover').popover('toggle');
					mui('#trdePwd')[0].value ="";
					common.timeOut();//网络请求超时
					}
				
			
			})
		
		
		
	}
	
	
	
})

//跳转到温馨提示页面
mui('#notice')[0].addEventListener("tap",function(){
	mui.openWindow({
		url:"Prompt.html",
		id:"Prompt.html",
		styles:{
			top:0,
			bottom:0
		}
	})
})

})
		
	
	
	

})