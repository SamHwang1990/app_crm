/***************************************
 * Created by samhwang1990@gmail.com on 14-8-21.
 * StudentMgr/Apply/Detail View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/StageDetail.html',
	'models/StudentMgr/StudentApplyStageModel',
	'assets/TransformDateString'
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
				this.transformDateString = transformDateString;
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
			events:{
				"click @ui.StageDot":"ClickJSDot",
				"click @ui.StageSubmit":"ClickStageSubmit"
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

				/*
				* 视图初始化完后，执行以下三个函数，达成以下目的：
				* 1. 更改当前js-dot 的样式
				* 2. 更改当前的Stage-Content display属性
				* 3. 渲染当前的Stage-Detail View
				* */
				this.switchCurrentDot(this.CurrentChildNameEn);
				this.switchViewDisplay(this.CurrentChildNameEn);
				this.renderChildView(this.CurrentChildNameEn,false);

				/*
				* 绑定几个事件，detail submit后会触发
				* */
				ClientManage.vent.on("StageNoComplete",this.StageNoComplete,this);
				ClientManage.vent.on("ApplyCompleted",this.ApplyCompleted,this);
				ClientManage.vent.on("NextParentStage",this.NextParentStage,this);
				ClientManage.vent.on("NextChildStage",this.NextChildStage,this);

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
				_.each(this.model.get("ChildStages"),function(childItem){
					var slug = childItem.StageNameEn;
					detailView.addRegion(slug,".js-card[slug=" + slug + "]");
				})
			},
			/*
			* 根据传入的子阶段英文名，显示对应的Stage Content View
			* @param childNameEn
			* */
			switchViewDisplay:function(childNameEn){
				this.ui.StageContentCard.attr("state",'');
				this.ui.StageContentCard.filter("[slug=" + childNameEn + "]").attr("state",'current');
			},
			switchCurrentDot:function(childNameEn){
				this.ui.StageDot
					.filter('[data-state~="current"]')
					.attr("data-state",function(){
						return $(this).attr("data-state").replace('current','').trim();
					});
				this.ui.StageDot
					.filter("[data-slug=" + childNameEn + "]")
					.attr("data-state",function(){
						return $(this).attr("data-state") + " " + 'current';
					});
			},
			/*
			* 根据子阶段名称、是否需要检查阶段数据来渲染子阶段视图
			* @param childNameEn
			* @param checkModel
			* */
			renderChildView:function(childNameEn,IsCheckModel){
				//另存为this
				var detailView = this;

				//指定的Region
				var targetRegion = detailView[childNameEn];

				//View 代码文件的路径
				var viewPath = 'apps/StudentMgr/Apply/Detail/' + this.ParentNameEn + '/' + childNameEn + '_view';

				var currentChildModel, newChildModel;

				/*
				* 通过下面的方法find 到的子阶段数据的类型是Object
				* 需要转为Backbone.Model 类型
				* */
				var currentChildObject = _.find(this.model.get("ChildStages"),function(childItem){
					return childItem.StageNameEn == childNameEn;
				});
				currentChildModel = new StudentApplyStageModel(currentChildObject);

				/*
				* 加载视图代码，并渲染到指定Region 中
				* */
				var doRender = function(childModel){
					require([viewPath],function(childView){
						targetRegion.close();
						targetRegion.show(
							new childView({
								model:childModel
							})
						);
					})
				}

				/*
				* 检查指定Region 是否有View，有，则DoNothing；无，则根据阶段数据执行渲染函数
				* */
				var renderOrDoNothing = function(stageModel){
					if(targetRegion.currentView == undefined || targetRegion.currentView == undefined)
						return doRender(stageModel);
					else
						return;
				}

				/*
				* 如果需要检查阶段数据是否有更新
				* 如果不需要检查，则判断当前Region 是否有View，有则跳过，没有，则按照现有的阶段数据渲染View
				* 如果需要检查，就做下面的事哈！
				* */
				if(IsCheckModel){
					/*
					* 从数据库中获取最新的阶段数据
					* */
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
								/*
								* 如果新的阶段数据没有变化，则判断当前Region 是否有View，有则跳过，没有，则渲染View
								* 如果阶段数据有变化，则将新的数据同步到旧数据中，并重新渲染View
								* */
								if(_.isEqual(currentChildModel, newChildModel)){
									return renderOrDoNothing(currentChildModel);
								}else{
									for(var prop in newChildModel.attributes){
										currentChildModel.set(prop,newChildModel.get(prop));
									}
									currentChildModel.set("BeginDate", detailView.transformDateString.TransMsStringToDate(detailView.model.get("BeginDate")));
									currentChildModel.set("EndDate", detailView.transformDateString.TransMsStringToDate(detailView.model.get("EndDate")));
									return doRender(currentChildModel);
								}
							}
						},
						error:function(){
							alert("获取数据失败");
						}
					})
				}else{
					return renderOrDoNothing(currentChildModel);
				}

			},

			/* region Events Handler */
			ClickJSDot:function(event){
				var currentDot = $(event.currentTarget);
				var isDotActive = currentDot.is('[data-state~="active"]');
				var isDotCurrent = currentDot.is('[data-state~="current"]');
				if(isDotActive && !isDotCurrent){
					var childNameEn = currentDot.attr("data-slug");
					this.CurrentChildNameEn = childNameEn;
					this.switchCurrentDot(childNameEn);
					this.switchViewDisplay(childNameEn);
					this.renderChildView(childNameEn,true);
				}
				else
					return false;
			},
			ClickStageSubmit:function(e){
				/*
				* 根据当前子阶段英文名，查找对应的Region，并返回Region 的View
				* 并调用View 的formSubmit 方法
				* */

				this.ui.StageActionBar.removeClass("isShown");
				var submitView = this[this.CurrentChildNameEn].currentView;
				submitView.formSubmit();
			},

			StageNoComplete:function(){
				this.ui.StageActionBar.filter(".stage-action-bar_ing").addClass("isShown");
			},
			ApplyCompleted:function(){
				ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
			},
			NextParentStage:function(options){
				ClientManage.navigate("StudentMgr/Apply/Stages/" +
					options.ParentNameEn +
					"/resume/" + this.StudentID,{trigger:true});
			},
			NextChildStage:function(options){
				this.ui.StageDot.find('[data-slug="' + options.StageNameEn + '"]').trigger("click");
			}
			/* endregion */

		});
	});
	return ClientManage.StudentMgr.Apply.Stages.Detail.View;
})
