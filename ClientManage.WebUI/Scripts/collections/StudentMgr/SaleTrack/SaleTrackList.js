/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 ***************************************/

define(['app','models/StudentMgr/SaleTrack/SaleTrackListItem'],function(ClientManage,SaleTrackListItemModel){
	var studentListModel = Backbone.Collection.extend({
		model:SaleTrackListItemModel,
		url:'/StudentMgr/SaleTrack/List'
	});
	return studentListModel;
})

