define(function(require,exports,module){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var common = require('../major/common');
				mui.plusReady(function(){
				setTimeout(function(){
					var webviews = plus.webview.all();
		    	  mui.each(webviews,function(i,item){
		    	 	if(
		    	 	  item.getURL().indexOf("withdraw.html")>0
		    	 	){
		    	 		item.hide();
		    	 	}
		    	 });	
				},300)
				
				common.onNetChange("approve.html");//检测网络信号	
				var user_id = plus.storage.getItem("user_id");
				var appkey = plus.storage.getItem("appkey");
				var server=getUrlParam()+"/uploadImg";
				var files=[];
				var zmFlag=0;
				var fmFlag=0;
//			正面	
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
	                        upload();
	                    });
				});	
			}
//	      	// 从相册添加文件
			function appendByGallery(){
				plus.gallery.pick(function(p){
			        appendFile(p);
			        upload();
			    });
			}
//			// 添加文件
			function appendFile(p){ 
				files=[];
				var n=p.substr(p.lastIndexOf('/')+1);
				mui("#userPhoto")[0].src=p;
				files.push({name:"zmimg",path:p});
			}
				
      	// 产生一个随机数
//			function getUid(){
//				return Math.floor(Math.random()*100000000+10000000).toString();
//			}
			
			
			// 上传文件 
			function upload(){
				if(files.length<=0){
					plus.nativeUI.alert("没有添加上传文件！");
					return;
				}
				//outSet("开始上传：")
				var wt=plus.nativeUI.showWaiting();
				 
				var task=plus.uploader.createUpload(server,
					{method:"POST"},
					function(t,status){ //上传完成
						console.log(JSON.stringify(status));
						common.timeOver();//请求超过10秒关闭等待框
						if(status==200){ 
							var responseText=JSON.parse(t.responseText);
							console.log(JSON.stringify(t));
							console.log(123);
							console.log(JSON.stringify(responseText));
//							var responseText=JSON.parse(t.responseText);
							if(responseText.status==1){
								if(responseText.data.result_des=="zm"){
									zmFlag =responseText.data.result_code;
									mui.toast("上传成功");
//									plus.storage.setItem("_userPhoto",files[0].path);
									wt.close();
								}else if(responseText.data.result_des=="fm"){
									fmFlag=responseText.data.result_code;
									mui.toast("上传成功");
//									plus.storage.setItem("_userPhoto",files[0].path);
									wt.close();
								}
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
      	
      	
			
		
				
//			反面	
			//取消 关闭弹出菜单
      		mui("#photoChanel2")[0].addEventListener("tap",function(){
      			mui('#photo2').popover('toggle');
      		});
      		
      		
      		//拍照
      		mui("#photoCamera2")[0].addEventListener("tap",function(){
      			appendByCamera2();
      			mui('#photo2').popover('toggle');
      		});
      		
      		//打开相册
      		mui("#photoGallery2")[0].addEventListener("tap",function(){
      			appendByGallery2();
      			mui('#photo2').popover('toggle');
      		});
      		
      		// 拍照添加文件
			function appendByCamera2(){
				plus.camera.getCamera().captureImage(function(p){
					  plus.io.resolveLocalFileSystemURL(p, function(entry) {
	                        var localurl = entry.toLocalURL(); //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
	                        appendFile2(localurl);
	                        upload();
	                    });
				});	
			}
//	      	// 从相册添加文件
			function appendByGallery2(){
				plus.gallery.pick(function(p){
			        appendFile2(p);
			        upload();
			    });
			}
//			// 添加文件 
			function appendFile2(p){ 
				files=[];
				var n=p.substr(p.lastIndexOf('/')+1);
				mui("#userPhoto2")[0].src=p;
				files.push({name:"fmimg",path:p});
			}
			
			
			//确定上传文件
			mui('#butto')[0].addEventListener('tap',function(){
				var webviews = plus.webview.all();
		    	  mui.each(webviews,function(i,item){
		    	 	if(
		    	 	  item.getURL().indexOf("acuntmanager.html")>0
		    	 	){
		    	 		item.hide();
		    	 	}
		    	 });
				var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
				var idCard =mui('#idCard')[0].value;
				var userName = mui('#userName')[0].value;
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号验证
				if(zmFlag==1&&fmFlag==1){
					if(idCard==''||userName==''){
						nwaiting.close(); //新webview的载入完毕后关闭等待框
						mui.toast("用户名或身份证号不能为空");
					}else if(!reg.test(idCard)){
						nwaiting.close(); //新webview的载入完毕后关闭等待框
						mui.toast("身份证号输入不正确")
					}else{
						//数据请求
						common.timeOver();//请求超过10秒关闭等待框
						var url = getUrlParam()+"/setRealName";
						var datas = {"user_id":user_id,"appkey":appkey,"realname":userName,"idnumbers":idCard};
	//					var data = common.myAjax(url,datas,"get","approve.html");
						$.ajax({
							type: "get",
							contentType:"application/json",
							dataType:"json",
						  	url:url,
					    	data:datas,
					    	success: function(msg){
					    		nwaiting.close(); //新webview的载入完毕后关闭等待框
					    		if(msg.status==1){
					    			console.log(112);
					    			
					    			
									console.log(JSON.stringify(msg));
									mui.openWindow({
										url:"acuntmanager.html",
										id:"acuntmanager.html",
										styles:{
											top:0,
											bottom:0
										},
										 createNew:true
									})
									setTimeout(function(){
					    				plus.webview.getWebviewById("approve.html").hide();
					    			},1000)
									
									mui.toast(msg.data)
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
											extras:{pageId:"approve.html"}
											})
						    			}else{
						    				mui.toast(msg.msg);
						    			}
						    			
					    		}
					    		
					    		console.log(JSON.stringify(msg));
					    		
					    	},error:function(e){
					    		nwaiting.close(); //新webview的载入完毕后关闭等待框
					    		common.timeOut();//网络请求超时
					    	}
						});
									
					}
					
				}else{
					nwaiting.close(); //新webview的载入完毕后关闭等待框
					mui.confirm("请上传身份证正反面照");
				}
				
			})
			
	})
		




})