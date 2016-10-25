/**公用的转换类**/
define(function(require,exports,module){
	/**产品状态转换**/
	exports.statusConvert = function(value){
		switch (value){
			case 0:
				return '待开放';
			case 1:
				return '可购买';
			case 2:
				return '收益中';
			case 3:
				return '已回款';
		}
	}
	
	/**排序类型转换**/
	exports.orderTypeConvert = function(value){
		switch (value){
			case 0:
				return '项目收益';
			case 1:
				return '项目进度';
			case 2:
				return '项目规模';
		}
	}
})