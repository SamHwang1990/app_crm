/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentMgr/StudentApplyStageWrapModel
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentApplyStageModel',
	'collections/StudentMgr/StudentApplyStageCollection'
],function($,_,Backbone,StudentApplyStageModel,StudentApplyStageCollection){
		var stageWrapModel = Backbone.Model.extend({
			defaults:{
				ParentStage:new StudentApplyStageModel,
				ChildStages:new StudentApplyStageCollection
			},
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return stageWrapModel;
	}
);

