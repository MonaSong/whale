    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/performance_insurance.js"></script>
        <title>履约保险</title>
        <!-- 页面主容器 -->
        <div  class="main-content-container">
        <div name="publicError"></div> 
        <div class="s-container">
        <!-- 页面内容 --> 
        <div class="s-page-content">
        <div class="whale-well whale-well-min clearfix">
        <div class="whale-well-headding pull-left">
        <h4 class="whale-well-title">融资申请</h4>
        </div>
        </div>
        <div id="left-menu" class="left-menu"></div>
        <div class="form-container">
            <div name="publicError"></div>
            <div class="container whale-container">    
                <div class="row">
                    <div class="col-xs-12"> 
                        <div class="min-height-500-box clearfix">
                            <form role="form" action=""  data-pane-id="lvyue-insurance" class="form-horizontal form-data-pane col-md-12 "> 
                                <div class="col-xs-12"> 
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">履约保险<span name="institutionName"></span></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保单名称：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="policyName" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>投保人：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="policyHolder" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>保险人：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="insurer" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>保险费：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money" name="insurancePremium" class="form-control">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>有效期：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="validityTerm" class="form-control">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            年
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>履约保险单：</label>
                                        <div class="col-md-5">
                                            <input type="file" name="performancePolicyAccessory" id="performancePolicyAccessory" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix btn-choose" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-red btn-confirm" data-role="target-btn"  data-id="insurer-confirm" data-info="履约保险方操作员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form> 

                            <!-- 履约保险真安金服 -->
                            <form role="form" action=""  data-pane-id="zhen-an-insurance" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">履约保险<b name="institutionName"></b></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select name="insuranceResult" id="" class="form-control" data-role="control-btn">
                                                <option value=""></option>
                                                <option value="agree">审核通过</option>
                                                <option value="return">退回修改</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea name="insuranceResultMsg" id="" cols="30" rows="3" class="form-control" data-role="control-btn"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group clearfix btn-choose" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-red btn-confirm" data-role="target-btn" disabled data-id="zhen-an-insurance-confirm" data-info="真安信审员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form>

                            <!-- 合同审核酒厂 -->
                            <form role="form" action="" data-pane-id="winery-lvyue-audit" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right text-static" data-update-at></span>
                                        <h4 class="col-md-2 black">酒厂业务员</h4>
                                    </div> 

                                    <div class="form-group clearfix">
                                        <label class="col-md-2 control-label">审核结果</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="wineryQualifyResult" readonly="readonly" disabled="">
                                                <option  value=""></option>
                                                <option  value="being-audited">审核中</option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="refuse"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-winery-opinion >
                                        <label class="col-md-2 control-label" name="">审核意见</label>
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
