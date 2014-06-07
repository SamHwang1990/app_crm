/***************************************
 * Created by samhwang1990@gmail.com on 14-6-7.
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/StudentInfo',
	'models/StudentMgr/SaleTrack/SaleTrackAjaxViewModel'
	],function($,_,Backbone,StudentInfoModel,SaleTrackAjaxViewModel){
		var SaleTrackHistoryModel = Backbone.Model.extend({
			defaults:{
				StudentInfo: new StudentInfoModel,
				SaleTrackHistory: new SaleTrackAjaxViewModel
			},
			initialize:function(options){
				if(options)
					this.url = options.url;
			}
		})

		return SaleTrackHistoryModel;
	}
)