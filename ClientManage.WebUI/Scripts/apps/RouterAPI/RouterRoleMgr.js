/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * RoleMgr Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){

		/*RoleMgr Router Controller*/
		RouterAPI.RoleMgrList = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/RoleMgr/List/list_controller'],
				function(RoleMgrListController){
					RouterAPI.executeAction(RoleMgrListController.ShowList);
				})
		}
		RouterAPI.RoleMgrAdd = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/RoleMgr/Create/create_controller'],
				function(RoleMgrCreateController){
					RouterAPI.executeAction(RoleMgrCreateController.ShowCreate)
				})
		}
		RouterAPI.RoleMgrEdit = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/RoleMgr/Edit/edit_controller'
			],function(RoleMgrEditController){
				RouterAPI.executeAction(RoleMgrEditController.ShowEdit,id)
			})
		}
		RouterAPI.RoleMgrEditPermission = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/RoleMgr/EditPermission/edit_controller'
			],function(RoleMgrEditPermissionController){
				RouterAPI.executeAction(RoleMgrEditPermissionController.ShowEdit,id);
			})
		}
	}

	return routerHandler;
})
