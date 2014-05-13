/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * Home/Feedback Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Home.Feedback',function(Feedback,ClientManage,Backbone, Marionette, $, _){
		Feedback.Controller = {
			ShowFeedback :function(contentRegion){
				ClientManage.startSubApp("Home.Feedback");
				require(['apps/Home/Feedback/feedback_view'],function(FeedbackView){
					var feedbackView = new FeedbackView.FeedbackView();
					contentRegion.show(feedbackView);
				})
			}
		}
	});
	return ClientManage.Home.Feedback.Controller;
});
