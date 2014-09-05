/***************************************
 * Created by samhwang1990@gmail.com on 14-8-22.
 * StudentMgr/Apply/Detail/Consulting-Period/information-forms-handout view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/Detail/consulting-period/informationFormsHandout.html',
	'assets/RenderDateTimePicker',
	'assets/TransformDateString',
	'assets/ApplyStageSubmitHandler'],
	function(ClientManage,InformationFormsHandoutTpl,RenderDateTimePicker,TransformDateString,ApplyStageSubmitHandler){
	var detailView = Marionette.ItemView.extend({
		template: _.template(InformationFormsHandoutTpl),
		tagName:"section",
		className:"card-stage-content",
		templateHelpers:function(){
		},
		ui:{
			"EditForm":"#editForm",
			"CurrentOptionSel":"#CurrentOption",
			"RemarkText":"#Remark",
			"EndDateInput":".timeRelated_EndDate .ApplyStage_EndDate",
			"EndDateRefresh":".timeRelated_EndDate .icon-refresh"
		},
		events:{
			"click @ui.EndDateRefresh":"ClickEndDateRefresh"
		},
		initialize:function(){
		},
		onRender:function(){
			var renderDateTimePicker = new RenderDateTimePicker();
			renderDateTimePicker.RenderDate(this.$el.find('.timeRelated .timePicker'));

			this.ui.CurrentOptionSel.find("option[value='" + this.model.get("CurrentOption") + "']").attr("selected","selected");
		},
		ClickEndDateRefresh:function(e){
			e.preventDefault();
			this.ui.EndDateInput.val(this.model.get("EndDate"));
			return false;
		},
		/*
		* 该函数由外部Region 的Layout 来触发
		* */
		formSubmit:function(){
			var postUrl = this.ui.EditForm.attr("action");
			var currentOption = this.ui.CurrentOptionSel.val();
			var endDate = this.ui.EndDateInput.val();
			var remark = this.ui.RemarkText.val();
			this.model.set("CurrentOption",currentOption);
			this.model.set("Remark",remark);
			this.model.set("EndDate",endDate);
			var ajaxData = JSON.stringify(this.model);

			$.ajax({
				type:'POST',
				url:postUrl,
				data:ajaxData,
				dataType:'json',
				contentType: 'application/json; charset=utf-8',
				success:function(data){
					if(data.SaveResult == true){
						var submitHandler = new ApplyStageSubmitHandler(ClientManage);
						submitHandler.DoHandler(data);
						//alert("informationFormsHandout submit successfully")
						//ClientManage.navigate("UserMgr/List",{trigger:true});
					}else{
						alert('Post Failed');
					}
				},
				error:function(data){
					alert('提交数据失败');
				}
			})
		}
	});
	return detailView;
});

