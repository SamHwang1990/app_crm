/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStageVersion/VersionDetailEdit View
 ***************************************/

define([
	'app',
	'text!templates/Setting/ApplyStagesMgr/VersionDetailEdit.html',
	'text!templates/Setting/ApplyStagesMgr/VersionDetailEditItem.html',
	'text!templates/Setting/ApplyStagesMgr/VersionDetailEditFieldset.html',
	'Timeline',
	'libs/bootstrap/bootstrapswitch/bootstrap-switch.min'
	],function(ClientManage,DetailEditTpl,DetailEditItemTpl,VersionDetailEditFieldSetTpl,timeliner,BootstrapSwitch){
	ClientManage.module('Setting.ApplyStageVersion.VersionDetailEdit.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionDetailEditItemView = Marionette.ItemView.extend({
			template:_.template(DetailEditItemTpl),
			tagName:"div",
			className:"timelineMajor",
			templateHelpers:function(){
				return{
					FieldsetTpl:VersionDetailEditFieldSetTpl
				}
			},
			onRender:function(){

			}
		});
		View.VersionDetailEditView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(DetailEditTpl),
			itemView:View.VersionDetailEditItemView,
			itemViewContainer:"#timelineContainer",
			onShow:function(){
				$.timeliner({timelineContainer: '#timelineContainer',fontOpen:'24px'});
				this.$el.find("#timelineContainer").append("<br class=\"clear\">")

				this.$el.find(".switch").bootstrapSwitch();
			}
		})
	});
	return ClientManage.Setting.ApplyStageVersion.VersionDetailEdit.View;
})

