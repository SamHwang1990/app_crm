/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * Grade Enum Model
 ***************************************/

define([],function(){
	var Grade = {
		Junior1:7,
		Junior2:8,
		Junior3:9,
		Senior1:11,
		Senior2:12,
		Senior2:13,
		UnderGrade1:14,
		UnderGrade2:15,
		UnderGrade3:16,
		UnderGrade4:17
	};
	var GradeInverse = {
		 7:"初一",
		 8:"初二",
		 9:"初三",
		11:"高一",
		12:"高二",
		13:"高三",
		14:"大一",
		15:"大二",
		16:"大三",
		17:"大四"
	}
	return {
		Grade:Grade,
		GradeInverse:GradeInverse
	};
})
