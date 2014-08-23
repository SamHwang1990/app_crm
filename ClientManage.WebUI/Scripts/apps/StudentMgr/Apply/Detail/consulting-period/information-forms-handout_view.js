/***************************************
 * Created by samhwang1990@gmail.com on 14-8-22.
 * StudentMgr/Apply/Detail/Consulting-Period/information-forms-handout view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/Detail/consulting-period/informationFormsHandout.html'],
	function(ClientManage,InformationFormsHandoutTpl){
	var detailView = Marionette.ItemView.extend({
		template: _.template(InformationFormsHandoutTpl),
		tagName:"section",
		className:"card-stage-content",
		initialize:function(){
			alert("child detail view: information-forms-handout init!");
		}
	});
	return detailView;
});

