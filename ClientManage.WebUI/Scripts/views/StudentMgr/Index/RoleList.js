/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * StudentMgr中的RoleList 视图
 ***************************************/

//TODO:写下注释吧！

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'collections/RoleMgr/RoleList',
	'models/RoleMgr/RoleInfo',
	'bootstrap',
	'text!templates/StudentMgr/Index/RoleItem.html',
	'views/StudentMgr/Index/UserList'
	],function($,_,Backbone,CheckLogin,RolesCollection,RoleInfo,Bootstrap,RoleInfoTemp,UserListView){
		/*
		* RoleInfo 子视图
		* */
		var roleInfoView = Backbone.View.extend({
			template:_.template(RoleInfoTemp),
			initialize:function(){
				_.bindAll(this,'render');
			},
			render:function(){
				//往父视图中添加数据
				this.parentView.$el.append(this.template(this.model.toJSON()));
			}
		});

 		/*
		* RolesCollection 父视图
		* */
		var rolesCollView = Backbone.View.extend({
			el:'#roleList',
			collection:new RolesCollection(),
			events:{
				'change':'setUserList'
			},
			initialize:function(){
				_.bindAll(this,'render','setUserList');

				var collView = this;
				this.collection.fetch({
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
				if(this.collection.length !==0){
					//循环集合所有元素，为每个元素创建子视图实例
					this.collection.each(function(roleItem){
						var roleItemView = new roleInfoView({
							model:roleItem
						});
						roleItemView.parentView = collView;
						roleItemView.render();
					});
					this.setUserList(0);
				}else{
					this.$el.append('<option>无角色</option>');
				}
			},
			setUserList:function(){
				var roleID;
				if(typeof arguments[0] === 'number'){
					roleID = this.$el.find('option:first').val();
				}else{
					roleID = this.$el.val();
				}
				var userListView = new UserListView({
					el:this.$el.siblings('#saleConsultant'),
					roleIDString:roleID
				})
			}
		});

		return rolesCollView;
 	}
);
