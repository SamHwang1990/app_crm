/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 * SaleTrack SaleTrackParticipant Collection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/SaleTrack/SaleTrackParticipantsEntity'
	],function($,_,Backbone,SaleTrackParticipantsEntity){
	var SaleTrackParticipant = Backbone.Collection.extend({
		model:SaleTrackParticipantsEntity
	});

	return SaleTrackParticipant;
})
