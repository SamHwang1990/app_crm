/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * StudentMgr中的RoleList 视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'collections/RoleMgr/RoleList',                         //RoleList集合
	'models/RoleMgr/RoleInfo',                              //RoleInfo模型
	'bootstrap',
	'text!templates/StudentMgr/Index/RoleItem.html',        //StudentMgr的RoleItem模板
	'views/StudentMgr/Index/UserList'                       //StudentMgr的UserList视图
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

				var collView = this;        //另存为this
				this.collection.fetch({     //initialize时从server获取数据填充到集合中
					success:function(){
						console.log('fetch data from server successfully');
						collView.render();  //如果成功，那就重新渲染下 #roleList
					},
					error:function(){
						console.log('error occur when fetching data from server');
					}
				});
			},
			render:function(){
				var collView = this;                            //另存为this

				this.$el.empty();                               //清空 #roleList下的option子元素
				if(this.collection.length !==0){
					//循环集合所有元素，为每个元素创建子视图实例
					this.collection.each(function(roleItem){
						var roleItemView = new roleInfoView({   //实例化子视图
							model:roleItem
						});
						roleItemView.parentView = collView;     //搭建子视图、父视图关系
						roleItemView.render();                  //渲染子视图
					});
					this.setUserList(0);                        //默认情况下，自动按照#roleList第一个option的值来渲染#saleConsultant
				}else{
					this.$el.append('<option>无角色</option>');
				}
			},
			setUserList:function(){                             //根据#roleList的值渲染#saleConsultant
				var roleID;
				if(typeof arguments[0] === 'number'){           //如果有传参数进来，说明是默认情况下的自动渲染
					roleID = this.$el.find('option:first').val();
				}else{
					roleID = this.$el.val();
				}
				var userListView = new UserListView({
					el:this.$el.siblings('#saleConsultant'),    //设置UserList视图的el属性
					roleIDString:roleID                         //传入自定义参数roleIDString
				})
			}
		});

		return rolesCollView;
 	}
);
