/***************************************
 * Created by samhwang1990@gmail.com on 14-5-10.
 * Home/Index View
 ***************************************/
define(['app','text!templates/Home/Index.html'],function(ClientManage,IndexTpl){
	ClientManage.module('Home.Index.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.IndexView = Marionette.ItemView.extend({
			template:_.template(IndexTpl),
			tagName:'div',
			className:'wrap'
		})
	});
	return ClientManage.Home.Index.View;
});