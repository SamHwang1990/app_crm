/***************************************
 * Created by samhwang1990@gmail.com on 14-8-20.
 * StudentMgr/Apply/Syllabus View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/StageSyllabus.html',
	'assets/TransformDateString',
],function(ClientManage,StageSyllabusTpl,TransformDateString){
	ClientManage.module('StudentMgr.Apply.Stages.Syllabus.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.StageSyllabusView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			templateHelpers:function(){
				var transformDateString = new TransformDateString();
				this.model.get("ParentStage").BeginDate = transformDateString.TransMsStringToDate(this.model.get("ParentStage").BeginDate);
				this.model.get("ParentStage").EndDate = transformDateString.TransMsStringToDate(this.model.get("ParentStage").EndDate);

				_.each(this.model.get("ChildStages"),function(ChildStageItem){
					ChildStageItem.BeginDate = transformDateString.TransMsStringToDate(ChildStageItem.BeginDate);
					ChildStageItem.EndDate = transformDateString.TransMsStringToDate(ChildStageItem.EndDate);
				})
				return {
					StudentID:this.StudentID
				}
			},
			template:_.template(StageSyllabusTpl),
			initialize:function(options){
				if(options != null){
					this.StudentID = options.StudentID;
				}
			},
			onRender:function(){
				//切换#appContent的float为none，.wrap的margin设为0
				$("#appContent").addClass("app-apply-Wrap");
			},
			onClose:function(){
				//恢复#appContent的float为left，恢复.wrap的margin
				$("#appContent").removeClass("app-apply-Wrap");
			}
		});
	});
	return ClientManage.StudentMgr.Apply.Stages.Syllabus.View;
})
