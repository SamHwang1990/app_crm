/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 ***************************************/

define([
	'app',
	'./RouterSetting',
	'./RouterHome',
	'./RouterRoleMgr',
	'./RouterUserMgr',
	'./RouterStudentMgr'
	],function(ClientManage,RouterSetting,RouterHome,RouterRoleMgr,RouterUserMgr,RouterStudentMgr){
	var RouterAPI = {};
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
