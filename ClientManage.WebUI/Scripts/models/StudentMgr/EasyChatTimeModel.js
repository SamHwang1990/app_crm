/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * Contact Easy Chat Time Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var ContactIdentity = Backbone.Model.extend({
		default:{
			PersonIdentity:"",
			NameCn:"",
			Mobile:"",
			Email:""
		}
	});

	var EasyChatTimeEntity = Backbone.Model.extend({
		default:{
			ItemID:"00000000-0000-0000-0000-000000000000",
			TimeBegin:"00:00",
			TimeEnd:"23:55",
			IfStudentID:"00000000-0000-0000-0000-000000000000",
			IfParentID:"00000000-0000-0000-0000-000000000000"
		}
	});

	var EasyChatTimeList = Backbone.Collection.extend({
		model:EasyChatTimeEntity,
		initialize:function(options){
			this.url = options.url;
		}
	});

	var EasyChatTimeModel = Backbone.Model.extend({
		/*defaults:{
			ContactIdentity:new ContactIdentity,
			EasyChatTimes:new EasyChatTimeList
		}*/
		initialize:function(){

		}
	})

	return {
		ContactIdentity:ContactIdentity,
		EasyChatTimeEntity:EasyChatTimeEntity,
		EasyChatTimeList:EasyChatTimeList,
		EasyChatTimeModel:EasyChatTimeModel
	};
})
