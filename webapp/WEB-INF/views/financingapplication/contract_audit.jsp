    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <title>合同审核</title>
        <!-- 页面主容器 -->
        <div  class="main-content-container">
        <div class="s-container"> 
        <!-- 错误信息提示 -->
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
                            <!-- 真安风控专员 -->
                            <form role="form" action=""  data-pane-id="risk-contract" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">合同审核<b name="institutionName"></b></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="riskContractResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">同意</option>
                                                <option  value="return">回退</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="riskContractOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn" disabled data-id="risk-contract-confirm" data-info="真安风控中心" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form>   


                            <!-- 资方 -->
                            <form role="form" action=""  data-pane-id="capital-contract" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">合同审核<span name="InstitutionName"></span></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="capitalContractResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">同意</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="capitalContractOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn" disabled data-id="zf-contract-confirm" data-info="合同审核-资方审核成功" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form>


                            <!-- 合同审核酒厂 -->
                            <form role="form" action="" data-pane-id="winery" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <b class="pull-right" data-update-at></b>
                                        <h4 class="col-md-2 black">合同审核</h4>
                                    </div> 

                                    <div class="form-group clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="wineryResult" readonly="readonly" disabled="">
                                                <option  value=""></option>
                                                <option  value="being-audited">正在审核中</option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-winery-opinion >
                                        <label class="col-md-2 control-label" name="">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="wineryQualifyOpinion"  placeholder=""></textarea>
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
<script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/financmanagement/contract_audit.js"></script>
