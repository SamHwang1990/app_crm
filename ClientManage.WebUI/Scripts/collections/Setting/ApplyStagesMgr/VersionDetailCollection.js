/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStagesMgr/VersionDetailCollection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailModel'
	],function($,_,Backbone,ApplyStageVersionDetailModel){
	var versionDetailCollection = Backbone.Collection.extend({
		model:ApplyStageVersionDetailModel,
		//url:'/Setting/ApplyStageVersion/VersionList'
	});
	return versionDetailCollection;
});
