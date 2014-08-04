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
			"timePickerEndDate":".timeRelated_EndDate .timePicker .ApplyStage_EndDate",
			"timePickerWrap":".timePicker"
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
		initialize:function(){
			var renderDateTimePicker = new RenderDateTimePicker();
			this.renderDateTimePicker = renderDateTimePicker;
		},
		onRender:function(){
			//渲染视图后手动触发“btnForbidSwitch”的切换事件
			this.ui.btnForbidSwitch.trigger("switchChange.bootstrapSwitch");

			//给根元素el 添加“date-StageNo”特性
			this.$el.attr("date-Parent-StageNo", this.model.get("ParentStage").StageNo);
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
			event.preventDefault();
			//事件Target 的div.timelineMinor 祖先元素
			var currentMinor = $(event.currentTarget).parents(".timelineMinor");
			//当前阶段的Class
			var stageClass = currentMinor.attr("data-StageClass");
			//当前阶段的编号
			var stageNo = currentMinor.attr("data-StageNo");
			//新的开始日期
			var newBeginDateString = $(event.currentTarget).val();
			//当前阶段的结束日期
			var currentEndString = currentMinor.find(".ApplyStage_EndDate").val();
			//前一个阶段或父阶段的div.timelineMinor 元素
			var prevMajor = this.$el.prev();
			//验证结果、旧的开始日期、prevMajor 的结束日期、父阶段的开始日期、model中当前阶段实体
			var validResult,oldBeginDateString,prevEndString, parentBeginString, currentStage;

			/*
			* 如果阶段层级为1，则当前阶段的model等于view.model的ParentStage
			* 否则，从view.model中ChildStages中找与StageNo一样的阶段model
			* */
			if(stageClass == "1")
				currentStage = this.model.get("ParentStage");
			else
				currentStage = _.find(this.model.get("ChildStages"), function(ChildStage){ return ChildStage.StageNo == stageNo; })

			oldBeginDateString = currentStage.BeginDate;

			/* 验证新设置的开始日期是否合法 */
			if(stageClass == "1"){
				prevEndString = prevMajor.find(".timelineMinor").eq(0).find(".ApplyStage_EndDate").val();

				/*
				* 如果新设置的日期 小于 前一阶段的结束日期，验证结果为false
				* 如果新设置的日期 大于 同阶段的结束日期，验证结果为false
				* */
				if(!this.ValidateDateChange(newBeginDateString,prevEndString,'新设置的开始日期不能早于上一阶段的结束日期',
					$(event.currentTarget), oldBeginDateString) ||
					!this.ValidateDateChange(currentEndString,newBeginDateString, '新设置的开始日期不能晚于同阶段的结束日期',
						$(event.currentTarget), oldBeginDateString)){
					validResult = false;
				}else
					validResult = true;

			}else{
				parentBeginString = currentMinor.prevAll().eq(0).find(".ApplyStage_BeginDate").val();
				prevEndString = currentMinor.prev().find(".ApplyStage_EndDate").val();

				/*
				* 如果新设置的日期 小于 前一阶段的结束日期，验证结果为false
				* 如果新设置的日期 大于 同阶段的结束日期，验证结果为false
				* */
				if(!this.ValidateDateChange(newBeginDateString,((prevEndString >= currentEndString)?parentBeginString:prevEndString),
					'新设置的开始日期不能早于父阶段开始日期 或 上一阶段的结束日期',$(event.currentTarget), oldBeginDateString) ||
					!this.ValidateDateChange(currentEndString, newBeginDateString, '新设置的开始日期不能晚于同阶段的结束日期',
						$(event.currentTarget), oldBeginDateString)){
					validResult = false;
				}else{
					validResult = true;
				}
			}

			if(validResult)
				currentStage.BeginDate = newBeginDateString;
			else{
				$(event.currentTarget).val(oldBeginDateString);
			}

			return false;
		},
		EndDateChange:function(event){
			event.preventDefault();

			var currentInput = $(event.currentTarget);

			//事件Target 的div.timelineMinor 祖先元素
			var currentMinor = currentInput.parents(".timelineMinor").eq(0);

			//当前阶段的Class
			var stageClass = currentMinor.attr("data-StageClass");

			//当前阶段的编号
			var stageNo = currentMinor.attr("data-StageNo");

			//前一个阶段或父阶段的div.timelineMinor 元素
			var nextMajor = this.$el.next();

			var newEndDateString = currentInput.val();

			var currentBeginString = currentMinor.find(".ApplyStage_BeginDate").val()

			//验证结果、旧的结束日期、nextMajor 的结束日期、父阶段的结束日期、model中当前阶段实体
			var validResult,oldEndDateString,nextBeginString, parentEndString, currentStage, isLastChild;

			if(stageClass == '1')
				currentStage = this.model.get('ParentStage');
			else
				currentStage = _.find(this.model.get("ChildStages"), function(ChildStage){ return ChildStage.StageNo == stageNo; });

			oldEndDateString = currentStage.EndDate;

			if(stageClass == '1'){
				if(nextMajor == undefined)
					isLastChild = true;
				else
					isLastChild = false;

				if(isLastChild){
					if(!this.ValidateDateChange(newEndDateString,currentBeginString,
						'新设置的结束日期不能早于同阶段的开始日期',currentInput,oldEndDateString))
						validResult = false;
					else
						validResult = true;
				}else{
					nextBeginString = nextMajor.find(".timelineMinor").eq(0).find(".ApplyStage_BeginDate").val();
					if(!this.ValidateDateChange(newEndDateString,currentBeginString,
						'新设置的结束日期不能早于同阶段的开始日期',currentInput,oldEndDateString) ||
						!this.ValidateDateChange(nextBeginString,newEndDateString,'新设置的结束日期不能晚于下一阶段的开始日期',
						currentInput,oldEndDateString))
						validResult = false;
					else
						validResult = true;
				}
			}else{
				if(currentMinor.next().length == 0)
					isLastChild = true;
				else
					isLastChild = false;

				var parentStageMinor = this.$el.find(".timelineMinor").eq(0);

				if(isLastChild){
					if(nextMajor == undefined){
						if(!this.ValidateDateChange(newEndDateString,currentBeginString,'新设置的结束日期不能早于同阶段的开始日期',
						currentInput,oldEndDateString))
							validResult = false;
						else{
							validResult = true;
							parentStageMinor.find(".ApplyStage_EndDate").val(newEndDateString);
						}
					}else{
						nextBeginString = nextMajor.find(".timelineMinor").eq(0).find(".ApplyStage_BeginDate").val();
						if(!this.ValidateDateChange(nextBeginString,newEndDateString,
							'新设置的结束日期不能晚于下一阶段的开始日期',currentInput,oldEndDateString) ||
							!this.ValidateDateChange(newEndDateString,currentBeginString,'新设置的结束日期不能早于同阶段的开始日期',
								currentInput,oldEndDateString))
							validResult = false;
						else{
							validResult = true;
							parentStageMinor.find(".ApplyStage_EndDate").val(newEndDateString);
						}
					}
				}else{
					nextBeginString = currentMinor.next().find(".ApplyStage_BeginDate").val();
					if(!this.ValidateDateChange(nextBeginString,newEndDateString,
						'新设置的结束日期不能晚于下一阶段的开始日期',currentInput,oldEndDateString) ||
						!this.ValidateDateChange(newEndDateString,currentBeginString,'新设置的结束日期不能早于同阶段的开始日期',
							currentInput,oldEndDateString))
						validResult = false;
					else
						validResult = true;
				}

			}

			if(validResult)
				currentStage.EndDate = newEndDateString;
			else{
				$(event.currentTarget).val(oldEndDateString);
			}
		},
		/*
		* @param bigDateString:默认为更大日期的字符串
		* @param smallDateString:默认为更小日期的字符串
		* @param errMsg:验证结果为不合法时使用的错误信息
		* @param timePickerInput:日期输入框的jQuery对象
		* @param oldDate:旧的日期
		* */
		ValidateDateChange:function(bigDateString, smallDateString, errMsg, timePickerInput, oldDate){
			var bigDate = new Date(bigDateString);
			var smallDate = new Date(smallDateString);
			if( bigDate < smallDate ){
				bootbox.dialog(errMsg, {
					"label" : "好吧！",
					"class" : "danger",   // or primary, or danger, or nothing at all
					"callback": function() {
						timePickerInput.val(oldDate);
					}
				});
				return false;
			}else
				return true;
		}
	})

	return scheduleItemView;
})
