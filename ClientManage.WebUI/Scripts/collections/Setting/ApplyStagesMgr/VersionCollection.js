/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStagesMgr/ApplyStageVersionCollection
 ***************************************/

define(['jquery','underscore','backbone','models/Setting/ApplyStagesMgr/ApplyStageVersionModel'],function($,_,Backbone,ApplyStageVersionModel){
	var versionCollection = Backbone.Collection.extend({
		model:ApplyStageVersionModel,
		url:'/Setting/ApplyStageVersion/VersionList'
	});
	return versionCollection;
});

