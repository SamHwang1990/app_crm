/***************************************
 * Created by samhwang1990@gmail.com on 14-4-24.
 * Backbone 的自定义全局设置
 ***************************************/

define(['jquery','backbone','underscore'],function($,Backbone,_){
	/*
	* 创建View销毁时执行的操作
	*/
	Backbone.View.prototype.close = function(){
		this.remove();      //clean the dom events
							// and when after backbone 0.9.9, it can unbind events on model or collection
		this.unbind();
		if (this.onClose){
			this.onClose();
		}
	};
});
