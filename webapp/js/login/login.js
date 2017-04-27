/**
 * @Author yugang
 * @date 2016-10-25
 * @description 登录
 */
$().ready(function() {
    //记住我的状态转换
    $(".status").on('change',function(){
        if($(this).prop("checked")){
            $(this).attr("checked","checked");
        }else{
            $(this).removeAttr("checked");
            deleteCookie('mobile');
        }
    });
    function remember_pwd(){
    	if($(".status").attr("checked")==='checked'){
    	var mobile = $("#mobile").val();
        var password = $("#password").val();
		 setCookie("mobile",mobile+','+password,cookie_time);                             //document.cookie = "userName="+username+"%%"+password+";expires=" + cookie_time;
        }
    }
    //登录4种状态
    var cookie_time=365;//记录登录账号天数
    $(".member-login").click(function() {
        var _this = this;
        var mobile = $("#mobile").val();
        var password = $("#password").val();
        var picCode=$('#picCode').val();
        var param ={
        	mobile:mobile,
        	password:password,
        	picCode:picCode
        }
        console.debug(param);
        if(mobile==='' && password===''){
        	warning('请输入手机号和密码');
        	return
        }
        if(mobile===''){
        	warning('请输入手机号');
        	return
        }
        if(password===''){
        	warning('请输入密码');
        	return
        }
        if(picCode===''){
        	warning('请输入验证码');
        	return
        }
        if(!tools._isMobile(mobile)){
        	$('.login-title').html('');
        	$('.login-title').html('<p id="login-error" class="error" for="loginError"><span data-role="delete-file">x</span><span class="login_prompt">请输入正确手机号</span></p>');
        	setTimeout(function(){$('#login-error').fadeOut()},5000);
        	setTimeout(function(){$('.login-title').html('<span class="login-member pull-left">账户登录</span>')},5000);
        	return
        }
        var now_url = contextPath + '/login.json';
        var contentType = 'application/json';
        param = JSON.stringify(param)
        $.ajax({
            type:'post',
            data:param,
            url:now_url,
            async:true,//默认为true
            contentType:contentType,//默认为application/x-www-form-urlencoded
            dataType:'json',//默认为预期服务器返回的数据类型
            processData:false,//默认为true*/
            success:function(data){
            	if(data.statusCode === '200'){
                    if(data.data!=null){
                    	var cur_contextPath = contextPath || '/';
                        if(data.data.auditResult === 'return'){//退回修改
                             //$('.reason').html(data.data.auditOpinion);
                             var wineryId=data.data.wineryId;
                             window.sessionStorage['wineryId']=wineryId;
                             window.sessionStorage['auditResult']='return';
                             window.sessionStorage['reason']=data.data.auditOpinion;
                             window.sessionStorage['login_mobile'] = mobile;
                             remember_pwd();
                             window.location.href = cur_contextPath;
                         }else if(data.data.auditResult === 'agree'){//审核中
                             //$('#inAudit').modal('show')
                        	var wineryInfoId = data.data.wineryInfoId.id;
                        	console.debug(wineryInfoId)
                         	window.sessionStorage['auditResult'] = 'agree';
                         	window.sessionStorage['login_mobile'] = mobile;
                         	window.sessionStorage['wineryInfoId'] = wineryInfoId;
                         	remember_pwd();
                         	window.location.href = cur_contextPath;
                         }else if(data.data.auditResult === 'refuse'){//审核不通过
                        	 window.sessionStorage['auditResult']='refuse';
                        	 window.sessionStorage['login_mobile'] = mobile;
                        	 remember_pwd();
                        	 window.location.href = cur_contextPath;
                         }else if(data.data.userStatus===5){
                        	 if(window.sessionStorage["unlogined"]==='1'){
                        		 window.sessionStorage["unlogined"] = '';
                        		 remember_pwd();
                            	 window.location.href = contextPath+'/win_regist_page';
                        	 }else{
                        		 remember_pwd();
                        		 window.location.href = contextPath+'/new_login_page';
                            	
                        	 }
                        	 window.sessionStorage['login_mobile'] = mobile;
                         }else{//成功
                             console.debug(11111)
                             remember_pwd();
                            window.location.href = getMenuFirstUrl();
                         }
                        
                        window.sessionStorage['logined'] = 'true';
                     }
                }
            },
            error:function(data){
            	var error_information =	data.responseText;
            	error_information = JSON.parse(error_information)
            	var warn_error_infor = error_information.errors[0].errorMessage;
            	warning(warn_error_infor)
            }
        });
    });

    function getMenuFirstUrl(){
        var first_menu_url = '';
        HttpUtils.get_menu_data(function(data){
        	if(data.items[0] && data.items[0].items[0] && data.items[0].items[0].items){
                var menu_data = data.items[0].items[0].items;
                $.each(menu_data,function(i,item){
                    if(i==0){
                        first_menu_url = contextPath+item.url;
                        window.localStorage["menuId"] = item.id
                    }
                })
            }
            var cur_data = JSON.stringify(data);
            window.localStorage["allMenuData"] = cur_data;
        })
        return first_menu_url
    }

    
    //取cookie里面的值
    //var passWord=getCookie("passWord");
    function password_show(){
    	var mobile=getCookie("mobile");
        console.debug(mobile);
        if(mobile!==''){
        	mobile=mobile.split('%2C');
        	console.debug(mobile)
        	$('#mobile').val(mobile[0]);
            $('#password').val(mobile[1]);
            $(".status").attr("checked",'checked')
        }else{
        	$('#mobile').val('');
            $('#password').val('');
            $(".status").removeAttr("checked");
        }
    }
    password_show()
    
    //cookie的存取删
    function setCookie(name, value, expiresdays){
    	var exp = new Date();
    	exp.setDate(exp.getDate() + expiresdays);
    	
    	document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" +exp.toGMTString(); 
    }
    function getCookie(name){
    	var myCookie = document.cookie;
    	
    	var data = myCookie.split(";");
    	
    	var cookies = {};
    	for(var i = 0; i < data.length; i++){
    		var co = data[i].split("=");
    		cookies[co[0]] = co[1];
    	}
    	
    	if(name in cookies){
    		return cookies[name];
    	} else {
    		return "";
    	}
    }
    function deleteCookie(name){
    	var exp = new Date();
    	exp.setDate(exp.getDate() - 1);
    	
    	document.cookie = name + "=;expires=" + exp.toGMTString(); 
    }
    
    $('.back').on('click',function(){
    	var cur_contextPath = contextPath || '/';
    	window.location.href = cur_contextPath;
    })
});

function warning(info){
	$('.login-title').html('');
	$('.login-title').html('<p id="login-error" class="error" for="loginError"><span data-role="delete-file">x</span><span class="login_prompt">'+info+'</span></p>');
	setTimeout(function(){$('#login-error').fadeOut()},5000);
	setTimeout(function(){$('.login-title').html('<span class="login-member pull-left">账户登录</span>')},5000);
}

