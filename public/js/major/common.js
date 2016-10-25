define(function(require,exports,module){
//	var url = "http://fbao.87money.com/api1.0";
//	var url="http://120.27.45.157/api2.0";
	var url="http://www.87huicai.com/api2.0";
	/*
	 * 请求错误、超时
	 * */
	exports.timeOut=function(){
//		var btnArray = ['重新加载','取消'];
//		mui.confirm('耽误您的时间，我们深感抱歉', '提示', btnArray, function(e) {
//			if (e.index == 0) {
//				window.location.reload();
//			}
//		})
		var div = document.createElement("div")
		var box=mui('body')[0];
		var html ='';
		html='<div id="re_Cover" style="position: absolute;z-index: 999;top: 0;padding: 0 10%;width: 100%;height:100%;background: rgba(0,0,0,0.5);">';
		html+='<div class="tc" style="25rem;height: 9rem;margin: 75% auto;padding:1rem 0 0 0;background:#fff;border-radius:5px ;">';	
		html+='<h4 style="color:#ff7f00;margin-bottom: 0.6rem;">温馨提示</h4>';		
		html+='<p>耽误您的时间，我们深感抱歉</p>';		
		html+='<div style="margin-top:0.2rem"> ';		
		html+='<button id="re_Btn" style="background:#ff7f00;color:#fff;width:7rem;border:none;" class="c_c22">重新加载</button>'	;		
		html+='<button id="cancel_Btn1" style="margin-left:1.5rem;background:#ff7f00;color:#fff;width:7rem;border:none" class="c_c22">取消</button>';			
		html+='</div>';		    
		html+='</div> '	;
		html+='</div>';	
		
		div.innerHTML=html;
		box.appendChild(div);
		mui("#re_Btn")[0].addEventListener("tap",function(){
			window.location.reload();
			$("#re_Cover").remove();
		});
		mui("#cancel_Btn1")[0].addEventListener("tap",function(){
			$("#re_Cover").remove();
		})

		
	}
	//请求超时
	exports.timeOver=function(){
		var timer =null;
		var flag=5;
		timer =setInterval(function(){
			flag =flag-1;
			if(flag==0){
//				exports.timeOut();
				plus.nativeUI.closeWaiting();
				clearInterval(timer);
//				flag=20;
			}
		},1000)
	}
	/*
	 * 三为一逗号数字处理
	 */
	
	exports.formatNum =function(strNum) {
			if (strNum.length <= 3) {
			
			return strNum;
			
			}
			
			if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
			
			return strNum;
			
			}
			
			var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
			
			var re = new RegExp();
			
			re.compile("(\\d)(\\d{3})(,|$)");
			
			while (re.test(b)) {
			
			b = b.replace(re, "$1,$2$3");
			
			}
			
			return a + "" + b + "" + c;
			
			}
	
	/*
	 * 判断进入休眠状态后输入手势密码
	 */
	
	exports.backApp =function(){
		
		var flag=0;//锁屏定时
		var timer =null;
		//监听从前台切换到后台
		document.addEventListener( "pause", function(){
			
			 flag=0;
			timer=setInterval(function(){
				flag=flag+1;
				if(flag==123){
					plus.storage.setItem("sleep","true");
					clearInterval(timer);
					
				}
			},1000)
			
			
			
		},false)
		//监听重后台切换到前台事件
		document.addEventListener( "resume", function(){
			var sleep = plus.storage.getItem('sleep');
//			setTimeout(function(){
				console.log(flag)
				if(flag>120){
					
					if(sleep=="true"){
					plus.storage.removeItem("sleep");//锁频标志
					flag=0;
					var handFlag = plus.storage.getItem("user_id");
					var handFlags =plus.storage.getItem("handFlag");//是否是游客进入标志
					if(handFlags){
						var user_id = plus.storage.getItem("user_id");
						var appkey = plus.storage.getItem("appkey");
						var isHandPwd;
						mui.ajax({
							type: "get",
							dataType: "json",
							url: url+"/accountInfo",
							data: {
								user_id: user_id,
								appkey: appkey
							},
							success: function(data) {
								
								if(data.status==0){
	//										nwaiting.close();
									if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
				    				mui.toast("登录超时，请重新登录");
					    				mui.openWindow({
											id: "login.html",
											url: "login.html",
											styles: {
											top: '0',
											bottom: '0'
											
										},
										extras:{pageId:"greenlocker.html"}
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
					    			}
									else{
					    				mui.toast(data.msg);
					    			}
					    			
								}else{
	//										nwaiting.close();
									isHandPwd = data.data.isHandPwd;
									if(isHandPwd==0){
										mui.openWindow({
											url:"gesture.html",
											id:"gesture.html",
											styles:{
												top:0,
												bottom:0
											},
											extras:{
												flag:1,
												pageId:"greenlocker.html"
											}
										})
									}else if(isHandPwd==2){
										mui.toast("手势密码已锁请联系客服！");
										mui.openWindow({
											url:"servicepage.html",
											id:"servicepage.html",
											styles:{
												top:0,
												bottom:0
											}
										})
									}else{
											mui.openWindow({
											url:"greenlocker.html",
											id:"greenlocker.html",
											styles:{
												top:0,
												bottom:0
											}
										})
									}
								}
							}
					})
				}
				}else{
					flag=0;
				}
				}else{
					flag=0;
				}
				
				
				
//				},10)	
					
					
				
			}, false);
		
	}
	
	
	/*
	  * 判断是否退出程序输手势密码
	  */
	 
	 exports.loginApp=function(){
	 	var handFlags =plus.storage.getItem("handFlag");//是否是游客进入标志
		if(handFlags){
			var user_id = plus.storage.getItem("user_id");
			var appkey = plus.storage.getItem("appkey");
			var isHandPwd;
			mui.ajax({
				type: "get",
				dataType: "json",
				url: url+"/accountInfo",
				data: {
					user_id: user_id,
					appkey: appkey
				},
				success: function(data) {
					
					if(data.status==0){
//										nwaiting.close();
						if(data.msg=="唯一码失效，请重新登录"||data.msg=="缺少用户编号参数"||data.msg=="用户未登陆"||data.msg=="登录过期，请重新登录"){
	    				mui.toast("登录超时，请重新登录");
		    				mui.openWindow({
								id: "login.html",
								url: "page/web/user/login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:"greenlocker.html"}
							})
		    			}else if(data.msg=="用户不存在"){
		    				mui.toast("请注册后操作");
			    				mui.openWindow({
									id: "register.html",
									url: "page/web/user/register.html",
									styles: {
									top: '0',
									bottom: '0'
									
								}
								})
		    			}
						else{
		    				mui.toast(data.msg);
		    			}
		    			
					}else{
//										nwaiting.close();
						isHandPwd = data.data.isHandPwd;
						if(isHandPwd==0){
							mui.openWindow({
								url:"page/web/user/gesture.html",
								id:"gesture.html",
								styles:{
									top:0,
									bottom:0
								},
								extras:{
									flag:1,
									pageId:"greenlocker.html"
								}
							})
						}else if(isHandPwd==2){
							mui.toast("手势密码已锁请联系客服！");
							mui.openWindow({
								url:"page/web/user/servicepage.html",
								id:"servicepage.html",
								styles:{
									top:0,
									bottom:0
								}
							})
						}else{
								mui.openWindow({
								url:"page/web/user/greenlocker.html",
								id:"greenlocker.html",
								styles:{
									top:0,
									bottom:0
								}
							})
						}
					}
				}
		})
	}
	 }
	 
	/*
	 加载动画
	 * */
	exports.LoadAnimation=function(){
		var box=mui('body')[0];
		var div =document.createElement("div");
		div.className="LoadAnimation";
//		mui('.cover')[0].style.position="absolute";
//		mui('.cover')[0].style.width="100%";
//		mui('.cover')[0].style.zIndex="999";
//		mui('.cover')[0].style.background"rgba(255,255,255,0.7)";
		var html ='';
		html='<div id="LoadAnimation" style="z-index: 999;position: absolute; height:100%; background:rgba(255,255,255,1);width: 100%;top:50%;>';
		html+='<img style="margin:0 auto" src="../../../public/img/loder.gif" alt="还未实名认证" width="60px" />';
		html+='</div>';
		div.innerHTML=html;
//		box.innerHTML+=html;
		box.appendChild(div);
	
	}
	/*
	 * 关闭加载动画
	 */
	exports.closeWaiting=function(){
		$(".LoadAnimation").remove();
	}
	//退出提示款
	exports.extNotice=function(){
		var box=mui('body')[0];
		var html ='';
		html='<div id="ext_Cover" style="position: absolute;z-index: 999;top: 0;padding: 0 10%;width: 100%;height:100%;background: rgba(0,0,0,0.5);">';
		html+='<div class="tc" style="25rem;height: 8rem;margin: 75% auto;padding:1rem 0;background:#fff;border-radius:5px ;">';	
		html+='<h4 style="color:#ff7f00;margin-bottom: 0.6rem;">温馨提示</h4>';		
		html+='<p>亲,真的要离开吗?</p>';		
		html+='<div style="margin-top:0.8rem"> ';		
		html+='<button id="sure_Btn" style="background:#ff7f00;color:#fff;width:7rem;border:none;" class="c_c22">是</button>'	;		
		html+='<button id="cancel_Btn" style="margin-left:1.5rem;background:#ff7f00;color:#fff;width:7rem;border:none" class="c_c22">否</button>';			
		html+='</div>';		    
		html+='</div> '	;
		html+='</div>';	
		box.innerHTML+=html;
		
	}
	
	/*手机号验证
	 * phoneNumber 手机号码
	* */
	exports.checkedPhone = function(phoneNumber){
		var telephone = plus.storage.getItem("telephone");
		    var mobilereg =  /^1\d{10}$/;
		    if(phoneNumber == ''){
		    	mui.confirm('电话号码不能为空');
		        return false;
		    }
		    else if(phoneNumber&&!mobilereg.test(phoneNumber))
		    {
		      mui.confirm('请输入有效的电话号码！');
		        return false;
		        
		    }
		    else{
		    	return true;
		    }
		}
	//封装Ajax
	/*
	 * urls 请求路劲
	 * datas 请求数据
	 * types 请求方式
	 */
	
	exports.myAjax = function(urls,datas,types,pageId){
//		alert(JSON.stringify(datas))
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		var data
		$.ajax({
			type: types,
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:urls,
	    	data:datas,
	    	success: function(msg){
//	    	mui.toast(msg.msg)
	    		if(msg.status==1){
	    			data = msg;
	    			nwaiting.close();
	    			
	    		}else{
	    			nwaiting.close();
	    			if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户编号参数"){
//	    				mui.toast("请登录后操作")
		    				mui.openWindow({
								id: "login.html",
								url: "login.html",
								styles: {
								top: '0',
								bottom: '0'
								
							},
							extras:{pageId:pageId}
							})
		    			}
		    			mui.toast(msg.msg)
	    		}
	    		
	    		console.log(JSON.stringify(msg))
	    		
	    	},error:function(e){
	    		alert(JSON.stringify(e))
	    	}
		});
//		alert(JSON.stringify(data))
		return data;
	}
	
	//时间日期格式化
	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
//	exports.Date.prototype.Format = function(fmt)   
//	{ //author: meizz   
//	  var o = {   
//	    "M+" : this.getMonth()+1,                 //月份   
//	    "d+" : this.getDate(),                    //日   
//	    "h+" : this.getHours(),                   //小时   
//	    "m+" : this.getMinutes(),                 //分   
//	    "s+" : this.getSeconds(),                 //秒   
//	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
//	    "S"  : this.getMilliseconds()             //毫秒   
//	  };   
//	  if(/(y+)/.test(fmt))   
//	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
//	  for(var k in o)   
//	    if(new RegExp("("+ k +")").test(fmt))   
//	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
//	  return fmt;   
//	}  
	
	
	//检测登录
	exports.checkedLogin = function($url,$data){
		var falg =1;
//		var url = "http://www.87huicai.com/api1.0"
		
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		$.ajax({
			type: "get",
				contentType:"application/json",
				dataType:"json",
				async:false,
			  	url:url+"/checkLogin",
		    	data:{
					"user_id":user_id,
					 "appkey":appkey
					
	    		},
		    	success: function(msg){
		    		
		    		console.log(JSON.stringify(msg))
		    		if(msg.status==0){
		    			falg =0;
		    			plus.storage.removeItem("password");
//		    			 mui.openWindow({
//							id: 'login.html',
//							url: 'login.html',
//							styles: {
//							top: '0',
//							bottom: '0'
//						}
//						})
		    		}
//		    		console.log(falg)
		    		
		    		
		    	}
		    	
		    	
		});
		console.log(falg)
		plus.storage.setItem("falg",falg);
		
//		return 	falg;
//		setTimeout(function(){
			
//		},1000)
		
		
	}
	
	
	//获取账户余额
	exports.getAvarible=function(){
		
	}
	
	/**
	 * 定义建议模板解析
	 * @param {Object} dta
	 * @param {Object} tmpl
	 */
	exports.formatTemplate = function(dta, tmpl) {  
	    var format = {  
	        name: function(x) {  
	            return x  
	        }  
	    };  
	    return tmpl.replace(/{(\w+)}/g, function(m1, m2) {  
	        if (!m2)  
	            return "";  
	        return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];  
	    });  
	} 
	
	/*打开详情页*/
	exports.openDetail = function(pid){
		mui.openWindow({
			id: "goodsdetail.html",
			url: "goodsdetail.html",
			styles: {
			top: '0',
			bottom: '0'
			
			},
			extras:{
				pid:pid
			},
			 createNew:true
		})
	}
	
	//版本更新
	//version 版本号
	exports.upDate=function(version){
		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:url+"/isUpdate",
	    	data:{"vno":version},
	    	success: function(msg){
	    		if(msg.data.isUpdate==0){
	    			mui.toast("已是最新版不用更新")
	    		}else{
	    			if(msg.data.forcedUpdate==0){
	    				mui.toast("有新版本可选择更新");
	    				var btnArray = ['是','否'];
						mui.confirm('有可更新版本'+msg.data.id+'', '提示', btnArray, function(e) {
							if (e.index == 0) {
								var url=msg.data.downLoadUrl;
								var dtask = plus.downloader.createDownload( url, {}, function ( d, status ) {
							   		mui.toast("正在下载...")
								   if ( status == 200 ) { // 下载成功
								    	
								        var path = d.filename;
								        plus.runtime.install(path);  // 安装下载的apk文件
								        console.log(d.filename);
								    } else {//下载失败
								        alert( "Download failed: " + status ); 
								    }  
								});
								dtask.start(); 
							}
						})
	    				
	    				
	    				
	    			}else{
						var url=msg.data.downLoadUrl;
						var dtask = plus.downloader.createDownload( url, {}, function ( d, status ) {
					   		mui.toast("正在下载...")
						   if ( status == 200 ) { // 下载成功
						    	
						        var path = d.filename;
						        plus.runtime.install(path);  // 安装下载的apk文件
						        console.log(d.filename);
						    } else {//下载失败
						        alert( "Download failed: " + status ); 
						    }  
						});
						dtask.start(); 
			    				
	    			}
	    			
	    		}
	    		nwaiting.close();
	    		console.log(JSON.stringify(msg))
	    		
	    	},error:function(e){
	    		console.log(JSON.stringify(e))
	    	}
		});
		
	}
	
	
	//版本更新
	//version 版本号
	exports.upDate1=function(version){
//		var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
		$.ajax({
			type: "get",
			contentType:"application/json",
			dataType:"json",
			async:false,
		  	url:url+"/isUpdate",
	    	data:{"vno":version},
	    	success: function(msg){
	    		if(msg.data.isUpdate==0){
//	    			mui.toast("已是最新版不用更新")
	    		}else{
	    			if(msg.data.forcedUpdate==0){
	    				mui.toast("有新版本可选择更新");
	    				var btnArray = ['是','否'];
						mui.confirm('有可更新版本'+msg.data.id+'', '提示', btnArray, function(e) {
							if (e.index == 0) {
								var url=msg.data.downLoadUrl;
								var dtask = plus.downloader.createDownload( url, {}, function ( d, status ) {
							   		mui.toast("正在下载...")
								   if ( status == 200 ) { // 下载成功
								    	
								        var path = d.filename;
								        plus.runtime.install(path);  // 安装下载的apk文件
								        console.log(d.filename);
								    } else {//下载失败
								        alert( "Download failed: " + status ); 
								    }  
								});
								dtask.start(); 
							}
						})
	    				
	    				
	    				
	    			}else{
						var url=msg.data.downLoadUrl;
						var dtask = plus.downloader.createDownload( url, {}, function ( d, status ) {
					   		mui.toast("正在下载...")
						   if ( status == 200 ) { // 下载成功
						    	
						        var path = d.filename;
						        plus.runtime.install(path);  // 安装下载的apk文件
						        console.log(d.filename);
						    } else {//下载失败
						        alert( "Download failed: " + status ); 
						    }  
						});
						dtask.start(); 
			    				
	    			}
	    			
	    		}
//	    		nwaiting.close();
	    		console.log(JSON.stringify(msg))
	    		
	    	},error:function(e){
	    		console.log(JSON.stringify(e))
	    	}
		});
		
	}
	
	
	exports.onNetChange = function(pageUrl) {
				
				var nt = plus.networkinfo.getCurrentType();
//				alert(11)
				switch ( nt ) {
					case plus.networkinfo.CONNECTION_ETHERNET:
					case plus.networkinfo.CONNECTION_WIFI:
					break; 
					case plus.networkinfo.CONNECTION_CELL2G:
					case plus.networkinfo.CONNECTION_CELL3G:
					case plus.networkinfo.CONNECTION_CELL4G:
//					alert("Switch to Cellular networks!");  
					
					break; 
					default:
					if(plus.os.name =="iOS"){
						mui.openWindow({
							url:"network.html",
							id:"network.html",
							styles:{
								top:0,
								bottom:0
							},
							extras:{
								pageId:pageUrl
							}
						});
					}else{
						mui.openWindow({
							url:"network.html",
							id:"network.html",
							styles:{
								top:0,
								bottom:0
							},
							extras:{
								pageId:pageUrl
							}
						});
//						mui.confirm('现在无网络，请联网后再试？', '提示', btnArray, function(e) {
//							if (e.index == 0) {
//								plus.runtime.quit();
//							}else{
//								plus.runtime.quit();
//							}
//						})
					}
					break;
				}
			}
	
	exports.clearNoNum =function(obj){
			obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
			obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
			obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
			}
	
	exports.formatBankNo = function(BankNo){
	    if (BankNo.value == "") return;
	    var account = new String (BankNo.value);
	    account = account.substring(0,22); /*帐号的总数, 包括空格在内 */
	    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
	        /* 对照格式 */
	        if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
	        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
	            var accountNumeric = accountChar = "", i;
	            for (i=0;i<account.length;i++){
	                accountChar = account.substr (i,1);
	                if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
	            }
	            account = "";
	            for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
	                if (i == 4) account = account+" "; /* 帐号第四位数后加空格 */
	                if (i == 8) account = account+" "; /* 帐号第八位数后加空格 */
	                if (i == 12) account = account+" ";/* 帐号第十二位后数后加空格 */
	                account = account + accountNumeric.substr (i,1)
	            }
	        }
	    }
	    else
	    {
	        account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
	    }
	    if (account != BankNo.value) BankNo.value = account;
	}
	
	
})




