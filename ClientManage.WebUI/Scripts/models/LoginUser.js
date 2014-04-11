/**
 * Created by samhwang1990@gmail.com on 14-4-10.
 */
define(['jquery','underscore','backbone'],function($,_,Backbone){
    var Invalid = Backbone.Model.extend({})
    var LoginUserModel = Backbone.Model.extend({
        defaults:{
            UserName:'',
            UserPassword:'',
            RememberMe:false
        },
        initialize:function(){
            _.bind(this.save, this);
            //配一个子模型存放无效输入域
            this.set('invalid',new Invalid);
        },
        /* 创建自定义 save 函数 */
        save:function(userData){
            $.ajax({
                type:"POST",
                url:this.url,
                data:userData,
	            dataType: 'json',
	            success: function (data){
		            if(data.result){
			            window.location.href="/Home/Index";
		            }else{
			            alert(data.msg);
		            }
	            },
	            error:function(err){
		            console.log(err);
	            }
            });
        }
    });
    return LoginUserModel;
});