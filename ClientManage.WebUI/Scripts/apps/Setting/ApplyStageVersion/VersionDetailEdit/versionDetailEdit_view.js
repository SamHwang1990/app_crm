/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStageVersion/VersionDetailEdit View
 ***************************************/

define([
	'app',
	'text!templates/Setting/ApplyStagesMgr/VersionDetailEdit.html',
	'Timeline',
	'libs/bootstrap/bootstrapswitch/bootstrap-switch.min',
	'assets/SetFeedbackMsg',
	'assets/CheckSubmitRequire',
	'./versionDetailEditItem_view',
	'collections/Setting/ApplyStagesMgr/VersionDetailWrapCollection',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailWrapModel'
	],function(
		ClientManage,
		DetailEditTpl,
		timeliner,
		BootstrapSwitch,
		SetFeedbackMsg,
		CheckSubmitRequire,
		VersionDetailEditItemView,
		VersionDetailWrapCollection,
		VersionDetailWrapModel){
	ClientManage.module('Setting.ApplyStageVersion.VersionDetailEdit.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionDetailEditItemView = VersionDetailEditItemView;

		View.VersionDetailEditView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(DetailEditTpl),
			itemView:View.VersionDetailEditItemView,
			itemViewContainer:"#timelineContainer",
			onShow:function(){
				$.timeliner({timelineContainer: '#timelineContainer',fontOpen:'24px'});
				this.$el.find("#timelineContainer").append("<br class=\"clear\">")

				this.$el.find(".forbidSwitch").bootstrapSwitch();
				this.$el.find(".timeLimitSwitch").bootstrapSwitch();
				this.$el.find(".switch").bootstrapSwitch();
			},
			ui:{
				"EditForm":"#editForm",
				"btnSubmit":"#btnSubmit"                   //提交按钮
			},
			events:{
				'submit @ui.EditForm':'EditSubmit'
			},
			SetParentVersionDetails:function(SubmitCollection){
				var editView = this;
				//console.log(SubmitCollection.models);
				var parentDetails = this.$el.find(".timelineMajor");
				var parentStageNo,versionDetailModel;
				parentDetails.each(function(i){
					parentStageNo = $(this).attr("date-Parent-StageNo");
					editView.SetDetail(editView.$el.find("dl[data-StageNo="+parentStageNo+"]"))
				})
			},
			SetDetail:function(stageDl){
				var stageName = stageDl.find(".VersionDetail_StageName").val();
				var isForbid = stageDl.find(".VersionDetail_IsForbid").is(":checked");
				var canForbid = stageDl.find(".VersionDetail_CanForbid").is(":checked");
				var canChangeName = stageDl.find(".VersionDetail_CanChangeName").is(":checked");
				var canChangeDate = stageDl.find(".VersionDetail_CanChangeDate").is(":checked");
				var isDateSameWithParent = stageDl.find(".VersionDetail_IsDateSameWithParent").is(":checked");
				var beginDate = stageDl.find(".VersionDetail_BeginDate").val();
				var EndDate = stageDl.find(".VersionDetail_EndDate").val();
				var isCalBeginDate = stageDl.find("[data-IsCalBeginDate]").attr("data-IsCalBeginDate");
				var isCalEndDate = stageDl.find("[data-IsCalEndDate]").attr("data-IsCalEndDate");
			},
			EditSubmit:function(e){
				//阻止默认的提交行为
				e.preventDefault();

				//复制一份新的collection，深拷贝来的哦
				var submitCollection = new VersionDetailWrapCollection()
				this.SetParentVersionDetails(submitCollection);

				return false;
			}
		})
	});
	return ClientManage.Setting.ApplyStageVersion.VersionDetailEdit.View;
})

