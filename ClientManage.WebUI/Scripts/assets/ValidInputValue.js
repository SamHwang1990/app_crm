/***************************************
 * Created by samhwang1990@gmail.com on 14-9-2.
 ***************************************/

define([],function(){
	var validValue = function(patternString,inputValue){
		var pattern = new RegExp(patternString);
		return pattern.test(inputValue);
	}

	return validValue;
})