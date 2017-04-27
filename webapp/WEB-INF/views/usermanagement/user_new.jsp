<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../layouts/head.jsp"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/usermanagement/user_management_requstdata.js"></script>
<script src="<%=request.getContextPath()%>/js/usermanagement/user_new.js"></script>
<link href="<%=request.getContextPath()%>/css/usermanagement/user_new.css" rel="stylesheet">
<title>用户管理</title>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">新增用户</h4>
                    </div>
                </div>
                <div class="whale-pane-body user-information">
                    <form method="get" class="form-horizontal form-data-pane whale-remind col-xs-12" role="form" id="user-form" action="">
                          <div class="form-group">
                            <label class="col-md-2 control-label" for="mobile"><b class="red">*</b>手机号：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="mobile"
                                    name="mobile" placeholder="输入您的手机号">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="institutionId"><b class="red">*</b>所属机构：</label>
                            <div class="col-md-5">
                                <select class="form-control" id="institutionId" name="institutionId" placeholder="选择机构">
                                    <option>请选择</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label"
                                for="institutionTypeId"><b class="red">*</b>机构类型 ：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="institutionTypeId" disabled="disabled" name="institutionTypeId">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label"
                                for="user_role"><b class="red">*</b>所属角色：</label>
                            <div class="col-md-5">
                                <select class="form-control" id="user_role" name="user_role">
                                    <option>请选择</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="trueName"><b class="red">*</b>姓名：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="trueName"
                                    name="trueName" placeholder="联系人姓名">
                            </div>
                        </div>
                      
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="password"><b class="red">*</b>登录密码：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="password"
                                    name="password"
                                    placeholder="6-16个字符、支持数字，大小写字母、符号" type="password">
                            </div>
                        </div>
	                     <div class="form-group">
	                     <label class="col-md-2 control-label"></label>
	                        <div class="col-md-2  btn-choose user-save">
	                            <a href="#" class="btn btn-default btn-gray btn-cancel btn-close" data-back-to="">取消</a> 
	                        </div>
	                        <div class="col-md-2 btn-choose user-save btn-right">
	                            <span class="btn btn-primary btn-red btn-confirm btn-save" data-role="target-btn" data-id="lifting-pledgeList">确定</span>
	                        </div>
	                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>