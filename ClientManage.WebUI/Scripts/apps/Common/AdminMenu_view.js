/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * AdminMenu View
 ***************************************/

define(['marionette','text!templates/Common/adminMenu.html'],function(Marionette,AdminMenuTpl){
	var adminMenu = Marionette.ItemView.extend({
		el:"#adminMenuWrap",
		template:AdminMenuTpl,
		/*templateHelpers:{
			AppConfig:this.model.AppConfig,
			CurrentUser:this.model.CurrentUser
		},*/
		onShow:function(){
			console.log("Admin Bar View Show");
		}
	});
	return adminMenu;
});

