/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * Home/Feedback View
 ***************************************/
define(['app','text!templates/Home/Feedback.html'],function(ClientManage,FeedbackTpl){
	ClientManage.module('Home.Feedback.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.FeedbackView = Marionette.ItemView.extend({
			template:_.template(FeedbackTpl),
			tagName:'div',
			className:'wrap'
		})
	});
	return ClientManage.Home.Feedback.View;
});
