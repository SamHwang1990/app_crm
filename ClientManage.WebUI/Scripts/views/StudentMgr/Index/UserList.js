/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * StudentMgr中的UserList视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'collections/UserMgr/UserList',                     //UserList 集合
	'models/UserMgr/UserInfo',                          //UserInfo 模型
	'bootstrap',
	'text!templates/StudentMgr/Index/UserItem.html'     //StudentMgr的UserItem模板
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
			initialize:function(options){           //options为实例化该视图是传入的参数集合对象
				_.bindAll(this,'render');

				var collView = this;
				this.collection.fetch({             //初始化的时候从server获取数据填到集合里
					data:{                          //fetch请求时的查询参数
						roleIDString:options.roleIDString   //调用传入的roleIDString参数
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
