<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/partnermanagement/partner_detail.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/partnermanagement/partner_management_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/partnermanagement/partner_new.js"></script>
<title>合作方管理</title>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">合作方管理</h4>
                    </div>
                </div>
                <div class="whale-pane-body partner-information">
                    <form method="get" class="form-horizontal form-data-pane col-xs-12" role="form" id="partner-form" action="">
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="partnerName"><b class="red">*</b>合作方名称：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="partnerName" name="partnerName" placeholder="输入合作方名称">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-md-2 control-label" for="partnerTypeId"><b class="red">*</b>合作方类型：</label>
                            <div class="col-md-5">
                                <select class="form-control" id="partnerTypeId" name="partnerTypeId" required>
                                <option value='0' selected='selected'>请选择合作方类型</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-md-2 control-label" for="partnerContacts"><b class="red">*</b>联系人：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="partnerContacts" name="partnerContacts" placeholder="输入联系人">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-md-2 control-label" for="partnerContactsNums"><b class="red">*</b>联系方式：</label>
                            <div class="col-md-5">
                                <input class="form-control" id="partnerContactsNums" name="partnerContactsNums" placeholder="输入联系方式">
                            </div>
                        </div>                         
                       <div class="form-group">
                         <label class="col-md-2 control-label"></label>
                            <div class="col-md-2  btn-choose user-save">
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-close" >取消</a> 
                            </div>
                            <div class="col-md-2 btn-choose user-save btn-right">
                                <span class="btn btn-primary btn-red btn-confirm btn-save">确定</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>