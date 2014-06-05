/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * Gender Enum Model
 ***************************************/

define([],function(){
	var Gender = {
		Male:0,
		Female:1,
		Unknown:2
	};

	var GenderInverse = {
		0:"男",
		1:"女",
		2:"未知"
	}
	return {
		Gender:Gender,
		GenderInverse:GenderInverse
	}
})
