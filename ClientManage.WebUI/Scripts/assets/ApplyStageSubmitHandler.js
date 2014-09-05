/***************************************
 * Created by samhwang1990@gmail.com on 14-8-25.
 ***************************************/

define([],function(){
	var submitHandler = function(App){
		this.ClientManage = App;
	}
	submitHandler.prototype.DoHandler = function(submitCBData){
		if(submitCBData.Percentage < 100){
			return this.ClientManage.vent.trigger("StageNoComplete");
		}

		if(submitCBData.IsParentComplete){
			if(submitCBData.NextParentNameEn == "ApplyCompleted")
				return this.ClientManage.vent.trigger("ApplyCompleted");
			else
				return this.ClientManage.vent.trigger("NextParentStage",{ParentNameEn:submitCBData.NextParentNameEn});
		}else{
			return this.ClientManage.vent.trigger("NextChildStage",{StageNameEn:submitCBData.NextSiblingNameEn});
		}
	}
	return submitHandler;
})
