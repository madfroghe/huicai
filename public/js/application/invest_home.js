define(function(require,module,exports){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var circle = require("../major/circleProgress");
	var convert = require("../major/convert");


	mui.init({
		pullRefresh: {
			container: '#good-list',
			up: {
				contentrefresh: '正在加载...',
				callback: randerpages
			}
		}
		
	});
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
		var goodId //产品id
		var type =-1; //商品种类默认F计划
		var types=2;//众星宝
		var choosePage=1;//当前页
		var user_id;
		var appkey;
		mui.plusReady(function(){
			 user_id = plus.storage.getItem("user_id");
			 appkey = plus.storage.getItem("appkey");
			if(plus.os.name=="Android"){
	 			mui('#good-list')[0].style.marginTop="3rem";
	 			mui(".flipster")[0].style.marginTop="2.8rem";
	 		}else{
	 			mui('#good-list')[0].style.marginTop="4rem";
	 			mui(".flipster")[0].style.marginTop="2.8rem";
	 		}
			 var nowType = plus.storage.getItem("productType");
			 if(nowType=="null"){
			 	mui("#fbox")[0].style.display="block";
      			mui("#good-list")[0].style.display="none";
			 	type =0;
			 	randerPage(type);
			 	$(".menu[status="+type+"]").addClass('active');
			 	$(".menu[status="+type+"]").siblings().removeClass('active');
			 }else{
			 	mui("#fbox")[0].style.display="block";
      			mui("#good-list")[0].style.display="none";
			 	type=nowType;
//			 	alert(type)
			 	randerPage(type);
			 	$(".menu[status="+type+"]").addClass('active');
			 	$(".menu[status="+type+"]").siblings().removeClass('active');
			 }
			setTimeout(function(){
				mui('#good-list').pullRefresh().pullupLoading();
			},300)
			
      		//点击获取type值
      $('.menu').on("tap",function(){
      		mui("#fbox")[0].style.display="block";
      		mui("#good-list")[0].style.display="none";
	      	var productType = this.getAttribute("status");
//	      	randerPage(productType);
	      	plus.storage.setItem("productType",productType);
			this.className = "active fProject mui-pull-left menu";
			$(this).siblings().removeClass('active');
//			window.location.reload();
      })
	$('.menus').on("tap",function(){
		mui("#fbox")[0].style.display="none";
      		mui("#good-list")[0].style.display="block";
		var table = mui('#productListPanel')[0];
			var productMain = mui('.productMain')
			if(productMain){
				table.innerHTML='';
			}
			types=this.getAttribute("status");
			choosePage=1;
			mui('#good-list').pullRefresh().refresh(true);
			randerpages();
			this.className = "active fProject mui-pull-left menu";
			$(this).siblings().removeClass('active');
//			window.location.reload();
			
		})
			
			//跳转到产品详情页
			mui("#iconBox").on("tap",".goodDtail",function(){
				common.openDetail(goodId);
			})
			
			//产品点击
		mui("#productListPanel").on("tap",".productMain",function(e){
//			var  title = $(".title",$(this)).html();
			var  id = this.getAttribute("pid");
			var piid = this.getAttribute("ppid");
			common.openDetail(id);
		})
			
			//马上赚钱
			mui("#quiklyBtn")[0].addEventListener("tap",function(){
				mui.openWindow({
					url:"myinvest.html",
					id:"myinvest.html",
					style:{
						top:0,
						bottom:0
					},
					extras:{
						 goodId:goodId
					},
					 createNew:true,
					  show:{
					      autoShow:true,//页面loaded事件发生后自动显示，默认为true
					    },
					    waiting:{
					      autoShow:true,//自动显示等待框，默认为true
					       options:{
						       background:"rgba(0,0,0,0.8)"//等待框背景色
						      
						      }
					     } 
				})
			})
      	})
		
		//绑定数据
		function randerPage(type){
//			alert(type)
//			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
			var time = new Date().Format("yyyy-MM-dd hh:mm:ss");//系统当前时间  
			var url =getUrlParam();
		mui.ajax({
			type: "get",
		    dataType: "json",
		    data:{
		    	type:type,
		    	user_id:user_id,
		    	appKey:appkey
		    },
		    url:url+"/productsToBuy",
		    success:function(data){
		    	console.log(1234)
		    	console.log(JSON.stringify(data));
//		    	nwaiting.close();
		    	var tableBox = mui("#tableBoxs")[0];
		    		tableBox.innerHTML='';
		    		
		    	if(data.status==1){
//		    		nwaiting.close();
		    		if(data.data.length>0){
		    			for(var i=0;i<data.data.length;i++){
			    			var item = data.data[i];
			    			if(type==2&&time<item.buy_time_end){
			    				var li=document.createElement("li");
			    				li.className="libox";
			    				li.setAttribute("pid",item.pid)
			    				var html="";
			    				html='<a href="javascript:void(0)" class="Button Block tc letGo" pid='+item.pid+'>';
			    				html+='<h3 class="c_666 disNone">'+item.item_name+'</h3>';
			    				html+='<div><span class="c_e43" style="font-size: 1.6rem;">'+item.annualized_return+'</span><span class="c_e43" style="font-size: 1rem;">%</span> <span style="color:#666">保本</span></div>'
						  		html+='<div class="c_666" style="font-size:0.8rem">+浮动收益</div>';
						  		html+='</a>';
						  		li.innerHTML=html;
						  		tableBox.appendChild(li);
							  			
							  		
				    			
			    			}else if(type==2&&time>item.buy_time_end){
			    				var li=document.createElement("li");
			    				li.className="libox";
			    				li.setAttribute("pid",item.pid)
			    				var html="";
			    				html='<a href="javascript:void(0)" class="Button Block tc letGo" pid='+item.pid+'>';
			    				html+='<h3 class="c_666 disNone">'+item.item_name+'</h3>';
			    				html+='<div><span class="c_e43" style="font-size: 1.6rem;">'+item.annualized_return+'</span><span class="c_e43" style="font-size: 1rem;">%</span></div>'
						  		html+='<div class="c_666">最新年化</div>';
						  		html+='</a>';
						  		li.innerHTML=html;
						  		tableBox.appendChild(li);
							  			
							  		
				    			
			    			}else{
			    				var li=document.createElement("li");
			    				li.className="libox";
			    				li.setAttribute("pid",item.pid)
			    				var html="";
			    				html='<a href="javascript:void(0)" class="Button Block tc letGo" pid='+item.pid+'>';
			    				html+='<h3 class="c_666 disNone">'+item.item_name+'</h3>';
			    				html+='<div><span class="c_e43" style="font-size: 1.6rem;">'+item.annualized_return+'</span><span class="c_e43" style="font-size: 1rem;">%</span></div>'
						  		html+='<div class="c_666">年化收益</div>';
						  		html+='</a>';
						  		li.innerHTML=html;
						  		tableBox.appendChild(li);
							  			
							  		
				    			
			    			}
		    			}
		    			$(".flipster").flipster({ style: 'carousel', start: 0,onItemSwitch:function(e){
		    				
							$(".flip-current").find("a").addClass("letGo");
							
							$(".flip-current").siblings().find("a").removeClass("letGo");//点击事件
							$(".flip-current").siblings().find("a").find("div").css("display","none");
							$(".flip-current").find("a").find("div").css("display","block");//年化的隐藏
							$(".flip-current").siblings().find("a").find("h3").addClass("disNone");
							$(".flip-current").find("a").find("h3").removeClass("disNone");//标题定位
							$(".flip-current").siblings().find("a").find("h3").removeClass("disBorder");
							$(".flip-current").find("a").find("h3").addClass("disBorder");//添加下划线
							var num = $(".flip-current").find("a").find("div").eq(0).find("span").eq(0).text();
//							var timer =null;
//							var numFlag=0
//							timer=setInterval(function(){
//								numFlag=numFlag+1;
//								$(".flip-current").find("a").find("div").eq(0).find("span").eq(0).text(numFlag);
//								if(numFlag==num){
//									clearInterval(timer);
//									numFlag=0
//								}
//							},50)
							
							
							goodId = $(".flip-current").find("a").attr("pid");
						}});
						
						mui('.libox').on("tap",".letGo",function(){
							common.openDetail(goodId);
						})
		    		}
		    		
		    		
		    	}
		    	
			    
		    },
		    error:function(e){
		    	common.timeOut();//网络请求超时
		    }
			     
  		})
		}
		
		//页面渲染
	function randerpages(){
//		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/productList";
		var da = {"pagesize":10,"type":types,"p":choosePage};
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:url,
		  	data:da,
	    	success: function(msg){
//	    		nwaiting.close();
	    		console.log(1212)
	    		console.log(JSON.stringify(msg));
	    		if(msg.status==1){
	    		
	    		var data = msg.data;
	    		var totalPages =data[1].totalPages;
	    		var datas = data[0];
	    		if(datas==null){
	    			mui.toast("暂时没有产品，去别的地方看看吧！");
	    			mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
	    			return false;
	    		}else{
//	    			if(flag==1){
//	    				if(plus.os.name=="Android"){
//				 			mui('#good-list')[0].style.marginTop="6.3rem";
//				 		}else{
//				 			mui('#good-list')[0].style.marginTop="6.5rem";
//				 		}
//	    			}
	    			if(datas.length>0){
		    			if(choosePage>totalPages){
	//		    			alert(333)
							mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
							return false;
						}else{
	//						alert(totalPages)
							mui('#good-list').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
						}
		    			for(var i =0 ; i <datas.length;i++){
			    			var item = datas[i];
			    			item.canvasId = new Date().getTime();
			    			var yield = item.yield;
		    				item.yield =yield ;
			    			item.productStatus = convert.statusConvert(item.productStatus);
			    			var html = document.getElementById("productTemplate").innerHTML;
					        $("#productListPanel")[0].innerHTML +=common.formatTemplate(item,html);		    				
		    			}
	    			}
		    		//TODO
		    		
	    		choosePage=choosePage+1;
				
	    		}
	    	}else{
	    			mui.toast(msg.msg);
	    	}
	    		
	    	},error:function(e){
	    		console.log(12)
	    		console.log(JSON.stringify(e))
//	    		nwaiting.close(JSON.stringify(e));
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
	}
		
//		mui.back = function() {
//				var homeView = plus.webview.getWebviewById("myacount.html");
//				var curretnView = plus.webview.currentWebview();
//				var homeView = plus.webview.getWebviewById("more_main.html");
//				var curretnView = plus.webview.currentWebview();
//				$("#ext_Cover").css("display","block");
//				mui("#sure_Btn")[0].addEventListener("tap",function(){
//					plus.runtime.quit();
//				});
//				mui("#cancel_Btn")[0].addEventListener("tap",function(){
//					$("#ext_Cover").css("display","none");
//				
//				})
//			}

			var first = null;
			mui.back = function() {
				var homeView = plus.webview.getWebviewById("invest_home.html");
				var curretnView = plus.webview.currentWebview();
				if(homeView==curretnView){
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
					

				}else{
					homeView.show();
					plus.webview.currentWebview().hide();
				}
			}

})
	