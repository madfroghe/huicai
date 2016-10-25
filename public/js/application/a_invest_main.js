define(function(require, exports, module) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var circle = require("../major/circleProgress");
	var convert = require("../major/convert");
	
	mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : { 
	      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	      callback :getProductList //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  } 
	});
	
	mui.plusReady(function(){
		common.onNetChange("a_invest_main.html");//检测网络信号
		if(plus.os.name=="Android"){
   			mui('#refreshContainer')[0].style.marginTop="2.6rem";
   		}else{
   			mui('#refreshContainer')[0].style.marginTop="0rem";
   		}
		
		
		//定时器 自动执行下拉操作
		setTimeout(function(){
			mui('#refreshContainer').pullRefresh().pullupLoading();
		},100)
		
		//改变标题
		var self = plus.webview.currentWebview();
		$("#heder").html("理财金投资");
		type=-1;//产品类型
		
//		//显示状态赛选
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
//		});
//		
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
			$("#productListPanel")[0].innerHTML='';
			mui("#status")[0].innerText = this.innerText
			mui("#status_popover").popover("toggle");
			console.log(this.getAttribute('value'));
			status=this.getAttribute('value');
			choosePage =1;
			flags =1;
			mui('#refreshContainer').pullRefresh().refresh(true);
			getProductList();
			
		})
		
		//排序点击
		mui("#order_popover").on("tap",".mui-table-view-cell",function(e){
			mui('#arrow1')[0].className="mui-icon mui-icon-arrowdown";
				arrow2Flag=0;
//			getProductList();
//			choosePage =1;
			$("#productListPanel")[0].innerHTML='';
			mui("#order")[0].innerText = this.innerText
			mui("#order_popover").popover("toggle");
			console.log(this.getAttribute('value'));
			styles=this.getAttribute('value');
			choosePage =1;
			flags=1;
			mui('#refreshContainer').pullRefresh().refresh(true);
			getProductList();
			
			
		})
		
		//产品点击
		mui("#productListPanel").on("tap",".productMain",function(e){
//			var  title = $(".title",$(this)).html();
//			var  id = this.getAttribute("id");
//			common.openDetail(id);

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
		})
		
//		getListMenu();
		
	});
	
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
	    		console.log(JSON.stringify(a));
	    	}
		});
	}
	
	//取得产品数据
	var type =-1;
	var choosePage =1;
	var status = 1;
	var styles=0;
	var flags =0;
	function getProductList(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		//ajax 请求产品数据;
		setTimeout(function(){
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:getUrlParam()+"/vProductList",
	    	success: function(msg){
	    		nwaiting.close();
	    		console.log(JSON.stringify(msg));
	    		
	    		var data = msg.data;
	    		var totalPages =data[1].totalPages;
	    		var datas = data[0];
	    		if(datas==null){
	    			mui.toast("暂时没有产品，去别的地方看看吧!");
	    			mui('#refreshContainer').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
	    		}else{
	    			if(flags==1){
	    				if(plus.os.name=="Android"){
			   				mui('#refreshContainer')[0].style.marginTop="5.3rem";
				   		}else{
				   			mui('#refreshContainer')[0].style.marginTop="5.3rem";
				   		}
	    			}
	    			
	    			if(choosePage>totalPages){
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
						return false;
					}else{
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
					}
	    			for(var i =0 ; i <datas.length;i++){
		    			var item = datas[i];
		    			item.canvasId = new Date().getTime();
		    			var yield = item.yield*100;
		    			item.yield =yield ;
//		    			console.log(item.yield);
		    			item.productStatus = convert.statusConvert(item.productStatus);
		    			var html = document.getElementById("productTemplate").innerHTML;
				        $("#productListPanel")[0].innerHTML +=common.formatTemplate(item,html);
	    			
	    			}
		    		//TODO
		    		
	    		choosePage=choosePage+1;
	    		}
	    		
	    		
	    	},error:function(a,b,c){
	    		nwaiting.close();
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
		},100)
		
		
	}
});