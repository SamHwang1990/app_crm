/***************************************
 * Created by samhwang1990@gmail.com on 14-4-25.
 * 显示特定的视图
 ***************************************/

define(['jquery'],function($){
	function AppView(){
		this.showView=function(view){
			if (this.currentView){
				this.currentView.close();
			}
			this.currentView = new view();
			//this.currentView.render();

			$('#appBody-content').append(this.currentView.el);
		}
	};
	return AppView;
});
