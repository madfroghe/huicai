define(function(require, exports, module){
	var templates = {};
	var getTemplate = function(name, header, content) {
		var template = templates[name];
		if (!template) {
			//预加载共用父模板；
			var headerWebview = mui.preload({
				url: header,
				id: name + "-main",
				styles: {
					popGesture: "hide",
				},
				extras: {
					mType: 'main'
				}
			});
			//预加载共用子webview
			var subWebview = mui.preload({
				url: !content ? "" : content,
				id: name + "-sub",
				styles: {
					top: '45px',
					bottom: '0px',
				},
				extras: {
					mType: 'sub'
				} 
			});
			subWebview.addEventListener('loaded', function() {
				setTimeout(function() {
					subWebview.show();
				}, 50);
			});
			subWebview.hide();
			headerWebview.append(subWebview);
			//iOS平台支持侧滑关闭，父窗体侧滑隐藏后，同时需要隐藏子窗体；
			if (mui.os.ios) { //5+父窗体隐藏，子窗体还可以看到？不符合逻辑吧？
				headerWebview.addEventListener('hide', function() {
					subWebview.hide("none");
				});
			}
			templates[name] = template = {
				name: name,
				header: headerWebview,
				content: subWebview,
			};
		}
		return template;
	};
	var initTemplates = function() {
		getTemplate('default', 'examples/template.html');
	};

	
	
})
