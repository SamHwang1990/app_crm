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

		ClientManage.on('home:index',function(){
			API.homeIndex();
		});

		ClientManage.addRegions({
			adminBarRegion: "#appAdminBar",
			adminMenuRegion:"#adminMenuWrap",
			adminContentRegion:"#appBody-content .wrap",
			adminFooterRegion:"#appFooter"
		});

		var API = {
			homeIndex:function(){
				alert("homeIndex");
			},
			homeFeedback:function(){
				alert("homeFeedback");
			}
		};

		CM.on("start",function(options){
			alert("CM Start");
			ClientManage.startSubApp("CM");
		});

		CM.on("stop", function(){
			alert("CM stop");
		});

		CM.on("start",function(options){
			require(['apps/Common/AdminFooter_view'],function(FooterView){
				var footerView = new FooterView({
					model:AppConfig
				});
				ClientManage.adminFooterRegion.show(footerView);
			});
			require(['apps/Common/AdminBar_view'],function(AdminBarView){
				var barModel = new Backbone.Model({
					AppConfig:AppConfig,
					CurrentUser:ClientManage.CurrentUser
				})
				var adminBarView = new AdminBarView({
					model:barModel
				});
				ClientManage.adminBarRegion.show(adminBarView);
			});
			require(['apps/Common/AdminMenu_view'],function(AdminMenuView){
				var menuModel = new Backbone.Model({
					AppConfig:AppConfig,
					CurrentUser:ClientManage.CurrentUser
				})
				var adminMenuView = new AdminMenuView({
					model:menuModel
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
