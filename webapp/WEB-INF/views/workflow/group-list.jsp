<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../menu/menu.jsp"%>
<!-- select2下拉菜单的样式 -->
<script src="${ctx}/js/lib/select2-4.0.3/select2.min.js"></script>
<script src="${ctx}/js/lib/select2-4.0.3/i18n/zh-CN.js"></script>
<link href="${ctx}/css/lib/select2-4.0.3/select2.min.css" rel="stylesheet">
<!--使用bootbox来做提示对话框  -->
<script src="<%=request.getContextPath()%>/js/lib/bootbox-4.4.0/bootbox.min.js"></script>
<!--使用HubSpot Messager做提示对话框 -->
<script src="<%=request.getContextPath()%>/js/lib/messenger-1.5.0/messenger.min.js"></script>
<script src="<%=request.getContextPath()%>/js/lib/messenger-1.5.0/messenger-theme-flat.js"></script>
<link href="<%=request.getContextPath()%>/css/lib/DataTables-1.10.11/jquery.dataTables.min.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/lib/DataTables-1.10.11/dataTables.bootstrap.min.css" rel="stylesheet">
<!--使用HubSpot Messager做提示对话框 -->
<link href="<%=request.getContextPath()%>/css/lib/messenger-1.5.0/messenger.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/lib/messenger-1.5.0/messenger-theme-future.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/lib/messenger-1.5.0/messenger-theme-air.css" rel="stylesheet">
<script src="${ctx}/js/workflow/group-list.js"></script>
<link href="${ctx}/css/workflow/group-list.css" rel="stylesheet">
<script>
    var contextPath="<%=request.getContextPath()%>";
</script>
<div class="panel panel-default">
    <div class="panel-body">
        <button type="button" class="btn btn-default btn-sm" id="createGroupBtn" onclick="fun_createGroup();">
            <img alt="" class="v-icon" src="${ctx}/imgs/workflow/group-16.png">
            添加组
        </button>
    </div>
</div>
<div>
    准备分配给组的用户名（必须存在）<input type="text" name="userID" id="userID">
</div>
<div tabindex="-1" class="v-scrollable v-table-body-wrapper v-table-body" style="zoom: 1; position: relative; overflow: auto; height: 430px; width: 580px;">
    <div style="height: 216px;">
        <div class="v-table-row-spacer" style="height: 0px;"></div>
        <table class="v-table-table">
            <tbody>
                <c:forEach items="${groupList}" var="group">
                    <tr class="v-table-row">
                        <td class="v-table-cell-content" style="width: 22px;">
                            <div class="v-table-cell-wrapper" style="width: 22px;">
                                <div class="v-embedded v-embedded-image" style="width: 22px; height: 22px;">
                                    <img src="${ctx}/imgs/workflow/group-22.png">
                                </div>
                            </div>
                        </td>
                        <td class="v-table-cell-content" style="width: 400px;">
                            <div class="v-table-cell-wrapper">${group.id }(${group.name })</div>
                        </td>
                        <td class="v-table-cell-content">
                            <div class="v-table-cell-wrapper">
                                <a href="javascript:fun_gourpDelete('${group.id }')">删除</a>
                            </div>
                        </td>
                        <td class="v-table-cell-content">
                            <div class="v-table-cell-wrapper">
                                <a href="javascript:fun_distributeUser('${group.id }')">分配用户</a>
                            </div>
                        </td>
                        <td class="v-table-cell-content">
                            <div class="v-table-cell-wrapper">
                                <a href="javascript:fun_listUser('${group.id }')">显示用户</a>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        <div class="v-table-row-spacer" style="height: 0px;"></div>
    </div>
    <div tabindex="0" style="position: fixed; top: 0px; left: 0px;"></div>
</div>
<div class="modal fade" id="createGroupModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">添加一个组信息</h4>
            </div>
            <div class="modal-body">
                <form id="groupEditForm" action="${ctx}/workflow/group/add">
                    <div class="form-group">
                        <label for="groupID">唯一的组名称(英文字符)</label>
                        <input type="text" class="form-control" name="groupID" id="groupID" placeholder="唯一的组名称" required="true">
                    </div>
                    <div class="form-group">
                        <label for="groupDescription">组的中文描述</label>
                        <input type="text" class="form-control" name="groupDescription" id="groupDescription" placeholder="组的中文描述">
                    </div>
                    <div class="form-group">
                        <label for="groupTypeSelect">类型</label>
                        <select class="" name="groupTypeSelect" id="groupTypeSelect">
                            <option value="assignment">assignment</option>
                            <option value="security-role">security-role</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="fun_saveGroup();">保存</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->