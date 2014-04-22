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
	'text!templates/StudentMgr/Index/ContactContent.html',
	'text!templates/StudentMgr/Index/EasyChatTime.html'
	],function($,_,Backbone,Bootstrap,CreateTemp,ContactContentTemp,EasyChatTimeTemp){
		var studentCreateView = Backbone.View.extend({
			el:'#appBody-content .wrap',
			template:_.template(CreateTemp),
			events:{
				'click .btnAddEasyChat':'InsertEasyChatTemp',
				'click .btnAddContact':'InsertContactTemp',
				'click .removeParent':'RemoveParent'
			},
			initialize:function(){
				_.bindAll(this,'render','InsertContactTemp','InsertEasyChatTemp','RemoveParent');
				this.render();
			},
			render:function(){
				this.$el.html(this.template({}));
			},
			InsertEasyChatTemp:function(event){
				var easyChatTemp = _.template(EasyChatTimeTemp);
				$(event.target).before(easyChatTemp({}));
			},
			InsertContactTemp:function(event){
				var contactTemp = _.template(ContactContentTemp);
				$(event.target).before(contactTemp({}));
			},
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			}

		});
		return studentCreateView;
	}
)
