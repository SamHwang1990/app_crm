/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * IsSign Enum Mode
 ***************************************/

define([],function(){

	var IsSign = {
		No:"0",
		LowPossible:"1",
		MiddlePossible:"2",
		HighPossible:"3",
		Done:"4"
	}

	var IsSignInverse = {
		0:"未签约",
		1:"可能性低",
		2:"可能性一般",
		3:"可能性高",
		4:"已签约"
	}

	return{
		IsSign:IsSign,
		IsSignInverse:IsSignInverse
	}
})
