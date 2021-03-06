/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * SaleTrack SaleTrackParticipantsEntity Model
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

	var SaleTrackParticipantsEntity = Backbone.Model.extend({
		initialize:function(){
			this.set("invalid",new invalid);
		},
		defaults:{
			ParticipantID:"00000000-0000-0000-0000-000000000000",
			SaleTrackID:"00000000-0000-0000-0000-000000000000",
			ParticipantName:"",
			ParticipantIdentity:"0",
			ParticipantMobile:"",
			ParticipantEmail:""
		}
	});

	return SaleTrackParticipantsEntity;
})
