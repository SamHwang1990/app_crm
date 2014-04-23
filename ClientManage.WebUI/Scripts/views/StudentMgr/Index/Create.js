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
	'text!templates/StudentMgr/Index/EasyChatTime.html',
	'views/StudentMgr/Index/RoleList',
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'
	],function($,_,Backbone,Bootstrap,CreateTemp,ContactContentTemp,EasyChatTimeTemp,RoleListView,datetimepicker){
		var studentCreateView = Backbone.View.extend({
			el:'#appBody-content .wrap',
			template:_.template(CreateTemp),
			events:{
				'click .btnAddEasyChat':'InsertEasyChatTemp',
				'click .btnAddContact':'InsertContactTemp',
				'click .removeParent':'RemoveParent',
				'changeDate div.easyChat-wrap .timePicker':'ChatTimeChange'
			},
			model:{

			},
			initialize:function(){
				_.bindAll(this,'render','InsertContactTemp','InsertEasyChatTemp','RemoveParent');
				this.render();
			},
			render:function(){
				this.$el.html(this.template({}));
				var roleListView = new RoleListView();
			},
			InsertEasyChatTemp:function(event){
				var easyChatTemp = _.template(EasyChatTimeTemp);
				$(event.target).before(easyChatTemp({}));
				$('div.easyChat-wrap .timePicker').datetimepicker({
					format: "hh:ii",
					autoclose: true,
					startView:0,
					minView:0,
					maxView:0
				});
			},
			InsertContactTemp:function(event){
				var contactTemp = _.template(ContactContentTemp);
				$(event.target).before(contactTemp({}));
			},
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			},
			ChatTimeChange:function(event){
				var easyChatWrap = $(event.currentTarget).parent();
				var beginTime = easyChatWrap.find('.easyChat-begin input').val();
				var endTime = easyChatWrap.find('.easyChat-end input').val();
				if(beginTime === '' || endTime !== ''){
					return ;
				}
				var beginTimeNum = Number(beginTime.replace(':',''));
				var endTimeNum = Number(endTime.replace(':',''));
				if(endTimeNum > beginTimeNum){  //TODO:要添加时间验证成功与失败的交互逻辑
					return true;
				}else{

				}
			}

		});
		return studentCreateView;
	}
)
