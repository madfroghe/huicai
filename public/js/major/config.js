//var url="http://fbao.87money.com/api1.0";
//var url="http://p2f.87money.com/api1.0";
//var url="http://120.27.45.157/api2.0"
var url="http://www.87huicai.com/api2.0"
//var url="http://120.27.45.157/api2.0"

function getUrlParam(){
	return url;
}

//accessToken="1_e2f5bb26dbf049b6ab58ac7f5619e402";
function getAccessTocken(){
	var accessToken = plus.storage.getItem("accessToken");
	return accessToken;
}


//取得青年志愿者店铺id
function getStoreId(){
	var storeId ="32779";
	return storeId;
}


//取得用户信息，判断用户是否登录，token失效提示重新登录
function validataUser(){
	var url = getUrlParam()+"/rest/o2o/api/user/user_info";
	mui.ajax({
		 type: "post",
	     dataType: "json",
	     async:false,
	     url: url,
	     headers:{
	    	accessToken :getAccessTocken()
	     },
	     success: function(msg){
	     	console.log(JSON.stringify(msg));
	     	if(msg.code =="1002"){
	     		//用户token失效，去掉缓存的token数据
	     		plus.storage.removeItem("accessToken");
	     	}else{
	     		var userPhoto="image/user.png";
		     	var userInfo = msg.data.user;
				if(userInfo.photo!=null){
			   	 	userPhoto = getUrlParam()+'/'+userInfo.photo.path+'/'+userInfo.photo.name;
			    }
				plus.storage.setItem("_userPhoto",userPhoto);
	     	}
	     }
	});
}

//var first = null;
//mui.back = function() {
//	var homeView = plus.webview.getWebviewById("index_main.html");
//	var curretnView = plus.webview.currentWebview();
//	if(homeView==curretnView){
//		//首次按键，提示‘再按一次退出应用’
//		if (!first) {
//			first = new Date().getTime();
//			mui.toast('再按一次退出应用');
//			setTimeout(function() {
//				first = null;
//			}, 1000);
//		} else {
//			if (new Date().getTime() - first < 1000) {
//				plus.runtime.quit();
//			}
//		}
//	}else{
//		homeView.show();
//		plus.webview.currentWebview().hide();
//	}
//}
