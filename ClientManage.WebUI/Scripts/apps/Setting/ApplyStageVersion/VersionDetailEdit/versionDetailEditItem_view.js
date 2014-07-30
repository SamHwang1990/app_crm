/***************************************
 * Created by samhwang1990@gmail.com on 14-7-23.
 ***************************************/

define([
	'text!templates/Setting/ApplyStagesMgr/VersionDetailEditItem.html',
	'text!templates/Setting/ApplyStagesMgr/VersionDetailEditFieldset.html'
	],function(DetailEditItemTpl,
               VersionDetailEditFieldSetTpl){
	var versionDetailEditItemView = Marionette.ItemView.extend({
		template:_.template(DetailEditItemTpl),
		//封装视图的元素，后用“根元素”代称
		tagName:"div",
		//根元素的类
		className:"timelineMajor",
		ui:{
			"btnForbidSwitch":".forbidSwitch",          //“是否可用”切换按钮
			"btnTimeLimitSwitch":".timeLimitSwitch",    //“是否有时间限制”切换按钮
			"btnSwitch":".switch",                      //通用切换按钮
			"ulIsCalDateMenu":".IsCalDateMenu"          //“日期是否要计算”的下拉菜单
		},
		events:{
			"switchChange.bootstrapSwitch @ui.btnForbidSwitch":"ForbidSwitchChange",
			"switchChange.bootstrapSwitch @ui.btnTimeLimitSwitch":"TimeSwitchChange",
			"switchChange.bootstrapSwitch @ui.btnSwitch":"SwitchChange",
			//用以相应阶段开始结束日期类型的下拉菜单点击事件
			"click @ui.ulIsCalDateMenu li a":"IsCalDateChange"
		},
		templateHelpers:function(){
			return{
				//另传一个通用模板给视图模板
				FieldsetTpl:VersionDetailEditFieldSetTpl
			}
		},
		onRender:function(){
			//渲染视图后手动触发“btnForbidSwitch”的切换事件
			this.ui.btnForbidSwitch.trigger("switchChange.bootstrapSwitch");

			//渲染视图后手动触发“btnTimeLimitSwitch”的切换事件
			this.ui.btnTimeLimitSwitch.trigger("switchChange.bootstrapSwitch");

			//给根元素el 添加“date-StageNo”特性
			this.$el.attr("date-Parent-StageNo", this.model.get("ParentVersionDetail").StageNo)
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
					parentTimelineMinor.siblings(".timelineMinor").each(function(i){
						$(this).find(".forbidSwitch").bootstrapSwitch('state', true, false);
						$(this).show();
					})
					//如果当前阶段可用，同时这个阶段是个父级阶段，则显示其子阶段
					//parentTimelineMinor.siblings(".timelineMinor").show();
				}else{
					parentTimelineMinor.siblings(".timelineMinor").each(function(i){
						$(this).find(".forbidSwitch").bootstrapSwitch('state', false, false);
						$(this).hide();
					})
					//否则，如果当前阶段不可用，同时这个阶段是个父级阶段，则隐藏其子阶段
					//parentTimelineMinor.siblings(".timelineMinor").hide();
				}
			}
		},
		TimeSwitchChange:function(event){
			//获取checkbox 是否选中，选中表示该阶段有时间限制
			var data = $(event.currentTarget).is(":checked");
			//获得与阶段开始结束时间配置相关的字段，比如：BeginDate、EndDate
			var timeRelatedFields = $(event.currentTarget).parents(".control-group").siblings(".timeRelated");
			if(data){
				//如果该阶段有时间限制，则显示相关的配置字段
				timeRelatedFields.show();
			}else{
				//否则，隐藏相关配置字段
				timeRelatedFields.hide();
			}
		},
		SwitchChange:function(event,data){

		},
		IsCalDateChange:function(event){
			var isCalDate = $(event.currentTarget).attr("data-IsCalDate");
			var calDateUnit = isCalDate == "true"?'天':'月';
			//获取所选下拉菜单的文本
			var calDateText = $(event.currentTarget).text();
			var controlGroup = $(event.currentTarget).parents(".control-group")
			//将文本复制给“.dropdown-text” span元素中
			controlGroup.find(".dropdown-text").html(calDateText).attr("data-IsCalDate",isCalDate);
			//修改日期的单位
			controlGroup.find(".add-on").html(calDateUnit);
		}
	});
	return versionDetailEditItemView;
})