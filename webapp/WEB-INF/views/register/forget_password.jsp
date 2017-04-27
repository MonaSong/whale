<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../layouts/head.jsp"%>
<title>忘记密码</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/register/win_regester_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/register/forget_password.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<link href="<%=request.getContextPath()%>/css/login/login.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/register/user_register.css" rel="stylesheet">
<body>
<!-- 错误信息提示 -->
<div name='publicError'></div>
 <header class="header-section navbar navbar-fixed-top navbar-default nav-menu border-bottom">
    <div class="container navbar-header-content">
        <div class="navbar-logo">
            <img src="<%=request.getContextPath()%>/imgs/login/logo_02.png">
            <b class="txt">●</b>
            <p class="user_title">忘记密码</p>
        </div>
        <div class="my-search-bar pull-right">
            <p>已有账号，马上<a href="<%=request.getContextPath()%>/login_page" class="loginbar">登录></a></p>
        </div>
    </div>
</header>
    
<div class="content register-content">
    <div class="container">
    	<div class="registration">
    		    <ul>
    		        <li class="confirm_account"></li>
    		        <li class="left_reset"></li>
    		    </ul>
    		    <div class="process confirm_account">1
    		        <div class="stepText blue">确认账户</div>
    		    </div>
    		    
    		    <div class="process verification_account">2
    		        <div class="stepText ">验证账户</div>
    		    </div>
    		
    		    <div class="process reset_password">3
    		        <div class="stepText">重置密码</div>
    		    </div>
    	</div>
		<div class="whale-pane-body">
            <form method="get" class="form-horizontal form-data-pane form-content" role="form" id="confirm-form" action="">
                <div class="forms form-item-account">
                    <div class="mobile mobile_error">
                        <input class="form-control " id="mobile" name="mobile" placeholder="输入手机号">
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile picCode_error">
                        <input class="wri_code form-control" id="picCode" name="picCode" placeholder="请输入验证码">
                        
                         <span class='creat_code text-center'><img src="<%=request.getContextPath()%>/verfiyPic" onclick="this.src=this.src+'?'+Math.radom"></span>
                    </div>
                </div>
                <div class="forms form-item-account">
                   <div class=" center">
                       <span class="btn btn-primary btn-blue btn-submit confrim_btn" >提交</span>
                   </div>
                  </div>
            </form>
            
            <form method="get" class="form-horizontal form-data-pane form-content col-xs-12 hide" role="form" id="verification-form" action="">
                <div class="forms form-item-account">
                    <div class="mobile ">
                        <input class="form-control " id="phone" name="phone" placeholder="已验证手机">
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile verifyCode_error">
                        <input class="form-control wri_code" type="text" id="verifyCode" name="verifyCode" placeholder="请输入验证码">
                        <input type="button" class="btn btn-primary creat_code obtain btn-gray" value="获取验证码">
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile">
                        <span class="btn btn-primary btn-blue btn-submit  verification_btn submit_form">提交</span>
                    </div>
                </div>
            </form>
        
            <form method="get" class="form-horizontal form-data-pane form-content col-xs-12 hide" role="form" id="reset-form" action="">
                <div class="forms form-item-account">
                    <div class="mobile">
                        <input class="form-control" id="password" name="password" type='password' placeholder="请输入新密码">
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile">
                        <input class="form-control" id="secondpassword" name="secondpassword" type='password' placeholder="请再次输入密码">
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile">
                        <span class="btn btn-primary btn-submit btn-blue submit-reset">提交</span>
                    </div>
                </div>
            </form>
        </div>    
    </div>
    <div class="contet">
        <div class="container">
            <div class="row hide">
                <span class="img_success"><img src="<%=request.getContextPath()%>/imgs/login/success.png"></span>
                <div class="center new_password">
	                <p>新密码设置成功 !</p>
	                <p>请记住您的新密码，<a href="javascript:void(0)" class="login">立即登录</a></p>
                </div>
              <div class="time_login">  
                  <p class="center time"><a class="loginbar">3秒进入登录页</a></p>
             </div>
            </div>
        </div>
    </div>
  </div>
    <!-- 版权信息 -->
    <div class="my-container-box clearfix copyright-information"> 
        <div class="my-container">
            <span class="pull-left">Copyright © 2016 Joinku.com，All Rights Reserved</span>
            <span class="pull-right">粤ICP备16014751号-2</span>
        </div>          
    </div>
</body>
</html>
