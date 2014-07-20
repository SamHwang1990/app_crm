/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Home Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){
		/*Home Router Controller*/
		RouterAPI.HomeIndex = function(){
			require(['apps/Home/Index/index_controller'],function(HomeIndexController){
				RouterAPI.executeAction(HomeIndexController.ShowIndex);
			})
		}
		RouterAPI.HomeFeedback = function(){
			require(['apps/Home/Feedback/feedback_controller'],function(HomeFeedbackController){
				RouterAPI.executeAction(HomeFeedbackController.ShowFeedback);
			})
		}
		RouterAPI.SignOut = function(){
			require(['apps/SignIn/SignIn_app'],function(SignIn){
				ClientManage.trigger("signOut:signIn");
			});
		}
	}
	return routerHandler;
})
