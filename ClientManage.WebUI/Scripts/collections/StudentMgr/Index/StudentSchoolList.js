/***************************************
 * Created by samhwang1990@gmail.com on 14-6-11.
 * StudentMgr/Index StudentSchool Collection
 ***************************************/

define(['jquery','underscore','backbone','models/StudentMgr/Index/StudentSchool'],
	function($,_,Backbone,StudentSchoolModel){
		var studentSchoolCol = Backbone.Collection.extend({
			model:StudentSchoolModel,
			initialize:function(options){
				if(options.url != null){
					this.url = options.url;
				}
			}
		});

		return studentSchoolCol;
	}
)
