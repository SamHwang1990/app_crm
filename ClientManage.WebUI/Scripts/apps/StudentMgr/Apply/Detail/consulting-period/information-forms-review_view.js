/***************************************
 * Created by samhwang1990@gmail.com on 14-8-23.
 * StudentMgr/Apply/Detail/Consulting-Period/information-forms-review view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/Detail/consulting-period/informationFormsReview.html'],
	function(ClientManage,InformationFormsReviewTpl){
		var detailView = Marionette.ItemView.extend({
			template: _.template(InformationFormsReviewTpl),
			tagName:"section",
			className:"card-stage-content",
			initialize:function(){
				alert("child detail view: information-forms-review init!");
			}
		});
		return detailView;
	}
);
