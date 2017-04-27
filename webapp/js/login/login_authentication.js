/**
 * @Author yjx
 * @date 2017-1-22
 * @description 非酒厂用户登录验证
 */
$().ready(function() {
	/*激活用户前端验证*/
    var login_form=$("#user-form");
    var login_rules = {
            code: {
                required : true,
                isVerificatCode:true
            },
            picCode: {
                required : true,
            },
        };
    var login_messages = {
            code: {
                required : "验证码不能为空",
                isVerificatCode : "输入6位验证码"
            },
            picCode: {
                required : "验证码不能为空",
            },
        };
    formValidate(login_form,login_rules,login_messages);
	
	
	
	var usermobile = window.sessionStorage["mobile"] ;
    var mobile = usermobile.substr(0, 3) + '****' + usermobile.substr(7);  
    $('.user-mobile').text(mobile);
    
    //获取验证码
    $('.obtain').on('click',function(){
    	$(this).attr('disabled',true)
    	var _this= this;
    	var param = {};
    	param.mobile = window.sessionStorage["mobile"];
    	console.debug(param)
    	//中国移动
        var cm = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;

        //中国联通
        var cu = /(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;

        //中国电信
        var ct = /(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7}$)/;
        var mobile_value = window.sessionStorage["mobile"];
        console.debug(mobile_value);
        var rightMobile = (mobile_value!=='')&&(cm.test(mobile_value)||cu.test(mobile_value)||ct.test(mobile_value))
        var rightMobile = (mobile_value!=='')&&(tools._isMobile(mobile_value))
        if(!rightMobile){
    		$(this).removeAttr('disabled','');
        	return 
        }
        HttpUtils.get_Code_data(param,function(data){
        	var count = 60;
            timer = setInterval(function(){
                count--;
                if(count>0){
                	$('.obtain').addClass('typeface');
                	$('.obtain').css("font-size", "12px");
                    $(".obtain").val(count+'秒后重新获取');
                    $(".obtain").attr('disabled',''); 
                }else{
                    clearInterval(timer);
                    $(".obtain").val('获取验证码');
                    $('.obtain').css("font-size", "14px");
                    $(".obtain").removeAttr('disabled');
                    $(".obtain").removeClass('typeface');
                }
            },1000)
        })
    });
    
    
    //激活账户
    $('.btn-submit').on('click',function(){
		if (! $("#user-form").valid()) {
	        return;
	     };
	     var code=$("[name=code]").val();
	     var picCode=$('[name=picCode]').val();
	     var param={
	             code:code,
	             picCode:picCode
	     }
	     HttpUtils.get_first_data(param,function(data){
	     	if(data.statusCode==='200'){
        		$('[role=form]').hide();
        		$('.row').removeClass('hide');
        	    var count=3
        	    timer = setInterval(function(){
        	        count--;
        	        if(count>0){
        	            $(".time").html('验证成功！'+'<a onclick="getMenuFirstUrl()" class="loginbar">'+count+'进入登录页'+'</a>');
        	        }else{
        	            clearInterval(timer);
        	            window.location.href = getMenuFirstUrl();
        	        }
        	    },1000)
	     	}
	     })
    })
/*    点击登录*/
    $('.time').on('click',function(){
    	window.location.href = getMenuFirstUrl();
    })

    function getMenuFirstUrl(){
        var first_menu_url = '';
        HttpUtils.get_menu_data(function(data){
        	if(data.items[0] && data.items[0].items[0] && data.items[0].items[0].items){
                var menu_data = data.items[0].items[0].items;
                $.each(menu_data,function(i,item){
                    if(i==0){
                        first_menu_url = contextPath+item.url;
                        window.sessionStorage["menuId"] = item.id
                    }
                })
            }
        })
        return first_menu_url
    }
    
});