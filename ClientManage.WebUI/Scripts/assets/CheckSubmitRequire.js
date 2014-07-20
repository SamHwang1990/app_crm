/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 ***************************************/

define([],function(){
	var checkRequire = function(wrapEl,attrType,inputName){
		var $targetInput = wrapEl.find('input['+attrType+'*="'+inputName+'"]');
		if($targetInput.val() === ""){
			return false;
		}
		else{
			return true;
		}
	}

	return checkRequire;
})