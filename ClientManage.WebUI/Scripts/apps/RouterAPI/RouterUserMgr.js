/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * UserMgr Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){
		RouterAPI.UserMgrList = function(){
			require([
				'apps/UserMgr/List/list_controller'],
				function(UserMgrListController){
					RouterAPI.executeAction(UserMgrListController.ShowList);
				})
		}
		RouterAPI.UserMgrEdit = function(id){
			require([
				'apps/UserMgr/Edit/edit_controller'],
				function(UserMgrEditController){
					RouterAPI.executeAction(UserMgrEditController.ShowEdit,id)
				})
		}
		RouterAPI.UserMgrAdd = function(){
			require([
				'apps/UserMgr/Create/create_controller'],
				function(UserMgrCreateController){
					RouterAPI.executeAction(UserMgrCreateController.ShowEdit)
				})
		}
	}
	return routerHandler;
})
