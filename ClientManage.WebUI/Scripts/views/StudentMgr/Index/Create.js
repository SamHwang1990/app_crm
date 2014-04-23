/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * /Home/Index/Create 动作视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text!templates/StudentMgr/Index/Create.html',                  //StudentMgr的Student Create模板
	'text!templates/StudentMgr/Index/ContactContent.html',          //StudentMgr的联系人模板
	'text!templates/StudentMgr/Index/EasyChatTime.html',            //StudentMgr的可联系时间模板
	'views/StudentMgr/Index/RoleList',                              //StudentMgr的RoleList视图
	'libs/bootstrap/datetimepicker/bootstrap-datetimepicker.min'    //bootstrap datetimepicker插件js引入
	],function($,_,Backbone,Bootstrap,CreateTemp,ContactContentTemp,EasyChatTimeTemp,RoleListView,datetimepicker){
		var studentCreateView = Backbone.View.extend({
			el:'#appBody-content .wrap',
			template:_.template(CreateTemp),
			events:{
				'click .btnAddEasyChat':'InsertEasyChatTemp',
				'click .btnAddContact':'InsertContactTemp',
				'click .removeParent':'RemoveParent',
				'changeDate div.easyChat-wrap .timePicker':'ChatTimeChange'     //datetimepicker插件触发的changeDate事件
			},
			model:{

			},
			initialize:function(){
				_.bindAll(this,'render','InsertContactTemp','InsertEasyChatTemp','RemoveParent','SetFeedbackMsg');
				this.render();
			},
			render:function(){
				this.$el.html(this.template({}));
				var roleListView = new RoleListView();  //实例化RoleList的视图，渲染出系统中所有用户名
			},
			InsertEasyChatTemp:function(event){         //插入添加联系时间的HTML
				var easyChatTemp = _.template(EasyChatTimeTemp);
				$(event.target).before(easyChatTemp({}));
				$('div.easyChat-wrap .timePicker').datetimepicker({     //调用bootstrap的datetimepicker插件
					format: "hh:ii",        //指定显示格式
					autoclose: true,        //点击具体日期或时间后关闭选择框
					startView:0,            //设置起始选择框形式，0代表显示hour
					minView:0,              //设置允许的最低层选择框形式
					maxView:0               //设置允许的最顶层选择框形式
				});
			},
			InsertContactTemp:function(event){          //插入添加联系人的HTML
				var contactTemp = _.template(ContactContentTemp);
				$(event.target).before(contactTemp({}));
			},
			/*
			* 删除当前元素的父元素
			* 用于删除可联系时间和联系人
			* */
			RemoveParent:function(event){
				$(event.currentTarget).parent().remove();
			},
			ChatTimeChange:function(event){             //当chattime的值改变时触发，用于验证
				var easyChatWrap = $(event.currentTarget).parent();                 //找到父元素：div.easyChat-wrap
				var beginTime = easyChatWrap.find('.easyChat-begin input').val();   //获取可联系时间的开始值字符串
				var endTime = easyChatWrap.find('.easyChat-end input').val();       //获取可联系时间的结束值字符串
				if(beginTime === '' || endTime === ''){                             //如果开始值或者结束值为空，则不需要验证
					return ;
				}
				var beginTimeNum = Number(beginTime.replace(':',''));               //将开始值字符串的‘:’删掉，并转为数字
				var endTimeNum = Number(endTime.replace(':',''));                   //将结束值字符串的‘:’删掉，并转为数字
				if(endTimeNum > beginTimeNum){                                      //如果结束值大于开始值，则删除错误信息
					this.SetFeedbackMsg('','chatTimeInvalid','remove');
				}else{                                                              //否则，显示错误信息
					this.SetFeedbackMsg('通话开始时间不能晚于结束时间','chatTimeInvalid','add');
				}
			},
			/*
			* 用于显示和隐藏feedback信息
			* msg：feedback信息
			* className：用于显示feedback的类名
			* action：指明动作，只有两种值：Add、Remove
			* */
			SetFeedbackMsg:function(msg,className,action){
				var feedbackMsg = this.$el.find('.feedbackMsg');                    //获取div.feedbackMsg元素
				feedbackMsg.html(msg);
				switch (action){
					case 'remove':
						feedbackMsg.removeClass(className);
						break;
					case 'add':
						feedbackMsg.addClass(className);
						break;
				}
			}

		});
		return studentCreateView;
	}
)
