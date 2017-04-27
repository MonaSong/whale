<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/winmanagement/win_user_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/winmanagement/win_user_management.js"></script>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">用户管理</h4>
                </div>
            </div>
            <div class="tabbable whale-tab">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a
                        href="#shenhezhong">已激活<b>（5）</b></a></li>
                    <li role="presentation"><a href="#yijihuo">未激活<b>（20）</b></a></li>
                    <li role="presentation"><a href="#weitongguo">已删除<b>（20）</b></a></li>
                </ul>
                <div class="pull-right">
                    <button class="btn btn-primary btn-addUser">新增用户</button>
                </div>       
            </div>
        </div>
    </div>
</div>