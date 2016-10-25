define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	//
	mui.init({
			swipeBack: true //启用右滑关闭功能
		});
		var user_id;
		var appkey;
		var bankId;
		var self;
		var pageId;
		mui.plusReady(function(){
			common.onNetChange("addbankcard.html");//检测网络信号
			 user_id = plus.storage.getItem("user_id");
			 appkey = plus.storage.getItem("appkey");
			 self = plus.webview.currentWebview();
		 	pageId = self.pageId;
			initialData(user_id,appkey);
			//获取银行卡列表
			getBankList(user_id,appkey);
			//获取银行名
			mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
				
				mui('#bank')[0].value=this.innerText;
				bankId = this.getAttribute("banks");
//				alert(bankId);
	//			$('#bank').attr('bankId',this.getAttribute('bankId'));
				mui('#middlePopover').popover('toggle');
			})
			//确认添加银行卡
			mui('#addBtn')[0].addEventListener('tap',function(){
				var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
				var cardNum = mui('#bankNumber')[0].value;
				var reg = /^\d{16}|\d{19}$/;
				if(cardNum==''||!reg.test(cardNum)){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					mui.toast("银行卡号输入错误");
				}else if(cardNum.length!=16&&cardNum.length!=19){
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					mui.toast("银行卡号输入错误");
				}else{
					var url = getUrlParam()+"/addBankCard";
					 var datas = {"user_id":user_id,"appkey":appkey,"proviceId":proviceId,"cityId":cityId,"bankId":bankId,"cardNum":cardNum};
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
				    			cardNum='';
				    			mui('#bankAddr')[0].value='';
				    			var webviews = plus.webview.all();
						    	  mui.each(webviews,function(i,item){
						    	 	if(
						    	 		item.getURL().indexOf("addbankcard.html")>0
						    	 	  ||item.getURL().indexOf("bankcard.html")>0
						    	 	  ||item.getURL().indexOf("checkedtradepwd.html")>0
						    	 	){
						    	 		item.hide();
						    	 	}
						    	 });
				    			mui.toast(msg.msg);
				    			var data = msg;
				    			console.log(JSON.stringify(data.data));
				    			if(pageId=="withdraw.html"){
				    				mui.fire(plus.webview.getWebviewById(pageId),"reLode");
		    						mui.back(); 
				    			}else{
				    				mui.openWindow({
					    				url:"bankcard.html",
					    				id:"bankcard.html",
					    				styles:{
					    					top:0,
					    					bottom:0
					    				},
					    				 createNew:true
					    			})
				    			}
				    			
//				    			mui.fire(plus.webview.getWebviewById("bankcard.html"),"reLode");
				    			
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
										extras:{pageId:"addbankcard.html"}
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
				}
				
			})
		})
		//打开银行列表
		mui('#bankName')[0].addEventListener('tap',function(){
			mui('#middlePopover').popover('toggle');
		})
		//选取地址
		mui('#bankddr')[0].addEventListener('tap',function(){
			mui('#bottomPopover').popover('toggle');
		})
		
		
		
		mui('.mui-scroll-wrapper').scroll();
		mui('body').on('shown', '.mui-popover', function(e) {
			//console.log('shown', e.detail.id);//detail为当前popover元素
		});
		mui('body').on('hidden', '.mui-popover', function(e) {
			//console.log('hidden', e.detail.id);//detail为当前popover元素
		});
	//获取省份数据
	var area1 = document.getElementById("areaId01");
	var area2 = document.getElementById("areaId02");
	var address = document.getElementById("bankAddr");
	var proviceId=null;
	var cityId =null;
	function initialData(user_id,appkey){
		var url = getUrlParam()+"/getProvince";
		 var datas = {"user_id":user_id,"appkey":appkey};
		 //获取数据
		 $.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
//	    	mui.toast(msg.msg)
	    		if(msg.status==1){
	    			var data = msg;
	    			console.log(JSON.stringify(data.data));
		 			bindOption(area1,data.data);
	    			
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
							extras:{pageId:"addbankcard.html"}
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
	//获取市
	area1.addEventListener('change',function(){
		area2.options.length=0;
		area2.appendChild(new Option("请选择"));
		area2.options[0].selected = true;
		address.value ="";
		var data = querAreabyPid(this.value).data;
		document.getElementById('areaId1').value=this.value;
		var areaList = data;
		bindOption1(area2,areaList);
	});
	area2.addEventListener('change',function(){
//		alert(area1.options[area1.selectedIndex].value)
		proviceId = area1.options[area1.selectedIndex].value;
		cityId = area2.options[area2.selectedIndex].value;
		mui('#bottomPopover').popover('toggle');
		address.value = area1.options[area1.selectedIndex].text
      					+area2.options[area2.selectedIndex].text
		
	})
	//地址初始化
	function bindOption1(obj,areaList){
		if(!obj){return false;}
		mui.each(areaList,function(i,item){
				var opt = document.createElement("option");
				opt.text = item.cityname;
				opt.value = item.cityid;
	  			obj.appendChild(opt);
	  		})
	}
	function bindOption(obj,areaList){
		if(!obj){return false;}
		mui.each(areaList,function(i,item){
				var opt = document.createElement("option");
				opt.text = item.name;
				opt.value = item.id;
	  			obj.appendChild(opt);
	  		})
	}
	//二级地址查询
	function querAreabyPid(pid){
      		var result = {};
      		var url = getUrlParam()+"/getCityList";
		 	var datas = {"user_id":user_id,"appkey":appkey,"pid":pid};
		 	$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		if(msg.status==1){
	    			var data = msg;
	    				result = data;
	    			
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
							extras:{pageId:"addbankcard.html"}
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
      	  	return result;
      	}
	
	//获取银行卡列表
	function getBankList(){
		var url = getUrlParam()+"/getBankList";
		 var datas = {"user_id":user_id,"appkey":appkey};
		  //获取数据
		 $.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		if(msg.status==1){
	    			var data = msg;
	    			var table = mui('#mui-list')[0];
					table.innerHTML='';
					var productInfo = data.data;
					if(productInfo==null){
						
					}else{
						if(productInfo.length>0){
							for(var i=0;i<productInfo.length;i++){
								
								var item = productInfo[i];
								var li = document.createElement('li');
								li.className ='mui-table-view-cell info';
								li.setAttribute("banks",item.bankid);
				//				li.attributes('orderId',item.orderId);
								li.innerHTML =item.bankname;
								table.appendChild(li);
								
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
							extras:{pageId:"addbankcard.html"}
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

})