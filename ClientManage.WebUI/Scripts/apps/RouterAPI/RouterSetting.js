/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){
		/*Setting Router Controller*/
		RouterAPI.SettingIndex = function(){
			alert("SettingIndex");
		};
		RouterAPI.SettingApplyStageVersionList = function(){
			require([
				'apps/Setting/ApplyStageVersion/VersionList/versionList_controller'],
				function(ApplyStageVersionListController){
					RouterAPI.executeAction(ApplyStageVersionListController.ShowList);
				})
		};
		RouterAPI.SettingApplyStageVersionCreate = function(){
			require([
				'apps/Setting/ApplyStageVersion/VersionCreate/versionCreate_controller'],
				function(ApplyStageVersionCreateController){
					RouterAPI.executeAction(ApplyStageVersionCreateController.ShowCreate);
				})
		};
		RouterAPI.SettingApplyStageVersionEditVersion = function(id){
			require([
				'apps/Setting/ApplyStageVersion/VersionEdit/versionEdit_controller'],
				function(ApplyStageVersionEditController){
					RouterAPI.executeAction(ApplyStageVersionEditController.ShowEdit,id);
				})
		};
		RouterAPI.SettingApplyStageVersionEditDetailVersion = function(id){
			require([
				'apps/Setting/ApplyStageVersion/VersionDetailEdit/versionDetailEdit_controller'],
				function(ApplyStageVersionDetailEditController){
					RouterAPI.executeAction(ApplyStageVersionDetailEditController.ShowEdit,id);
				})
		};

		RouterAPI.SettingStudentSourceList = function(){
			require([
				'apps/Setting/StudentSource/List/list_controller'],
				function(StudentSourceListController){
					RouterAPI.executeAction(StudentSourceListController.ShowList);
				})
		};

		RouterAPI.SettingStudentSourceAdd = function(){

		};

		RouterAPI.SettingStudentSourceEdit = function(sourceName){

		};
	};
	return routerHandler;
})