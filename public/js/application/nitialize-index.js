define(function(require, exports, module){
	exports.nitialize = function(){
		mui.init({
      		swipeBack: false,
			statusBarBackground: '#ff7f00',
//			subpages: [
//					{
//						url:'page/web/user/index_main.html',
//						id: 'index_main.html',
//						styles: {
//							top: '38px',
//							bottom: '50px'
//							
//						},
//						show:{
//					      autoShow:true
//					    }
//					}
//			
//			]
      });
	}
	
	mui.plusReady(function(){
		mui.openWindow({
			url: 'page/web/user/index_main.html',
			id: 'index_main.html',
			styles: {
				top: '38px',
				bottom: '50px'
				
			}
		})
	})
	
})
