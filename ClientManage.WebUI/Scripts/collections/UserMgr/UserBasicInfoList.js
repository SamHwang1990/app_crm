/***************************************
 * Created by samhwang1990@gmail.com on 14-7-5.
 ***************************************/

define(['jquery','underscore','backbone','models/UserMgr/UserBasicInfo'],function($,_,Backbone,UserBasicInfo){
		var userBasicInfoCollection = Backbone.Collection.extend({
			model:UserBasicInfo,
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return userBasicInfoCollection;
	}
);