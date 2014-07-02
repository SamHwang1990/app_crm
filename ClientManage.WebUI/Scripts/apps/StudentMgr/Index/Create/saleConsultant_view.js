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
				initialize:function(options){
					this.curRoleID = options.curRoleID;             //当前销售负责人的主角色ID
					this.curUserID = options.curUserID;             //当前销售负责人的ID
				},
				onRender:function(){
					if(this.curRoleID !== "" && this.curRoleID !== undefined){                      //如果主角色ID不为空，就设定对应的option为选中
						this.$el.find('option[value='+this.curRoleID + ']').attr("selected","selected");
						var defaultRoleID = this.$el.val();             //获取select的值
						this.setUserList(defaultRoleID,this,this.curUserID);
					}else{                                          //否则，设置第一个option为选中
						this.renderRoleAndUserList();
					}

				},
				renderRoleAndUserList:function(){
					var rolesView = this;
					var CurrentRoleAndUserModel = Backbone.Model.extend({
						defaults:{
							CurRoleID:"",
							CurUserID:""
						},
						initialize:function(){
							this.url = '/StudentMgr/Index/GetNextJobRoleAndUser';
						}
					});
					var currentRoleAndUser = new CurrentRoleAndUserModel();
					currentRoleAndUser.fetch({
						success:function(data){
							var curRoleID = currentRoleAndUser.get("CurRoleID");
							var curUserID = currentRoleAndUser.get("CurUserID");
							if(curRoleID !== ''){
								rolesView.$el.find('option[value='+curRoleID + ']').attr("selected","selected");
							}else{                                          //否则，设置第一个option为选中
								rolesView.$el.find('option:first').attr("selected","selected");
							}

							var defaultRoleID = rolesView.$el.val();             //获取select的值
							rolesView.setUserList(defaultRoleID,rolesView,curUserID);
						},
						error:function(){
							alert("自动安排下一个销售顾问失败")
						}
					})

				},
				changeUserList:function(){                          //绑定到el上的change事件处理程序
					this.setUserList(this.$el.val(),this);
				},
				/*
				* 根据roleID，curUserID设置UserList
				* @param:roleID     选中的roleID
				* @param:rolesView  当前的View实例
				* @param:curUserID  当前的用户ID
				* */
				setUserList:function(roleID,rolesView,curUserID){
					var userList = new UserCol();                   //实例化一空的UserCollection
					userList.fetch({
						data:{                          //fetch请求时的查询参数
							roleIDString:roleID         //调用传入的roleIDString参数
						},
						success:function(){
							console.log('fetch user list data from server successfully');
							var usersView = new View.UsersView({
								collection:userList
							});
							//每次重置UserList时，都要把已有的div#saleConsultant 从文档移除
							var parent = rolesView.$el.parent().children("#saleConsultant").remove();
							//光渲染视图是不会把元素插入到文档中的
							usersView.render();
							//如果传入的当前用户ID不为空，则设置当前用户的option为selected
							if(curUserID !== "" || curUserID !== null){
								usersView.$el.find('option[value='+ curUserID + ']').attr('selected','selected');
							}
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
