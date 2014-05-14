/***************************************
 * Created by samhwang1990@gmail.com on 14-5-14.
 * StudentMgr/Index/Create SaleConsultant View
 ***************************************/

define([
	'app',
	"collections/UserMgr/UserList",
	'text!templates/StudentMgr/Index/RoleItem.html',
	'text!templates/StudentMgr/Index/UserItem.html'
	],function(ClientManage,UserCol,RoleItemTpl,UserItemTpl){
		ClientManage.module('StudentMgr.Index.Create.View',function(View,ClientManage,Backbone, Marionette, $, _){
			View.RoleItemView = Marionette.ItemView.extend({                    //RoleItem 视图
				template:_.template(RoleItemTpl),
				tagName:"option",
				onRender:function(){
					this.$el.attr("value",this.model.get("RoleID"))             //设置每个Item的value属性
				}

			});
			View.RolesView = Marionette.CollectionView.extend({                 //RolesView 集合视图
				itemView:View.RoleItemView,
				tagName:"select",
				id:"roleList",
				className:"span2",
				events:{
					"change":"changeUserList"
				},
				onRender:function(){
					var defaultRoleID = this.$el.find('option:first').val();    //获取第一个option的值
					this.setUserList(defaultRoleID,this);
				},
				changeUserList:function(){                                      //绑定到el上的change事件处理程序
					this.setUserList(this.$el.val(),this);
				},
				setUserList:function(roleID,rolesView){
					var userList = new UserCol();                               //实例化一空的UserCollection
					userList.fetch({
						data:{                          //fetch请求时的查询参数
							roleIDString:roleID         //调用传入的roleIDString参数
						},
						success:function(){
							console.log('fetch user list data from server successfully');
							var usersView = new View.UsersView({
								collection:userList
							});
							var parent = rolesView.$el.parent().children("#saleConsultant").remove();
							usersView.render();
							rolesView.$el.after(usersView.$el);
						},
						error:function(){
							console.log('fetch user list data from server failed');
						}
					})
				}
			});
			View.UserItemView = Marionette.ItemView.extend({
				template:_.template(UserItemTpl),
				tagName:"option",
				onRender:function(){
				this.$el.attr("value",this.model.get("UserID"))
				}
			});
			View.UsersView = Marionette.CollectionView.extend({
				itemView:View.UserItemView,
				tagName:"select",
				id:"saleConsultant",
				className:"span2"
			});
		});
		return ClientManage.StudentMgr.Index.Create.View;
	}
)
