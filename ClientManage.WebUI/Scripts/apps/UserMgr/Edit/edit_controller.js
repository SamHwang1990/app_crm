/***************************************
 * Created by samhwang1990@gmail.com on 14-6-17.
 * UsrMgr/Edit Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('UserMgr.Edit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			ShowEdit:function(contentRegion,userID){
				ClientManage.startSubApp("UserMgr.Edit");
				require([
					'apps/UserMgr/Edit/edit_view',
					'models/UserMgr/UserInfo',
					'collections/RoleMgr/RoleList']
					,function(EditView,UserInfoModel,RoleListCollection){
						var userInfo = new UserInfoModel({
							url:"/UserMgr/Edit"
						});
						userInfo.fetch({
							data:{
								userID:userID
							},
							success:function(data){
								if(data === false){
									return alert("传入的用户ID不能为空");
								}
								else{
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
								}
							},
							error:function(){
								alert("获取数据失败");
							}
						})

					})
			}
		}
	});
	return ClientManage.UserMgr.Edit.Controller;
})
