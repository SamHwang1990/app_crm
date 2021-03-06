/***************************************
 * Created by samhwang1990@gmail.com on 14-6-4.
 * EducationIntention Enum Model
 ***************************************/

define([],function(){
	var EducationIntention = {
		Senior:"0",       //高中
		UnderGrade:"1",   //本科
		Master:"2",       //硕士
		Junior:"3"        //初中
	};
	var EducationIntentionInverse = {
		0:"高中",
		1:"本科",
		2:"硕士",
		3:"初中"
	}
	return {
		EducationIntention:EducationIntention,
		EducationIntentionInverse:EducationIntentionInverse
	};
})
