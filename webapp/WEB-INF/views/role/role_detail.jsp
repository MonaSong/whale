<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/head.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/system/menu/assign_menu_to_role.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/system/menu/assign_menu_to_role.js"></script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>

<script src="<%=request.getContextPath()%>/js/role/role_management_requiredata.js"></script>
<script src="<%=request.getContextPath()%>/js/role/role_detail.js"></script>
<link href="<%=request.getContextPath()%>/css/role/role_detail.css" rel="stylesheet">
<title>角色管理</title>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">角色管理</h4>
                    </div>
                </div>
                <div class="whale-pane-body">
	                <form method="get" class="form-horizontal form-data-pane form-content col-xs-12" role="form" id="role-form" action="">
	                    <div class="form-group">
	                        <label class="col-md-2 control-label" for="role_name">角色名称：</label>
	                        <div class="col-md-6">
	                            <input class="form-control" id="role_name"
	                                name="role_name" placeholder="输入角色名称">
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-md-2 control-label" for="institution_type">机构类型：</label>
	                        <div class="col-md-6">
	                            <input class="form-control" id="institution_type" disabled="disabled" name="institution_type">
	                        </div>
	                    </div>
	                    <div class="form-group">
		                    <div class="menu-to-role-box">
	                            <div class="col-md-6">
	                                <!--左侧系统菜单区域  -->
								    <div class="div-inline">
								        <span class="menu-note">双击菜单名称赋予当前角色：</span>
								        <div class="give_role">
								            <%@ include file="../system/menu/_system-menu-display.jsp"%>
								        </div>
								    </div>
	                            </div>
	                            <div class="role_management col-md-4">
	                                <div class="div-inline">
								        <!-- 角色选择区域  -->
								        <div id="role_display_div">
								            <span class="menu-note menu-roles">双击菜单名称从当前角色中撤销授权：</span>
								            <%@ include file="./_role-display.jsp"%>
								        </div>
								        <!--右侧角色菜单区域  -->
								        <div class="div-inline">
								            <%@ include file="../system/menu/_role-menu-display.jsp"%>
								        </div>
								    </div>
	                            </div>
	                        </div>
                        </div>
                        <div class="form-group">
	                     <label class="col-md-2 control-label"></label>
	                        <div class="col-md-2  btn-choose user-save">
	                            <a href="#" class="btn btn-default btn-gray btn-cancel btn-close" data-back-to="">取消</a> 
	                        </div>
	                        <div class="col-md-2 btn-choose user-save btn-right">
	                            <span class="btn btn-red btn-confirm btn-save" data-role="target-btn" data-id="lifting-pledgeList">确定</span>
	                        </div>
	                    </div>
	                </form>
                </div>
            </div>
        </div>
    </div>
</body>