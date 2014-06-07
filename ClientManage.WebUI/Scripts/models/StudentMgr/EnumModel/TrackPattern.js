/***************************************
 * Created by samhwang1990@gmail.com on 14-6-7.
 * TrackPattern Enum Mode
 ***************************************/

define([],function(){
	var TrackPattern = {
		FaceToFace:0,
		Phone:1,
		Email:2
	};

	var TrackPatternInverse = {
		0:"面谈",
		1:"电话",
		2:"邮件"
	}
	return {
		TrackPattern:TrackPattern,
		TrackPatternInverse:TrackPatternInverse
	}
})

