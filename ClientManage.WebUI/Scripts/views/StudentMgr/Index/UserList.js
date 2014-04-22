/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * StudentMgr中的UserList视图
 ***************************************/

//TODO:写下注释吧！

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'collections/UserMgr/UserList',
	'models/UserMgr/UserInfo',
	'bootstrap',
	'text!templates/StudentMgr/Index/UserItem.html'
	],function($,_,Backbone,CheckLogin,UsersCollection,UserInfo,Bootstrap,UserItemTemp){
		/*
		 * UserInfo 子视图
		 * */
		var userInfoView = Backbone.View.extend({
			template:_.template(UserItemTemp),
			initialize:function(){
				_.bindAll(this,'render');
			},
			render:function(){
				//往父视图中添加数据
				this.parentView.$el.append(this.template(this.model.toJSON()));
			}
		});

		/*
		 * UsersCollection 父视图
		 * */
		var usersCollView = Backbone.View.extend({
			collection:new UsersCollection(),
			initialize:function(options){
				_.bindAll(this,'render');

				var collView = this;
				this.collection.fetch({
					data:{
						roleIDString:options.roleIDString
					},
					success:function(){
						console.log('fetch data from server successfully');
						collView.render();
					},
					error:function(){
						console.log('error occur when fetching data from server');
					}
				});
			},
			render:function(){
				var collView = this;

				this.$el.empty();
				if(this.collection.length !== 0){
					//循环集合所有元素，为每个元素创建子视图实例
					this.collection.each(function(userItem){
						var userItemView = new userInfoView({
							model:userItem
						});
						userItemView.parentView = collView;
						userItemView.render();
					});
				}else{
					this.$el.append('<option>无用户</option>');
				}
			}
		});

		return usersCollView;
	}
);
