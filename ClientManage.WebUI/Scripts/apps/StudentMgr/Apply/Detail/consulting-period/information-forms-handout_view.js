/***************************************
 * Created by samhwang1990@gmail.com on 14-8-22.
 * StudentMgr/Apply/Detail/Consulting-Period/information-forms-handout view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/Detail/consulting-period/informationFormsHandout.html'],
	function(ClientManage,InformationFormsHandoutTpl){
	var detailView = Marionette.ItemView.extend({
		template: _.template(InformationFormsHandoutTpl),
		tagName:"section",
		className:"card-stage-content",
		ui:{
			"EditForm":"#editForm",
			"CurrentOptionSel":"#CurrentOption",
			"RemarkText":"#Remark"
		},
		initialize:function(){
		},
		/*
		* 该函数由外部Region 的Layout 来触发
		* */
		formSubmit:function(){
			var postUrl = this.ui.EditForm.attr("action");
			var currentOption = this.ui.CurrentOptionSel.val();
			var remark = this.ui.RemarkText.val();
			this.model.set("CurrentOption",currentOption);
			this.model.set("Remark",remark);
			var ajaxData = JSON.stringify(this.model);

			$.ajax({
				type:'POST',
				url:postUrl,
				data:ajaxData,
				dataType:'json',
				contentType: 'application/json; charset=utf-8',
				success:function(data){
					if(data.SaveResult == true){
						alert("informationFormsHandout submit successfully")
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

