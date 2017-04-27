<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="../../layouts/head.jsp"%>
<link href="<%=request.getContextPath()%>/css/system/menu/assign_menu_to_role.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/system/menu/assign_menu_to_role.js"></script>

<%@ include file="../../layouts/left.jsp"%>
<div class="menu-to-role-box">
    <!--左侧系统菜单区域  -->
    <div class="div-inline">
        <span class="menu-note">双击菜单名称赋予当前角色</span>
        <%@ include file="./_system-menu-display.jsp"%>
    </div>
    <div class="div-inline roles-select">
        <!-- 角色选择区域  -->
        <div id="role_display_div">
            <span class="menu-note menu-roles">双击菜单名称从当前角色中撤销授权</span>
            <%@ include file="../../role/_role-display.jsp"%>
        </div>
        <!--右侧角色菜单区域  -->
        <div class="div-inline ">
            <%@ include file="./_role-menu-display.jsp"%>
        </div>
    </div>
</div>
