/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStagesMgr/ApplyStagesCollection
 ***************************************/

define(['jquery','underscore','backbone','models/Setting/ApplyStagesMgr/ApplyStagesModel'],function($,_,Backbone,ApplyStagesModel){
	var stagesCollection = Backbone.Collection.extend({
		model:ApplyStagesModel,
		//url:'/Setting/ApplyStageVersion/VersionList'
	});
	return stagesCollection;
});