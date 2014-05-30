/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * ClientManage Module
 ***************************************/

define(['app','apps/Config/appConfig'],function(ClientManage,AppConfig){
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

				/*StudentMgr SaleTrack Router*/
				//"StudentMgr/SaleTrack/List":"StudentMgrSaleTrackList",
				//"StudentMgr/SaleTrack/Index":"StudentMgrSaleTrackIndex",
				"StudentMgr/SaleTrack/AppInterview-:id":"StudentMgrSaleTrackAppInterview",
				"StudentMgr/SaleTrack/FirstInterviewReg-:id":"StudentMgrSaleTrackFirstInterviewReg"
				//"StudentMgr/SaleTrack/FirstRegFormInfo":"StudentMgrSaleTrackFirstRegFormInfo",
				//"StudentMgr/SaleTrack/FirstRegFormTP":"StudentMgrSaleTrackFirstRegFormTP",
				//"StudentMgr/SaleTrack/FirstRegFormFrom":"StudentMgrSaleTrackFirstRegFormFrom",
				//"StudentMgr/SaleTrack/CommonInterview":"StudentMgrSaleTrackFirstCommonInterview",
				//"StudentMgr/SaleTrack/GetFromInterview":"StudentMgrSaleTrackFirstGetFromInterview"
			}
		});

		var executeAction = function(action, arg){
			action(ClientManage.bodyRegion.currentView.adminContentRegion,arg);
			//ClientManage.execute("check:signIn");
		};

		var API = {
			/*Home Router Controller*/
			HomeIndex:function(){
				require(['apps/Home/Index/index_controller'],function(HomeIndexController){
					executeAction(HomeIndexController.ShowIndex);
				})
			},
			HomeFeedback:function(){
				require(['apps/Home/Feedback/feedback_controller'],function(HomeFeedbackController){
					executeAction(HomeFeedbackController.ShowFeedback);
				})
			},
			SignOut:function(){
				require(['apps/SignIn/SignIn_app'],function(SignIn){
					ClientManage.trigger("signOut:signIn");
				});
			},

			/*StudentMgr Index Router Controller*/
			StudentMgrIndexList:function(){
				require(['apps/StudentMgr/Index/List/list_controller'],function(StudentMgrIndexListController){
					executeAction(StudentMgrIndexListController.ShowList);
				})
			},
			StudentMgrIndexCreate:function(){
				require(['apps/StudentMgr/Index/Create/create_controller'],function(StudentMgrIndexCreateController){
					executeAction(StudentMgrIndexCreateController.ShowCreate);
				})
			},
			StudentMgrIndexEditStudent:function(id){
				require(['apps/StudentMgr/Index/Edit/edit_controller'],function(StudentMgrIndexEditController){
					executeAction(StudentMgrIndexEditController.EditStudent,id);
				})
			},
			StudentMgrIndexEditContacts:function(id){
				require(['apps/StudentMgr/Index/Edit/edit_controller'],function(StudentMgrIndexEditController){
					executeAction(StudentMgrIndexEditController.EditContacts,id);
				})
			},

			/*StudentMgr SaleTrack Router Controller*/
			StudentMgrSaleTrackAppInterview:function(id){
				require([
					'apps/StudentMgr/SaleTrack/Interview/interview_controller'],
					function(StudentMgrSaleTrackInterviewController){
						executeAction(StudentMgrSaleTrackInterviewController.ShowInterview,id);
					})
			},
			StudentMgrSaleTrackFirstInterviewReg:function(id){

			}
		};

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
					if(API.hasOwnProperty(urlFragment)){
						API[urlFragment]();
					}else{
						ClientManage.trigger("home:index");
					}
				}
			})
		});

		ClientManage.on('home:index',function(){
			ClientManage.navigate("Home/Index");
			API.HomeIndex();
		});

		ClientManage.addInitializer(function(){
			new CM.Router({
				controller:API
			});
		});
	});

	return ClientManage.CM;
});
