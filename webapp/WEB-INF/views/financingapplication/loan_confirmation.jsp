    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/loan_confirmation.js"></script>
        <title>放款确认</title>
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
            <div class="container whale-container">    
                <div class="row">
                    <div class="col-xs-12">
                        <div class="min-height-500-box clearfix">
                            <!-- 放款确认-资方 -->
                            <form role="form" action=""  data-pane-id="zf-loan" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">放款确认<span name="span-bankInstitutionName"></span></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">收款单位：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="wineryName" disabled="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>贷款单位开户行：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="financingBankName" disabled="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>贷款单位账户：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="financingAccount" disabled="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>贷款金额：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="applyFinancingAmount" disabled="" class="form-control">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>放款单位：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="bankInstitutionName" disabled="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>实际放款金额：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money" name="realLoanAmount" class="form-control" value="">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>年化利率：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="annualInterestRate" class="form-control" value="">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            %
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>放款时间：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="loanTime" class="form-control"  value="" data-date>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>到期时间：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="dueTime" class="form-control" value="" data-date>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>还款方式：</label>
                                        <div class="col-md-5">
                                            <!-- <input type="text" name="repaymentMethod" class="form-control" value=""> -->
                                            <select name="repaymentMethod" id="" class="form-control">
                                                <option value=""></option>
                                                <option value="按月付息，到期还本">按月付息，到期还本</option>
                                                <option value="按季付息，到期还本">按季付息，到期还本</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>贷款期限：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="financingPeriod" class="form-control" value="">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            年
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>放款凭证：</label>
                                        <div class="col-md-5">
                                            <input type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" name="loanVoucherAccessory" id="loanVoucherAccessory" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn"  data-id="zf-loan-confirm" data-info="资方操作员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form> 

                            <!-- 放款确认-真安信审员确认资方放款 -->
                            <form role="form" action=""  data-pane-id="zhen-an-zf-loan" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">放款确认<b name="institutionName"></b></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select name="creditLoanResult" id="" value="" class="form-control" data-role="control-btn">
                                                <option value=""></option>
                                                <option value="agree">审核通过</option>
                                                <option value="return">退回修改</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="creditLoanResultMsg"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn" disabled data-id="zhen-an-zf-confirm" data-info="真安信审员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form>

                            <!-- 放款确认-中酒风控专员确认收款 -->
                            <form role="form" action=""  data-pane-id="zhong-jiu-zf" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">放款确认<b name="institutionName"></b></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>收款单位：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="payeeUnit" disabled class="form-control"  value="" >
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>贷款金额：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-number" name="applyFinancingAmount" disabled class="form-control" value="" >
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div>
                                    
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>实收金额：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money" name="receiveAmount" class="form-control" value="">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>到账时间：</label>
                                        <div class="col-md-5">
                                            <input type="text" name="arrivalTime" class="form-control" value="" data-date>
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>收款凭证：</label>
                                        <div class="col-md-5">
                                            <input type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" name="receiptVoucherAccessory" id="receiptVoucherAccessory" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn"  data-id="zhong-jiu-confirm" data-info="中酒风控专员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form>
                            
                            <!-- 放款确认-真安信审员确认中酒收款 -->
                            <form role="form" action=""  data-pane-id="zhen-an-zj-loan" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">放款确认<b name="institutionName"></b></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select name="creditReceiptResult" id="" class="form-control" data-role="control-btn">
                                                <option value=""></option>
                                                <option value="agree">审核通过</option>
                                                <option value="return">退回修改</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="creditReceiptResultMsg"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn" disabled data-id="zhen-an-zj-confirm" data-info="真安信审员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                
                            </form>



                            <!-- 合同审核酒厂 -->
                            <form role="form" action="" data-pane-id="winery-qualification-audit" class="form-horizontal form-data-pane col-md-12"> 
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
