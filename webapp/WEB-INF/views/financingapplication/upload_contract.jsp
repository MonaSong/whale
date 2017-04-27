    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/upload_contract.js"></script>
        <title>上传合同</title>
        <!-- 页面主容器 -->
        <div  class="main-content-container">
        <div class="s-container">
        <div name="publicError"></div>
        <!-- 页面内容 -->
        <div class="s-page-content">
        <div class="whale-well whale-well-min clearfix">
        <div class="whale-well-headding pull-left">
        <h4 class="whale-well-title">融资申请</h4>
        </div>
        </div>
        <div id="left-menu" class="left-menu"></div>
        <div class="form-container">
            <div class="container whale-container">    
                <div class="row">
                    <div class="col-xs-12">
                        <div class="min-height-500-box clearfix">
                            <!-- 上传合同（真安金服） -->
                            <form role="form" action="" data-pane-id="upload-contract" class="form-horizontal form-data-pane col-md-12" style="display: block;">
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">上传合同<span name="InstitutionName"></span></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">贷款单位：</label>
                                        <div class="col-md-5">
                                            <input type="text"  class="form-control" name="applicantCompany">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>申请金额：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money"  class="form-control" name="applyFinancingAmount">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>粮食采购合同：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="foodPurchaseContract" id="foodPurchaseContract">
                                        </div>
                                    </div>
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>借款合同：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="loanContract" id="loanContract">
                                        </div>
                                    </div> 
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>动产质押合同：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="propertyPledgeContract" id="propertyPledgeContract">
                                        </div>
                                    </div> 
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>委托监管合同：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="commissionSupervisionContract" id="commissionSupervisionContract">
                                        </div>
                                    </div>
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>融资服务合同：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="financingServiceContract" id="financingServiceContract">
                                        </div>
                                    </div>                                                       
                                    <div class="form-group clearfix" data-operater-bottom>   
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn"  data-id="upload-contract-confirm" data-info="真安信审员" data-submit>确定</span>
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
        </div>
        </div>
        
    </div>