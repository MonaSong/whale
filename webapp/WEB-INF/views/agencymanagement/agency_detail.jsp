<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/agencymanagement/agency_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/agencymanagement/agency_detail.js"></script>
<link href="<%=request.getContextPath()%>/css/agencymanagement/angncy_detail.css" rel="stylesheet">
<title>机构管理</title>
<div class="main-content-container">
	<div class="s-container">
	    <!-- 错误信息提示 -->
	    <div name='publicError'></div>
		<!-- 页面主体内容 -->
		<div class="s-page-content">
			<div class="whale-well whale-well-min clearfix whale-details">
				<div class="whale-well-headding pull-left">
					<h4 class="whale-well-title">机构管理</h4>
				</div>
			</div>
			<div class="whale-pane-body">
                    <form method="get" class="form-horizontal form-data-pane form-content col-xs-12 agency_page" role="form" id="agency-form" action="">
					<div class="form-group">
						<label class="col-md-2 control-label" for="agency_name">机构名称：</label>
						<div class="col-md-5">
							<input class="form-control" id="agency_name" disabled="disabled" name="agency_name">
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
						<label class="col-md-2 control-label" for="agency_type"><b class="red">*</b>机构类型：</label>
						<div class="col-md-5">
							<input class="form-control" id="agency_type" disabled="disabled" name="agency_type">
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
							<input class="form-control" id="institutionContactNums" name="institutionContactNums"
								placeholder="输入机构联系人电话">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label" for="agency_status">状态：</label>
						<div class="col-md-5">
							<label class="animate-checkbox"> <input type="checkbox" name="" id="agency_status"> <span><b class="on"></b></span>
								<b class="off">OFF</b>
							</label>
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
                    </div>
				</form>
			</div>
		</div>
	</div>
</div>
