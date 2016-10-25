
function checkedPhone(phoneNumber){
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

mui.plusReady(function(){
	window.addEventListener('reLode',function(){
		window.location.reload();
	})
	var urls =getUrlParam();
//	var urls ="http://192.168.3.135:81/huicai/api2.0/index.php"
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		console.log(user_id); 
		var self = plus.webview.currentWebview();
		var code = self.code; 
		var bankName = self.bankName;
		var pageId =self.pageId;
		console.log(code);
		var requestNo; 
		mui('#bankName')[0].value =bankName
	//验证手机号
	$("#phoneNum").blur(function(){
		var phoneNum = $(this).val();
		checkedPhone(phoneNum);
	})
	//姓名验证
	$("#userName").blur(function(){
		var userName = $(this).val();
		if(userName==''){
			mui.toast("请输入真实姓名");
		}
	})
//验证身份证号
$("#idCard").blur(function(){
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号验证
	var idNum = $(this).val();
	if(idNum==''){
		mui.toast("请输入身份证号");
	}else if(!reg.test(idNum)){
		mui.toast("身份证号输入格式不正确")
	}
})

//银行卡号验证
$("#bankCard").blur(function(){
	var reg = /^\d{16}|\d{19}$/;
	var bankCard = $(this).val();
	
	if(bankCard==''){
		mui.toast("请输入银行卡号");
	}else if(!reg.test(bankCard)){
		mui.toast("你输入的卡号格式不正确");
	}else if(bankCard.length!=16&&bankCard.length!=19){
			
		mui.toast("你输入的卡号格式不正确");
		}
})
function escape2Html(str) {
		 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		}
var flag = 0//是否绑卡/充值
$("#sure").on("tap",function(){
	var idNum = $("#idCard").val();//身份证号
	var bankCard = $("#bankCard").val();//银行卡号
	var userName = $("#userName").val();//真实姓名
		var phoneNum = $("#phoneNum").val();//电话号码
		console.log(user_id);
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号验证
	var reg2 = /^\d{16}|\d{19}$/;
	 if(bankCard==''){
		mui.toast("请输入银行卡号");
	}else if(!reg2.test(bankCard)){
		mui.toast("你输入的卡号格式不正确");
	}else if(bankCard.length!=16&&bankCard.length!=19){
		mui.toast("你输入的卡号格式不正确");
	}else if(userName==''){
		mui.toast("请输入真实姓名");
	}else if(idNum==""){
		mui.toast("请输入身份证号");
	}else if(!reg.test(idNum)){
		mui.toast("身份证号输入格式不正确");
	}else if(!checkedPhone(phoneNum)){
		return false;
	}
	else{
//		LoadAnimation();
		 plus.nativeUI.showWaiting();
		//数据传输
		mui.ajax({
			type:"get", 
			contentType:"application/json",
		    dataType: "json",  
		    url:urls+"/wapBindCardOrCashIn", 
		    data:{ 
		    	sign:flag,
		    	bankCode:code,
		    	bankCardNum:bankCard,
		    	bankName:bankName,
		    	username:userName,
		    	idCard:idNum,
		    	mobilePhone:phoneNum,
		    	user_id:user_id,
		    	appKey:appkey
		    },
		    success:function(msg){
		    	 plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(msg));
		    	if(msg.status==1){ 
		    		$("#formBox").append(escape2Html(msg.data)); 
			    	document.pay.submit();
		    	}
		    	else if(msg.msg=="唯一码失效，请重新登录"||msg.msg=="缺少用户唯一编码"||msg.msg=="缺少用户编号参数"||msg.msg=="用户未登陆"||msg.msg=="登录过期，请重新登录"){
		    		mui.toast("登录超时，请重新登录");
	    				mui.openWindow({
							id: "login.html",
							url: "login.html",
							styles: {
								top: '0',
								bottom: '0'
							
							},
						extras:{pageId:"addcard.html"},
						waiting:{
							autoShow:false
						}
						})
		    	}else{
		    		mui.toast(msg.msg);
		    	}
		    },
		    error:function(e){
		    	plus.nativeUI.closeWaiting();
		    	console.log("er=="+JSON.stringify(e))
		    }
		})
		

	}
})
})