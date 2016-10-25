define(function(require, exports, module) {
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.init({
	  pullRefresh : {
	    container:"#good-list",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : { 
	      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	      callback :randerPage //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  } 
	});
	
	var user_id;
	var appkey ;
	mui.plusReady(function(){
		 user_id = plus.storage.getItem("user_id");
		 appkey = plus.storage.getItem("appkey");
		common.onNetChange("choosebank.html");//检测网络信号
//		randerPage();
		//定时器 自动执行下拉操作
		setTimeout(function(){
			mui('#good-list').pullRefresh().pullupLoading();
		},100)
		
		if(plus.os.name=="Android"){
 			mui('#good-list')[0].style.marginTop="0rem";
 		}else{
 			mui('#good-list')[0].style.marginTop="3rem";
 		}
		
		
	})
	
	function randerPage(){
		var url =getUrlParam();
		mui.ajax({
			type: "get",
		    dataType: "json",
		    url:url+"/getInstList",
		    data:{"user_id":user_id,"appkey":appkey},
		    success:function(data){
		    	console.log(JSON.stringify(data));
		    	var bankBox = mui("#bankList")[0];
		    	bankBox.innerHTML='';
		    	if(data.status==1){
		    		if(data.data.length>0){
		    			mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
		    			for(var i=0;i<data.data.length;i++){
		    				var item =data.data[i]
		    				var li =document.createElement('li');
		    				li.className ="mui-table-view-cell"
				    		li.setAttribute("code",item.bankCode);
				    		li.setAttribute("bankName",item.bankName);
				    		var html ='';
//				    		html='<li class="mui-table-view-cell" code='+item.bankCode+' bankName='+item.bankName+'>';
							html='<span></span><span>'+item.bankName+'</span>';
//							html+='</li>';
							li.innerHTML=html;
							bankBox.appendChild(li);
		    			}
		    			mui('.mui-table-view').on("tap",".mui-table-view-cell",function(){
		    				var code = this.getAttribute("code");
		    				var bankName = this.getAttribute("bankName");
//		    				alert(bankName)
							mui.openWindow({
								url:"addcard.html",
								id:"addcard.html",
								styles:{
									top:0,
									bottom:0
								},
								extras:{
									code:code,
									bankName:bankName
								}
							})
						})
		    		}
		    		
		    		
		    	}else{
		    		mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
		    		if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
	    				mui.toast("登录超时，请重新登录");
	    				mui.openWindow({
							id: "login.html",
							url: "login.html",
							styles: {
							top: '0',
							bottom: '0'
							
						},
						extras:{pageId:"choosebank.html"}
						})
	    			}else{
	    				mui.toast(data.msg);
	    			}
		    		
		    	}
		    	
			    
		    },
		    error:function(e){
		    	common.timeOut();//网络请求超时
		    }
			     
  		})
	}
	


})