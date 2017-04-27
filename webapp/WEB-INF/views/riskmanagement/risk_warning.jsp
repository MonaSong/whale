<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/riskmanagement/risk_management.css"></link>
<title>风险提示</title>

<div class="main-content-container">
    <div class="s-container">
        <!-- 公共错误信息 -->
        <div name="publicError"></div>
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">风险管理</h4>
                </div>
            </div>
            <div id='left-menu' class="left-menu">
                <%@ include file="../layouts/risk_menu.jsp"%>
            </div>
            <div class="form-container">
                
                <!-- 风险提示 -->
                <form role="form" action="" data-pane-id="risk-start" class="form-horizontal form-data-pane col-md-12 clearfix">
                    <div class="col-xs-12">
                        <div class="form-group clearfix">
                            <span class="pull-right hide-status text-static" data-management-info="">
                               <b data-role-name=""></b>
                               <b data-true-name=""></b>
                               <b data-management-time=""></b>
                           </span>
                            <h4 class="col-md-5 black">风险提示<b name="institutionName"></b></h4>
                        </div>
                        <div class="form-group clearfix">
                            <div class="warning-info clearfix">
                                <div class="hide-status clearfix" data-power="jg"> 
                                    <div class="col-md-4">
                                        <p><span>质押物编号：</span><b name="pledgeBusinessKey"></b></p>
                                        <p><span>质权人：</span><b name="pledgeeName"></b></p>
                                        <p><span>质押物总价：</span><b name="evaluationPrice"></b></p>
                                    </div>
                                    <div class="col-md-4">
                                        <p><span>出质日期：</span><b name="qualityDate"></b></p>
                                        <p><span>出质人：</span><b name="pledgorName"></b></p>
                                        <p><span>质押物数量：</span><b name="baseWineNum"></b></p>
                                    </div>   
                                </div>
                                <div class="hide-status clearfix" data-power="other">
                                    <div class="col-md-4">
                                        <p><span>还款编号：</span><b name="repaymentBusinessKey"></b></p>
                                        <p><span>资金方：</span><b name="loanCompanyName"></b></p>
                                        <p><span>还款总额：</span><b name="repaymentTotalAmount"></b></p>
                                        
                                    </div>
                                    <div class="col-md-4">
                                        <p><span>酒厂名称：</span><b name="wineryCompanyName"></b></p>
                                        <p><span>融资金额：</span><b name="loanAmoun"></b></p>
                                        <p><span>已还总额：</span><b name="alreadyRepaymentAmount"></b></p>
                                    </div>
                                    <div class="col-md-4">
                                        <p><span>融资期限：</span><b name="financingPeriod"></b></p>
                                        <p><span>还款状态：</span><b name="repaymentStatus"></b></p>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <div class="form-group clearfix col-md-12">
                            <label class="col-md-2 control-label text-left" for="message_content">风险描述：</label>
                            <div class="col-md-5">
                                <textarea class="form-control textarea-view"   name="riskDescription" placeholder="请填写审核意见" data-role="control-btn"></textarea>
                                <p data-role="font-length" class="hide-status">
                                    还可以书写<b></b>个文字
                                </p>
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <label class="col-md-2 text-left control-label ">附件：</label>
                            <div class="col-md-5">
                                <input class="form-control" placeholder="" type="file" name="descriptionFile" id="descriptionFile">
                            </div>
                        </div>
    	                <div class="form-group clearfix  btn-choose hide-status" operator-bottom>
    	                    <div class="col-xs-12 col-md-offset-2">
    	                        <a href="<%=request.getContextPath()%>/riskmanagement/risk_management_page" class="btn btn-default btn-gray btn-cancel">取消</a>
    	                        <span class="btn btn-primary btn-red btn-confirm col-md-offset-1" data-role="start-warning-process">确定</span>
    	                    </div>
    	                </div> 
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="<%=request.getContextPath()%>/js/riskmanagement/risk_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/riskmanagement/risk_warning.js"></script>