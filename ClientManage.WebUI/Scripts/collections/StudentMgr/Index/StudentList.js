/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * 学生信息列表 集合
 ***************************************/

define(['app','models/StudentMgr/Index/StudentInfo'],function(ClientManage,StudentInfoModel){
	var studentListModel = Backbone.Collection.extend({
		model:StudentInfoModel,
		url:'/StudentMgr/Index/List'
	});
	return studentListModel;
})
