/***************************************
 * Created by samhwang1990@gmail.com on 14-11-5.
 * RoleMgr/EditPermission Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('RoleMgr.EditPermission',function(Edit,ClientManage,Backbone,Marionette,$,_){
		Edit.Controller = {
			ShowEdit:function(contentRegion,roleID){
				ClientManage.startSubApp('RoleMgr.EditPermission');
			}
		}

	})

	return ClientManage.RoleMgr.EditPermission.Controller;
})
