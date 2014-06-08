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
				var historyView = this;
				//设置SaleTrackItem 的IsComplete
				_.each(this.model.get("SaleTrackHistory"),function(HistoryItem){
					//调整回访进度显示
					HistoryItem.SaleTrackItem.IsComplete = EnumTrackIsComplete.TrackIsCompleteInverse[HistoryItem.SaleTrackItem.IsComplete];
					//调整回访方式显示
					HistoryItem.SaleTrackItem.TrackPattern = EnumTrackPattern.TrackPatternInverse[HistoryItem.SaleTrackItem.TrackPattern];
					//调整回访的签约意愿显示
					HistoryItem.SaleTrackItem.SignIntention = EnumSignIntention.IsSignInverse[HistoryItem.SaleTrackItem.SignIntention];
					//调整回访日期显示
					HistoryItem.SaleTrackItem.TrackDate = historyView.TransToDate(HistoryItem.SaleTrackItem.TrackDate);

					//调整回访参与人的身份显示
					_.each(HistoryItem.SaleTrackParticipant,function(Participant){
						Participant.ParticipantIdentity = EnumParticipantIdentity.SaleParticipantIdentityInverse[Participant.ParticipantIdentity];
					})

				})
				return{}
			},
			/*
			 * 将字符串/ Date / ******* / 转为JS的Date类型
			 * 并转为ShortDateString，如1990-10-10
			 * */
			TransToDate:function(msString){
				if(msString == null || msString === ''){
					return '';
				}
				var ms = msString.slice(6,-2);
				var msDate = new Date(parseInt(ms));
				return msDate.getFullYear() + "-" + (msDate.getMonth()+1) + "-" + msDate.getDate();
			}
		});
	});
	return ClientManage.StudentMgr.SaleTrack.SaleTrackHistory.View;
});
