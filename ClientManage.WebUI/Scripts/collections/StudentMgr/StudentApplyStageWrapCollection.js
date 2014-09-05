/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentMgr/StudentApplyStageWrap Collection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentApplyStageWrapModel'
],function($,_,Backbone,StudentApplyStageWrapModel){
	var stageWrapCollection = Backbone.Collection.extend({
		model:StudentApplyStageWrapModel,
		initialize:function(options){
			if(options != null){
				this.url = options.url;
			}
		}
	});
	return stageWrapCollection;
});

