/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * IsSign Enum Mode
 ***************************************/

define([],function(){

	var IsSign = {
		No:0,
		Possible:1,
		Done:2
	}

	var IsSignInverse = {
		0:"未签约",
		1:"可能性强",
		2:"已签约"
	}

	return{
		IsSign:IsSign,
		IsSignInverse:IsSignInverse
	}
})
