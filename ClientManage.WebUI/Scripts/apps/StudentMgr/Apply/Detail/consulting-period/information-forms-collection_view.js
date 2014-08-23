/***************************************
 * Created by samhwang1990@gmail.com on 14-8-23.
 * StudentMgr/Apply/Detail/Consulting-Period/information-forms-collection view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/Detail/consulting-period/informationFormsCollection.html'],
	function(ClientManage,InformationFormsCollectionTpl){
		var detailView = Marionette.ItemView.extend({
			template: _.template(InformationFormsCollectionTpl),
			tagName:"section",
			className:"card-stage-content",
			initialize:function(){
				alert("child detail view: information-forms-collection init!");
			}
		});
		return detailView;
	}
);

