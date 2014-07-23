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
	'collections/Setting/ApplyStagesMgr/VersionDetailCollection',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailWrapModel',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailModel'
	],function(
		ClientManage,
		DetailEditTpl,
		timeliner,
		BootstrapSwitch,
		SetFeedbackMsg,
		CheckSubmitRequire,
		VersionDetailEditItemView,
		VersionDetailWrapCollection,
		VersionDetailCollection,
		VersionDetailWrapModel,
		VersionDetailModel){
	ClientManage.module('Setting.ApplyStageVersion.VersionDetailEdit.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionDetailEditItemView = VersionDetailEditItemView;

		View.VersionDetailEditView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(DetailEditTpl),
			itemView:View.VersionDetailEditItemView,
			itemViewContainer:"#timelineContainer",
			initialize:function(options){
				if(options != null){
					this.VersionID = options.VersionID;
				}
			},
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
			SetParentVersionDetails:function(){
				var submitCollection = new VersionDetailWrapCollection()

				var editView = this;
				//console.log(SubmitCollection.models);
				var parentDetails = this.$el.find(".timelineMajor");
				var parentStageNo,parentDetailModel,childVersionDetails,stageDl;
				parentDetails.each(function(i){
					parentStageNo = $(this).attr("date-Parent-StageNo");
					stageDl = editView.$el.find("dl[data-StageNo="+parentStageNo+"]")

					parentDetailModel =  editView.SetDetail(stageDl);
					childVersionDetails = new VersionDetailCollection();
					stageDl.siblings(".timelineMinor").each(function(i){
						childVersionDetails.add(editView.SetDetail($(this)));
					});

					submitCollection.add(new VersionDetailWrapModel({
						ParentVersionDetail:parentDetailModel,
						ChildVersionDetails:childVersionDetails
					}))
				})
				return submitCollection;
			},
			SetDetail:function(stageDl){
				var stageNo = stageDl.attr("data-StageNo");
				var stageName = stageDl.find(".VersionDetail_StageName").val();
				var stageClass = stageDl.attr("data-StageClass");
				var isForbid = !(stageDl.find(".VersionDetail_IsForbid").is(":checked"));
				var canForbid = stageDl.find(".VersionDetail_CanForbid").is(":checked");
				var canChangeName = stageDl.find(".VersionDetail_CanChangeName").is(":checked");
				var canChangeDate = stageDl.find(".VersionDetail_CanChangeDate").is(":checked");
				var isDateSameWithParent = !(stageDl.find(".VersionDetail_IsDateSameWithParent").is(":checked"));
				var beginDate = stageDl.find(".VersionDetail_BeginDate").val();
				var endDate = stageDl.find(".VersionDetail_EndDate").val();
				var isCalBeginDate = stageDl.find(".dropdown-text-BeginDate").attr("data-IsCalDate");
				var isCalEndDate = stageDl.find(".dropdown-text-EndDate").attr("data-IsCalDate");

				return new VersionDetailModel({
					VersionID:this.VersionID,
					StageNo:stageNo,
					StageName:stageName,
					StageClass:stageClass,
					IsForbid:isForbid,
					CanForbid:canForbid,
					CanChangeName:canChangeName,
					CanChangeDate:canChangeDate,
					IsDateSameWithParent:isDateSameWithParent,
					BeginDate:beginDate,
					EndDate:endDate,
					IsCalBeginDate:isCalBeginDate,
					IsCalEndDate:isCalEndDate
				})
			},
			EditSubmit:function(e){
				//阻止默认的提交行为
				e.preventDefault();

				var submitCollection = this.SetParentVersionDetails(submitCollection);

				return false;
			}
		})
	});
	return ClientManage.Setting.ApplyStageVersion.VersionDetailEdit.View;
})

