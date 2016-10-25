define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		common.onNetChange("bankcard.html");//检测网络信号
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		 var user_id = plus.storage.getItem("user_id");
		 var appkey = plus.storage.getItem("appkey");
		 var url = getUrlParam()+"/bindBankCardList";
		 var datas = {"user_id":user_id,"appkey":appkey};
		 common.timeOver();//请求超过10秒关闭等待框
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
	    			var table = mui('#cardBox')[0];
					table.innerHTML='';
	    			var data = msg;
					var productInfo = data.data;
					if(productInfo==null){
						mui("#addCard")[0].style.display="block";
						mui.toast("您还未添加银行卡")
					}else{
						if(productInfo.length>0){
							mui('.bankCard')[0].style.display="block";
							for(var i=0;i<productInfo.length;i++){
								var item = productInfo[i];
								var li = document.createElement('li');
								li.className="mui-table-view-cell info";
								li.setAttribute("bankId",item.id);
								li.id=item.bankId;
								var html='';
			//					html ='<div id='' class="mui-input-row mui-radio" style="height: 90px;padding-top: 10px;">';
								html='<div class="mui-pull-left">'+item.bankName+'</div>';	
								html+='<div class="mui-pull-right" >'+item.cardNo+'</div>'	;
//								html+='<button class="mui-btn c_fff bg_ff6">删除</button>';		
			//					html+='</div>';
								li.innerHTML =html;
								table.appendChild(li);
							}
							//删除银行卡
//							mui(".mui-table-view").on("tap",".info",function(){
//								var item =this;
//								var id=item.getAttribute("bankId");
//								mui("#delBank")[0].style.display="block";
//								mui("#sure_Btn")[0].addEventListener("tap",function(){
//									delBank(user_id,appkey,id,item);
//									mui("#delBank")[0].style.display="none";
//								})
//								mui("#cancel_Btn")[0].addEventListener("tap",function(){
//									mui("#delBank")[0].style.display="none";
//								})
////								var btnArray = ['是', '否'];
////								mui.confirm('是否删除？', '提示', btnArray, function(e) {
////									if (e.index == 0) {
////										
////										delBank(user_id,appkey,id,item);
////									}
////								})
//								
//								console.log(id);
//							})
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
							extras:{pageId:"bankcard.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
	    		}
	    		
	    		console.log(JSON.stringify(msg));
	    		
	    	},error:function(e){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
		
	})
	
	//删除银行卡
	function delBank(user_id,appkey,bankId,item){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		common.timeOver();//请求超过10秒关闭等待框
		//获取数据
		var urls=getUrlParam()+"/delbank"
		 $.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:urls,
	    	data:{"user_id":user_id,"appkey":appkey,"id":bankId},
	    	success: function(msg){
				nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		if(msg.status==1){
	    			item.parentNode.removeChild(item)
	    			mui.toast("删除成功");
	    			
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
							extras:{pageId:"bankcard.html"}
							})
		    			}else{
		    				mui.toast(msg.msg);
		    			}
		    			
	    		}
	    		console.log(123);
	    		console.log(JSON.stringify(msg));
	    		
	    	},error:function(e){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		common.timeOut();//网络请求超时
	    	}
		});
	}
	
	//添加银行卡
	mui('#addCard')[0].addEventListener('tap',function(){
		addCard();
	})
	function addCard(){
		mui.openWindow({
			id:"choosebank.html",
			url:"choosebank.html",
			styles:{
				top:0,
				bottom:0
			}
		})
	}



})