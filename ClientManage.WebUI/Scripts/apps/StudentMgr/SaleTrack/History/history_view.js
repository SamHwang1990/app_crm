/***************************************
 * Created by samhwang1990@gmail.com on 14-6-7.
 * StudentMgr/SaleTrack History view
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/SaleTrack/SaleTrackHistory.html',
	'models/StudentMgr/EnumModel/TrackIsComplete',
	'models/StudentMgr/EnumModel/IsSign',
	'models/StudentMgr/EnumModel/SaleParticipantIdentity',
	'models/StudentMgr/EnumModel/TrackPattern'
	],function(ClientManage,HistoryTpl,EnumTrackIsComplete,EnumSignIntention,EnumParticipantIdentity,EnumTrackPattern){
	ClientManage.module('StudentMgr.SaleTrack.SaleTrackHistory.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.HistoryView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(HistoryTpl),
			templateHelpers:function(){
				console.log("aha");
				return{}
			}
		});
	});
	return ClientManage.StudentMgr.SaleTrack.SaleTrackHistory.View;
});
