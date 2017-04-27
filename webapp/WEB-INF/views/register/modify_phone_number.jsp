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
<script src="<%=request.getContextPath()%>/js/login/login_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/register/forget_password.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<link href="<%=request.getContextPath()%>/css/login/login.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<body>
<div id="publicError"></div>
<!--首页顶部导航-->
<header class="header-section navbar  navbar-default ">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#header">
                        <span class="sr-only">中酒贷</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
            <p class="center">返回基酒在线首页</p>
        </div>
        <div id="header" class="navbar-collapse collapse in header-menu">
            <ul class="nav navbar-nav navbar-right">
                <li class="current">
                    <a href=""><i class="iconfont"></i>搜索</a>
                </li>
                <li class="current">
                    <a href=""><i class="iconfont"></i>登录注册</a>
                </li>
                <li class="current">
                    <a href="">客服电话:400-067-1919</a>
                </li>
            </ul>
        </div>
    </div>
</header>
<!--二级导航栏-->
<header class="header-section navbar navbar-fixed-top navbar-default nav-menu">
    <div class="container navbar-header-content">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                        <span class="sr-only">中酒贷</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
            <span><i><img src="/whale/imgs/common/logo-iocn.png"></i>中酒贷</span>
            <p>一站式基酒融资平台</p>
        </div>
        <div id="navigation" class="navbar-collapse nav-header collapse header-menu" style="height: 1px;">
            <ul class="nav navbar-nav navbar-right">
                <li class="current">
                    <a href="javascript:void(0)">首页</a>
                </li>
                <li>
                    <a href="javascript:void(0)">产品介绍</a>
                </li>
                <li>
                    <a href="javascript:void(0)">合作伙伴</a>
                </li>
                <li>
                    <a href="javascript:void(0)">常见问题</a>
                </li>
                <li>
                    <a href="javascript:void(0)">关于中酒</a>
                </li>
            </ul>
        </div>
    </div>
</header>
<!-- 修改手机号 -->
<div class="content">
    <div class="container">
        <!-- 页面主体内容 -->
        <div class="tabbable whale-tab" id="my-work-ct">
            <ul class="nav nav-tabs forget-tabs" role="tablist">
                <li role="presentation" class="active confirm_account">
                    <a href="#list">1 解绑手机</a>
                </li>
                <li role="presentation" class="verification_account">
                    <a href="#type">2 绑定新手机</a>
                </li>
                <li role="presentation" class="reset_password">
                    <a href="#type">3 完成</a>
                </li>
            </ul>
        </div>
        <form method="get" class="form-horizontal form-data-pane col-xs-12" role="form" id="confirm-form" action="">
            <div class="form-group">
                <div class="col-md-5">
                    <p>已验证手机:15021983065</p>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <input class="form-control" id="phone" name="phone" placeholder="输入手机号">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-3">
                    <input class='wri_code form-control' placeholder="请输入验证码">
                </div>
                <div class="col-md-3">
                    <button class='creat_code text-center'></button>
                    <lable class='btn btn_code'>看不清？换一张</lable>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <span class="btn btn-default confrim_btn" data-role="target-btn">解绑</span>
                </div>
            </div>
        </form>
        <form method="get" class="form-horizontal form-data-pane col-xs-12 hide" role="form" id="verification-form" action="">
            <div class="form-group">
                <div class="col-md-5">
                    <input class="form-control" id="mobile" name="mobile" disabled="disabled">
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-3 col-md-4">
                    <input class="form-control" type="text" id="code" name="code" placeholder="请输入验证码">
                </div>
                <div class="col-xs-2 col-md-2 btn-choose">
                    <input type="button" class="btn btn-primary obtain btn-red" value='获取验证码'>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-3">
                    <input class='wri_code form-control'>
                </div>
                <div class="col-md-2">
                    <button class='creat_code text-center'></button>
                    <lable class='btn btn_code'>看不清？换一张</lable>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <span class="btn btn-default verification_btn">提交</span>
                </div>
            </div>
        </form>
        <form method="get" class="form-horizontal form-data-pane col-xs-12 hide" role="form" id="reset-form" action="">
            <div class="form-group">
                <div class="col-md-5">
                    <input class="form-control" id="password" name="password" type='password' placeholder="请输入新密码">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <input class="form-control" id="confrim_password" name="confrim_password" type='password' placeholder="请再次输入密码">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-3">
                    <input class='wri_code form-control'>
                </div>
                <div class="col-md-2">
                    <button class='creat_code text-center'></button>
                    <lable class='btn btn_code'>看不清？换一张</lable>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <span class="btn btn-default">提交</span>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
<!-- 底部 -->
<div class="footer clearfix">
    <div class="container">
        <div class="row footer-list">
            <ul class="list-service clearfix">
                <li>
                    <a><i class="iconfont"></i>优质多样化行业资讯</a>
                </li>
                <li>
                    <a><i class="iconfont"></i>安全的资金链</a>
                </li>
                <li>
                    <a><i class="iconfont"></i>100%真实基酒供应链</a>
                </li>
                <li>
                    <a><i class="iconfont"></i>贷款方式便捷</a>
                </li>
                <li>
                    <a><i class="iconfont"></i>一站式服务</a>
                </li>
            </ul>
        </div>
        <div class="footer-bar">
            <div class="widget">
                <p>关于我们</p>
                <div class="footer-entrance"></div>
                <p>
                    <a href="#">公司简介</a>
                </p>
                <p>
                    <a href="#">加入我们</a>
                </p>
                <p>
                    <a href="#">联系我们</a>
                </p>
            </div>
            <div class="widget">
                <p>权益保障</p>
                <div class="footer-activity"></div>
                <p>
                    <a href="#">服务协议</a>
                </p>
                <p>
                    <a href="#">权利声明</a>
                </p>
                <p>
                    <a href="#">隐私政策</a>
                </p>
            </div>
            <div class="widget">
                <p>常见问题</p>
                <div class="footer-policy"></div>
                <p>
                    <a href="#">找回密码</a>
                </p>
                <p>
                    <a href="#">查看招标</a>
                </p>
                <p>
                    <a href="#">关注官方</a>
                </p>
            </div>
            <div class="widget">
                <p>操作指引</p>
                <div class="footer-service"></div>
                <p>
                    <a href="#">注册登录</a>
                </p>
                <p>
                    <a href="#">认证流程</a>
                </p>
                <p>
                    <a href="#">询价流程</a>
                </p>
            </div>
            <div class="widget">
                <p>贷款指南</p>
                <div class="footer-about"></div>
                <p>
                    <a href="#">找如何代办款</a>
                </p>
                <p>
                    <a href="#">资质相关问题</a>
                </p>
                <p>
                    <a href="#">贷款注意事项</a>
                </p>
                <p>
                    <a href="#">其他问题</a>
                </p>
            </div>
            <div class="widget">
                <p><img src="imgs/login/icon_reweima.png"></p>

            </div>
            <div class="widget phone">
                <p>客服热线：（工作时间09:00-18:00）</p>
                <p>410-810-8818</p>
                <p>service@joinku.com</p>
            </div>
        </div>
    </div>
</div>
</body>
</html>
