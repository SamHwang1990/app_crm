/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * TrackIsComplete Enum Mode
 ***************************************/

define([],function(){
	var TrackIsComplete = {
		Done:0,
		Doing:1,
		HadCall:2,
		HadOtherTime:3,
		Other:4
	};

	var TrackIsCompleteInverse = {
		0:"已完成",
		1:"未完成",
		2:"已致电但没接",
		3:"已约另外时间",
		4:"其他"
	}
	return {
		TrackIsComplete:TrackIsComplete,
		TrackIsCompleteInverse:TrackIsCompleteInverse
	}
})
