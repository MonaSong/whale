<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../layouts/head.jsp"%>
<title>注册成功</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/register/forget_password.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<link href="<%=request.getContextPath()%>/css/login/login.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/register/user_register.css" rel="stylesheet">
<body>
    <!--二级导航栏-->
    <header class="header-section navbar navbar-fixed-top navbar-default nav-menu">
        <div class="container navbar-header-content">
            <div class="navbar-logo">
                <img src="<%=request.getContextPath()%>/imgs/login/base-win-logo.png">
            </div>
		    <div class="my-search-bar pull-right">
		            <p class="current">已有账号,马上<a href="<%=request.getContextPath()%>/login_page"">登录&gt;</a></p>
		     </div>
        </div>
    </header>
    <div class="content login_page">
    <div class="container">
    <div class="row">
         <span class="img_success"><img src="<%=request.getContextPath()%>/imgs/login/success.png"></span>
        <div class="center login_txt">
        <p class="green_txt">注册成功 !</p>
        <p>如需发布信息,请进行企业认证</p>
        </div>
      <div class="center btn-choose btn_login">  
         <a href="<%=request.getContextPath()%>/new_login_page" class="btn btn-default btn-gray btn-cancel btn-operation" >跳过</a> 
         <span class="btn btn-primary btn-red btn-confirm start-submit" data-role="target-btn">立即认证</span>
     </div>
    </div>
    
    </div>
    </div>