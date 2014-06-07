/***************************************
 * Created by samhwang1990@gmail.com on 14-6-7.
 * SaleParticipantIdentity Enum Model
 ***************************************/

define([],function(){
	var SaleParticipantIdentity = {
		Consultant:"0",       //咨询顾问
		ConsultantAssistant:"1",   //顾问助理
		Student:"2",       //学生
		Father:"3",        //父亲
		Mother:"4",        //母亲
		Other:"5"          //其他
	};
	var SaleParticipantIdentityInverse = {
		0:"咨询顾问",
		1:"顾问助理",
		2:"学生",
		3:"父亲",
		4:"母亲",
		5:"其他"
	}
	return {
		SaleParticipantIdentity:SaleParticipantIdentity,
		SaleParticipantIdentityInverse:SaleParticipantIdentityInverse
	};
})
