/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 ***************************************/

define([
	'app',
	'apps/Common/prohibitView',
	'./RouterSetting',
	'./RouterHome',
	'./RouterRoleMgr',
	'./RouterUserMgr',
	'./RouterStudentMgr'
	],function(ClientManage,ProhibitView,RouterSetting,RouterHome,RouterRoleMgr,RouterUserMgr,RouterStudentMgr){
	var RouterAPI = {};
	RouterAPI.renderProhibit = function(){
		ProhibitView(ClientManage.bodyRegion.currentView.adminContentRegion);
	};
	RouterAPI.executeAction = function(action, arg){
		action(ClientManage.bodyRegion.currentView.adminContentRegion,arg);
	};

	/*Setting Module Router*/
	RouterSetting(RouterAPI);

	/*Home Module Router*/
	RouterHome(RouterAPI);

	/*RoleMgr Module Router*/
	RouterRoleMgr(RouterAPI);

	/*UserMgr Module Router*/
	RouterUserMgr(RouterAPI);

	/*StudentMgr Module Router*/
	RouterStudentMgr(RouterAPI);


	return RouterAPI;
})
