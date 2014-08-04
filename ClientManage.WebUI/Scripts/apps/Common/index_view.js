/***************************************
 * Created by samhwang1990@gmail.com on 14-5-10.
 * index frame view
 ***************************************/

define(['app','text!templates/Common/index.html'],function(ClientManage,indexTpl){
	var indexView = Marionette.Layout.extend({
		template: _.template(indexTpl),
		tagName:'body',
		regions:{
			adminBarRegion: "#appAdminBar",
			adminMenuRegion:"#adminMenuWrap",
			adminContentRegion:"#appBody-content",
			adminFooterRegion:"#appFooter"
		}
	});
	return indexView;
});
