/***************************************
 * Created by samhwang1990@gmail.com on 14-11-5.
 * RoleMgr/EditPermission Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('RoleMgr.EditPermission',function(Edit,ClientManage,Backbone,Marionette,$,_){
		Edit.Controller = {
			ShowEdit:function(contentRegion,roleID){
				ClientManage.startSubApp('RoleMgr.EditPermission');
				require(['apps/RoleMgr/EditPermission/edit_view','models/RoleMgr/RolePermissionValue'],function(EditPermissionView,RolePermissionModel){
					var permissionInfo = new RolePermissionModel({
						url:'/RoleMgr/EditPermission'
					});
					permissionInfo.fetch({
						data:{
							roleID:roleID
						},
						success:function(data){
							if(data == false){
								return alert("传入的角色ID 不能为空！");
							}else{
								var editView = new EditPermissionView.PermissionEditView({
									model:permissionInfo
								});
								contentRegion.show(editView);
							}
						},
						error:function(error){
							alert("获取数据失败");
						}
					})

				})
			}
		}

	})

	return ClientManage.RoleMgr.EditPermission.Controller;
})
