/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentMgr/ScheduleApply View
 ***************************************/

define([
	'app',
	'Timeline',
	'libs/bootstrap/bootstrapswitch/bootstrap-switch.min',
	'text!templates/StudentMgr/ScheduleApply/Schedule.html',
	'./scheduleItem_view',
	'assets/SetFeedbackMsg',
	'assets/CheckSubmitRequire',
	'collections/StudentMgr/StudentApplyStageWrapCollection',
	'models/StudentMgr/StudentApplyStageWrapModel',
	'collections/StudentMgr/StudentApplyStageCollection',
	'models/StudentMgr/StudentApplyStageModel',
	'assets/RenderDateTimePicker'
	],function(
		ClientManage,
		timeliner,
		BootstrapSwitch,
		ScheduleTpl,
		ScheduleItemView,
		SetFeedbackMsg,
		CheckSubmitRequire,
		StudentApplyStageWrapCollection,
		StudentApplyStageWrapModel,
		StudentApplyStageCollection,
		StudentApplyStageModel,
		RenderDateTimePicker){
	ClientManage.module('StudentMgr.ScheduleApply.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.ScheduleItemView = ScheduleItemView;

		View.ScheduleView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(ScheduleTpl),
			itemView:View.ScheduleItemView,
			itemViewContainer:"#timelineContainer",
			initialize:function(options){
				if(options != null){
					this.StudentID = options.StudentID;
				}
			},
			onShow:function(){
				$.timeliner({timelineContainer: '#timelineContainer',fontOpen:'24px'});
				this.$el.find("#timelineContainer").append("<br class=\"clear\">")

				this.$el.find(".forbidSwitch").bootstrapSwitch();
				this.$el.find(".switch").bootstrapSwitch();

				var renderDateTimePicker = new RenderDateTimePicker();
				renderDateTimePicker.RenderDate(this.$el.find('.timeRelated:not(.display) .timePicker'));
			},
			ui:{
				"EditForm":"#editForm",
				"btnSubmit":"#btnSubmit"                   //提交按钮
			},
			events:{
				'submit @ui.EditForm':'EditSubmit'
			},
			SetFeedbackMsg:SetFeedbackMsg,
			CheckRequire:CheckSubmitRequire,
			//检查表单元素的值是否合法
			validateForm:function(){
				//检查基础必备信息是否已填写
				var requiredMsg = '请填写必填字段:';
				if(!this.CheckRequire(this.$el,'class','ApplyStage_StageName')){
					this.SetFeedbackMsg(this.$el,requiredMsg+"阶段名",'inputInvalid','add')
					return false;
				}

				return true;
			},
			SetApplyStages:function(){
				var submitCollection = new StudentApplyStageWrapCollection()

				var scheduleView = this;
				var $parentStages = this.$el.find(".timelineMajor");
				var parentStageNo,parentStageModel,childStages,stageDl;
				$parentStages.each(function(i){
					parentStageNo = $(this).attr("date-Parent-StageNo");
					stageDl = scheduleView.$el.find("dl[data-StageNo="+parentStageNo+"]")

					parentStageModel =  scheduleView.SetDetail(stageDl,null);
					childStages = new StudentApplyStageCollection();
					stageDl.siblings(".timelineMinor").each(function(i){
						childStages.add(scheduleView.SetDetail($(this),parentStageModel));
					});

					submitCollection.add(new StudentApplyStageWrapModel({
						ParentStage:parentStageModel,
						ChildStages:childStages
					}))
				})
				return submitCollection;
			},
			SetDetail:function(stageDl,parentStageModel){
				var stageNo = stageDl.attr("data-StageNo");
				var stageName = stageDl.find("input.ApplyStage_StageName").val();

				var stageClass = stageDl.attr("data-StageClass");
				var isForbid = !(stageDl.find(".ApplyStage_IsForbid").is(":checked"));
				/*var canForbid = !(stageDl.find(".data-CanForbid") === "true");
				var canChangeName = stageDl.attr("data-CanChangeName") === "true";
				var canChangeDate = stageDl.attr("data-CanChangeDate") === "true";*/
				var isDateSameWithParent = stageDl.attr("data-IsDateSameWithParent") === "true";

				var beginDate,endDate;

				if(isDateSameWithParent && stageClass =='2'){
					beginDate = parentStageModel.get("BeginDate");
					endDate = parentStageModel.get("EndDate");
				}else{
					beginDate = stageDl.find("input.ApplyStage_BeginDate").val();
					endDate = stageDl.find("input.ApplyStage_EndDate").val();
				}

				return new StudentApplyStageModel({
					StudentID:this.StudentID,
					StageNo:stageNo,
					StageName:stageName,
					StageClass:stageClass,
					IsForbid:isForbid,
					BeginDate:beginDate,
					EndDate:endDate
				})
			},
			EditSubmit:function(e){
				e.preventDefault();
				if(this.validateForm()){
					var submitCollection = this.SetApplyStages();

					var postUrl = this.ui.EditForm.attr('action');
					var ajaxData = JSON.stringify(submitCollection);

					$.ajax({
						type:'POST',
						url:postUrl,
						data:ajaxData,
						dataType:'json',
						contentType: 'application/json; charset=utf-8',
						success:function(data){
							if(data.SaveResult == true){
								ClientManage.vent.trigger("ScheduleApplySuccess");
							}else{
								alert('Post Failed');
							}
						},
						error:function(data){
							alert('提交数据失败');
						}
					})
				}
				return false;
			}
		})
	})
	return ClientManage.StudentMgr.ScheduleApply.View;
})
