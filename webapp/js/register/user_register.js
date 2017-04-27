/**
 * @Date:2017/1/9
 * @Author:yjx
 * @Description:用户注册
 */
$().ready(function() {
    //前端验证
    var user_register = $('#user-form');
    var user_verification = {
    	mobile:{
        	required: true,
        	isMobile:true
        },
        password:{
            required: true,
            rangelength: [6, 16]
        },
        confirmPassword: {
            required: true,
            equalTo: "#password"
        },
        verifyCode:{
            required: true,
            isVerificatCode:true,	
        },
        picCode:{
            required: true,
        }
    }
    var user_Pledg= {
    	mobile:{
        	required: "请输入手机号码",
        	isMobile: "请填写正确的手机号码"
        },
        password: {
            required: "6-16个字符、支持数字、大小写字母、符号",
            rangelength: "6-16个字符、支持数字、大小写字母、符号"
        },
        confirmPassword: {
            required: "密码不能为空",
            equalTo: "确认密码和设置密码不一致，请重新输入"
        },
        verifyCode:{
            required: "验证码不能为空",
            isVerificatCode: "输入6位验证码"
        },
        picCode:{
            required: "验证码不能为空",
        }
    }
    formValidate(user_register, user_verification, user_Pledg);

        //checkbox按钮的切换
    $(".check-input").each(function() {
        $(this).click(function() {
            if ($(this).prop("checked") === false) {
            	$(this).removeAttr("checked")
                $(".submit-file").removeClass("btn-type");
            } else {
            	$(this).attr("checked", "checked")
                $(".submit-file").addClass("btn-type");
                $(".submit-file").removeAttr("disabled");
            }
        })
    })
    
    $("#mobile").focus(function() {
        $('#mobile-error').remove();
    })
    /*聚焦验证*/
    $("input.field").focus(function() {
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        if ($(this).is(".password")) {
            if (this.value == "") {
                $parent.append("<p class='formtips'>建议使用字母、数字和符号两种及以上的组合，6-16个字符</p>");
                $('#password-error').hide();
                return false;
            } else if (this.value.length < 6) {
                return false;
            } else {
                return true;
            }
        }
    }).blur(function() {
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        $('#password-error').hide();
    })

    
    /*实时监听input的值*/
    $('#password').bind('input propertychange', function(){
    	$('.formtips').hide();
    })
    
    
    //获取验证码
    var timer=null
    var timer1=null
    $('.obtain').on('click',function(){
    	var _this= this;
    	$(this).attr('disabled',true);
    	var param = {};
    	param.mobile = $('#mobile').val();
    	//中国移动
        var cm = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;

        //中国联通
        var cu = /(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;

        //中国电信
        var ct = /(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7}$)/;
        var mobile_value = $('#mobile').val();
        console.debug(mobile_value);
        var rightMobile = (mobile_value!=='')&&(cm.test(mobile_value)||cu.test(mobile_value)||ct.test(mobile_value))
        var rightMobile = (mobile_value!=='')&&(tools._isMobile(mobile_value))
        if(!rightMobile){
    		$(this).removeAttr('disabled','');
        	return 
        }
        /*验证手机号是否注册*/
        HttpUtils.get_username_data(param,function(data){
        	if(data.statusCode == '200'){
        		$(this).attr('disabled',true);
                HttpUtils.get_Code_data(param,function(data){
                	var count = 60;
                    timer = setInterval(function(){
                        count--;
                        if(count>0){
                        	$('.obtain').addClass('typeface');
                            $(".obtain").val(count+'秒后重新获取');
                            $(".obtain").attr('disabled',''); 
                        }else{
                            clearInterval(timer);
                            $(".obtain").val('获取验证码');
                            $(".obtain").removeAttr('disabled');
                            $(".obtain").removeClass('typeface');
                        }
                    },1000)
                })
        	}
        });
    });
    
    /*用户注册*/
    $(".obtain").click(function() {
        if (!$("#user-form").valid()) {
            $('#verifyCode-error').hide();
            $('#password-error').hide();
            $('#secondPassword-error').hide();
            $('#confirmPassword-error').hide();
            $('#picCode-error').hide();
            return;
        };
    });
    $('#verifyCode').bind('input propertychange',function(){
    	$('#error').remove();
    })
        $('#picCode').bind('input propertychange',function(){
    	$('#verify_Code').remove();
    })
    //用户注册数据提交
    $('.submit-file').on('click', function() {
    	$('#error').remove();
        if (!$("#user-form").valid()) {
            return;
        }else if($(".check-input").attr('checked') === "checked"){
        	var mobile=$('[name=mobile]').val();
            var password=$('[name=password]').val();
            var verifyCode=$('[name=verifyCode]').val();
            var picCode=$('[name=picCode]').val();
        	var param={
        			mobile:mobile,
        			password:password,
        			verifyCode:verifyCode,
        			picCode:picCode
        	}
        	console.debug(param);
        	 var now_url = contextPath + '/regsiterInUserCenter.json';
             $.ajax({
                 type: 'post',
                 data:param,
                 url: now_url,
                 success: function(data) {
                     if (data.statusCode === '200') {
                     	window.location.href = contextPath +'/login_was_successful_page';
                    	window.sessionStorage['mobile']=mobile;
                     }
                 },
                 error: function(data) {
                 	console.debug(data);
                 	var error_information =	data.responseText;
                 	error_information = JSON.parse(error_information)
                 	var warn_error_infor = error_information.errors[0].errorMessage;
                 	console.debug(warn_error_infor);
                    var html = '';
                    var h='';
                    $('#verify_Code').remove();
                    html += '<span id="error" class="error pic_error" for="picCode">'+ warn_error_infor+'</span>'
                    h += '<span id="verify_Code" class="error pic_error" for="picCode">'+ warn_error_infor+'</span>'
                    if(warn_error_infor ==='验证码错误'){
                        $('.mobile_error').append(html);
                    }else if(warn_error_infor =="图片验证码错误 "){
                        $('.piccode_error').append(h);
                    }else if(warn_error_infor ==='验证码超时'){
                    	$('.mobile_error').append(html);
                    }else if(warn_error_infor ==='该用户没有发送过短信'){
                    	$('.mobile_error').append(html);
                    }
                 }
             });
        	
        	
/*            HttpUtils.get_userCenter_data(param,function(data){
                if (data.statusCode == '200') {
                	window.location.href = contextPath +'/login_was_successful_page';
                	window.sessionStorage['mobile']=mobile;
                }
            });*/
        	
        }else if($(".check-input").is(':checked')){
        }else{
        	var html = '';
            html += '<label id="error" class="agreement error" for="picCode">'+'请同意《基酒在线注册协议》'+'</label>'
            $('.service_agreement').append(html);
        }
    })
     $("[name=mobile]").focus(function(){
        $('.obtain').removeAttr('disabled', '');
    })
    
    function ckname(){
        var username=$("#username").val();
        var rename=/^\w{5,12}$/;
        if(username==""){
              $("#susername").html("用户名不能为空").css("color","red");
              return false;
        }else if(!rename.test(username)){
              $("#susername").html("用户为5-12位字符").css("color","red");
              return false;
        }else{
              $("#susername").html("用户名正确").css("color","green");
             }
        }
    function ckname1(){
            $("#susername").html("请输入5-12位字符").css("color","red");
        }
    
    $('.check-input').on('click',function(){
    	if($(".check-input").attr('checked') === "checked"){
    		$('.agreement').hide();
    	}else{
    		
    	}
    })
});