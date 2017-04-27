<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/role/role_detail.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/role/role_management_requiredata.js"></script>
<script src="<%=request.getContextPath()%>/js/role/role_management.js"></script>
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
                <div class="tabbable whale-tab">
	                <div class="tab-content mywork">
	                    <div class="tab-pane fade in dataTable_div role-list active">
	                        <table id="role_table" class="table table-striped table-role-list table-bordered hover">
	                            <thead>
	                              <tr>
	                                <td class="left" data-id="">角色编号</td>
	                                <td class="left" data-id="">角色名称</td>
	                                <td class="left" data-id="">机构类型</td>
	                              </tr>
	                            </thead>
	                            <tbody class="rolelist">
	                           
	                            </tbody>
	                        </table>
	                        <div id="pageBar" role="page-bar">
	                                
	                        </div>
	                        <div class="no-content-container"></div>
	                    </div>
	                </div>
                </div>
            </div>
        </div>
    </div>
</body>