/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * 学生信息列表 集合
 ***************************************/

define(['app','models/StudentMgr/StudentInfoViewModel'],function(ClientManage,StudentInfoViewModel){
	var studentListModel = Backbone.Collection.extend({
		model:StudentInfoViewModel,
		url:'/StudentMgr/Index/List'
	});
	return studentListModel;
})
