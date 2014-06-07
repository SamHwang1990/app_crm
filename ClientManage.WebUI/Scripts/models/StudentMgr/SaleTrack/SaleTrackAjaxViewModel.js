/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * SaleTrack SaleTrackAjaxViewModel Model
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/SaleTrack/SaleTrackEntity',
	'collections/StudentMgr/SaleTrack/SaleTrackParticipant'
	],function($,_,Backbone,SaleTrackEntity,SaleTrackParticipants){
		var SaleTrackAjaxViewModel = Backbone.Model.extend({
			/*
			* 两个成员：
			* SaleTrackItem: model
			* SaleTrackParticipant: collection
			* */
			initialize:function(options){
				if(options)
					this.url = options.url;
			},
			defaults:{
				SaleTrackItem: new SaleTrackEntity,
				SaleTrackParticipant: new SaleTrackParticipants
			}
 		})

		return SaleTrackAjaxViewModel;
	}
)
