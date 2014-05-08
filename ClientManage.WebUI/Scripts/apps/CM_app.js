/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * ClientManage Module
 ***************************************/

define(['app','apps/Config/appConfig'],function(ClientManage,AppConfig,AppUISet){
	ClientManage.module('CM',function(CM,ClientManage,Backbone,Marionette,$,_){

		CM.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"Home/Index":"homeIndex",
				"Home/Feedback":"homeFeedback"
			}
		});

		var API = {
			homeIndex:function(){
				alert("HomeIndex");
			},
			homeFeedback:function(){
				alert("HomeFeedback");
			}
		};

		ClientManage.on('home:index',function(){
			API.homeIndex();
		})

		ClientManage.addRegions({
			adminBarRegion: "#appAdminBar",
			adminMenuRegion:"#adminMenuWrap",
			adminContentRegion:"#appBody-content .wrap",
			adminFooterRegion:"#appFooter"
		});

		CM.on("before:start",function(options){
			require(['apps/SignIn/SignIn_app'],function(){
				ClientManage.trigger("check:signIn");
			});
		});

		CM.on("start",function(options){
			require(['apps/Common/AdminFooter_view'],function(FooterView){
				var footerView = new FooterView({
					/*model:{
						siteName:AppConfig.siteName,
						version:AppConfig.version
					}*/
				});
				ClientManage.adminFooterRegion.show(footerView);
			});
			require(['apps/Common/AdminBar_view'],function(AdminBarView){
				var adminBarView = new AdminBarView({
					/*model:{
						AppConfig:AppConfig,
						CurrentUser:ClientManage.CurrentUser
					}*/
				});
				ClientManage.adminBarRegion.show(adminBarView);
			});
			require(['apps/Common/AdminMenu_view'],function(AdminMenuView){
				var adminMenuView = new AdminMenuView({
					/*model:{
						AppConfig:AppConfig,
						CurrentUser:ClientManage.CurrentUser
					}*/
				});
				ClientManage.adminMenuRegion.show(adminMenuView);
			});
		});

		ClientManage.addInitializer(function(){
			new CM.Router({
				controller:API
			});
		});
	});

	return ClientManage.CM;
});
