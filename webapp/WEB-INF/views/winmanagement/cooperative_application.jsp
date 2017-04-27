<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/winmanagement/win_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management.js"></script>
<title>合作申请</title>

<!-- 首页内容显示区 -->
<div class="main-content-container">
	<div class="s-container">
		<!-- 错误信息提示 -->
		<div name="publicError"></div>	
		<!-- 页面主体内容 -->
		<div class="s-page-content  page-content">
			<div class="whale-well whale-well-min clearfix">
				<div class="whale-well-headding pull-left">
					<h4 class="whale-well-title">合作申请</h4>
				</div>
			</div>
			<div id="left-menu" class="left-menu left-menu-info">
			</div>
			<div class="form-container">
				<div class="row">
					<div class="col-xs-12">
						<form role="form" action="" class="form-horizontal clearfix form-info-content">
					<div class="form-horizontal form-data-pane col-md-12" data-animate-content data-role="container">
						<!-- 营业执照信息 -->
						<div class="whale-pane  content-pane">
							<div class="whale-pane-heading">
								<h4 class="whale-pane-title">联系人信息</h4>
							</div>
							<div class="whale-pane-body">
								<div class="form-group form-tel">
									<label class="col-md-3 text-right control-label">手机号：</label>
									<div class="col-md-9">
										<p class="static-font" data-id="mobile"></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">联系人：</label>
									<div class="col-md-9">
										<p class="static-font" data-id="trueName"></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">职务：</label>
									<div class="col-md-9">
										<p class="static-font" data-id="userDuty"></p>
									</div>
								</div>
							</div>
						</div>

						<!-- 组织机构代码证信息 -->
						<div class="whale-pane content-pane">
							<div class="whale-pane-heading">
								<h4 class="whale-pane-title">企业基本信息</h4>
							</div>
							<div class="whale-pane-body">
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">单位全称：</label>
									<div class="col-md-9">
										<p class="static-font" data-id="companyName"></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">联系地址：</label>
									<div class="col-md-9">
										<p class="static-font">
											<span data-id="companyProvince"></span>
											<span data-id="companyCity"></span>
											<span data-id="companyAddress"></span>
										</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 text-right control-label  ">营业执照号码：</label>
									<div class="col-md-9">
										<p class="static-font" data-id="businessLicenseNum"></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">邀请码：</label>
									<div class="col-md-9">
										<p class="static-font" data-id="invitationCode"></p>
									</div>
								</div>

							</div>
						</div>

						<!-- 组织机构代码证信息 -->
						<div class="whale-pane content-pane">
							<div class="whale-pane-heading">
								<h4 class="whale-pane-title">企业证照信息</h4>
							</div>
							<div class="whale-pane-body">
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">营业执照电子版正本：</label>
									<div class="col-md-9">
										<p class="static-font">
											<span name="bussinessLicense">查看</span>
										</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 text-right control-label ">税务登记扫描件：</label>
									<div class="col-md-9">
										<p class="static-font">
											<span name="taxRegistration">查看</span>
										</p>
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 text-right control-label positive-scan-id-card">法人代表身份证正面扫描件：</label>
									<div class="col-md-9">
										<p class="static-font">
											<span name="legalFrontCardPic">查看</span>
										</p>
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 text-right control-label ">法人代表身份证背面扫描件：</label>
									<div class="col-md-9">
										<p class="static-font">
											<span name="legalBackCardPic">查看</span>
										</p>
									</div>	
								</div>

								<div class="form-group">
									<label class="col-md-3 text-right control-label  ">酒厂现场照片：</label>
									<div class="col-md-9">
										<p class="static-font">
											<span name="wineryLivePic">查看</span>
										</p>
									</div>	
								</div>
		 						<div class="form-group">
									<div class="col-md-9 col-md-offset-3 btn-choose btn-return">
										<a href="" class="btn btn-primary btn-confirm btn-red" data-back-to>返回</a>
									</div>
								</div> 

							</div>
						</div>
					</div>
				</form>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>