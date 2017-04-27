<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/winmanagement/win_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management.js"></script>
<title>助理审核</title>
<!-- 首页内容显示区 -->
<div class="main-content-container">	
	<div class="s-container">
		<!-- 错误信息提示 -->
		<div name="publicError"></div>
		<!-- 页面主体内容 -->
		<div class="s-page-content  s-content">
			<div class="whale-well whale-well-min clearfix">
				<div class="whale-well-headding pull-left">
					<h4 class="whale-well-title">助理审核</h4>
				</div>
			</div>
			<div id="left-menu" class="left-menu">
				<!-- 入驻申请菜单 -->
			</div>
			<div class="form-container">
				<div class="row">	
					<div class="col-xs-12">
						<form role="form" action="" class="form-horizontal clearfix" data-id="assistant-audit-control" data-handle-role="zj_transaction_assistant" data-role="container">
							<div class="form-horizontal form-data-pane col-md-12" data-animate-content>
								<div class="form-group">
									<span class="pull-right hide-status span-content" data-management-info="">
			                            <b data-role-name=""></b>
			                            <b data-true-name=""></b>
			                            <b data-management-time=""></b>
			                        </span>
									<h4 class="col-md-5 black  assistant-review">助理审核<b data-institution-name=""></b></h4>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">审核结果：</label>
									<div class="col-md-5">
										<select class="form-control col-md-4"
											name="assistantAuditResult" data-role="control-btn">
											<option value=""></option>
											<option value="agree">同意</option>
											<option value="return">回退</option>
											<option value="refuse">拒绝</option>
										</select>
									</div>	
								</div>	

								<div class="form-group">
									<label class="col-md-2 control-label">审核意见：</label>
									<div class="col-md-9">
										<textarea class="form-control textarea-view" name="assistantAuditOpinion"
											data-role="control-btn" placeholder="请填写审核意见" ></textarea>
										<p data-role="font-length" class="hide-status stage margin-left-6 margin-left-offset">
											还可以书写<b></b>个文字
										</p>
									</div>
								</div>
								<div class="form-group" data-operater-bottom>
									<div class="col-md-offset-2 col-md-2  btn-choose" >
										<a href="" class="btn btn-default btn-gray btn-cancel  " data-back-to>取消</a> 
									</div>
									<div class="col-md-2  btn-choose">	
										<span class="btn btn-primary btn-red btn-confirm  " data-role="target-btn" disabled data-id="assistant-audit" data-info="中酒事务助理">确定</span>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			
		</div>
	</div>
</div>