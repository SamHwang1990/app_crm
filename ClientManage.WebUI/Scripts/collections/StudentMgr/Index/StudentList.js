/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * 学生信息列表 集合
 ***************************************/

define(['jquery','underscore','backbone','models/StudentMgr/Index/StudentInfo'],function($,_,Backbone,StudentInfo){
	var studentListModel = Backbone.Collection.extend({
		model:StudentInfo,
		url:'/StudentMgr/Index/List'
	});
	return studentListModel;
})
