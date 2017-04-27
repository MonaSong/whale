/**
 * @Date:2017/1/9
 * @Author:yjx
 * @Description:忘记密码
 */
$().ready(function() {
    //前端验证
    var form_dom = $('#confirm-form');
    console.debug(form_dom)
    var forget_rules = {
        mobile: {
            required: true,
            isMobile: true
        },
        picCode: {
            required: true,

        },
    }
    var forget_Pledge = {
        mobile: {
            required: "请输入手机号",
            isMobile: "请填写正确的手机号码"
        },
        picCode: {
            required: "请输入验证码",
        },
    }
    formValidate(form_dom, forget_rules, forget_Pledge);

    //忘记密码数据提交
    $('.confrim_btn').on('click', function() {
        if (!$("#confirm-form").valid()) {
            return;
        }
    })


    //前端验证
    var form_verification_dom = $('#verification-form');
    console.debug(form_dom)
    var forget_rule = {
        mobile: {
            required: true,
            isMobile: true
        },
        verifyCode: {
            required: true,
            isVerificatCode: true,
        },
    }
    var forget_Pledg = {
        mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码",
        },
        verifyCode: {
            required: "请输入验证码",
            isVerificatCode: "输入6位验证码"
        },
    }
    formValidate(form_verification_dom, forget_rule, forget_Pledg);
    //忘记密码数据提交
    $('.submit_form').on('click', function() {
        if (!$("#verification-form").valid()) {
            return;
        }
    })

    //前端验证
    var form_reset_dom = $('#reset-form');
    var forget_rule = {
        password: {
            required: true,
            rangelength: [6, 16]
        },
        secondpassword: {
            required: true,
            equalTo: "#password"
        },
    }
    var forget_Pledg = {
        password: {
            required: "密码不能为空",
            rangelength: "6-16个字符、支持数字、大小写字母、符号"
        },
        secondpassword: {
            required: "密码不能为空",
            equalTo: "两次密码输入不一致"
        },

    }
    formValidate(form_reset_dom, forget_rule, forget_Pledg);
    $('.submit-reset').on('click', function() {
            if (!$("#reset-form").valid()) {
                return;
            }
        })
    //获取验证码
    var timer = null
    var timer1 = null
    
    $('.obtain').on('click', function() {
        $(this).attr('disabled', true)
        console.debug(1111)
        var _this = this;
        var param = {};
        param.mobile = $('[name=phone]').val();
        //$('.notice').removeClass('block').addClass('hide');
        HttpUtils.get_Code_data(param, function(data) {
            //$(this).removeAttr('disabled','');
            var count = 60;
            timer = setInterval(function() {
                count--;
                if (count > 0) {
                	$('.obtain').css("font-size", "12px");
                    $(".obtain").val(count + '秒后重新获取');
                    $(".obtain").attr('disabled', '');
                } else {
                    clearInterval(timer);
                    $('.obtain').css("font-size", "14px");
                    $(".obtain").val('获取验证码');
                    $(".obtain").removeAttr('disabled');
                }
            }, 1000)
        })
    });

/*验证账户是否存在*/
    $('.confrim_btn').on('click', function() {
        console.debug(1111)
        var _this = this;
        var param = {};
        param.mobile = $('[name=mobile]').val();
        //中国移动
        var cm = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;

        //中国联通
        var cu = /(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;

        //中国电信
        var ct = /(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7}$)/;
        var mobile_value = $('[name=mobile]').val();
        console.debug(mobile_value);
        var rightMobile = (mobile_value !== '') && (cm.test(mobile_value) || cu.test(mobile_value) || ct.test(mobile_value))
        var rightMobile = (mobile_value !== '') && (tools._isMobile(mobile_value))
        if (!rightMobile) {
            //$('.notice').removeClass('hide').addClass('block');
            $(this).removeAttr('disabled', '');
            return
        }
        var now_url = contextPath + '/check_mobile.json';
        var contentType = 'application/x-www-form-urlencoded';
        $.ajax({
            type: 'get',
            data: param,
            url: now_url,
            async: true, //默认为true
            contentType: contentType, //默认为application/x-www-form-urlencoded
            dataType: 'json', //默认为预期服务器返回的数据类型
            success: function(data) {
                if (data.statusCode === '200') {
                }
            },
            error: function(data) {
            	console.debug(data);
            	var error_information =	data.responseText;
            	error_information = JSON.parse(error_information)
            	var warn_error_infor = error_information.errors[0].errorMessage;
            	console.debug(warn_error_infor);
            	$('.mobile-error').remove();
                var html = '';
                html += '<span id="mobile-error" class="error mobile-error" for="mobile">'+ warn_error_infor+'</span>'
                $('.mobile_error').append(html);
            }
        });
    });
//    实时监听input的值
    $("#mobile").focus(function() {
        $('.mobile-error').remove();
    })

    $('#picCode').bind('input propertychange', function() {
        $('#pic_error').remove();
    })
    $('#verifyCode').bind('input propertychange',function(){
    	$('#mobile_error').remove();
    })
    $('.confrim_btn').on('click', function() {
            var mobile = $('[name=mobile]').val();
            var picCode = $('[name=picCode]').val();
            if (picCode == '' || mobile == '') {
                return;
            }
            var param = {
            	mobile: mobile,
                picCode: picCode
            }
            console.debug(param);
          var now_url = contextPath + '/forgetpwd_step_1.json';
            $.ajax({
                type: 'post',
                data:param,
                url: now_url,
                success: function(data) {
                    if (data.statusCode === '200') {
                        $('#confirm-form').addClass('hide');
                        $('.confirm_account').addClass('left-border');
                        $('.stepText ').addClass('blue')
                        $('.verification_account ').addClass('active')
                        $('#verification-form').removeClass('hide');
                        $('.verification_account').addClass('active').siblings().removeClass('active');
                        $('[name=phone]').attr('disabled', '');
                    }
                },
                error: function(data) {
                	console.debug(data);
                	var error_information =	data.responseText;
                	error_information = JSON.parse(error_information)
                	var warn_error_infor = error_information.errors[0].errorMessage;
                	console.debug(warn_error_infor);
                    $('#pic_error').remove();
                    var html = '';
                    html += '<span id="pic_error" class="error pic_error" for="picCode">'+ warn_error_infor+'</span>'
                    if(warn_error_infor=='该用户不存在'){
                    	
                    }else{
                    	$('.picCode_error').append(html);
                    }
                }
            });
        })
/*        第二步验证手机验证码*/
    $('.verification_btn').on('click', function() {
        if (!$("#verification-form").valid()) {
            return;
        }
        var mobile = $('[name=mobile]').val();
        var verifyCode = $('[name=verifyCode]').val();
        if (verifyCode == '' || mobile == '') {
            return;
        }
        var param = {
            mobile: mobile,
            verifyCode: verifyCode
        }
        console.debug(param);
        console.debug(param);
        var now_url = contextPath + '/forgetpwd_step_2.json';
          $.ajax({
              type: 'post',
              data:param,
              url: now_url,
              success: function(data) {
                  if (data.statusCode === '200') {
                      $('#confirm-form').addClass('hide');
                      $('.left_reset').addClass('left-border');
                      $('.stepText ').addClass('blue')
                      $('.reset_password ').addClass('active')
                      $('#verification-form').addClass('hide');
                      $('#reset-form').removeClass('hide');
                  }
              },
              error: function(data) {
              	console.debug(data);
              	var error_information =	data.responseText;
              	error_information = JSON.parse(error_information)
              	var warn_error_infor = error_information.errors[0].errorMessage;
              	console.debug(warn_error_infor);
                  $('#mobile_error').remove();
                  var html = '';
                  html += '<span id="mobile_error" class="error pic_error" for="picCode">'+ warn_error_infor+'</span>'
                  $('.verifyCode_error').append(html);
              }
          });
    });

    //手机号码
    $('.confrim_btn').on('click', function() {
            window.sessionStorage["mobile"] = $('[name=mobile]').val()
            $('[name=phone]').val(window.sessionStorage["mobile"]);
        })
        //忘记密码提交数据
    $(".submit-reset").click(function() {
        if (!$("#reset-form").valid()) {
            return;
        };
        var phone = $('[name=phone]').val();
        var password = $("[name=password]").val();
        var secondpassword = $("[name=secondpassword]").val();
        var param = {
            phone: phone,
            password: password,
            secondpassword: secondpassword
        }
        HttpUtils.get_forgetpassword_data(param, function(data) {
            if (data.statusCode === '200') {
                $('.registration').hide();
                $('[role=form]').hide();
                $('.row').removeClass('hide');
                var timer = null;
                var count = 3
                timer = setInterval(function() {
                    count--;
                    if (count > 0) {
                        $(".time").html('<a onclick="loginBar()" class="loginbar">'+count+'进入登录页'+'</a>');
                    } else {
                        clearInterval(timer);
                        window.location.href = contextPath + '/login_page';
                    }
                }, 1000)
            }
        })
    });
    
   $('.time').on('click',function(){
		window.location.href = contextPath + '/login_page';
   })

    //立即认证跳转
    $('.start-submit').on('click', function() {
        window.sessionStorage['login_mobile'] = window.sessionStorage["mobile"];
        window.location.href = contextPath + '/win_regist_page';
    })
});