/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * ClientManage Module
 ***************************************/

define(['app','apps/Config/appConfig'],function(ClientManage,AppConfig,AppUISet){
	ClientManage.module('CM',function(CM,ClientManage,Backbone,Marionette,$,_){

		CM.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"Home/Index":"HomeIndex",
				"Home/Feedback":"HomeFeedback",

				"SignOut":"SignOut"
			}
		});

		ClientManage.on('home:index',function(){
			ClientManage.navigate("Home/Index");
			API.HomeIndex();
		});

		var executeAction = function(action, arg){
			action(ClientManage.bodyRegion.currentView.adminContentRegion,arg);
			//ClientManage.execute("check:signIn");
		};

		var API = {
			HomeIndex:function(){
				require(['apps/Home/Index/index_controller'],function(HomeIndexController){
					executeAction(HomeIndexController.ShowIndex);
				})
			},
			HomeFeedback:function(){
				alert("djj");
				/*require(['apps/Home/Feedback/feedback_controller'],function(HomeFDController){
					executeAction(HomeFDController.ShowIndex);
				})*/
			},
			SignOut:function(){
				require(['apps/SignIn/SignIn_app'],function(SignIn){
					ClientManage.trigger("signOut:signIn");
				});
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
					urlFragment = urlFragment.replace('/','');
					API[urlFragment]();
				}
			})
		});

		ClientManage.addInitializer(function(){
			new CM.Router({
				controller:API
			});
		});
	});

	return ClientManage.CM;
});
