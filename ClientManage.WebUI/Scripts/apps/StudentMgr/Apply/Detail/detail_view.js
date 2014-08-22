/***************************************
 * Created by samhwang1990@gmail.com on 14-8-21.
 * StudentMgr/Apply/Detail View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/StageDetail.html',
	'models/StudentMgr/StudentApplyStageModel',
	'assets/TransformDateString',
],function(ClientManage,StageDetailTpl,StudentApplyStageModel,TransformDateString){
	ClientManage.module('StudentMgr.Apply.Stages.Detail.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.StageDetailView = Marionette.Layout.extend({
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
			template:_.template(StageDetailTpl),
			ui:{
				"StageContentCard":".js-card",
				"StageDot":".js-dot",
				"StageSubmit":".card-nav-next",
				"StagePrev":".card-nav-prev",
				"StageActionBar":".stage-action-bar"
			},
			regions:{
			},
			initialize:function(options){
				if(options != null){
					this.StudentID = options.StudentID;
					this.CurrentChildNameEn = options.CurrentChildNameEn;
				}
				this.ParentNameEn = this.model.get("ParentStage").StageNameEn;
			},
			onRender:function(){
				//切换#appContent的float为none，.wrap的margin设为0
				$("#appContent").addClass("app-apply-Wrap");
				$("body").addClass("app-apply-Body");

				this.initRegions();
				this.renderChildView(this.CurrentChildNameEn,true);
			},
			onClose:function(){
				//恢复#appContent的float为left，恢复.wrap的margin
				$("#appContent").removeClass("app-apply-Wrap");
				$("body").removeClass("app-apply-Body");
			},
			/*
			* 根据 $el 中的".js-card" 元素来初始化region
			* */
			initRegions:function(){
				var detailView = this;
				this.ui.StageContentCard.each(function(index){
					var slug = $(this).attr("slug");
					detailView.addRegion(slug,".js-card[slug=" + slug + "]");
				})
			},
			renderChildView:function(childNameEn,IsInitRender,checkModel){
				var detailView = this;
				var viewPath = 'apps/StudentMgr/Apply/Detail/' + this.ParentNameEn + '/' + childNameEn + '_view';
				var viewModel, currentChildModel, newChildModel;
				var currentChildObject = _.find(this.model.get("ChildStages"),function(childItem){
					return childItem.StageNameEn == childNameEn;
				});
				currentChildModel = new StudentApplyStageModel(currentChildObject);

				var doRender = function(childModel){
					require([viewPath],function(childView){
						var targetRegion = detailView[childNameEn];
						var targetChildView = new childView({
							model:childModel
						})
						targetRegion.show(targetChildView)
					})
				}
				if(IsInitRender){
					doRender(currentChildModel);
				}else{
					if(checkModel){
						newChildModel = new StudentApplyStageModel({
							url:"/StudentMgr/Apply/Detail_StageItem"
						});
						newChildModel.fetch({
							data:{
								studentID:detailView.StudentID,
								stageNameEn:childNameEn
							},
							success:function(data){
								if(data.GetResult !== undefined && data.GetResult === false){
									return alert(data.Msg);
								}
								else{
									if(_.isEqual(currentChildModel, newChildModel)){
										if(detailView[childNameEn].hasView())
											return;
										else{
											for(var prop in newChildModel.attributes){
												currentChildModel.set(prop,newChildModel.get(prop));
											}
											doRender(currentChildModel);
										}
									}
								}
							},
							error:function(){
								alert("获取数据失败");
							}
						})
					}
				}
			}
		});
	});
	return ClientManage.StudentMgr.Apply.Stages.Detail.View;
})
