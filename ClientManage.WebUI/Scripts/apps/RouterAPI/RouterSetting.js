/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){

		/*Setting Router Controller*/
		RouterAPI.SettingIndex = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			alert("SettingIndex");
		};
		RouterAPI.SettingApplyStageVersionList = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/ApplyStageVersion/VersionList/versionList_controller'],
				function(ApplyStageVersionListController){
					RouterAPI.executeAction(ApplyStageVersionListController.ShowList);
				})
		};
		RouterAPI.SettingApplyStageVersionCreate = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/ApplyStageVersion/VersionCreate/versionCreate_controller'],
				function(ApplyStageVersionCreateController){
					RouterAPI.executeAction(ApplyStageVersionCreateController.ShowCreate);
				})
		};
		RouterAPI.SettingApplyStageVersionEditVersion = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/ApplyStageVersion/VersionEdit/versionEdit_controller'],
				function(ApplyStageVersionEditController){
					RouterAPI.executeAction(ApplyStageVersionEditController.ShowEdit,id);
				})
		};
		RouterAPI.SettingApplyStageVersionEditDetailVersion = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/ApplyStageVersion/VersionDetailEdit/versionDetailEdit_controller'],
				function(ApplyStageVersionDetailEditController){
					RouterAPI.executeAction(ApplyStageVersionDetailEditController.ShowEdit,id);
				})
		};

		RouterAPI.SettingStudentSourceList = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/StudentSource/List/list_controller'],
				function(StudentSourceListController){
					RouterAPI.executeAction(StudentSourceListController.ShowList);
				})
		};

		RouterAPI.SettingStudentSourceAdd = function(){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/StudentSource/Edit/edit_controller'],
				function(StudentSourceEditController){
					RouterAPI.executeAction(StudentSourceEditController.ShowEdit,['Add']);
				})
		};

		RouterAPI.SettingStudentSourceEdit = function(sourceNameEn){
			if(!ClientManage.CurrentUserPermission.get('IsManage'))
				return RouterAPI.renderProhibit();

			require([
				'apps/Setting/StudentSource/Edit/edit_controller'],
				function(StudentSourceEditController){
					RouterAPI.executeAction(StudentSourceEditController.ShowEdit,['Edit',sourceNameEn]);
				})
		};
	};
	return routerHandler;
})