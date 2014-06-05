/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * StudentMgr/SaleTrack/SaleTrackListItem Model
 ***************************************/

define(['jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentInfo',
	'models/StudentMgr/AppRelation',
	'models/StudentMgr/SaleTrack/SaleTrackEntity'
	],function($,_,Backbone,StudentInfoModel,AppRelationModel,SaleTrackEntityModel){
	var saleTrackListItem = Backbone.Model.extend({
		defaults:{
			StudentInfo:new StudentInfoModel,
			AppRelation:new AppRelationModel,
			CurrentSaleTrack:new SaleTrackEntityModel
		}
	});
	return saleTrackListItem;
})
