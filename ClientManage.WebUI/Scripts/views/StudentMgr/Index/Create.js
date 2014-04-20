/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * /Home/Index/Create 动作视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text!templates/StudentMgr/Index/Create.html',
	'text!templates/StudentMgr/Index/ContactContent.html'
	],function($,_,Backbone,Bootstrap,CreateTemp,ContactContentTemp){
		var studentCreateView = Backbone.View.extend({
			el:'#appBody-content .wrap',
			template:_.template(CreateTemp),
			initialize:function(){
				_.bindAll(this,'render');
				this.render();
			},
			render:function(){
				this.$el.html(this.template({}));
			}
		});
		return studentCreateView;
	}
)
