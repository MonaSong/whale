/**
*@Author Mona
*@date 2016-11-10
*@description 我的账户
**/
$(function(){  

    var oldMobile = null
    //用户数据回显
    myAccount.get_user_info({userId:''},function(data){
        if(data==''){
            return 
        }
        if(data.data=='') {       
            return
        }
        oldMobile = data.data.mobile
        console.debug(oldMobile);
        $('[name="mobile"],[data-name="mobile"]').attr('value',data.data.mobile);
        $('[name="role"]').val(data.data.role.name);
        $('[name="trueName"]').val(data.data.trueName);
        $('[name="userName"]').val(data.data.userName);
    })
    
    //手机号显示
    $('.modifyPhone').on('click',function(){
    	$('.outside_error').remove();
    	$('#modal-modify-phone').modal('show');
    	//$('.outside_error').hide();
    	var phone=$('[name="mobile"]').val();
        $('.original-phone').val(phone);
    })
    

    //用旧手机获取验证码
    var timer=null
    var timer1=null
    $('#get-old-mobile-verify').on('click',function(){
    	$(this).attr('disabled','')
    	myAccount.get_verify_code(function(data){
    		var count = 60;
            timer = setInterval(function(){
                count--;
                if(count>0){
                    $("#get-old-mobile-verify").val(count+'秒后重新获取');
                    $("#get-old-mobile-verify").attr('disabled',''); 
                }else{
                    clearInterval(timer);
                    $("#get-old-mobile-verify").val('获取验证码');
                    $("#get-old-mobile-verify").removeAttr('disabled');
                }
            },1000)
    	})                           
    })


    //检测旧手机好和验证码
    $('#next-step').on('click',function(){
        if (! $('#old-mobile').valid()) {
            return;
         }
        var param = {
                moblie:oldMobile,
                code:$('[name="firstVerifyCode"]').val()
            };                       
            myAccount.check_identifying(param,function(data){
                if(data==''){
                    return
                }
                if(data.statusCode=='200'){
                	clearInterval(timer);
                    $("#get-old-mobile-verify").val('获取验证码');
                    $("#get-old-mobile-verify").removeAttr('disabled','');
                    $('#old-mobile').hide();
                    $('#new-mobile,#modal-modify-phone .modal-footer').show(); 
                }                              
            })
    });

    //根new-mobile据新手机获取验证码   
    $('[data-name="get-new-mobile-verify"]').on('click',function(){
        //var _this = this;
        if(!$('#new-mobile').valid()){
            return
        }
        $(this).attr('disabled','');
        var param={
        	mobile:$('[name="newMobile"]').val()	
        }
        myAccount.get_verify_code_by_new_mobile(param,function(){
        	var count = 60;
        	timer1 = setInterval(function(){
                count--;
                if(count>0){
                    $('[data-name="get-new-mobile-verify"]').val(count+'秒后重新获取');
                    $('[data-name="get-new-mobile-verify"]').attr('disabled',''); 
                }else{
                    clearInterval(timer1);
                    $('[data-name="get-new-mobile-verify"]').val('获取验证码');
                    $('[data-name="get-new-mobile-verify"]').removeAttr('disabled');
                }
            },1000)
        })        
         
    })

    //将旧手机好修改为新手机号，且验证验证码是否正确
    $('#save-new-mobile-no').on('click',function(){
        var value = $('[name="newCode"]').val();
        var verifyCode = /^([0-9]{6})$/;
        var isVerifyCode = verifyCode.test(value);

        if(!$('#new-mobile').valid()||!isVerifyCode){
            $('[name="newCode"]').parent().append('<label id="newCode-error" class="error" for="newCode">请填写正确的验证码</label>')
            return 
        }
        $('#newCode-error').detach();
        var param = {
                moblie:$('[name="newMobile"]').val(),
                code:$('[name="newCode"]').val()
            };                       
            myAccount.modify_user_mobile(param,function(data){
                if(data==''){
                    return
                }
                if(data.statusCode=='200'){
                	clearInterval(timer1);
                    $('[data-name="get-new-mobile-verify"]').val('获取验证码');
                    $('[data-name="get-new-mobile-verify"]').removeAttr('disabled','');
                    $('#modal-modify-phone').modal('hide');
                    var newMobileVal = $('[name="newMobile"]').val();
                    $('[name="mobile"]').val(newMobileVal);
                    window.location.reload(true);
                }   
                           
            })
    })

    //modal关闭后重置之前的modal显示方式
    $('#modal-modify-phone').on('hide.bs.modal',function(){
    		//$('.outside_error').remove();
    		clearInterval(timer);
    		$("#get-old-mobile-verify").val('获取验证码');
    		$("#get-old-mobile-verify").removeAttr('disabled','');
    		clearInterval(timer1);
            $('[data-name="get-new-mobile-verify"]').val('获取验证码');
            $('[data-name="get-new-mobile-verify"]').removeAttr('disabled','');
             $('#old-mobile').show();
             $('#new-mobile,#modal-modify-phone .modal-footer').hide();
    })    

    //修改密码时，修改手机时关闭modal时信息清空
    $('#modal-modify-pwd,#modal-modify-phone').on('hide.bs.modal',function(){
        $('label.error').detach();
        $('[name="oldPassword"],[name="reNewPassword"],[name="newPassword"]').val('');
        $('[name="firstVerifyCode"],[name="newMobile"],[name="newCode"]').val('');
    })

    var user_rules = {
        userName:{
            required:true
        },
        trueName:{
            required:true
        }
    }
    var user_messages = {
        userName:{
            required:"用户名是必填项"
        },
        trueName:{
            required:"名称是必填项"
        }
    }
    formValidate('#cur-user',user_rules,user_messages)

    //修改用户信息确认
    $('#modify-user-info').on('click',function(){
        var _this = this;
        if(!$('#cur-user').valid()){
            return
        }
         myAccount.modify_user_info({
            trueName:$('[name="trueName"]').val()
        },function(data){
            if(data==''){
                return
            }
            if(data.statusCode=='200'){
                var alertInfo = $(_this).attr('data-info');
                auditSuccess(alertInfo)
            }
        })
    })

    //修改密码前端验证
    $('#btn-modify-password').on('click',function(){
            if(!$('#password-form').valid()){
                return
            }
            var oldPassword = $('[name="oldPassword"]').val();
            var newPassword = $('[name="newPassword"]').val();
            var reWritePassword = $('[name="reWritePassword"]').val();
            myAccount.update_pwd({
              oldPassword:oldPassword,
              newPassword:newPassword  
            },function(data){
                if(data==''){
                    return
                }
                if(data.statusCode=='200'){
                    $('#modal-modify-pwd').modal('hide');
                   console.debug('修改密码成功') 
                }
            })
        })

    var password_rules = {
            oldPassword:{required:true},
            newPassword:{required:true,rangelength:[6,16]},
            reNewPassword:{required:true,rangelength:[6,16],equalTo:'[name="newPassword"]'}
        }

    var password_messages = {
            oldPassword:{
                required:'旧密码是必填项'
            },
            newPassword:{
                required:'新密码必填项',
                rangelength:'6-16位字母、数字、符号，区分大小写'
            },
            reNewPassword:{
                required:'新密码必填项',
                rangelength:'6-16位字母、数字、符号，区分大小写',
                equalTo:'确认密码不一致'
            }
        }

    formValidate('#password-form',password_rules,password_messages)


    //旧手机验证码验证
    var old_moblie_rules = {
        firstVerifyCode:{
            required:true,
            isVerificatCode:true
        }
    }

    var old_moblie_messages = {
        firstVerifyCode:{
            required:'这是必填项',
            isVerificatCode:'必须是6位数验证码'

        }
    }

    formValidate('#old-mobile',old_moblie_rules,old_moblie_messages)

    var moblie_rules = {
        newMobile:{
            required:true,
            isMobile:true
        }
    }

    var moblie_messages = {
        newMobile:{
            required:'这是必填项',
            isMobile:'请填写正确的手机号码'
        }
    }

    formValidate('#new-mobile',moblie_rules,moblie_messages);
    error_infor($('[name="oldPassword"]'));   

    //重置menu
    resetMenu();
})

//后台报错提示
    function error_infor(target){
		$(target).popover({
	    	trigger: 'manual',
	    	placement: 'left',
	    	html: 'true',
	      })
	      .on('focus', function() {
	        // 获得焦点时隐藏
	        $(this).popover('hide');
	      })
    }
