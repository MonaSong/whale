<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/agencymanagement/angncy_detail.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/agencymanagement/agency_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/agencymanagement/agency_new.js"></script>
<title>机构管理</title>
<body>
	<div class="main-content-container">
		<div class="s-container">
		    <!-- 错误信息提示 -->
            <div name='publicError'></div>
			<!-- 页面主体内容 -->
			<div class="s-page-content">
				<div class="whale-well whale-well-min clearfix">
					<div class="whale-well-headding pull-left">
						<h4 class="whale-well-title">机构管理</h4>
					</div>
				</div>
				<div class="whale-pane-body agency-information">
					<form method="get" class="form-horizontal form-data-pane col-xs-12" role="form"
						id="agency-form" action="">
						<div class="form-group">
							<label class="col-md-2 control-label" for="institutionName"><b class="red">*</b>机构名称：</label>
							<div class="col-md-5">
								<input class="form-control" id="institutionName" name="institutionName"
									placeholder="输入机构全称">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label" for="institutionAddress"><b class="red">*</b>机构地址：</label>
							<div class="col-md-5">
								<input class="form-control" id="institutionAddress"
									name="institutionAddress" placeholder="输入机构办公地址">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label" for="institutionTypeId"><b class="red">*</b>机构类型：</label>
							<div class="col-md-5">
								<select class="form-control" id="institutionTypeId" name="institutionTypeId">
									<option value='0' selected="selected">请选择机构类型</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label" for="institutionContact"><b class="red">*</b>联系人：</label>
							<div class="col-md-5">
								<input class="form-control" id="institutionContact"
									name="institutionContact" placeholder="输入机构联系人姓名">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label" for="institutionContactNums"><b class="red">*</b>联系电话：</label>
							<div class="col-md-5">
								<input class="form-control" id="institutionContactNums"
									name="institutionContactNums" placeholder="输入机构联系人电话">
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-md-2 control-label" for="agency-status">启用状态：</label>
							<div class="col-md-5">
								<label class="animate-checkbox"> <input type="checkbox"
									name="" class="agency-status" status='0'> <span><b
										class="on"></b></span> <b class="off">OFF</b>
								</label>
							</div>
						</div>
                       <div class="form-group">
                         <label class="col-md-2 control-label"></label>
                            <div class="col-md-2  btn-choose user-save">
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-close">取消</a> 
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
