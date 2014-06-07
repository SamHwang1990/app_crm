/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * SaleTrack SaleTrackEntity Model
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone'
	],function($,_,Backbone){
	var invalid = Backbone.Model.extend({
		defaults:{
			errMsg:""
		}
	});

	var SaleTrackEntity = Backbone.Model.extend({
		initialize:function(){
			this.set("invalid",new invalid);
		},
		defaults:{
			TrackItemID:"00000000-0000-0000-0000-000000000000",
			Inputor:"",
			StateName:"",
			TrackPattern:0,
			TrackDate:new Date(),
			ToDo:"",
			GetFromTrack:"",
			ClientMostCare:"",
			IsGetFromDone:false,
			TrackNo:"1",
			ParticipantIDs:"",
			IsComplete:"1",
			SignIntention:"0",
			Remark:""
		}
	});

	return SaleTrackEntity;
})
