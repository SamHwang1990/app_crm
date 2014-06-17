/***************************************
 * Created by samhwang1990@gmail.com on 14-6-17.
 * UserMgr/Create Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('UserMgr.Edit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			ShowEdit:function(contentRegion){
				ClientManage.startSubApp("UserMgr.Edit");
				require([
					'apps/UserMgr/Edit/edit_view',
					'models/UserMgr/UserInfo',
					'collections/RoleMgr/RoleList']
					,function(EditView,UserInfoModel,RoleListCollection){
						var userInfo = new UserInfoModel();
						var roleList = new RoleListCollection;
						roleList.fetch({
							success:function(){
								var editView = new EditView.UserEditView({
									model:userInfo,
									RoleList:roleList
								});
								contentRegion.show(editView);
							}
						})

					})
			}
		}
	});
	return ClientManage.UserMgr.Edit.Controller;
})
