/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * ClientManage Module
 ***************************************/

define(['app','apps/Config/appConfig'],function(ClientManage,AppConfig,AppUISet){
	ClientManage.module('CM',function(CM,ClientManage,Backbone,Marionette,$,_){

		CM.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"Home/Index":"homeIndex",
				"Home/Feedback":"homeFeedback",

				"SignOut":"homeSignOut"
			}
		});

		ClientManage.on('home:index',function(){
			API.homeIndex();
		});

		var API = {
			homeIndex:function(){
				alert("homeIndex");
			},
			homeFeedback:function(){
				alert("homeFeedback");
			},
			homeSignOut:function(){
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
