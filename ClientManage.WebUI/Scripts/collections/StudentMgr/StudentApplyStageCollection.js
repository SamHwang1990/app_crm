/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentApplyStage Collection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentApplyStageModel'
],function($,_,Backbone,StudentApplyStageModel){
	var studentApplyStageCollection = Backbone.Collection.extend({
		model:StudentApplyStageModel,
		initialize:function(options){
			if(options != null){
				this.url = options.url;
			}
		}
	});
	return studentApplyStageCollection;
});

