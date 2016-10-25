//我的账户
define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	window.addEventListener("changePhoto",function(){
		mui("#userPhoto")[0].src=plus.storage.getItem("_userPhoto");
	})
	var common = require('../major/common');
	mui.plusReady(function(){
//		setTimeout(function(){
//			plus.nativeUI.closeWaiting();
//		},300)
		mui("#userPhoto")[0].src=plus.storage.getItem("_userPhoto");
		common.onNetChange("myacount.html");//检测网络信号
		plus.storage.removeItem("availableMoney");
		
		document.getElementById("userInfo").innerHTML = plus.storage.getItem("username");
		
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		availableMoney(user_id,appkey);
		setTimeout(function(){
			preloadPages:[
		    {
		      url:'index_main.html',
		      id:'index_main.html',
		      styles:{
		    	top:"39px",
		    	bottom:"50px"
		    }
		    }
		    
		  ]
		},1000)
		
		
	})
	//点击收藏事件
	$('#myInvest').on("click",function(){
		var item =$(this);
		item.find("span").toggleClass("mui-icon-arrowdown");
		item.next().slideToggle();
	})
	$('.slide').on("click",function(){
		var item =$(this);
		item.find("span").toggleClass("mui-icon-arrowright");
		item.next().slideToggle();
	})
	
	//打开我的账户
	mui("#userInfo")[0].addEventListener("tap",function(){
		
		mui.openWindow({
			url:"acuntmanager.html",
			id:"acuntmanager.html",
			styles:{
				top:0,
				bottom:0
			},
			 show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		    },
		    waiting:{
		      autoShow:false,//自动显示等待框，默认为true
		     } 
		})
	})
	mui('#headerImg')[0].addEventListener("tap",function(){
		
		mui.openWindow({
			url:"acuntmanager.html",
			id:"acuntmanager.html",
			styles:{
				top:0,
				bottom:0
			},
			show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		    },
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		     } 
		})
	})
//	mui('#goInvest')[0].addEventListener('tap',function(){
//		var loginFlag = plus.storage.getItem("password");//判断用户是否登录
//		mui.openWindow({
//			id: "invest_main.html",
//			url: "invest_main.html",
//			styles: {
//			top: '45px',
//			bottom: '50px'
//			
//		}
//		})
//	})
	//打开充值页面
	mui('#recharge')[0].addEventListener('tap',function(){
		var loginFlag = plus.storage.getItem("password");//判断用户是否登录
		var availableMoney = $('#availableMoney').text();
		if(loginFlag==null){
			mui.toast("登录超时，请重新登录");
			mui.openWindow({
				id: "login.html",
				url: "login.html",
				styles: {
				top: '0',
				bottom: '0'
				
				}
			})
			
		}else{
			mui.openWindow({
				id: "recharge.html",
				url: "recharge.html",
				styles: {
				top: '0',
				bottom: '0'
				
				},
				createNew:true,
				 waiting:{
			      autoShow:false,//自动显示等待框，默认为true
			      title:'正在加载...',//等待对话框上显示的提示内容
			      options:{
			        width:"60px",//等待框背景区域宽度，默认根据内容自动计算合适宽度
			        height:"60px",//等待框背景区域高度，默认根据内容自动计算合适高度
			       	background:"#fff",
			      }
			    },
			    extras:{
			    	availableMoney:availableMoney
			    }
			})
		}
//		alert(loginFlag)
		
	})
	//列表点击调到相应页面
	mui('.mui-table-view').on('tap','.my-list-li',function(){
		var loginFlag = plus.storage.getItem("password");//判断用户是否登录
		var href = this.getAttribute('href');
		var types = this.getAttribute("types")
		if(loginFlag==null){
			mui.toast("登录超时，请重新登录");
			mui.openWindow({
				id: "login.html",
				url: "login.html",
				styles: {
				top: '0',
				bottom: '0'
				
				}
			})
			
		}else{
			mui.openWindow({
				id: href,
				url: href,
				styles: {
				top: '0px',
				bottom: '0px'
			
			},
			 createNew:true,
			 extras:{
			 	types:types
			 }
			})
		}
		
		
	})
	//获取账户余额
	function availableMoney(user_id,appkey){
//		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		$.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
			  	url:getUrlParam()+"/accountAssets",
		    	data:{
					"user_id":user_id,
					 "appkey":appkey
					
	    		},
		    	success: function(data){
		    		
//		    		nwaiting.close(); //新webview的载入完毕后关闭等待框
		    		console.log(11)
		    		console.log(JSON.stringify(data))
		    		if(data.status==1){
//		    			plus.webview.currentWebview().show();
		    			var total = $('#availableMoneys');
		    			var available =$('#availableMoney');
		    			var waitM =$('#waitMoney');
		    			
		    			var dataInfo = data.data;
		    			var totalAssets =dataInfo.totalMoney;
		    			var availableMoney =dataInfo.availableMoney;
		    			var accumulativeMoney = dataInfo.accumulativeMoney+"";
		    			var money =accumulativeMoney.substring(0,accumulativeMoney.indexOf(".")+3);
		    			total.html(totalAssets);
		    			available.html(availableMoney);
		    			waitM.html(money);
		    			plus.storage.setItem("availableMoney",availableMoney);
		    			var virtaLCash =data.data.virtaLCash//理财金
		    			var preActive =virtaLCash.preActive//待激活
		    			var actived =virtaLCash.availableCash//已激活
		    			var hadUse =virtaLCash.hadUse//已使用
		    			var earning=virtaLCash.earning//累计收益
		    			mui('#preActive')[0].innerHTML=preActive;
		    			mui('#actived')[0].innerHTML=actived;
		    			mui("#hadUse")[0].innerHTML=hadUse;
		    			mui("#earning")[0].innerHTML=earning;
		    			
		    			if(!dataInfo.userIco){
		    				//如果不存在就默认头像
		    				var imgIcon="../../../public/img/header.png";
		    				mui("#userPhoto")[0].src="../../../public/img/header.png";
							plus.storage.setItem("_userPhoto",imgIcon);
		    				
		    			}else{
							var imgIcon = getUrlParam()+dataInfo.userIco
		    				plus.storage.setItem("_userPhoto",imgIcon);
		    				mui("#userPhoto")[0].src=getUrlParam()+dataInfo.userIco;
		    				console.log(getUrlParam()+dataInfo.userIco)
		    			}
		    			
		    			
		    			//渲染我的投资
		    			var buyCash = dataInfo.buyCash;
		    			if(buyCash){
			    			if(buyCash.length>0){
			    				var box =mui("#inverstBox")[0];
			    				for(var i=0;i<buyCash.length;i++){
			    					var item=buyCash[i];
			    					var html="";
					    			var li = document.createElement("li");
					    			li.className="my-list-li mui-table-view-cell";
					    			li.setAttribute("href","myinvestmentlist.html");
					    			li.setAttribute("stuas","1");
					    			if(item.cash==null||item.cash==0){
	//				    				li.innerHTML=html;
	//									box.appendChild(li);
					    			}else{
					    				html='<span class="mui-icon mui-icon-arrowright mui-pull-right sty" ></span>';
										html+='<span class="mui-pull-right c_ff7">'+item.cash+'</span>';
										html+='<span class="my-list-text">'+item.name+'</span>';
										li.innerHTML=html;
										box.appendChild(li);
					    			}
					    			
			    				}
				    			
			    			}
		    			}
		    			
		    			
		    			
		    			
		    		}else{
		    			if(data.msg=="缺少用户唯一编码"||data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
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
		    			}else if(data.msg=="用户不存在"){
		    				mui.toast("请注册后操作");
			    				mui.openWindow({
									id: "register.html",
									url: "register.html",
									styles: {
									top: '0',
									bottom: '0'
									
								}
								})
		    			}
		    			else{
		    				mui.toast(data.msg);
		    			}
		    			
		    		}
		    	},error:function(e){
		    		console.log(1234)
		    		console.log(JSON.stringify(e));
		    		
//		    		nwaiting.close();
		    		common.timeOut();//网络请求超时
		    	}
		    	
		    	
		});
		
		
//		var url = getUrlParam()+"/availableMoney";
//		var datas = {"user_id":user_id,"appkey":appkey};
////		var data = common.myAjax(url,datas,"get","myacount.html");
//		//获取数据
//		$.ajax({
//			type: "get",
//			contentType:"application/json",
//			dataType:"json",
//		  	url:url,
//	    	data:datas,
//	    	success: function(msg){
////	    	mui.toast(msg.msg)
//	    		if(msg.status==1){
//	    			var data = msg;
//	    			if(data.data.availableMoney==null){
//	    				$('#availableMoney').html("0");
//	    			}else{
//	    				$('#availableMoney').html(data.data.availableMoney);
//						plus.storage.setItem("availableMoney",data.data.availableMoney);
//	    			}
//					
//	    			
//	    		}else{
//	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
//	    				mui.toast("登录超时，请重新登录");
//		    				mui.openWindow({
//								id: "login.html",
//								url: "login.html",
//								styles: {
//								top: '0',
//								bottom: '0'
//								
//							},
//							extras:{pageId:"myacount.html"}
//							})
//		    			}else{
//		    				mui.toast(msg.msg);
//		    			}
//		    			
//	    		}
//	    		
//	    		console.log(JSON.stringify(msg));
//	    		
//	    	},error:function(e){
//	    		console(123)
//	    		console.log(e);
//	    		common.timeOut();//网络请求超时
//	    	}
//		});
		
		
		
		
	}
	
//	提现
		mui('#withdraw')[0].addEventListener('tap',function(){
//		alert(11)
		var urls = getUrlParam();
//		var urls = "http://192.168.3.108:81/huicai/api2.0/index.php/User";
//		var urls = "http://192.168.3.135:81/huicai/api2.0/index.php/User"
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
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
				
				console.log(JSON.stringify(msg));
				if(msg.status==1){
				if(msg.data.code==100){
					
					mui.openWindow({
						id:"withdraw.html",
						url:"withdraw.html",
						styles:{
							top:0,
							bottom:0
						},
						 createNew:true,
						 show:{
						      autoShow:true,//页面loaded事件发生后自动显示，默认为true
						    },
						    waiting:{
						      autoShow:true,//自动显示等待框，默认为true
						     } 
					})
					
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
							pageId:"myacount.html"
						}
					})
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
							pageId:"myacount.html"
						}
					})
					
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
							pageId:"myacount.html"
						}
					}) 
					
				}
				}
			},
			error:function(e){
				
				console.log(JSON.stringify(e))
			}
		})
		
	})
	
			var first = null;
			mui.back = function() {
				var homeView = plus.webview.getWebviewById("myacount.html");
				var curretnView = plus.webview.currentWebview();
//				if(homeView==curretnView){
					//首次按键，提示‘再按一次退出应用’
					if (!first) {
						first = new Date().getTime();
						mui.toast('再按一次退出应用');
						setTimeout(function() {
							first = null;
						}, 2000);
					} else {
						if (new Date().getTime() - first < 2000) {
							plus.runtime.quit();
						}
					}
					

//				}else{
//					homeView.show();
//					plus.webview.currentWebview().hide();
//				}
			}
})
