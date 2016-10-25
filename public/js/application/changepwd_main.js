define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	var user_id;
	var appkey;
	mui.plusReady(function(){
		common.onNetChange("changepwd.html");//检测网络信号
		 user_id = plus.storage.getItem("user_id");
		 appkey = plus.storage.getItem("appkey");
		 
//		changepwd(user_id,appkey)
		
	})
	
	mui('#changepwd')[0].addEventListener('tap',function(){
		
		var oldpassword = hex_md5($('#oldPwd').val());
		var newpassword = hex_md5($('#password').val());
		var surePwd = hex_md5($('#newpassword').val());
		if($('#oldPwd').val()==""){
			mui.toast("请输入原密码");
		}
		else if($('#password').val()==""){
			mui.toast("请输入新密码");
		}else if($('#newpassword').val()==''){
			mui.toast("请确认新密码")
		}
		else if(newpassword!==surePwd||newpassword=="d41d8cd98f00b204e9800998ecf8427e"||surePwd=="d41d8cd98f00b204e9800998ecf8427e"){
			mui.toast("两次新密码不一致");
		}else if($('#oldPwd').val()===$('#password').val()){
			mui.toast("新密码与原密码不能相同");
		}
		else {
			changepwd(user_id,appkey,oldpassword,newpassword);
			
		}
		
	})
	
	//修改密码
	
	function changepwd(user_id,appkey,oldpassword,newpassword){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var url = getUrlParam()+"/modifyPassWord";
		var datas = {"user_id":user_id,"appkey":appkey,"oldpassword":oldpassword,"newpassword":newpassword};
//		var data = common.myAjax(url,datas,"get","changepwd.html");
		common.timeOver();//请求超过10秒关闭等待框
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
		  	url:url,
	    	data:datas,
	    	success: function(msg){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		console.log(JSON.stringify(msg));
	    		if(msg.status==1){
	    			var webviews = plus.webview.all();
			    	  mui.each(webviews,function(i,item){
			    	 	if(
			    	 		item.getURL().indexOf("invest_main.html")>0
			    	 	  ||item.getURL().indexOf("pwdmanager.html")>0
			    	 	  ||item.getURL().indexOf("changepwd.html")>0
			    	 	  ||item.getURL().indexOf("handpwdchange.html")>0
			    	 	){
			    	 		item.hide();
			    	 	}
			    	 });
//	    			plus.webview.getWebviewById("changepwd.html").hide();
//	    			plus.webview.getWebviewById("changepwd.html").close();
	    			mui.openWindow({
	    				url:"login.html",
	    				id:"login.html",
	    				styles:{
	    					top:0,
	    					bottom:0
	    				},
	    				extras:{
	    					flag:2
	    				}
	    				
	    			})
	    			if(msg.msg=="用户名或密码错误"){
	    				mui.toast("原密码错误")
	    			}else{
	    				mui.toast(msg.msg);
	    			}
	    			
	    			
	    		}else{
	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
		    				mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"changepwd.html"}
							})
		    			}else{
		    				if(msg.msg=="用户名或密码错误"){
			    				mui.toast("原密码错误")
			    			}else{
			    				mui.toast(msg.msg);
			    			}
		    			}
		    			
	    		}
	    		
	    		
	    		
	    	},error:function(e){
	    		nwaiting.close(); //新webview的载入完毕后关闭等待框
	    		common.timeOut();//网络请求超时
	    	}
		});
		
		
	}
})