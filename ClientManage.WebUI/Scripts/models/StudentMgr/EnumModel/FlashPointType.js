/***************************************
 * Created by samhwang1990@gmail.com on 14-6-10.
 * FlashPointType Enum Model
 ***************************************/

define([],function(){
	var FlashPointType = {
		Award:0,
		Activity:1,
		Experience:2,
		Hobby:3
	};

	var FlashPointTypeInverse = {
		0:"奖项",
		1:"活动",
		2:"经历",
		3:"爱好"
	}
	return {
		FlashPointType:FlashPointType,
		FlashPointTypeInverse:FlashPointTypeInverse
	}
})