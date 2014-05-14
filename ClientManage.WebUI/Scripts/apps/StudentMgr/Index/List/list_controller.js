/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * StudentMgr/Index/List Controlelr
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Index.List',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList :function(contentRegion){
				ClientManage.startSubApp("StudentMgr.Index.List");
				require(['apps/StudentMgr/Index/List/list_view','collections/StudentMgr/Index/StudentList'],function(ListView,StudentsCol){
					var students = new StudentsCol();
					students.fetch({
						success:function(){
							var listView = new ListView.StudentsView({
								collection:students
							});
							contentRegion.show(listView);
						},
						error:function(){
							console.log("fetch data from server failed");
							alert("获取数据失败")
						}
					});
				})
			}
		}
	});
	return ClientManage.StudentMgr.Index.List.Controller;
});
