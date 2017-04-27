<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="layouts/head.jsp"%>
<!DOCTYPE html>
<title>酒厂登录</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/zmm.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/login/login.css" rel="stylesheet">

<body>
    <!--二级导航栏-->
    <header class="header-section navbar navbar-fixed-top navbar-default nav-menu">
        <div class="container navbar-header-content navbar_header">
            <div class="navbar-logo">
                <img src="<%=request.getContextPath()%>/imgs/login/base-win-logo.png">
            </div>
            <div class="pull-right back_index">
                <span class="back">返回首页</span>
            </div>
        </div>
    </header>
    <!--登录-->      
    <div class="main clearfix login-banner">
        <div class='container'>
            <div class='row banner-container'>
                <div class='col-xs-12 banner-box'>
                    <div class='row'>
                       <div class='col-xs-12'>
                           <div id="carousel-example-generic" class="carousel slide banner pull-left" data-ride="carousel">
                                <div class="carousel-inner" role="listbox">
                                    <div class="item active bc_pic">
                                        <img src="<%=request.getContextPath()%>/imgs/login/login_background.jpg">
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class='col-lg-3 login-box'>
                    <div class="login indexLogin">
                        <div class="login-title user_login_title">
                            <span class="login-member pull-left">账户登录</span>
                        </div>
                        <div>             
                            <form action="" id="login-test" class="login-test">
                                <div class="form-group clearfix">
                                    <div class="col-xs-12 login_item">
                                        <input class="login-name form-control" type="text" name="mobile" placeholder="输入手机号" id="mobile" spellcheck="true">
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <div class="col-xs-12 login_item">
                                       <input class="login-password form-control" type="password" name="password"password="*" id="password" spellcheck="false" placeholder="输入密码">
                                    </div>
                                </div>
                                 <div class="form-group clearfix">
                                    <div class="col-xs-12 login_item">
		                                <input class="form-control" id="picCode" name="picCode" placeholder="请输入验证码">
		                                <span class='creat_code codeShow'>
		                                  <img src="<%=request.getContextPath()%>/verfiyPic" onclick="this.src=this.src+'?'+Math.radom">
		                                </span>
	                                </div>
	                            </div>    
                            </form>
                        </div>
                        <div class="login-remember">
                            <label><input type="checkbox" class='status'> <span class="remember">记住我</span></label>
                            <div class="pull-right login_register">
                                <a class="forgetPassword" href="<%=request.getContextPath()%>/forget_password_page">忘记密码</a>
                                <span>|</span>
                                <a href="<%=request.getContextPath()%>/user_register_page">免费注册</a>
                            </div>
                        </div>
                        <button type="button" class="btn member-login">登录</button>
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
