/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * ClientManage Module
 ***************************************/

define(['app','apps/Config/appConfig','apps/RouterAPI/RouterAPI'],function(ClientManage,AppConfig,RouterAPI){
	ClientManage.module('CM',function(CM,ClientManage,Backbone,Marionette,$,_){

		CM.Router = Marionette.AppRouter.extend({
			appRoutes: {
				/*Home Router*/
				"Home/Index":"HomeIndex",
				"Home/Feedback":"HomeFeedback",
				"SignOut":"SignOut",

				/*StudentMgr Index Router*/
				"StudentMgr/Index/List":"StudentMgrIndexList",
				"StudentMgr/Index/Create":"StudentMgrIndexCreate",
				"StudentMgr/Index/Edit/Student-:id":"StudentMgrIndexEditStudent",
				"StudentMgr/Index/Edit/Contacts-:id":"StudentMgrIndexEditContacts",
				"StudentMgr/AssignConsultant-:id":"StudentMgrAssignConsultant",

				/*StudentMgr SaleTrack Router*/
				"StudentMgr/SaleTrack/List":"StudentMgrSaleTrackList",
				"StudentMgr/SaleTrack/AppInterview-:id":"StudentMgrSaleTrackAppInterview",
				"StudentMgr/SaleTrack/FirstInterviewReg-:id":"StudentMgrSaleTrackFirstInterviewReg",
				"StudentMgr/SaleTrack/SaleTrackHistory-:id":"StudentMgrSaleTrackSaleTrackHistory",

				/*RoleMgr Router*/
				"RoleMgr/List":"RoleMgrList",
				"RoleMgr/Add":"RoleMgrAdd",
				"RoleMgr/Edit-:id":"RoleMgrEdit",

				/*UserMgr Router*/
				"UserMgr/List":"UserMgrList",
				"UserMgr/Edit-:id":"UserMgrEdit",
				"UserMgr/Add":"UserMgrAdd",

				/*Setting Router*/
				"Setting/Index":"SettingIndex",
				"Setting/ApplyStageVersion/List":"SettingApplyStageVersionList",
				"Setting/ApplyStageVersion/Create":"SettingApplyStageVersionCreate",
				"Setting/ApplyStageVersion/Edit/Version-:id":"SettingApplyStageVersionEditVersion",
				"Setting/ApplyStageVersion/EditDetail/Version-:id":"SettingApplyStageVersionEditDetailVersion"
			}
		});

		ClientManage.on("render:frame",function(options){
			require(['apps/Common/index_view'],function(indexViewLayout){
				var indexView = new indexViewLayout();
				ClientManage.bodyRegion.show(indexView);

				require(['apps/Common/AdminFooter_view'],function(FooterView){
					var footerView = new FooterView({
						model:AppConfig
					});
					indexView.adminFooterRegion.show(footerView);
				});
				require(['apps/Common/AdminBar_view'],function(AdminBarView){
					var barModel = new Backbone.Model({
						AppConfig:AppConfig,
						CurrentUser:ClientManage.CurrentUser
					})
					var adminBarView = new AdminBarView({
						model:barModel
					});
					indexView.adminBarRegion.show(adminBarView);
				});
				require(['apps/Common/AdminMenu_view'],function(AdminMenuView){
					var menuModel = new Backbone.Model({
						AppConfig:AppConfig,
						CurrentUser:ClientManage.CurrentUser
					})
					var adminMenuView = new AdminMenuView({
						model:menuModel
					});
					indexView.adminMenuRegion.show(adminMenuView);
				});

				var urlFragment = ClientManage.getCurrentRoute();
				if(urlFragment === '' || urlFragment==='SignIn'){                     //根据当前是否有路由参数来渲染视图
					ClientManage.trigger("home:index");
				}else{
					ClientManage.navigate(urlFragment);
					//AppUISet.SetCurrentMenu(urlFragment);
					urlFragment = urlFragment.replace(/\//g,'');
					if(RouterAPI.hasOwnProperty(urlFragment)){
						RouterAPI[urlFragment]();
					}else{
						ClientManage.trigger("home:index");
					}
				}
			})
		});

		ClientManage.on('home:index',function(){
			ClientManage.navigate("Home/Index");
			RouterAPI.HomeIndex();
		});

		ClientManage.addInitializer(function(){
			new CM.Router({
				controller:RouterAPI
			});
		});
	});

	return ClientManage.CM;
});
