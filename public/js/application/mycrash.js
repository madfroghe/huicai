define(function(require,module,exports){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		var self = plus.webview.currentWebview();
		var unit_price;
		var  pid = self.pid;
		var piid =self.piid;
		var annualized_return;
		var availableMoney;
		mui("#btn")[0].addEventListener("tap",function(){
			var invsetMoney = $('#invsetMoney').val();//投资金额
			if(invsetMoney==''){
				mui.toast("请输入投资金额")
			}
			else if(Number(invsetMoney)<0){
				mui.toast("投资金额必须大于零");
				$('#invsetMoney').val("");
				$('#returnMoney').val("");
			}else if(Number(availableMoney)==0){
				mui.toast("您暂无可投资理财金，去看看首页活动吧")
			}
			else if(Number(availableMoney)<Number(invsetMoney)){
					mui.toast('余额不足');
			}else if(Number(invsetMoney)<Number(unit_price)){
				mui.toast("投资金额需大于"+unit_price);
			}
			else{
				mui('#middlePopover').popover('toggle');
			}
			
			
		})
		
		mui("#cancel")[0].addEventListener("tap",function(){
			mui('#middlePopover').popover('toggle');
		})
		//验证用户是否认证
//		var isSetRealName;
//		var isValidMail;
//		var isSetTradePassword;
  		mui.ajax({
		type: "get",
	    dataType: "json",
	    url:getUrlParam()+"/checkBindCardAndPsw",
	    data:{
	    	user_id:user_id,
	    	appkey:appkey
	    }, 
	    success:function(data){ 
	    	
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
							pageId:"mycrash.html"
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
							flag:1,
							pageId:"mycrash.html"
						}
					})
					setTimeout(function(){
						plus.webview.currentWebview().hide();
					},500)

		    	}else if(data.data.code==100){
					//获取页面数据
					var data = {"user_id":user_id,"appkey":appkey,"pid":pid,"piid":piid};
					//获取数据
					$.ajax({
						type: "get",
						contentType:"application/json",
						dataType:"json",
					  	url:getUrlParam()+"/VirtualBuy",
				    	data:data,
				    	success: function(msg){
				    		
				    		console.log(1111)
				    		console.log(JSON.stringify(msg))
				    		if(msg.status==1){
				    			
				    			availableMoney = msg.data.availableCash;
				    			mui("#money")[0].innerHTML=availableMoney;
				    			annualized_return = msg.data.annualized_return;
				    			var yearRutrun =msg.data.product_close_days/365;
				    			 unit_price= msg.data.unit_price;
				    			 mui("#invsetMoney")[0].setAttribute("placeholder",""+unit_price+"元起投")
				    			//监听投资金额变化改变到期本息信息
								$('#invsetMoney').on('keyup',function(){
									var invsetMoney =Number($('#invsetMoney').val());
									var tmp=invsetMoney*annualized_return*yearRutrun+""; 
									var result =tmp.substring(0,tmp.indexOf(".")+3);
									$('#returnMoney').val(result);
								});
								mui('#invsetMoney')[0].addEventListener('change',function(){
									var invsetMoney =Number($('#invsetMoney').val());
									var tmp=invsetMoney*annualized_return*yearRutrun+""; 
									var result =tmp.substring(0,tmp.indexOf(".")+3);
									$('#returnMoney').val(result);
								})
				    			mui.toast(msg.msg);
				    		}else{
				    			if(msg.msg=="缺少用户唯一编码"||msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登录"){
				    				mui.toast("登录超时，请重新登录");
				    				mui.openWindow({
										id: "login.html",
										url: "login.html",
										styles: {
										top: '0',
										bottom: '0'
										
									},
									extras:{pageId:"mycrash.html"}
									})
					    		}else{
					    			mui.toast(msg.msg);
					    		
				    			
					    		}
					    			
				    		}
				    		
				    		console.log(JSON.stringify(msg))
				    		
				    	},error:function(e){
				    		
				    		$('#trdePwd').val('');
				    		common.timeOut();//网络请求超时
				    	}
					});
		
				}
		    	}else{
		    		mui.toast(data.msg);
		    	 if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
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
					extras:{pageId:"mycrash.html"}
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
						extras:{pageId:"mycrash.html"}
						})
	    				setTimeout(function(){
    					plus.webview.currentWebview().hide();
    				},500)
	    				
    			}
		    }
	    }
		})
		
		
		
		
		//确认购买
		mui("#sure")[0].addEventListener("tap",function(){
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var invsetMoney = $('#invsetMoney').val();//投资金额
			var payment = hex_md5($('#trdePwd').val());//交易密码
			
				if($('#trdePwd').val()==''){
					nwaiting.close();
					mui.toast('交易密码不能为空');
				}else{
					var url = getUrlParam()+"/VirtualBuyIng";
					var datas = {"user_id":user_id,"appkey":appkey,"pid":pid,"piid":piid,"payment":payment,"buytotal":invsetMoney};
					
					//获取数据
					$.ajax({
						type: "get",
						contentType:"application/json",
						dataType:"json",
					  	url:url,
				    	data:datas,
				    	success: function(msg){
				    		nwaiting.close();
				    		$('#trdePwd').val('');
				    		if(msg.status==1){
				    			mui('#middlePopover').popover('toggle');
				    			mui.openWindow({
				    				url:"mycrashscus.html",
				    				id:"mycrashscus.html",
				    				styles:{
				    					top:0,
				    					bottom:0
				    				}
				    			})
				    			
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
									extras:{pageId:"mycrash.html"}
									})
					    		}else{
					    			mui.toast(msg.msg);
				    	
				    			
					    		}
					    			
				    		}
				    		
				    		console.log(JSON.stringify(msg))
				    		
				    	},error:function(e){
				    		nwaiting.close();
				    		$('#trdePwd').val('');
				    		common.timeOut();//网络请求超时
				    	}
					});
					
				}
				
//			}
//			
//			
		})
	})




})