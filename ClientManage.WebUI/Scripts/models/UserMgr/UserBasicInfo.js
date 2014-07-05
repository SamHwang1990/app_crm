/***************************************
 * Created by samhwang1990@gmail.com on 14-7-5.
 * 只有用户名和用户ID
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var userBasicInfoModel = Backbone.Model.extend({
			defaults:{
				UserID:'00000000-0000-0000-0000-000000000000',
				UserName:''
			},
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return userBasicInfoModel;
	}
);
