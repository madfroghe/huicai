define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	mui.plusReady(function(){
		common.onNetChange("help.html");//检测网络信号
//		zyjy();
		//列表点击调到相应页面
	$('.my-list-li').on('tap',function(){
		var href = this.getAttribute('hrefs');
		mui.openWindow({
			id: "fqa.html",
			url: "fqa.html",
			styles: {
			top: '0px',
			bottom: '0px'
			},
			extras:{
				tag:getUrlParam()+"/page.html?page="+href+""

			}
		})
	})
		
		
	})
	
})