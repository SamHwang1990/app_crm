/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * StudentInfo Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var studentInfo = Backbone.Model.extend({
		default:{
			StudentID:"",
			NameCn:"",
			NamePinyin:"",
			NameEn:"",
			Gender:"0",
			Citizenship:"中国",
			Marital:"0",
			BirthCity:"广州",
			Birthday:"1990/01/01",
			Email:"",
			Mobile:"",
			QQ:"",
			Weixin:"",
			LiveCity:"广州",
			SchoolCn:"",
			SchoolEn:"",
			OtherSchool:"",
			Grade:"12",
			GradeRank:1,
			GradeScale:"",
			AverageScore:"",
			GraduationDate:new Date(),
			EducationIntention:"0",
			NationIntention:"美国",
			OtherNationIntention:"",
			SpecialtyIntention:"",
			CreateTime:new Date(),
			LiveWith:"",
			Guardian:"",
			MoneyToAbroad:"",
			Remark:""
		}
	});
	return studentInfo;
});
