<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../layouts/head.jsp"%>
<title>用户注册</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/register/win_regester_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/register/user_register.js"></script>
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
            <p class="user_title">用户注册</p>
        </div>
        <div class="my-search-bar pull-right">
            <p>已有账号,马上<a href="<%=request.getContextPath()%>/login_page" class="loginbar">登录></a></p>
        </div>
    </div>
</header>
<!-- 注册 -->
<div class="user_register">
    <div class="container">
        <div class='row userinfo'>
            <form class="form-horizontal whale-remind" role="form" method="get" id="user-form" action="">
                <div class="form-item form-item-account" id="form-item-account">
                    <label class="form-reister">手　机　号</label>
                    <div class="regiser">
                        <input type="text" id="mobile" name="mobile" class="form-control wri_code field" placeholder="请输入手机号码">
                    </div>
                </div>
                <div class="form-item form-item-account">
                    <label class="form-reister">手机验证 码</label>
                    <div class="regiser mobile_error">
                        <input class="form-control wri_code field infotext code" id="verifyCode" name="verifyCode" type="text" placeholder="请输入手机验证码">
                        <input type="button" class="btn btn-primary creat_code obtain btn-gray" value="获取验证码">
                    </div>
                </div>
                <div class="form-item form-item-account" id="form-item-account">
                    <label class="form-reister">设 置 密 码</label>
                    <div class="regiser">
                        <input type="password" id="password" name="password" class="form-control wri_code field password" placeholder="建议至少使用两种字符组合">
                    </div>
                </div>
                <div class="form-item form-item-account" id="form-item-account">
                    <label class="form-reister">确 认 密 码</label>
                    <div class="regiser">
                        <input type="password" id="confirmPassword" name="confirmPassword" class="form-control wri_code field" placeholder="请再次输入密码">
                    </div>
                </div>
                <div class="form-item form-item-account">
                    <label class="form-reister">验　证　码</label>
                    <div class="regiser piccode_error">
                        <input class="form-control wri_code field" id="picCode" name="picCode" class="field" placeholder="请输入验证码">
                        <span class='creat_code text-center'><img src="<%=request.getContextPath()%>/verfiyPic" onclick="this.src=this.src+'?'+Math.radom"></span>

                    </div>
                </div>
                <div class="form-agreen" class="form-item form-item-phonecode">
                    <div class="service_agreement">
                        <input type="checkbox" name="agreen" checked="checked" class="check-input pull-left">
                        <p class="pull-left agree"><span>我已阅读并同意</span><a href="#">《基酒在线注册协议》</a></p>
                    </div>
                </div>
                <div class="submit btn-choose center">
                    <span class="btn submit-file btn-blue btn-register btn-primary" data-toggle="modal">立即注册</span>
                </div>
            </form>
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
