/***************************************
 * Created by samhwang1990@gmail.com on 14-5-15.
 * StudentInfo Model
 ***************************************/

define(['jquery','underscore','backbone','backbone.relational'],function($,_,Backbone,Backbone_Relational){
	var studentInfo = Backbone.RelationalModel.extend({
		default:{
			StudentID:"",
			NameCn:"",
			NamePinyin:"",
			NameEn:"",
			Gender:"男",
			Citizenship:"中国",
			Marital:"未婚",
			BirthCity:"广州",
			Birthday:"1990/01/01",
			Email:"",
			Mobile:"",
			LiveCity:"广州",
			SchoolCn:"",
			SchoolEn:"",
			Grade:"高二",
			GradeRank:1,
			GradeScale:500,
			AverageScore:150,
			GraduationDate:new Date(),
			EducationIntention:"本科",
			NationIntention:"美国",
			SpecialtyIntentio:"计算机",
			CreateTime:new Date(),
			LiveWith:"",
			Guardian:"",
			MoneyToAbroad:"",
			Remark:""
		}
	});
	return studentInfo;
});
