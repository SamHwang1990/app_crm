/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * Home/Index Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Home.Index',function(Index,ClientManage,Backbone, Marionette, $, _){
		Index.Controller = {
			ShowIndex :function(contentRegion){
				require(['apps/Home/Index/index_view'],function(IndexView){
					var indexView = new IndexView.IndexView();
					contentRegion.show(indexView);
				})
			}
		}
	});
	return ClientManage.Home.Index.Controller;
});
