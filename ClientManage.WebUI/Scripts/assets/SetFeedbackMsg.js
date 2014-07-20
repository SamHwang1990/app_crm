/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Set Feedback Msg From Submit
 ***************************************/

define([],function(){
	var SetFeedbackMsg = function(fbElement,msg,className,action){
		var feedbackMsg = fbElement.find('.feedbackMsg');                    //获取div.feedbackMsg元素
		feedbackMsg.html(msg);
		switch (action){
			case 'remove':
				feedbackMsg.removeClass(className);
				break;
			case 'add':
				feedbackMsg.addClass(className);
				break;
		}
	}
	return SetFeedbackMsg;
})
