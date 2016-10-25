define(function(require, exports, module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
	 var user_id;
	 var appkey;
	 var hasSpreader;
	
	mui.plusReady(function(){ 
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		//分享plus事件处理
//		updateSerivces();
//		if(plus.os.name=="Android"){
//			Intent = plus.android.importClass("android.content.Intent");
//			File = plus.android.importClass("java.io.File");
//			Uri = plus.android.importClass("android.net.Uri");
//			main = plus.android.runtimeMainActivity();
//		}
		
		
		
		document.getElementById("userInfo").innerHTML = plus.storage.getItem("username");
		
        user_id = plus.storage.getItem("user_id");
		appkey = plus.storage.getItem("appkey");
			
//			if(plus.storage.getItem("_userPhoto")==null){
//				mui("#header")[0].src="../../../public/img/header.png";
//			}else{
//				mui("#header")[0].src=plus.storage.getItem("_userPhoto");
//			}
			
			
			
      		mui.ajax({
					type: "get",
				    dataType: "json",
				    url:getUrlParam()+"/accountInfo",
				    data:{
				    	user_id:user_id,
				    	appkey:appkey
				    }, 
				    success:function(data){ 
				    	console.log(121)
				    	console.log(JSON.stringify(data))
				    	nwaiting.close(); //新webview的载入完毕后关闭等待框
				    	if(data.msg=="用户不存在"||data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
				    		mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"acuntmanager.html"}
							})
				    	}else{
				    		 plus.webview.currentWebview().show();
				    		
						    hasSpreader =data.data.hasSpreader;
						    var vistorCode=data.data.vistorCode;
						    mui("#myCode")[0].innerHTML=vistorCode;
						    mui("#sharecontent")[0].value="我的邀请码"+vistorCode;
						   
						    if(!data.data.userIco){
			    				//如果不存在就默认头像
			    				var imgIcon="../../../public/img/header.png";
			    				mui("#header")[0].src="../../../public/img/header.png";
								plus.storage.setItem("_userPhoto",imgIcon);
			    				
			    			}else{
								var imgIcon = getUrlParam()+data.data.userIco
			    				plus.storage.setItem("_userPhoto",imgIcon);
			    				mui("#header")[0].src=getUrlParam()+data.data.userIco;
			    			}
						   
				    	}
					    
				    
				    },
				    error:function(e){
				    	nwaiting.close(); //新webview的载入完毕后关闭等待框
				    }
				     
      		})
      		
      		
      	})
	
	//列表点击调到相应页面
	mui('.mui-table-view').on('tap','.my-list-li',function(){
		var loginFlag = plus.storage.getItem("password");//判断用户是否登录
		var href = this.getAttribute('href');
		if(loginFlag==null){
			mui.toast("登录超时，请重新登录");
			mui.openWindow({
				id: "login.html",
				url: "login.html",
				styles: {
				top: '0',
				bottom: '0'
				
				},
				extras:{pageId:"acuntmanager.html"}
			})
			
		}else{
			mui.openWindow({
				id: href,
				url: href,
				styles: {
				top: '0px',
				bottom: '0px'
			
			},
			 createNew:true
			})
		}
		var loginFlag = plus.storage.getItem("password");//判断用户是否登录
		if(loginFlag){
			document.getElementById("login").style.display = 'none';
			
		}else{
			document.getElementById("ext").style.display = 'none';
			document.getElementById("login").style.display = 'block';
		}
		
	})

		//退出登录
		mui("#ext")[0].addEventListener("tap",function(){
			$("#ext_Cover").show(300);
			var user_id = plus.storage.getItem("user_id");
			 var appkey = plus.storage.getItem("appkey");

		})
		
		mui("#sure_Btn")[0].addEventListener("tap",function(){
			mui("#ext_Cover")[0].style.display="none";
			var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		
			
			 var url = getUrlParam()+"/logOut";
			 var datas = {"user_id":user_id,"appkey":appkey};
			setTimeout(function(){
				$.ajax({
					type: "get",
					contentType:"application/json",
					dataType:"json",
					async:false,
				  	url:url,
			    	data:datas,
			    	success: function(msg){
			    		mui("#ext_Cover")[0].style.display="none";
			    		console.log(JSON.stringify(msg));
			    		if(msg.status==1){
			    			
			    			document.getElementById("login").style.display = 'block';
							document.getElementById("ext").style.display = 'none';
			    			
//				    			document.getElementById("userInfo").innerHTML="亲，你还未登录哟！"
			    			plus.storage.removeItem("password");
							plus.storage.removeItem("telephone");
							plus.storage.removeItem("user_id");
							plus.storage.removeItem("handFlag");
							plus.storage.removeItem("handPwd");
							plus.storage.removeItem("hands");
							plus.storage.removeItem("username");
							plus.storage.removeItem("_userPhoto");
							nwaiting.close();
			    			mui.toast(msg.msg);
			    		}else{
			    			nwaiting.close();
			    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
			    				document.getElementById("login").style.display = 'block';
								document.getElementById("ext").style.display = 'none';
			    				mui.toast("注销成功");
			    			}else if(msg.msg=="用户不存在"){
			    				mui.toast(msg.msg);
			    				document.getElementById("login").style.display = 'block';
								document.getElementById("ext").style.display = 'none';
								plus.storage.removeItem("password");
								plus.storage.removeItem("telephone");
								plus.storage.removeItem("user_id");
								plus.storage.removeItem("handFlag");
								plus.storage.removeItem("handPwd");
								plus.storage.removeItem("hands");
								plus.storage.removeItem("username");
								plus.storage.removeItem("_userPhoto");
			    			}
			    			else{
			    				mui.toast(msg.msg);
			    			}
				    			
			    		}
			    		
			    		console.log(JSON.stringify(msg))
			    		
			    	},error:function(a,b,c){
			    		mui("#ext_Cover")[0].style.display="none";
			    		common.timeOut();//网络请求超时
			    	}
			}); 
			},500)
				
		})
		mui("#cancel_Btn")[0].addEventListener("tap",function(){
			$("#ext_Cover").hide(300);
		})
		//点击登录
	mui('#login')[0].addEventListener('tap',function(){
		mui.openWindow({
				id: "login.html",
				url: "login.html",
				styles: {
				top: '0',
				bottom: '0'
				
			},
			extras:{pageId:"acuntmanager.html"},
			createNew:true
			})
		
	})
	
	mui('#share')[0].addEventListener("tap",function(){
		if(hasSpreader==0){
			$('#Mycode').show(300);
		}else{
			mui.toast("已填写过邀请码");
		}
		
		
		
	})
	mui('#sure')[0].addEventListener("tap",function(){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var codeNum = mui("#codeNum")[0].value;
		if(codeNum==""){
			nwaiting.close(); //新webview的载入完毕后关闭等待框
			mui.toast("请输入邀请码");
		}else{
			mui.ajax({
					type: "get",
				    dataType: "json",
				    url:getUrlParam()+"/setVistorCode",
				    data:{
				    	user_id:user_id,
				    	appkey:appkey,
				    	vistorCode:codeNum
				    }, 
				    success:function(data){ 
				    	nwaiting.close(); //新webview的载入完毕后关闭等待框
				    	console.log(1234);
				    	console.log(JSON.stringify(data));
				    	if(data.status==1){
				    		
				    		mui.toast(data.msg);
				    		$('#Mycode')[0].style.display="none";
				    		window.location.reload();
				    	}else{
				    		if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
				    		mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"acuntmanager.html"}
							})
					    	}else if(data.msg=="用户不存在"){
					    		mui.toast("请注册后操作");
			    				mui.openWindow({
									id: "register.html",
									url: "register.html",
									styles: {
									top: '0',
									bottom: '0'
									
								}
								})
					    	}else{
					    		mui.toast(data.msg);
					    	}
				    	}
				    	
				    	
					    
				    
				    },
				    error:function(e){
				    	console.log(JSON.stringify(e))
				    	nwaiting.close(); //新webview的载入完毕后关闭等待框
				    	common.timeOut();//网络请求超时
				    	
				    }
				     
      		})
		}
		
		
		
	})
	mui("#cancel")[0].addEventListener("tap",function(){
		$('#Mycode').hide(300);
	})
	
	
	//头像上传
	mui("#header")[0].addEventListener("tap",function(){
		mui('#photo').popover('toggle');
	})
	
	//取消 关闭弹出菜单
	mui("#photoChanel")[0].addEventListener("tap",function(){
		mui('#photo').popover('toggle');
	});
	
	
	//拍照
	mui("#photoCamera")[0].addEventListener("tap",function(){
		appendByCamera();
		mui('#photo').popover('toggle');
	});
	
	//打开相册
	mui("#photoGallery")[0].addEventListener("tap",function(){
		appendByGallery();
		mui('#photo').popover('toggle');
	});
	// 拍照添加文件
			function appendByCamera(){
				plus.camera.getCamera().captureImage(function(p){
					  plus.io.resolveLocalFileSystemURL(p, function(entry) {
	                        var localurl = entry.toLocalURL(); //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
	                        appendFile(localurl);
//	                        upload();
	                    });
				});	
			}
	      	// 从相册添加文件
			function appendByGallery(){
				plus.gallery.pick(function(p){
			        appendFile(p);
			        
			    });
			}
			// 添加文件
			function appendFile(p){
				var n=p.substr(p.lastIndexOf('/')+1);
				console.log(p)
				//图片裁剪
				
				plus.zip.compressImage({
                    src: p,
                    dst: "_doc/cm.jpg",
                    quality: 80,
                    overwrite: true,
                    width: '80px',
                    height: '80px'
                },
                function(i) {
                    var imgUrl =i.target;
                    console.log(JSON.stringify(i))
                    mui("#header")[0].src=imgUrl;
					files.push({name:"userico",path:imgUrl});
					upload();
                }, function(e) {
                    console.log("压缩图片失败: " + JSON.stringify(e));
                });
			}
			
			// 产生一个随机数
			function getUid(){
				return Math.floor(Math.random()*100000000+10000000).toString();
			}
			
			var server=getUrlParam()+"/uploadImg";
			var files=[];
			// 上传文件 
			function upload(){
				if(files.length<=0){
					plus.nativeUI.console.log("没有添加上传文件！");
					return;
				}
				//console.log("开始上传：")
				var wt=plus.nativeUI.showWaiting();
				 
				var task=plus.uploader.createUpload(server,
					{method:"POST"},
					function(t,status){ //上传完成
//						console.log(JSON.stringify(status));
//						console.log(JSON.stringify(t));
						if(status==200){ 
							var responseText=JSON.parse(t.responseText);
							console.log(JSON.stringify(t));
							console.log(123);
							console.log(JSON.stringify(responseText));
//							var responseText=JSON.parse(t.responseText);
							if(responseText.status==1){
//								if(responseText.data.result_des=="zm"){
//									zmFlag =responseText.data.result_code;
									mui.toast("上传成功");
									plus.storage.setItem("_userPhoto",files[0].path);
									mui.fire(plus.webview.getWebviewById("myacount.html"),"changePhoto");
									wt.close();
//								}else if(responseText.data.result_des=="fm"){
//									fmFlag=responseText.data.result_code;
//									mui.toast("上传成功");
//									plus.storage.setItem("_userPhoto",files[0].path);
//									wt.close();
//								}
							}else{
								mui.toast("上传失败");
								wt.close();
							}
						}else{
							mui.toast("上传失败");
							wt.close();
						}
					}
				);
				task.addData("user_id",user_id);
				task.addData("appkey",appkey);
				for(var i=0;i<files.length;i++){
					var f=files[i];
					task.addFile(f.path,{key:f.name});
				} 
				task.start(); 
				
			}
			
			
			
//分享功能开始
		mui("#myShare")[0].addEventListener("tap",function(){
//			if(plus.os.name=="Android"){
//				mui('#share_Cover')[0].style.display="block";
//			}
			
	//		
		})
		mui("#cancel_share")[0].addEventListener("tap",function(){
			mui('#share_Cover')[0].style.display="none";
		})
		mui("#sure_share")[0].addEventListener("tap",function(){
			shareShow();
		})
	var shares=null,bhref=false;
	var Intent=null,File=null,Uri=null,main=null;
	/**
	 * 更新分享服务
	 */
	function updateSerivces(){
		plus.share.getServices( function(s){
			shares={};
			for(var i in s){
				var t=s[i];
				shares[t.id]=t;
			}
		}, function(e){
			console.log( "获取分享服务列表失败："+e.message );
		} );
	}
	
	/**
   * 分享操作
   * @param {String} id
   */
	function shareAction(id,ex) {
		var s=null;
//		console.log( "分享操作：" );
		if(!id||!(s=shares[id])){
			console.log( "无效的分享服务！" );
			return;
		}
		if ( s.authenticated ) {
			console.log( "---已授权---" );
			shareMessage(s,ex);
		} else {
			console.log( "---未授权---" );
			s.authorize( function(){
					shareMessage(s,ex);
				},function(e){
				console.log( "认证授权失败："+e.code+" - "+e.message );
				if(e.code==-8){
					mui.toast("客户端未安装");
				}
			});
		}
	}
	
	/**
   * 发送分享消息
   * @param {plus.share.ShareService} s
   */
	function shareMessage(s,ex){
		var msg={content:sharecontent.value,extra:{scene:ex}};
		if(bhref){
			msg.href=sharehref.value;
			if(sharehrefTitle&&sharehrefTitle.value!=""){
				msg.title=sharehrefTitle.value;
			}
			if(sharehrefDes&&sharehrefDes.value!=""){
				msg.content=sharehrefDes.value;
			}
			msg.thumbs=["_www/logo.png"];
			msg.pictures=["_www/logo.png"];
		}else{
//			if(pic&&pic.realUrl){
//				msg.pictures=[pic.realUrl];
//			}
		}
		console.log(JSON.stringify(msg));
		s.send( msg, function(){
			console.log( "分享到\""+s.description+"\"成功！ " );
			mui('#share_Cover')[0].style.display="none";
		}, function(e){
			alert( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
		} );
	}
	
	// 打开分享
	function shareShow(){
		bhref=false;
		var ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"sinaweibo"}],
		bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"},{title:"分享到新浪微博"}];
		if(plus.os.name=="iOS"){
			ids.push({id:"qq"});
			bts.push({title:"分享到QQ"});
		}
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var i=e.index;
				if(i>0){
					shareAction(ids[i-1].id,ids[i-1].ex);
				}
			}
		);
	}
	
})