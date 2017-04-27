<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../layouts/head.jsp"%>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <script type="text/javascript">
    var contextPath = '<%=request.getContextPath()%>';
    var roleId = '<%=session.getAttribute("roleid")%>';
    var userId = '<%=session.getAttribute("userId")%>'
    </script>
    <script src="<%=request.getContextPath()%>/js/tools/config.js"></script>
    <script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
    <script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
    <script src="<%=request.getContextPath()%>/js/layouts/layouts.js"></script>
    <script src="<%=request.getContextPath()%>/js/layouts/left.js"></script>
    <link id="layouts"  rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css">
    <link id="layouts"  rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/yjx.css">
    <link id="layouts"  rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/zmm.css">
</head>
<!-- 顶部 -->
<div class="s-header s-clearfix">
    <div class="head-lft">
        <b id="institution-name"></b>
    </div>
    <div class="head-rgt">
        <span class="rgt-handle small-bell lft">
            <i class="common-img message-icon" id="msg-icon"></i>
            <span class="message-bell infomation-icon" data-role="top-rgt-msg">消息（<b></b>）</span>
        </span>
        <span class="rgt-handle pointer logout lft" >
            <i class="common-img exit-icon" id="logout"></i>
            <span class="infomation-icon" data-role="top-rgt-logout">退出</span>
        </span>
    </div>
</div>
<!-- 左侧导航 -->
<div class="s-menu">
    <div class="brand">
        <img width="160px" height="53px" alt="" src="<%=request.getContextPath()%>/imgs/common/icon_logo.png">
        <!-- <b>中酒贷</b> -->
    </div>
    <div class="self-info s-clearfix">
        <img src="<%=request.getContextPath()%>/imgs/common/user.png" class="lft">
        <span class="s-clearfix  info-name  span-info-name">
            <b id="topLeftUserName" class="user-name"></b>
            <b class="block user-role"  id="topLeftRole"></b>
        </span>
        <a href="<%=request.getContextPath()%>/my_account_page"><i class="common-img icon-account" id=""></i></a>
    </div>
    <div id="menu" class="menu">
    </div>
</div>
<span data-role="back-to-top">回到顶部</span>