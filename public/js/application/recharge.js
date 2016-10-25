window.addEventListener('reLode',function(){
		window.location.reload();
	})
mui.plusReady(function(){
	
	var urls = getUrlParam();
//	 var urls = "http://192.168.3.135:81/huicai/api2.0/index.php/User"
	
	var user_id = plus.storage.getItem("user_id");
	var appkey = plus.storage.getItem("appkey");
	var pageId=plus.webview.currentWebview().pageId;
	//判断是否绑卡
	mui.ajax({
		type:"get",
		contentType:"application/json",
		dataType:"json",
	  	url:urls+"/checkBindCardAndPsw",
	  	data:{
	  		user_id:user_id,
	  		appkey:appkey
			},
		success:function(msg){
			console.log(1234)
			console.log(JSON.stringify(msg));
			if(msg.status==1){
			if(msg.data.code==100){
				
//				plus.webview.currentWebview().show();
				mui("#cardInfo")[0].style.display="block";
				var data =msg.data.data;
				var html =template("template",data);
				document.getElementById('cardInfo').innerHTML= html;
			}else if(msg.data.code==2006){
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
						pageId:"recharge.html"
					}
				})
				setTimeout(function(){
					plus.webview.currentWebview().hide();
				},500)
			}else if(msg.data.code==2007){
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
						pageId:"recharge.html"
					}
				})
				setTimeout(function(){
					plus.webview.currentWebview().hide();
				},500)
			}
			}else{
					mui.toast(msg.msg);
					if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
					mui.toast("登录超时，请重新登录");
					mui.openWindow({
						url:"login.html",
						id:"login.html",
						styles:{
							top:0,
							bottom:0
						},
						waiting:{
							autoShow:false
						},
						extras:{
							pageId:"recharge.html"
						}
					}) 
				}
			}
		},
		error:function(e){
			
			console.log(JSON.stringify(e))
		}
	})
	$("#amountMoney").on("keyup",function(){
		var rechargeMoney = mui('#amountMoney')[0];
		clearNoNum(rechargeMoney)
	})
	//数字格式化
    function clearNoNum(obj){
		obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
		obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
		obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
	}
    function escape2Html(str) {
		 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
	}
    mui("#amountMoney")[0].addEventListener("keyup",function(){
    	var amountMoney = $(this).val();
    	if(amountMoney==""){
    		mui.toast("请输入充值金额");
    		$("#rechargeBtn").attr("disabled","disabled")
    	}else{
    		$("#rechargeBtn").removeAttr("disabled");
    	}
    })
    
    //确定充值
    mui("#rechargeBtn")[0].addEventListener("tap",function(){
//  	var urls ="http://192.168.3.135:81/huicai/api2.0/index.php"
    	var money = $("#amountMoney").val();
    	var amountMoney = Number(money);
    	if(amountMoney==""){
    		mui.toast("请输入充值金额");
    		
    	}else if(amountMoney<=0){
    		mui.toast("充值金额需大于零");
    	}
    	else{
    		 plus.nativeUI.showWaiting("请求中...");
    		//数据传输
			mui.ajax({
				type:"get", 
				contentType:"application/json",
			    dataType: "json", 
			    url:urls+"/wapBindCardOrCashIn",
			    data:{
			    	sign:1,
			    	cashInMoney:amountMoney,
			    	user_id:user_id,
			    	appKey:appkey
			    	
			    },
			    success:function(msg){
			    	
			    	
			    	console.log(JSON.stringify(msg));
			    	if(msg.status==1){
			    		 plus.nativeUI.closeWaiting();
			    		$("#formBox").append(escape2Html(msg.data)); 
				    	console.log(JSON.stringify(msg.data));
				    	document.pay.submit();
			    	}else if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="缺少用户唯一编码"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
			    		 plus.nativeUI.closeWaiting();
			    		mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
									top: '0',
									bottom: '0'
								
								},
							extras:{pageId:"recharge.html"},
							waiting:{
								autoShow:false
							}
							})
			    	}else{
			    		 plus.nativeUI.closeWaiting();
			    		mui.toast(msg.msg);
			    	}
			    },
			    error:function(e){
			    	 plus.nativeUI.closeWaiting();
			    	console.log("er=="+JSON.stringify(e))
			    	
			    }
			})
    	}
    })
      //重写返回
//    mui.back=function(){
//    	
//    	plus.webview.getWebviewById(pageId).show();
//		mui.fire(plus.webview.getWebviewById(pageId),"reLode");
//		plus.webview.currentWebview().hide();
//    }
})