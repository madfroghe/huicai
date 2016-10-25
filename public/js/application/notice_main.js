define(function(require, exports, module) {
	var common = require('../major/common');
	mui.plusReady(function(){
		var user_id = plus.storage.getItem("user_id");
		var appkey = plus.storage.getItem("appkey");
		//获取数据
		$.ajax({
			type:"get",
			url:getUrlParam()+"/systemMsg",
			async:true,
			data:{"user_id":user_id,"appkey":appkey},
			success:function(msg){
				var data = JSON.parse(msg)
				var item = data.data;
				console.log(JSON.stringify(msg))
				if(item.recharge == 1){
//					(mui("#recharge")[0].classList.contains('mui-active') ? 'true' : 'false')
					
					mui("#recharge")[0].className='mui-switch mui-switch-mini mui-active'
//					$("#recharge").addClass('mui-active');
				}else{
					$("#recharge").removeClass('mui-active');
				}
				
				if(item.withdraw ==1){
					$("#withdraw").addClass('mui-active');	
				}else{
					$("#withdraw").removeClass('mui-active');
				}
				
				
				if(item.reward ==1){
					$("#reward").addClass('mui-active');	
				}else{
					$("#reward").removeClass('mui-active');
				}
				
				if(item.investment ==1){
					$("#investment").addClass('mui-active');	
				}else{
					$("#investment").removeClass('mui-active');
				}
				
				if(item.debt ==1){
					$("#debt").addClass('mui-active');	
				}else{
					$("#debt").removeClass('mui-active');
				}
				console.log(JSON.stringify(data));
			},
			error:function(e){
				common.timeOut();//网络请求超时
			}
		});
		
		mui('.mui-content .mui-switch').each(function() { //循环所有toggle
			//toggle.classList.contains('mui-active') 可识别该toggle的开关状态
//			this.parentNode.querySelector('span').innerText = '状态：' + (this.classList.contains('mui-active') ? 'true' : 'false');
			/**
			 * toggle 事件监听
			 */
			this.addEventListener('toggle', function(event) {
				//event.detail.isActive 可直接获取当前状态
				var recharge=1;
				var withdraw = 1;
				var reward = 1;
				var investment=1;
				var debt=1;
//				alert(this.id);
				var name = this.id;
				var flag = event.detail.isActive ? 'true' : 'false';
//				alert(flag)
				if(flag=="true"){
					var datas = {"user_id":user_id,"appkey":appkey,"type":name,"value":1};
					rander(datas);
				}else{
					var datas = {"user_id":user_id,"appkey":appkey,"type":name,"value":0};
					rander(datas);
				}
//				alert(recharge)
//				var datas = {"user_id":user_id,"appkey":appkey,"type":name,"value":0};
//				rander(datas);
//				this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');
			});
		});
		
		
		
		
		
		
		
		
		
		
		
	})

	//判断
	function judge(name,item){
		if(item.name == 0){
//					(mui("#recharge")[0].classList.contains('mui-active') ? 'true' : 'false')
				$("#"+name).addClass('mui-active');
			}else{
				$("#"+name).removeClass('mui-active');
			}
	
		
	}
	
	function rander(data){
		//获取数据
		$.ajax({
			type:"get",
			url:getUrlParam()+"/systemMsg",
			async:true,
			data:data,
			success:function(msg){
				console.log(JSON.stringify(JSON.parse(msg)))
			},
			error:function(e){
				common.timeOut();//网络请求超时
			}
		});
	}

})