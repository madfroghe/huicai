//充值页面
define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		
		var availableMoney =plus.storage.getItem("availableMoney");
		$('#avaribel').html(availableMoney);
		
	})
	mui('#recharge')[0].addEventListener('tap',function(){
		mui.openWindow({
			id:"recharge.html",
			url:"recharge.html",
			styles:{
				top:0,
				bottom:0
			}
		})
	})
	
	mui('#withdr_w')[0].addEventListener('tap',function(){
		mui.openWindow({
			id:"withdraw.html",
			url:"withdraw.html",
			styles:{
				top:0,
				bottom:0
			}
		})
	})
	
	$('.mui-table-view-cell').on('tap',function(){
		var href = this.getAttribute('href');
		var flag = this.getAttribute('flag');
//		if(flag==1){
//			mui.openWindow({
//				id: href,
//				url: href,
//				styles: {
//				top: '0px',
//				bottom: '0px'
//				},
//				extras:{falg:flag}
//			})
//			mui.fire(plus.webview.getWebviewById(href),"reLode")
//		}else{
			mui.openWindow({
			id: href,
			url: href,
			styles: {
			top: '0px',
			bottom: '0px'
		}
		})
//		}
		
	})

})