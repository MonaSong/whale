<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/maturitydecompression/matuirty_decompression.css"></link>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/start_decompression.js"></script>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/maturity_decompression_requestdata.js"></script>
<!-- 首页内容显示区 -->
<title>到期解押</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 错误信息提示 -->
        <div name="publicError"></div>
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">到期解押</h4>
                </div>
            </div>
            <div id="left-menu" class="left-menu">
                <%@ include file="../layouts/maturity_menu.jsp"%>
            </div>
            <div class="form-container">
                <form role="form" action="" data-id="assistant-audit-control" class="form-horizontal form-data-pane clearfix  col-md-12 matuirty" >
                    <div class="col-xs-12">
                            <div class="form-group ">
                                <span class="pull-right" data-management-info>
                                      <b data-role-name=""></b>
                                      <b data-true-name="" class="startName"></b>
                                      <b data-management-time=""></b>
                                  </span>
                                <h4 class="col-md-5 black">启动解押<span name="liftingPledge"></span></h4>
                            </div>
							<div class="data-list-right" id="stat_pression">
	                            <div class="start_show">
	                                <div class="clearfix">
	                                    <div class="col-xs-12 col-md-4"><span>还款编号：</span><b name="repaymentBusinessKey"></b></div>                                
	                                    <div class="col-xs-12 col-md-4"><span>酒厂名称：</span><b name="wineryCompanyName"></b></div>
	                                </div>
	                                <div class="col-xs-12 col-md-4"><span>资金方：</span><b name="loanCompanyName"></b></div>
	                                <div class="col-xs-12 col-md-4"><span>融资金额：</span><b name="loanAmoun"></b></div>                                    
	                                <div class="col-xs-12 col-md-4"><span>融资期限：</span><b name="financingPeriod"></b></div>
	                                
	
	                                <div class="col-xs-12 col-md-4"><span>还款总额：</span><b name="repaymentTotalAmount"></b></div> 
	                                <div class="col-xs-12 col-md-4"><span>已还总额：</span><b name="alreadyRepaymentAmount"></b></div>
	                                <div class="col-xs-12 col-md-4"><span>还款状态：</span><b name="repaymentStatus"></b></div>
	                                
	                            </div>
							</div>
							<div class="start-content">
							
							</div>
                             <div class="form-group " id="start-submit">
                            <div class="col-md-offset-2 col-xs-12  btn-choose start-ression" data-operater-bottom>  
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-operation" data-back-to="">返回</a> 
                                <span class="btn btn-primary btn-red col-md-offset-1 btn-confirm Strat-submit" data-role="target-btn" data-id="assistant-audit">确定</span>
                            </div>
                        </div> 
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>