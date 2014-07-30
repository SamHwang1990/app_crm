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
			SetFeedbackMsg:SetFeedbackMsg,
			CheckRequire:CheckSubmitRequire,
			//检查表单元素的值是否合法
			validateForm:function(){
				//检查基础必备信息是否已填写
				var requiredMsg = '请填写必填字段:';
				if(!this.CheckRequire(this.$el,'class','VersionDetail_StageName')){
					this.SetFeedbackMsg(this.$el,requiredMsg+"阶段名",'inputInvalid','add')
					return false;
				}

				return true;
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
						childVersionDetails.add(editView.SetDetail($(this),parentDetailModel.get("IsDateSameWithParent")));
					});

					submitCollection.add(new VersionDetailWrapModel({
						ParentVersionDetail:parentDetailModel,
						ChildVersionDetails:childVersionDetails
					}))
				})
				return submitCollection;
			},
			SetDetail:function(stageDl,_isDateSameWithParent){
				var isDateSameWithParent, beginDate, endDate, isCalBeginDate, isCalEndDate;

				var stageNo = stageDl.attr("data-StageNo");
				var stageName = stageDl.find(".VersionDetail_StageName").val();

				var stageClass = stageDl.attr("data-StageClass");
				var isForbid = !(stageDl.find(".VersionDetail_IsForbid").is(":checked"));
				var canForbid = stageDl.find(".VersionDetail_CanForbid").is(":checked");
				var canChangeName = stageDl.find(".VersionDetail_CanChangeName").is(":checked");
				var canChangeDate = stageDl.find(".VersionDetail_CanChangeDate").is(":checked");

				if(stageClass == 1){    //父阶段
					isDateSameWithParent = (!(stageDl.find(".VersionDetail_IsDateSameWithParent").is(":checked")));

					beginDate = stageDl.find(".VersionDetail_BeginDate").val();
					isCalBeginDate = stageDl.find(".dropdown-text-BeginDate").attr("data-IsCalDate") === "true";

					endDate = isDateSameWithParent ? stageDl.find(".VersionDetail_EndDate").val() : 1;
					isCalEndDate =
						isDateSameWithParent
							?(stageDl.find(".dropdown-text-EndDate").attr("data-IsCalDate") === "true")
							: false;
				}
				else{
					// 父阶段的IsDateSameWithParent 值 赋予当前子阶段
					isDateSameWithParent = _isDateSameWithParent;

					//当子阶段有时间限制，开始结束时间均从表单获取，否则默认为当前时间
					beginDate = !isDateSameWithParent ? stageDl.find(".VersionDetail_BeginDate").val() : 0;
					isCalBeginDate =
						!isDateSameWithParent
							? stageDl.find(".dropdown-text-BeginDate").attr("data-IsCalDate") === "true"
							: false;

					endDate = !isDateSameWithParent ? stageDl.find(".VersionDetail_EndDate").val() : 1;
					isCalEndDate =
						!isDateSameWithParent
							?(stageDl.find(".dropdown-text-EndDate").attr("data-IsCalDate") === "true")
							: false;
				}

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
				if(this.validateForm()){
					var submitCollection = this.SetParentVersionDetails();

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
								ClientManage.vent.trigger("VersionDetailEditSuccess");
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
	});
	return ClientManage.Setting.ApplyStageVersion.VersionDetailEdit.View;
})

