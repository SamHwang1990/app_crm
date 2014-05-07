/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * Home Module
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Routers.Home',function(HomeRouter,ClientManage,Backbone,Marionette,$,_){
		HomeRouter.Router=Marionette.AppRouter.extend({
			appRoutes: {
				"Home/Index":"Index",
				"Home/Feedback":"Feedback"
			}
		})
	});
});