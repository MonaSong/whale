/**
 * @Author yjx
 * @date 2017-1-22
 * @description 非酒厂用户登录
 */
$().ready(function() {
    //非酒厂用户修改密码前端表单验证
    var forget_password_form = $("#retrieve-form");
    var forget_password_rules = {
        phone: {
            required: true,
            isMobile: true
        },
        code: {
            required: true,
            isVerificatCode: true
        },
        passwords: {
            required: true,
            rangelength: [6, 16]
        },
        secondPassword: {
            required: true,
            equalTo: "#passwords"
        }
    };
    var forget_password_messages = {
        phone: {
            required: "请输入手机号码",
            isMobile: "请填写正确的手机号码"
        },
        code: {
            required: "输入6位验证码",
            isVerificatCode: "必须输入6位验证码"
        },
        passwords: {
            required: "建议使用字母、数字和符号两种及以上的组合,6-16个字符",
            rangelength: "6-16个字符、支持数字、大小写字母、符号"
        },
        secondPassword: {
            required: "再次输入密码",
            equalTo: "两次密码输入不一致"
        }
    };
    formValidate(forget_password_form, forget_password_rules, forget_password_messages);
    //登录验证
    var login_form = $("#login-form")
    var login_rules = {
        mobile: {
            required: true,
            isMobile: true
        },
        password: {
            required: true,
        }
    };
    var login_messages = {
        mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        password: {
            required: '密码不能为空',
        }
    };
    formValidate(login_form, login_rules, login_messages);

    /*    登录*/
    $(".submit-file").click(function() {
        if (!$("#login-form").valid()) {
            return;
        };
    });

    $(".submit-file").click(function() {
        if (!$('#login-form').valid()) {
            return;
        }
        var mobile = $("[name=mobile]").val();
        var password = $("[name=password]").val();
        var param = {
            mobile: mobile,
            password: password,
        }
        var now_url = contextPath + '/system_login.json';
        var contentType = 'application/json';
        console.log(param);
        param = JSON.stringify(param)
        $.ajax({
            type: 'post',
            data: param,
            url: now_url,
            async:true,//默认为true
            contentType:contentType,//默认为application/x-www-form-urlencoded
            dataType:'json',//默认为预期服务器返回的数据类型
            processData:false,//默认为true*/
            success: function(data) {
                if (data.statusCode === '200') {
                    if (data.data.userStatus == 0) {
                        window.sessionStorage["mobile"] = mobile;
                        window.location.href = contextPath + '/login_authentication_page';
                    } else {
                        remember_pwd();
                        window.location.href = getMenuFirstUrl();
                    }
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
                setTimeout($('.login_error').append(html),5000);
            }
        });
/*        if (mobile === '' && password === '') {
            return
        }
        HttpUtils.get_system_data(param, function(data) {
            if (data.statusCode === '200') {
                if (data.data.userStatus == 0) {
                    window.sessionStorage["mobile"] = mobile;
                    window.location.href = contextPath + '/login_authentication_page';
                } else {
                    remember_pwd();
                    window.location.href = getMenuFirstUrl();
                }
            }
        });*/
    });

    function getMenuFirstUrl() {
        var first_menu_url = '';
        HttpUtils.get_menu_data(function(data) {
            if (data.items[0] && data.items[0].items[0] && data.items[0].items[0].items) {
                var menu_data = data.items[0].items[0].items;
                $.each(menu_data, function(i, item) {
                    if (i == 0) {
                        first_menu_url = contextPath + item.url;
                        window.localStorage["menuId"] = item.id
                    }
                })
            }
            var cur_data = JSON.stringify(data);
            window.localStorage["allMenuData"] = cur_data;
        })
        return first_menu_url
    }


    //检验用户名是否被注册(手机号是否被注册)
    $(".code").on('click', function() {
        console.debug(1111)
        var timer = null;
        var _this = this;
        $(this).attr('disabled',true);
        var param = {};
        param.mobile = $('.mobile').val();
        console.debug(param.mobile);
        console.debug(param)
            //中国移动
        var cm = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;

        //中国联通
        var cu = /(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;

        //中国电信
        var ct = /(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7}$)/;
        var mobile_value = $('.mobile').val();
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
                	picCode();
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
                html += '<label id="mobile-error" class="error mobile-error" for="mobile">'+ warn_error_infor+'</label>'
                $('.phone').append(html);
            }
        });
    });

    $('#phone').bind('input propertychange', function() {
        $('#mobile-error').remove();
    })

    $("#phone").focus(function(){
        $('.mobile-error').remove();
        $('.obtain').removeAttr('disabled', '');
    })
    $('#code').focus(function(){
        $('.code-error').remove();
    })
    $('#password').focus(function(){
        $('.mobile-error').remove();
    })
    //获取验证码
    function picCode() {
        var param = {};
       
        param.mobile = $('.mobile').val();
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
    }
    
    //关闭模态清空数据
    $('.btn-away').on('click',function(){
    	closemodal();
    })
    $('.icon-delete').on('click',function(){
    	closemodal();
    })
    var closemodal = function() {
            $(".obtain").text('获取验证码');
            $(".obtain").removeAttr('disabled', '');
            $("#username_forget_password").val('');
            $("#code").val('');
            $("#passwords").val('');
            $("#secondPassword").val('');
            $("#phone").val('');
            $('#username_forget_password').popover('hide');
            $('#code').popover('hide');
            $('label.error').detach();
        }
        /*非酒厂用户登录忘记密码提交数据*/
    $(".obtain").click(function() {
        if (!$("#retrieve-form").valid()) {
            $('#code-error').hide();
            $('#passwords-error').hide();
            $('#secondPassword-error').hide();
            return;
        };
    });
    
    /*非酒厂用户登录忘记密码提交数据*/
    $(".btn-save").click(function() {
        if (!$("#retrieve-form").valid()) {
            return;
        };
        var mobile = $('[name=phone]').val();
        var code = $("[name=code]").val();
        var passwords = $("[name=passwords]").val();
        var secondPassword = $("[name=secondPassword]").val();
        if (mobile == '' || code == '' || passwords == '' || secondPassword == '') {
            $('[data-dismiss]').remove();
            return;
        }
        var param = {
            mobile: mobile,
            code: code,
            passwords: passwords,
            secondPassword: secondPassword
        }
        var now_url = contextPath + '/forgetpwd.json';
        var contentType = 'application/json';
        param = JSON.stringify(param)
        $.ajax({
            type: 'post',
            data: param,
            url: now_url,
            async:true,//默认为true
            contentType:contentType,//默认为application/x-www-form-urlencoded
            dataType:'json',//默认为预期服务器返回的数据类型
            processData:false,//默认为true*/
            success: function(data) {
                if (data.statusCode === '200') {
                    closemodal();
                    $('#myModal').modal('hide');
                    $('#modifySucess').modal('show');
                }
            },
            error: function(data) {
            	console.debug(data);
            	var error_information =	data.responseText;
            	error_information = JSON.parse(error_information)
            	var warn_error_infor = error_information.errors[0].errorMessage;
            	console.debug(warn_error_infor);
                $('#code-error').remove();
                var html = '';
                html += '<span id="code-error" class="error red code-error" for="mobile">'+ warn_error_infor+'</span>'
                $('.passwordtxt').append(html);
            }
        });
    });


    
    
    //下次自动登录
    $(".status").on('change', function() {
        if ($(this).prop("checked")) {
            $(this).attr("checked", "checked");
        } else {
            $(this).removeAttr("checked");
            deleteCookie('phone');
        }
    });

    function remember_pwd() {
        if ($(".status").attr("checked") === 'checked') {
            var mobile = $("#mobile").val();
            var password = $("#password").val();
            setCookie("phone", mobile + ',' + password, cookie_time); //document.cookie = "userName="+username+"%%"+password+";expires=" + cookie_time;
        }
    }
    var cookie_time = 365; //记录登录账号天数
    remember_pwd();
    //取cookie
    function password_show() {
        var mobile = getCookie("phone");
        console.debug(mobile);
        if (mobile !== '') {
            mobile = mobile.split('%2C');
            console.debug(mobile)
            $('#mobile').val(mobile[0]);
            $('#password').val(mobile[1]);
            $(".status").attr("checked", 'checked');
            var mobile = $("[name=mobile]").val();
            var password = $("[name=password]").val();
            var param = {
                mobile: mobile,
                password: password,
            }
            if (mobile === '' && password === '') {
                return
            }
            HttpUtils.get_system_data(param, function(data) {
                if (data.statusCode === '200') {}
            });
        } else {
            $('#mobile').val('');
            $('#password').val('');
            $(".status").removeAttr("checked");
        }
    }
    password_show();

    //cookie的存取删
    function setCookie(name, value, expiresdays) {
        var exp = new Date();
        exp.setDate(exp.getDate() + expiresdays);

        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(name) {
        var myCookie = document.cookie;

        var data = myCookie.split(";");

        var cookies = {};
        for (var i = 0; i < data.length; i++) {
            var co = data[i].split("=");
            cookies[co[0]] = co[1];
        }

        if (name in cookies) {
            return cookies[name];
        } else {
            return "";
        }
    }
    
    function deleteCookie(name) {
        var exp = new Date();
        exp.setDate(exp.getDate() - 1);
        document.cookie = name + "=;expires=" + exp.toGMTString();
    }
});