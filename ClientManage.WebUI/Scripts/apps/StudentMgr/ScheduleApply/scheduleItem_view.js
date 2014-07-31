/***************************************
 * Created by samhwang1990@gmail.com on 14-7-29.
 * StudentMgr/ScheduleApply/ScheduleItem View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/ScheduleApply/ScheduleItem.html',
	'text!templates/StudentMgr/ScheduleApply/ScheduleFieldSet.html',
	'assets/RenderDateTimePicker',
	'assets/TransformDateString',
	'Bootbox'
	],function(ClientManage,ScheduleItemTpl,ScheduleFieldSetTpl,RenderDateTimePicker,TransformDateString,Bootbox){
	var scheduleItemView = Marionette.ItemView.extend({
		template:_.template(ScheduleItemTpl),
		tagName:"div",
		className:"timelineMajor",
		ui:{
			"btnForbidSwitch":".forbidSwitch",          //“是否可用”切换按钮
			"timePickerBeginDate":".timeRelated_BeginDate .timePicker .ApplyStage_BeginDate",
			"timePickerEndDate":".timeRelated_EndDate .timePicker .ApplyStage_EndDate"
		},
		events:{
			"switchChange.bootstrapSwitch @ui.btnForbidSwitch":"ForbidSwitchChange",
			"change @ui.timePickerBeginDate":"BeginDateChange",
			"change @ui.timePickerEndDate":"EndDateChange"
		},
		templateHelpers:function(){
			var transformDateString = new TransformDateString();
			this.model.get("ParentStage").BeginDate = transformDateString.TransMsStringToDate(this.model.get("ParentStage").BeginDate);
			this.model.get("ParentStage").EndDate = transformDateString.TransMsStringToDate(this.model.get("ParentStage").EndDate);

			_.each(this.model.get("ChildStages"),function(ChildStageItem){
				ChildStageItem.BeginDate = transformDateString.TransMsStringToDate(ChildStageItem.BeginDate);
				ChildStageItem.EndDate = transformDateString.TransMsStringToDate(ChildStageItem.EndDate);
			})

			return{
				//另传一个通用模板给视图模板
				FieldsetTpl:ScheduleFieldSetTpl
			}
		},
		onRender:function(){
			//渲染视图后手动触发“btnForbidSwitch”的切换事件
			this.ui.btnForbidSwitch.trigger("switchChange.bootstrapSwitch");

			//给根元素el 添加“date-StageNo”特性
			this.$el.attr("date-Parent-StageNo", this.model.get("ParentStage").StageNo);

			var renderDateTimePicker = new RenderDateTimePicker();
			renderDateTimePicker.RenderDate(this.$el.find('.timeRelated:not(.display) .timePicker'));
		},
		ForbidSwitchChange:function(event){
			//获取checkbox 是否选中
			var data = $(event.currentTarget).is(":checked");

			//获取祖先元素“dl.timelineMinor”
			var parentTimelineMinor = $(event.currentTarget).parents(".timelineMinor");

			//获取祖先元素的阶段级别
			var stageClass = parentTimelineMinor.attr("data-StageClass");

			//获取同个“dd”元素中的可配置fields，这些表单元素仅在当前阶段可用的时候才显示
			var unForbidFields = $(event.currentTarget).parents(".control-group").siblings(".unForbidFields");

			if(data){
				//如果阶段可用，则可配置fields 显示出来
				unForbidFields.show();
			}else{
				//否则，可配置fields 元素要隐藏
				unForbidFields.hide();
			}
			if(stageClass == "1"){
				if(data){
					//如果当前阶段可用，同时这个阶段是个父级阶段，则显示其子阶段
					parentTimelineMinor.siblings(".timelineMinor").show();
				}else{
					//否则，如果当前阶段不可用，同时这个阶段是个父级阶段，则隐藏其子阶段
					parentTimelineMinor.siblings(".timelineMinor").hide();
				}
			}
		},
		BeginDateChange:function(event){
			var currentMinor = $(event.currentTarget).parents(".timelineMinor");
			var stageClass = currentMinor.attr("data-StageClass");
			var stageNo = currentMinor.attr("data-StageNo");
			var newBeginDateString = $(event.currentTarget).val();
			var currentEndString = currentMinor.find(".ApplyStage_EndDate").val();
			var prevMajor = this.$el.prev();
			var validResult,oldBeginDateString,prevEndString, parentBeginString, currentStage;

			if(stageClass == "1")
				currentStage = this.model.get("ParentStage");
			else
				currentStage = _.find(this.model.get("ChildStages"), function(ChildStage){ return ChildStage.StageNo == stageNo; })

			oldBeginDateString = currentStage.BeginDate;

			if(stageClass == "1"){
				prevEndString = prevMajor.find(".timelineMinor").eq(0).find(".ApplyStage_EndDate").val();

				if(this.ValidateDateChange(newBeginDateString,prevEndString,'新设置的开始日期不能早于上一阶段的结束日期') &&
					this.ValidateDateChange(currentEndString,newBeginDateString, '新设置的开始日期不能晚于同阶段的结束日期')){
					validResult = true;
				}else
					validResult = false;

			}else{
				parentBeginString = currentMinor.prevAll().eq(0).find(".ApplyStage_BeginDate").val();
				prevEndString = currentMinor.prev().find(".ApplyStage_EndDate").val();

				if(this.ValidateDateChange(newBeginDateString,((prevEndString == parentBeginString)?parentBeginString:prevEndString)),
					'新设置的开始日期不能早于父阶段开始日期 或 上一阶段的结束日期' &&
					this.ValidateDateChange(currentEndString, newBeginDateString, '新设置的开始日期不能晚于同阶段的结束日期')){
					validResult = true;
				}else{
					validResult = false;
				}
			}

			if(validResult)
				currentStage.BeginDate = newBeginDateString;
			else
				$(event.currentTarget).val(oldBeginDateString);

		},
		EndDateChange:function(event){
			//alert("EndDateChange");
		},
		ValidateDateChange:function(bigDateString, smallDateString, errMsg){
			if(new Date(bigDateString) < new Date(smallDateString)){
				bootbox.dialog(errMsg, {
					"label" : "好吧！",
					"class" : "danger",   // or primary, or danger, or nothing at all
					"callback": function() {
						//this.modal('hide');
					}
				});
				return false;
			}else
				return true;
		}
	})

	return scheduleItemView;
})
