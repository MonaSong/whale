<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="../../layouts/head.jsp"%>
<!--启用拖拉功能 -->
<script src="<%=request.getContextPath()%>/js/lib/jquery-sortable-0.9.13/jquery-sortable.min.js"></script>
<!--使用bootbox来做提示对话框  -->
<script src="<%=request.getContextPath()%>/js/lib/bootbox-4.4.0/bootbox.min.js"></script>
<!--使用HubSpot Messager做提示对话框 -->
<script src="<%=request.getContextPath()%>/js/lib/messenger-1.5.0/messenger.min.js"></script>
<script src="<%=request.getContextPath()%>/js/lib/messenger-1.5.0/messenger-theme-flat.js"></script>
<link href="<%=request.getContextPath()%>/css/lib/messenger-1.5.0/messenger.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/lib/messenger-1.5.0/messenger-theme-future.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/lib/messenger-1.5.0/messenger-theme-air.css" rel="stylesheet">
<!-- 使用jquery-isloading-1.0.6 -->
<script src="<%=request.getContextPath()%>/js/lib/jquery-isloading-1.0.6/jquery-isloading.js"></script>
<link href="<%=request.getContextPath()%>/css/lib/jquery-isloading-1.0.6/jquery-isloading.css" rel="stylesheet">
<!-- 使用动态菜单的工具包 -->
<script src="<%=request.getContextPath()%>/js/lib/dynamic-menu-1.0.0/dynamic-menu-1.0.0.js"></script>
<link href="<%=request.getContextPath()%>/css/system/menu/system-menu-maintain.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/system/menu/system-menu-maintain.js"></script>
<%@ include file="../../layouts/left.jsp"%>
<title>菜单管理</title>
<div class="main-content-container">
	<div class="s-container">
		<!-- 错误信息提示 -->
		<div name='publicError'></div>
		<!-- 页面主体内容 -->
		<div class="s-page-content">
		    <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">系统菜单</h4>
                </div>
            </div>
			<div id="detail_content" class="detail-content">
				
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">菜单名称</span> <input
							type="text" id="menuLabel" class="form-control"
							placeholder="菜单名称" aria-describedby="basic-addon1">
					</div>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">图片路径</span> <input
							type="text" id="menuImage" class="form-control"
							placeholder="图片路径" aria-describedby="basic-addon1">
					</div>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">指向URL</span> <input
							type="text" id="menuURL" class="form-control" placeholder="指向URL"
							aria-describedby="basic-addon1">
					</div>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">指向目标</span> <input
							type="text" id="menuTarget" class="form-control"
							placeholder="target  " aria-describedby="basic-addon1">
					</div>
				</div>
				<input type="button" class="btn btn_add"
					onClick="javascript:fun_add_menu()" value="添加"></input>
			</div>
			<div id="main_content">
				<!-- 这里通过js函数插入动态的表单数据，插入到 id是sMenu的DOM对象下面 -->
				<ol id="sMenu" class="sMenu">
				</ol>
			</div>
		</div>
	</div>
</div>
