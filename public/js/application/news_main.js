define(function(require, exports, module) {
	var common = require('../major/common');
	mui.init({
		pullRefresh: {
			container: '#good-list',
			up: {
				contentrefresh: '正在加载...',
				auto:true,
				 contentnomore:'没更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: randerPage
			}
		}
	});
	var choosePage=1;
	mui.plusReady(function(){
		common.onNetChange("affiche.html");//检测网络信号
		setTimeout(function(){
			mui('#good-list').pullRefresh().pullupLoading();
		},300)
		
	})

	function randerPage(){
		//获取数据
		$.ajax({
			type:"get",
			url:getUrlParam()+"/getNotice",
			async:true,
			data:{
				"p":choosePage,
				"pagesize":15
			},
			success:function(data){
				var data1 =JSON.parse(data);
				var datas = data1.data.info;
				var totalPages=data1.data.pages.totalPages;
				if(data1.status==1){
					if(datas==null){
						mui.toast("亲，暂时没有公告哟！");
						mui('#good-list').pullRefresh().endPullupToRefresh(true);
					}else{
						if(choosePage>totalPages){
							mui('#good-list').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
							return false;	
						}else{
							mui('#good-list').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
						}
						for(var i=0;i<datas.length;i++){
							var item = datas[i];
							var li = document.createElement('li');
							li.className = "mui-table-view-cell pr";
							var html = '';
							html ='<a class="mui-navigate-right" href ="javascript:void(0)">';
							html+='<span class="mui-pull-right f14 pa" style="right:2rem">'+item.create_time+'</span>'
							html+='<p class="mui-ellipsis" style="width:70%">'+item.title+'</p>';	
							html+='</a>';
							li.innerHTML =html;
							mui('#info')[0].appendChild(li);
						}
						choosePage=choosePage+1;
					}
					
					
					console.log(JSON.stringify(data1))
				}
				
			},
			error:function(e){
				common.timeOut();//网络请求超时
			}
		});
	}

})