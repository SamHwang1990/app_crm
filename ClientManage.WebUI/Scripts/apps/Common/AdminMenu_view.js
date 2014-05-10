/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * AdminMenu View
 ***************************************/

define(['marionette','text!templates/Common/adminMenu.html','assets/AppUISet'],function(Marionette,AdminMenuTpl,AppUISet){
	var adminMenu = Marionette.ItemView.extend({
		template: _.template(AdminMenuTpl),
		tagName:"ul",
		className:"adminMenu nav nav-list",
		templateHelpers:function(){
			return {
				AppConfig:this.model.get("AppConfig").toJSON(),
				CurrentUser:this.model.get("CurrentUser").toJSON()
			}
		},
		onShow:function(){
			console.log("Admin Menu View Show");
			AppUISet.init();
		}
	});
	return adminMenu;
});

