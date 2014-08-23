/***************************************
 * Created by samhwang1990@gmail.com on 14-8-23.
 * StudentMgr/Apply/Detail/Consulting-Period/personal-features-conclusion view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/Detail/consulting-period/personalFeaturesConclusion.html'],
	function(ClientManage,PersonalFeaturesConclusionTpl){
		var detailView = Marionette.ItemView.extend({
			template: _.template(PersonalFeaturesConclusionTpl),
			tagName:"section",
			className:"card-stage-content",
			initialize:function(){
				alert("child detail view: personal-features-conclusion init!");
			}
		});
		return detailView;
	}
);
