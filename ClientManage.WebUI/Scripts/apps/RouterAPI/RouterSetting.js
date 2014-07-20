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
		RouterAPI.SettingApplyStageVersionEditVersion = function(id){

		};
		RouterAPI.SettingApplyStageVersionDeleteVersion = function(id){

		}
	};
	return routerHandler;
})