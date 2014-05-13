/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * StudentMgr/Index/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Index/StudentItem.html',
	'text!templates/StudentMgr/Index/List.html'],function(ClientManage,StudentItemTpl,StudentsTpl){
	ClientManage.module('StudentMgr.Index.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.StudentItemView = Marionette.ItemView.extend({
			template:_.template(StudentItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				return {
					StudentInfo:this.model.get("StudentInfo")
				}
			}
		});
		View.StudentsView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(StudentsTpl),
			itemView:View.StudentItemView,
			itemViewContainer: "tbody"

		});
	});
	return ClientManage.StudentMgr.Index.View;
});
