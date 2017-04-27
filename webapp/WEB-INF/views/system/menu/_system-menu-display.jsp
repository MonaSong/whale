<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../../layouts/head.jsp"%>

<link href="<%=request.getContextPath()%>/css/system/menu/_system-menu-display.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/system/menu/_system-menu-display.js"></script>
<div id="system_menu_display_div">
    <!-- 这里通过js函数插入动态的表单数据，插入到 id是sMenu的DOM对象下面 -->
    <ol id="sMenu" class="sMenu">
    </ol>
</div>
