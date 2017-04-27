<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/riskmanagement/risk_management.css"></link>
<title>风险审核</title>
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
                <!-- <%@ include file="../layouts/risk_menu.jsp"%> -->
            </div>
            <div class="form-container">
                <!-- 风险审核 -->
                <form role="form" action="" data-pane-id="risk-audit" class="form-horizontal form-data-pane col-xs-12">
                    <div class="col-md-12">
                       <div class="form-group clearfix">
                           <span class="pull-right hide-status text-static" data-management-info="">
                               <b data-role-name=""></b>
                               <b data-true-name=""></b>
                               <b data-management-time=""></b>
                           </span>
                           <h4 class="col-md-5 black">风险审核<b name="institutionName"></b></h4>
                       </div>                
                       <div class="form-group clearfix" >
                           <label class="col-md-2 control-label">审核结果：</label>
                           <div class="col-md-5">
                            <select class="form-control" data-role="control-btn" name="riskAuditResult">
                                <option value=""></option>
                                <option value="agree">风险预警</option>
                                <option value="refuse">风险关闭</option>
                            </select>
                            </div>
                       </div>
                       <div class="form-group clearfix" >
                           <label class="col-md-2 control-label">审核意见：</label>
                           <div class="col-md-5">
                               <textarea class="form-control textarea-view" name="riskAuditMsg" data-role="control-btn" placeholder="请填写审核意见"></textarea> 
                           </div>
                       </div>
                       <div class="form-group clearfix" >
                           <label class="col-md-2 control-label">附件：</label>
                           <div class="col-md-3">
                                <input class="form-control" type="file" name="riskWarnAuditAccessory" id="riskWarnAuditAccessory">
                            </div>
                       </div>
                       <div class="form-group clearfix  btn-choose hide-status" operator-bottom>
                           <div class="col-xs-12 col-md-offset-2">
                               <a class="btn btn-default btn-gray btn-cancel" data-back-to>取消</a>
                               <span class="btn btn-primary btn-red btn-confirm col-md-offset-1" data-role="submit-warn-audit">确定</span>
                           </div>
                       </div>  
                   </div>              
                </form>
            </div>
        </div>
    </div>
</div>

<script src="<%=request.getContextPath()%>/js/riskmanagement/risk_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/riskmanagement/risk_audit.js"></script>