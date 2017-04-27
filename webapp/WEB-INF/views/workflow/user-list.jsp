<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../menu/menu.jsp"%>
<!-- select2下拉菜单的样式 -->
<script src="${ctx}/js/lib/select2-4.0.3/select2.min.js"></script>
<script src="${ctx}/js/lib/select2-4.0.3/i18n/zh-CN.js"></script>
<link href="${ctx}/css/lib/select2-4.0.3/select2.min.css" rel="stylesheet">
<script src="${ctx}/js/workflow/user-list.js"></script>
<link href="${ctx}/css/workflow/user-list.css" rel="stylesheet">
<div class="panel panel-default">
    <div class="panel-body">
        <button type="button" class="btn btn-default btn-sm" id="createUserBtn" onclick="fun_createUser();">
            <img alt="" class="v-icon" src="${ctx}/imgs/workflow/user-16.png">
            添加用户
        </button>
    </div>
</div>
<div tabindex="-1" class="v-scrollable v-table-body-wrapper v-table-body" style="zoom: 1; position: relative; overflow: auto; height: 330px; width: 398px;">
    <div style="height: 216px;">
        <div class="v-table-row-spacer" style="height: 0px;style="width: 700px;""></div>
        <table class="v-table-table"  style="width: 800px;">
            <tbody>
                <c:forEach items="${userList}" var="user">
                    <tr class="v-table-row" style="width: 700px;">
                        <td class="v-table-cell-content" style="width: 22px;">
                            <div class="v-table-cell-wrapper" style="width: 22px;">
                                <div class="v-embedded v-embedded-image" style="width: 22px; height: 22px;">
                                    <img src="${ctx}/imgs/workflow/user-22.png">
                                </div>
                            </div>
                        </td>
                        <td class="v-table-cell-content">
                            <div class="v-table-cell-wrapper">${user.firstName }&nbsp;${user.lastName }(${user.id })</div>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        <div class="v-table-row-spacer" style="height: 0px;"></div>
    </div>
    <div tabindex="0" style="position: fixed; top: 0px; left: 0px;"></div>
</div>
<!-- modal -->
<div class="modal fade" id="createUserModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">添加一个用户信息</h4>
            </div>
            <div class="modal-body">
                <form id="userEditForm" action="${ctx}/workflow/user/add">
                    <div class="form-group">
                        <label for="groupID">id</label>
                        <input type="text" class="form-control" name="userID" id="userID" placeholder="唯一的名称" required="true">
                    </div>
                    <div class="form-group">
                        <label for="groupDescription">密码</label>
                        <input type="password" class="form-control" name="userPassword" id="userPassword" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="firstName">姓</label>
                        <input type="text" class="form-control" name="firstName" id="firstName" placeholder="firstname">
                    </div>
                    <div class="form-group">
                        <label for="lastName">名</label>
                        <input type="text" class="form-control" name="lastName" id="lastName" placeholder="lastname">
                    </div>
                    <div class="form-group">
                        <label for="email">email</label>
                        <input type="text" class="form-control" name="email" id="email" placeholder="mail地址">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="fun_saveUser();">保存</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->