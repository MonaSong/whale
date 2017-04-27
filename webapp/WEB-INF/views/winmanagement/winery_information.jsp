<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<link href="<%=request.getContextPath()%>/css/winmanagement/win_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/winmanagement/winery_infomation.js"></script>
<style>
</style>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">酒厂信息</h4>
                    </div>
                </div>
                <div class="whale-pane-body user-information">
                    <div  class="form-horizontal form-data-pane col-xs-12" role="form" id="user-form1" action="">
                    <form method="POST" class="form-horizontal" enctype="multipart/form-data" role="form" id="winery-mation" action="">
                        <div class="whale-pane ">
                             <div class="whale-pane-heading ">
                                <h4 class="whale-pane-title">联系人信息</h4>
                            </div>
                        </div>
                        <div class="contact-information">
                            <div class="form-group form-group-sm">
                                <label class="col-xs-2 control-label" for="username">手机号：</label>
                                <div class="col-xs-5">
                                    <input class="form-control" disabled="disabled" type="text" id="mobile" name="mobile" placeholder="输入您的手机号">
                                </div>
                            </div>
                            <div class="form-group form-group-sm">
                                <label class="col-md-2 control-label" for="mobile">联系人：</label>
                                <div class="col-md-5">
                                    <input class="form-control" disabled="disabled" type="text" id="username" name="username" placeholder="联系人姓名">
                                </div>
                                <div>
                                    <span class="notice hide">输入正确的手机号码</span>
                                </div>
                            </div>
                            <div class="form-group form-group-sm">
                                <label class="col-md-2 control-label" for="userDuty">职务：</label>
                                <div class="col-md-5">
                                    <input class="form-control" type="text" id="userDuty" name="userDuty" placeholder="联系人职务">
                                </div>
                            </div>
                          <div class="whale-pane ">
                             <div class="whale-pane-heading ">
                                <h4 class="whale-pane-title">企业信息</h4>
                            </div>
                        </div>
                        <div class="business-information">
                            <div class="form-group">
                                <label class="col-xs-2 control-label" for="companyName">单位全称：</label>
                                <div class="col-xs-5">
                                    <input class="form-control" disabled="disabled" type="text" id="companyName" name="companyName" placeholder="输入单位全称，最长30个字符">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="companyAddress">联系地址：</label>
                                <div class="col-md-1" data-role="prov">
                                    <select id="companyProvince"  class="form-control" placeholder="请选择">
                                    
                                    </select>
                                </div>
                                <div class="col-md-1" data-role="city">
                                    <select id="companyCity"  class="form-control" placeholder="请选择">
                                    
                                    </select>
                                </div>
                                 <div class="col-md-3">
                                    <input class="form-control address"  type="text" id="companyAddress" name="companyAddress" placeholder="输入联系地址，最长30个字符">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label" for="businessLicenseNum">营业执照号码：</label>
                                <div class="col-xs-5">
                                    <input class="form-control" disabled="disabled" type="text" id="businessLicenseNum" name="businessLicenseNum" placeholder="输入您单位的营业执照号码">
                                </div>
                            </div>
                        </div>
                      <div class="whale-pane">
                            <div class="whale-pane-heading">
                                <h4 class="whale-pane-title">企业证照信息</h4>
                            </div>
                            <div class="whale-pane-body">
                                <div class="form-group">
                                    <label class="col-xs-2 text-right control-label">营业执照电子版正本：</label>
                                    <div class="col-xs-5">
                                       <input class="form-control" type="file" placeholder="" name="bussinessLicense" id="bussinessLicense">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-2 text-right control-label ">税务登记扫描件：</label>
									<div class="col-xs-5">
										<input class="form-control" type="file" placeholder=""
											name="legalBackCardPic" id="legalBackCardPic" value="默认信息">
									</div>
									</div>
                                <div class="form-group">
                                    <label class="col-xs-2 text-right control-label ">法人代表身份证正面扫描件：</label>
										<div class="col-xs-5">
											<input  class="form-control" type="file" name="legalFrontCardPic"
												id="legalFrontCardPic">
										</div>
								</div>
                                <div class="form-group">
                                    <label class="col-xs-2 text-right control-label ">法人代表身份证背面扫描件：</label>
									<div class="col-xs-5">
										<input class="form-control" type="file" name="taxRegistration"
											id="taxRegistration">
									</div>
								</div>
									<div class="form-group">
                                    <label class="col-xs-2 text-right control-label ">酒厂现场照片：</label>
										<div class="col-xs-5">
											<input class="form-control" placeholder="" type="file"
												name="wineryLivePic" id="wineryLivePic">
										</div>
									</div>
                       <div class="form-group form-group-md">
                        <div class="row">
                            <div class="col-xs-5 btn-choose col-xs-offset-2">
                                <span class="btn btn-default btn-gray btn-cancel btn-message-call">取消</span>
                                 <span class="btn btn-default btn-red btn-confirm btn-message-role" data-toggle="modal" data-toggle="modal" data-target=".bs-example-modal-md">确定</span>
                            </div>
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    