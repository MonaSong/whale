<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/head.jsp"%>

<div class="navbar-content">
    <nav id="navbar-example" class="navbar navbar-default navbar-static">
        <div class="logo_img_div">
            <!-- <img class="logo_img" src="<%=request.getContextPath()%>/imgs/logo.png"> -->
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-example-js-navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="${ctx}/views/main/main.jsp">中酒贷管理系统</a>
                </div>
                <div class="collapse navbar-collapse bs-example-js-navbar-collapse">
                    <ul class="nav navbar-nav" id="s-menu">
                        <li>
                            <a href="${ctx}/" data-ref="rf1">首页</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                工作流引擎测试功能
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="${ctx}/workflow/process-list">流程定义</a>
                                </li>
                                <li>
                                    <a href="${ctx}/workflow/process-instance/list">查看正在运行的实例</a>
                                </li>
                                <li>
                                    <a href="${ctx}/workflow/finished/list">查看已经结束的实例</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a href="${ctx}/workflow/group/list">维护组信息</a>
                                </li>
                                <li>
                                    <a href="${ctx}/workflow/user/list">维护用户信息</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a href="${ctx}/workflow/task/todo-tasks">待办事宜</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                系统设置
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="${ctx}/system/businesslog/index">系统日志</a>
                                </li>
                                <li>
                                    <a href="${ctx}/system/systemmenu/maintain">系统菜单</a>
                                </li>
                                <li>
                                    <a href="${ctx}/system/systemmenu/assingToRole">分配角色菜单</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li id="fat-menu" class="dropdown">
                            <a id="drop3" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                你好：<%=session.getAttribute("user")%>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="drop3">
                                <li>
                                    <a href="#">个人中心</a>
                                </li>
                                <li>
                                    <a href="#">系统设置</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a href="<%=request.getContextPath()%>/logout">退出登录</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>       
    </nav>
</div>