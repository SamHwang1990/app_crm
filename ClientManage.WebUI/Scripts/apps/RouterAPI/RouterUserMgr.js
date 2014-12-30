/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * UserMgr Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){

		RouterAPI.UserMgrList = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/UserMgr/List/list_controller'],
				function(UserMgrListController){
					RouterAPI.executeAction(UserMgrListController.ShowList);
				})
		}
		RouterAPI.UserMgrEdit = function(id){
			ClientManage.on("userEdit:block",function(){      //注册应用程序事件
				return RouterAPI.renderProhibit();
			});

			require([
				'apps/UserMgr/Edit/edit_controller'],
				function(UserMgrEditController){
					RouterAPI.executeAction(UserMgrEditController.ShowEdit,id)
				})
		}
		RouterAPI.UserMgrAdd = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/UserMgr/Create/create_controller'],
				function(UserMgrCreateController){
					RouterAPI.executeAction(UserMgrCreateController.ShowEdit)
				})
		}
	}
	return routerHandler;
})
