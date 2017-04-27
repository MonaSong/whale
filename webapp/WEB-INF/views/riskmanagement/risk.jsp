<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<div class="main-content-container">
    <div class="s-container">
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
                <div name="publicError"></div> 
                <!-- 风险审核 -->
                <form role="form" action="" data-pane-id="" class="form-horizontal form-data-pane col-xs-12">
                   <div class="form-group clearfix col-xs-12">
                       <span class="pull-right hide-status" data-management-info="">
                           <b data-role-name=""></b>
                           <b data-true-name=""></b>
                           <b data-management-time=""></b>
                       </span>
                       <h4 class="col-xs-2 black">风险审核（真安）</h4>
                   </div>                
                   <div class="form-group clearfix col-xs-12" >
                       <label class="col-xs-2 control-label">业务编号：</label>
                       <div class="col-xs-4">
                            <input class="form-control" id="audit_result" name="audit_result">
                        </div>
                   </div>
                   <div class="form-group clearfix col-xs-12" >
                       <label class="col-xs-2 control-label">风险描述：</label>
                       <div class="col-xs-5 ">
                           <textarea class="form-control textarea-view" name="assistantAuditOpinion" data-role="control-btn" placeholder="请填写审核意见"></textarea>
                       </div>
                   </div>
                   <div class="form-group clearfix col-xs-12" >
                       <label class="col-xs-2 control-label">附件：</label>
                       <div class="col-xs-3">
                            <input class="form-control" type="file">
                        </div>
                   </div>
                   <div class="form-group clearfix col-xs-12">
                       <div class="col-xs-2 col-xs-offset-3">
                           <span class="btn btn-default btn-close">取消</span>
                           <span class="btn btn-primary btn-save">确定</span>
                       </div>
                   </div>                
                </form>
            </div>
        </div>
    </div>
</div>