/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStagesMgr/ApplyStageWrapModel
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/Setting/ApplyStagesMgr/ApplyStagesModel',
	'collections/Setting/ApplyStagesMgr/StagesCollection'
	],function($,_,Backbone,ApplyStagesModel,StagesCollection){
		var stageWrapModel = Backbone.Model.extend({
			defaults:{
				ParentStage:new ApplyStagesModel,
				ChildStages:new StagesCollection
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
