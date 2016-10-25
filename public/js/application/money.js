 //产品详情
 define(function(require,module,exports){
 	window.addEventListener('reLode',function(){
		window.location.reload();
	});//监听登录成功后刷新事件
 	var common = require('../major/common');
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
// 	var self
//	var pageId
	var goodId;
	var choosePage=1;
 	mui.plusReady(function(){
 		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
 		common.onNetChange("goodsdetail.html");//检测网络信号
 		
 		
// 		if(plus.os.name=="Android"){
// 			mui('#good-list')[0].style.marginTop="0rem";
// 		}else{
// 			mui('#good-list')[0].style.marginTop="8rem";
// 		}
 		
 		var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");//系统当前时间  
 		console.log(time2)
 		var self = plus.webview.currentWebview();
		 goodId = self.pid;
		 //获取产品信息
		var url = getUrlParam()+"/productDetails";
		var datas = {"pid":goodId};
//		var data = common.myAjax(url,datas,"get","goodsdetail.html");
		$.ajax({
			type:"get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		nwaiting.close();
	    		console.log(12);
	    		console.log(JSON.stringify(msg));
	    		if(msg.status==1){
	    			var data = msg;
	    			var item = data.data;
					//绑定页面数据
					$('#productName').html(item.product_name);
					$('#product_features').html(item.product_features);
					$('#cash_total').html(item.cash_total);
					$('#remark').html(item.item[0].product_close_days);
					$('#nowBuy').html(common.formatNum(item.item[0].limit_cash_buy))
					$('#annualized_return').html(item.item[0].annualized_return_show);//年转化收益
					$('#goodDtailImg').attr('src',item.app_pro_des_img);//详情页图片
					$('#productImg').attr("src",item.item[0].app_thumb);//产品图片
					$('#unit_price').html(item.item[0].unit_price);//起投金额
					var buyBegin = item.buy_time_begin.slice(0,10);//购买开始时间
					var buyEnd = item.buy_time_end.slice(0,10);//购买结束时间
					var days = item.item[0].product_close_days;//投资天数
					$('#buyBegin').html(buyBegin);
					$('#buyEnd').html(buyEnd);
					var closeBegin = item.item[0].close_time_begin.slice(0,10);
					var closeEnd = item.item[0].close_time_end.slice(0,10);
					$('#closeBegin').html(closeBegin);
					$('#closeEnd').html(closeEnd);
					var flag = item.item[0].app_pre_buy_url;//判断是否为在买产品标识为
					var item_name =item.item[0].item_name.slice(0,2);
					var piId =item.item[0].id;//子产品id
					var beginTime = item.buy_time_begin;//开始购时间
					var endTime = item.buy_time_end;//结束购时间
					if(time2>endTime){
						mui.toast('购买时间已结束')
						$("#butto").attr('disabled','disabled');
						$("#butto").css("opacity","1")
						$("#butto").css("background","#FF8600")
					}else if(time2<beginTime){
						mui.toast("亲，敬请期待哟！");
						$("#butto").attr('disabled','disabled');
					}
					else{
						$("#butto").removeAttr('disabled');
						//跳转到敬请期待
						mui("#butto")[0].addEventListener("tap",function(){
							if(flag){
								mui.openWindow({
									id: "hopepage.html",
									url: "hopepage.html",
									extras:{
										imgUrl:flag
										
									}
								})
							}else{
								mui.openWindow({
									id: "myinvest.html",
									url: "myinvest.html",
									extras:{
										goodId:goodId
									},
									 createNew:true,
									 show:{
								      autoShow:true,//页面loaded事件发生后自动显示，默认为true
								    },
								    waiting:{
								      autoShow:true,//自动显示等待框，默认为true
								     } 
								})
							}
							
							
							
						})
					}
	    		}else{
	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
//	    				mui.toast("请登录后操作")
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"goodsdetail.html"}
							})
		    			}
		    			mui.toast(msg.msg);
	    		}
	    		
	    		
	    		
	    	},error:function(e){
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
//		mui("#fPlan")[0].addEventListener("tap",function(){
//			var href = this.getAttribute('hrefs');
//			mui.openWindow({
//				url:"fplan.html",
//				id:"fplan.html",
//				styles:{
//					top:0,
//					bottom:0
//				},
//				extras:{
//				tag:getUrlParam()+"/page.html?page="+href+""
//			}
//			})
//			
//			
//		})
		mui("#breakEven")[0].addEventListener("tap",function(){
			var href = this.getAttribute('hrefs');
			mui.openWindow({
				url:"breakeven.html",
				id:"breakeven.html",
				styles:{
					top:0,
					bottom:0
				},
				extras:{
				tag:getUrlParam()+"/page.html?page="+href+""
			}
			})
			
			
		})
		
 		
 	
 	})

	
	
	
	
})
