/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStagesMgr/ApplyStageVersionDetailWrapModel
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailModel',
	'collections/Setting/ApplyStagesMgr/VersionDetailCollection'
],function($,_,Backbone,VersionDetailModel,VersionDetailCollection){
		var stageWrapModel = Backbone.Model.extend({
			defaults:{
				ParentVersionDetail:new VersionDetailModel,
				ChildVersionDetails:new VersionDetailCollection
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