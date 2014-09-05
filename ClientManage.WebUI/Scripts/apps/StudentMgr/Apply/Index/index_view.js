/***************************************
 * Created by samhwang1990@gmail.com on 14-8-18.
 * StudentMgrApplyIndex View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/index.html',
	'text!templates/StudentMgr/Apply/indexItem.html',
	'assets/TransformDateString',
],function(ClientManage,ApplyIndexTpl,ApplyIndexItemTpl,TransformDateString){
	ClientManage.module('StudentMgr.Apply.Index.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.ApplyIndexItemView = Marionette.ItemView.extend({
			tagName:"article",
			className:"app-apply-syllabus-topic",
			template:_.template(ApplyIndexItemTpl),
			templateHelpers:function(){
				var transformDateString = new TransformDateString();
				this.model.get("ParentStage").BeginDate = transformDateString.TransMsStringToDate(this.model.get("ParentStage").BeginDate);
				this.model.get("ParentStage").EndDate = transformDateString.TransMsStringToDate(this.model.get("ParentStage").EndDate);

				_.each(this.model.get("ChildStages"),function(ChildStageItem){
					ChildStageItem.BeginDate = transformDateString.TransMsStringToDate(ChildStageItem.BeginDate);
					ChildStageItem.EndDate = transformDateString.TransMsStringToDate(ChildStageItem.EndDate);
				})
			},
			initialize:function(options){
			},
			onRender:function(){
				if(this.model.get("ParentStage").Percentage > 0)
					this.$el.attr("data-state-topic","active");
			}
		})

		View.ApplyIndexView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			itemView:View.ApplyIndexItemView,
			itemViewContainer:"section.app-apply-syllabus-topics",
			itemViewOptions:function(model,index){
				return{
					CurrentParentNo:this.CurrentParent.get("ParentStage").StageNo
				}
			},
			templateHelpers:function(){
				return {
					StudentID:this.StudentID,
					InProgressParents:this.InProgressParent,
					CompletedParents:this.CompletedParent,
					CurrentParent:this.CurrentParent.get("ParentStage")
				}
			},
			ui:{
				"SyllabusTab":"#tab-body .tab"
			},
			events:{
				"click @ui.SyllabusTab":"ClickSyllabusTab"
			},
			template:_.template(ApplyIndexTpl),
			initialize:function(options){
				if(options != null){
					this.StudentID = options.StudentID;
				}
				this.InProgressParent = _.filter(this.collection.models,function(wrapItem){
					return wrapItem.get("ParentStage").Percentage > 0 && wrapItem.get("ParentStage").Percentage < 100;
				});
				this.CompletedParent = _.filter(this.collection.models,function(wrapItem){
					return wrapItem.get("ParentStage").Percentage == 100;
				});
				this.CurrentParent = _.max(this.InProgressParent,function(inProgressItem){
					return inProgressItem.get("ParentStage").StageNo;
				});
			},
			onRender:function(){
				//切换#appContent的float为none，.wrap的margin设为0
				$("#appContent").addClass("app-apply-Wrap");
			},
			onClose:function(){
				//恢复#appContent的float为left，恢复.wrap的margin
				$("#appContent").removeClass("app-apply-Wrap");
			},
			ClickSyllabusTab:function(e){
				e.preventDefault();
				var tab = e.target;
				var dataType = $(tab).attr("data-type");
				var dataState = $(tab).attr("data-state");
				if(dataState == "active")
					return ;
				else{
					$(tab).siblings().attr("data-state","inactive");
					$(tab).attr("data-state","active");
					var tabBodyClass = dataType + "-body";
					$(".tab-body").each(function(index){
						if($(this).hasClass(tabBodyClass)){
							$(this).attr("data-state-body","active");
						}else{
							$(this).attr("data-state-body","inactive");
						}
					})

				}
			}
		});
	});
	return ClientManage.StudentMgr.Apply.Index.View;
})


