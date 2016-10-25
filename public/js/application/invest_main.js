//投资理财
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
				callback: randerpage
			},
			 down :{
		      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
		      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
		      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
		      callback : randerpage//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		    }
		}
		
	});
	
	var choosePage=1;//当前页
	var type =-1; //商品种类默认F计划
	var status = 1;//状态
	var styles=0;//排序
	var flag =0;
	mui.plusReady(function(){
		common.onNetChange("invest_main.html");//检测网络信号
		if(plus.os.name=="Android"){
 			mui('#good-list')[0].style.marginTop="0rem";
 		}else{
 			mui('#good-list')[0].style.marginTop="0rem";
 		}
		
		
		//显示状态赛选
//		var arrowFlag =0;
//		mui("#btnItem1")[0].addEventListener("tap",function(){
//			if(arrowFlag==0){
//				mui('#arrow')[0].className="mui-icon mui-icon-arrowup";
//				arrowFlag=1;
//			}else{
//				mui('#arrow')[0].className="mui-icon mui-icon-arrowdown";
//				arrowFlag=0;
//			}
//			mui("#status_popover").popover("toggle");
//			
//		});
//		mui('#btnItem1')[.toggle(
//			function(){
//				mui("#arrow")[0].className ="mui-icon mui-icon-arrowup mui-pull-right";
//			},
//			function(){
//				mui("#arrow")[0].className ="mui-icon mui-icon-arrowup mui-pull-right";
//			}
//		)
		
//		//显示排序筛选
//		var arrow2Flag=0;
//		mui("#btnItem2")[0].addEventListener("tap",function(){
//			if(arrow2Flag==0){
//				mui('#arrow1')[0].className="mui-icon mui-icon-arrowup";
//				arrow2Flag=1;
//			}else{
//				mui('#arrow1')[0].className="mui-icon mui-icon-arrowdown";
//				arrow2Flag=0;
//			}
//			mui("#order_popover").popover("toggle");
//		});
//		
		//状态点击
		mui("#status_popover").on("tap",".mui-table-view-cell",function(e){
			
			mui('#arrow')[0].className="mui-icon mui-icon-arrowdown";
			arrowFlag=0;
			var table = mui('#productListPanel')[0];
			var productMain = mui('.productMain')
			if(productMain.length>=1){
				table.innerHTML='';
			}
			mui("#status")[0].innerText = this.innerText
			mui("#status_popover").popover("toggle");
			console.log(this.getAttribute('value'));
			status=this.getAttribute('value');
			choosePage =1;
			flag =1;
			mui('#good-list').pullRefresh().refresh(true);
			
			randerpage();
			
			
		})
		
		//排序点击
		mui("#order_popover").on("tap",".mui-table-view-cell",function(e){
			mui('#arrow1')[0].className="mui-icon mui-icon-arrowdown";
				arrow2Flag=0;
			var table = mui('#productListPanel')[0];
			var productMain = mui('.productMain')
			if(productMain){
				table.innerHTML='';
			}
			
			mui("#order")[0].innerText = this.innerText
			mui("#order_popover").popover("toggle");
			console.log(this.getAttribute('value'));
			styles=this.getAttribute('value');
			choosePage =1;
			flag=1;
			mui('#good-list').pullRefresh().refresh(true);
			randerpage();
			
			
		})
		
		//产品点击
		mui("#productListPanel").on("tap",".productMain",function(e){
//			var  title = $(".title",$(this)).html();
			var  id = this.getAttribute("pid");
			var piid = this.getAttribute("ppid");
			mui.openWindow({
				url:"mycrash.html",
				id:"mycrash.html",
				styles:{
					top:0,
					bottom:0
				},
				extras:{
					pid:id,
					piid:piid
				}
			})
//			common.openDetail(id);
		})
		
		getListMenu();
		
		
	})
	//取得筛选数据
	function getListMenu(){
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:getUrlParam()+"/productListMenu", 
	    	success: function(msg){
	    		console.log("ssss"+JSON.stringify(msg));
	    		var status = msg.data.status;
	    		for(var i =0 ; i <status.length;i++){
	    			var item = status[i];
	    			var html = document.getElementById("popoverListTemplate").innerHTML;
			        $("#status_list")[0].innerHTML +=common.formatTemplate(item,html);
	    		}
	    		
	    		var style = msg.data.style;
	    		for(var i =0 ; i <style.length;i++){
	    			var item = style[i];
	    			var html = document.getElementById("popoverListTemplate").innerHTML;
			        $("#style_list")[0].innerHTML +=common.formatTemplate(item,html);
	    		}
	    	},error:function(a,b,c){
	    		common.timeOut();//网络请求超时
	    	}
		});
	}
	
	
	setTimeout(function(){
		mui('#good-list').pullRefresh().pullupLoading();
	},300)
	
	//点击获取type值
	$('.classTitle').on("tap",".menu",function(){
		var table = mui('#productListPanel')[0];
			var productMain = mui('.productMain')
			if(productMain.length>=1){
				table.innerHTML='';
			}
		type = this.getAttribute("status");
		this.className = "active fProject mui-pull-left menu c_fff";
		$(this).siblings().removeClass('active')
		choosePage=1;
		flag = 1;
		mui('#good-list').pullRefresh().refresh(true);
		randerpage();
		
	})
	
	//页面渲染
	function randerpage(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/vProductList";
		var da = {"pagesize":10,"type":type,"p":choosePage,"status":status,"style":styles};
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:url,
	    	success: function(msg){
	    		nwaiting.close();
	    		
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
	    			if(flag==1){
	    				if(plus.os.name=="Android"){
				 			mui('#good-list')[0].style.marginTop="6.3rem";
				 		}else{
				 			mui('#good-list')[0].style.marginTop="6.5rem";
				 		}
	    			}
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
			    			var yield = item.yield*100;
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
	    		nwaiting.close(JSON.stringify(e));
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
	}
	
	 //处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {
				var homeView = plus.webview.getWebviewById("invest_main.html");
				var curretnView = plus.webview.currentWebview();
				if(homeView==curretnView){
					//首次按键，提示‘再按一次退出应用’
					first=first+1;
					if(first==1){
						common.extNotice();
						mui("#sure_Btn")[0].addEventListener("tap",function(){
							plus.runtime.quit();
							mui('body')[0].removeChild(mui('#ext_Cover')[0]);
							first=0;
						});
						mui("#cancel_Btn")[0].addEventListener("tap",function(){
							
							mui('body')[0].removeChild(mui('#ext_Cover')[0]);
							curretnView.close();
							first=0;
						})
					}
					
					
				}
			}
	
	
	
	


})
























