<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/winmanagement/win_add_new_user.css" rel="stylesheet">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">用户管理</h4>
                </div>
            </div>
            <div class="whale-pane-body user-information">
                <form method="get" class="form-horizontal" role="form" id="user-form" action="">
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label" for="username">用户名：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="username"
                                name="username" placeholder="输入用户名">
                        </div>
                    </div>
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label" for="user-agency">所属机构：</label>
                        <div class="col-md-3">
                            <p class="form-control" id="user-agency"
                                name="user-agency"></p>
                        </div>
                    </div>
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label" for="user-type">机构类型
                            ：</label>
                        <div class="col-md-3">
                            <p class="form-control" id="user-type"
                                name="user-type"></p>
                        </div>
                    </div>
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label" for="user-role">所属角色：</label>
                        <div class="col-md-3">
                            <select class="form-control" id="user-role"
                                name="user-role">
                                <option>请选择</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label"
                            for="user-fullname">姓名：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="user-fullname"
                                name="user-fullname" placeholder="输入机构联系人姓名">
                        </div>
                    </div>
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label" for="user-phone">手机号：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="user-phone"
                                name="user-phone" placeholder="输入机构联系人电话">
                        </div>
                    </div>
                    <div class="form-group form-group-sm">
                        <label class="col-md-3 control-label"
                            for="user-password">登录密码：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="user-password"
                                name="user-password" placeholder="输入机构联系人电话">
                        </div>
                    </div>
                    <div class="form-group form-group-sm user-save">
                        <div class="row">
                            <div class="col-md-3 col-md-offset-2 center btn-choose">
                                <span class="btn btn-primary btn-close btn-gray btn-cancel">取消</span>
                            </div>
                            <div class="col-md-3">
                                <span class="btn btn-primary btn-save btn-red btn-confirm">确定</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>