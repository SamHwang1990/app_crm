/**
 * Created by samhwang1990@gmail.com on 14-4-10.
 * 登录实体模型
 */
define(['jquery','underscore','backbone'],function($,_,Backbone){
    var Invalid = Backbone.Model.extend({});    //登录模型的错误信息
    var LoginUserModel = Backbone.Model.extend({
        defaults:{      //设置模型的默认值
            UserName:'',
            UserPassword:'',
            RememberMe:false
        },
        initialize:function(){
            //配一个子模型存放无效输入域
            this.set('invalid',new Invalid);
        }
    });
    return LoginUserModel;
});