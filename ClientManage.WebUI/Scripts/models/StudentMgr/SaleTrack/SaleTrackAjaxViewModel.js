/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * SaleTrack SaleTrackAjaxViewModel Model
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone'
	],function($,_,Backbone){
		var SaleTrackAjaxViewModel = Backbone.Model.extend({
			/*
			* 两个成员：
			* SaleTrackItem: model
			* SaleTrackParticipant: collection
			* */
			initialize:function(options){
				if(options)
					this.url = options.url;
			}
 		})

		return SaleTrackAjaxViewModel;
	}
)
