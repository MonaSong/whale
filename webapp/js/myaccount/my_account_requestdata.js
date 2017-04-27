/**
 * @Author Mona
 * @date 2016-11-10
 * @description 我的账户数据接口封装
 */

 var myAccount = {};

 /**
  *@myAccount.get_user_info
  *@description 获取用户信息
  *@param {param} object  param.userId userId 可为空
  */
 myAccount.get_user_info = function(param,callback){
    var url = contextPath+'/userinfo.json';
    $.ajax({
        type:'get',
        url:url,
        async:false,
        data:param,
        success:function(data){
            if($.isFunction(callback)){
                callback(data);
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.debug('获取用户信息报错');
            renderErrorMsg(jqXHR,textStatus,errorThrown);
        }
    })
 }

 
 /**
  *@myAccount.update_pwd
  *@description 修改密码
  *@param {param} object  param.oldPassword param.newPassword
  */

 myAccount.update_pwd = function(param,callback){
    var url = contextPath+'/updatepwd.json';
    $.ajax({
        type:'post',
        url:url,
        data:param,
        success:function(data){
            if($.isFunction(callback)){
                 callback(data);   
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
              console.debug('修改密码报错'); 
              renderErrorMsg(jqXHR,textStatus,errorThrown); 
        }
    })
 }


 /**
  *@myAccount.get_verify_code 
  *@description 根据旧手机获取验证码
  *@param {param} object  param.username param.mobile
  */
myAccount.get_verify_code = function(callback){
    var url = contextPath+'/verify_code.json';
    $.ajax({
        type:'get',
        url:url,
        //data:param,
        success:function(data){
            if($.isFunction(callback)){
                callback(data);
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.debug('获取验证码出错');
            renderErrorMsg(jqXHR,textStatus,errorThrown); 
        }
    })
}

/**
 *@myAccount.check_identifying
 *@description 检查旧手机验证码是否是正确 
 *@param {param} object  param.username param.mobile
 */
myAccount.check_identifying = function(param,callback){
    //var url = contextPath+'/check_identifying';
    var url = contextPath+'/check_code.json';
    $.ajax({
        type:'post',
        url:url,
        data:param,
        async:false,
        success:function(data){
            console.debug('检查验证码结果===')
            console.debug(data) 
            if($.isFunction(callback)){
                callback(data); 
            }
              
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.debug('检查旧手机验证码失败');
            renderErrorMsg(jqXHR,textStatus,errorThrown); 
        }
    })
}
 
/**
 *@myAccount.modify_user_info
 *@description 修改用户信息 
 *@param {param} object  用户所有的数据
 */
 myAccount.modify_user_info = function(param,callback){
    var url = contextPath+'/updateuser.json';
    $.ajax({
        type:'post',
        data:param,
        url:url,
        success:function(data){
            if($.isFunction(callback)){
                callback(data);
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.debug('修改个人用户信息报错');
            renderErrorMsg(jqXHR,textStatus,errorThrown); 
        }
    })
 }

 /**
  *@myAccount.modify_user_mobile
  *@description 修改手机号码
  *@param {param} object  新手机号 和对应的验证码
  */
 myAccount.modify_user_mobile = function(param,callback){
    var url = contextPath+'/user/changemoblie.json';
    $.ajax({
        type:'post',
        url:url,
        data:param,
        async:false,
        success:function(data){
            console.debug('修改手机号码成功')
            console.debug(data) 
            if($.isFunction(callback)){
                callback(data); 
            }              
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.debug('修改手机号码失败');
            renderErrorMsg(jqXHR,textStatus,errorThrown); 
        }
    })
 }



 //根据新手机号获取验证码
 myAccount.get_verify_code_by_new_mobile = function(param,callback){
    var url = contextPath+'/code_by_user_and_phone.json';
    $.ajax({
        type:'get',
        url:url,
        data:param,
        async:false,
        success:function(data){
            if($.isFunction(callback)){
                callback(data); 
            }              
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown); 
        }
    })
 }

