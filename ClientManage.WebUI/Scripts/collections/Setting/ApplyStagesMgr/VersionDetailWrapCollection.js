/***************************************
 * Created by samhwang1990@gmail.com on 14-7-21.
 * Setting/ApplyStagesMgr/ApplyStageVersionDetailWrapCollection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailWrapModel'
],function($,_,Backbone,ApplyStageVersionDetailWrapModel){
	var versionDetailWrapCollection = Backbone.Collection.extend({
		model:ApplyStageVersionDetailWrapModel,
		initialize:function(options){
			if(options != null){
				this.url = options.url;
			}
		}
	});
	return versionDetailWrapCollection;
});

