/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * Contact Easy Chat Time Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var ContactIdentity = Backbone.Model.extend({
		defaults:{
			PersonIdentity:"",
			NameCn:"",
			Mobile:"",
			Email:"",
			QQ:"",
			Weixin:"",
		}
	});


	var EasyChatTimeEntity = Backbone.Model.extend({
		defaults:{
			ItemID:"00000000-0000-0000-0000-000000000000",
			TimeBegin:"09:00",
			TimeEnd:"10:00",
			IfStudentID:"00000000-0000-0000-0000-000000000000",
			IfParentID:"00000000-0000-0000-0000-000000000000"
		}
	});

	var ContactIdentityList = Backbone.Collection.extend({
		model:ContactIdentity,
		initialize:function(options){
			if(options){
				this.url = options.url;
			}
		}
	})

	var EasyChatTimeList = Backbone.Collection.extend({
		model:EasyChatTimeEntity,
		initialize:function(options){
			if(options){
				this.url = options.url;
			}
		}
	});

	var EasyChatTimeModel = Backbone.Model.extend({
		/*defaults:{
			ContactIdentity:new ContactIdentity,
			EasyChatTimes:new EasyChatTimeList
		}*/
		initialize:function(){

		}
	});

	var StudentContactList = Backbone.Collection.extend({
		model:EasyChatTimeModel,
		initialize:function(options){
			if(options){
				this.url = options.url;
			}
		}
	})

	return {
		ContactIdentity:ContactIdentity,
		ContactIdentityList:ContactIdentityList,
		EasyChatTimeEntity:EasyChatTimeEntity,
		EasyChatTimeList:EasyChatTimeList,
		EasyChatTimeModel:EasyChatTimeModel,
		StudentContactList:StudentContactList
	};
})
