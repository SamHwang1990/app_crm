/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * AdminMenu View
 ***************************************/

define(['marionette','text!templates/Common/adminMenu.html','assets/AppUISet'],function(Marionette,AdminMenuTpl,AppUISet){
	var adminMenu = Marionette.ItemView.extend({
		template:AdminMenuTpl,
		tagName:"ul",
		className:"adminMenu nav nav-list",
		/*templateHelpers:{
			AppConfig:this.model.AppConfig,
			CurrentUser:this.model.CurrentUser
		},*/
		onShow:function(){
			console.log("Admin Bar View Show");
			AppUISet.init();
		}
	});
	return adminMenu;
});

