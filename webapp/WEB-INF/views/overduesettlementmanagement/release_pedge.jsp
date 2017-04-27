<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/overduesettlementmanagement/overdue_settlement_management.css"></link>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementrequestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/release_pedge.js"></script>
<title>解除质押</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">逾期理赔</h4>
                </div>
            </div>
            <div id='left-menu' class="left-menu">
                <%@ include file="../layouts/overduesettle_menu.jsp"%>
            </div>
            <div class="form-container">
                <div name="publicError"></div> 
                <!-- 解除质押 -->
                <form role="form" action="" data-pane-id="release-pledge" class="form-horizontal form-data-pane col-md-12 clearfix">
                  <div class="col-xs-12">
                       <div class="form-group clearfix">
                           <span class="pull-right hide-status text-static" data-management-info="">
                               <b data-role-name=""></b>
                               <b data-true-name=""></b>
                               <b data-management-time=""></b>
                           </span>
                           <h4 class="col-md-5 black">解除质押<b name="institutionName"></b></h4>
                       </div> 
                       <div class="form-group">
                           <label class="col-md-2 control-label">质押物编号：</label>
                           <div class="col-md-3 static-font">
                               <span name="pledgeBusinessKey"></span>
                           </div>
                       </div>               
                       <div class="form-group">
                           <label class="col-md-2 control-label">基酒数量：</label>
                           <div class="col-md-3">
                               <input class="form-control" type='text' data-role="whale-number" name="wineNumber">
                           </div>
                           <div class="col-md-1 text-static">
                               吨
                           </div>
                       </div>
                       <div class="form-group">
                           <label class="col-md-2 control-label">解押日期：</label>
                           <div class="col-md-3">
                               <input class="form-control"   type="text"  name="closePledgeDate" data-date>
                           </div>
                           <label class="col-md-1 control-label">签收人：</label>
                           <div class="col-md-3">
                               <input class="form-control" type='text' name="receiver">
                           </div>
                        </div>
                        <div class="form-group">
                              <label class="col-md-2 control-label">解押清单：</label>
                              <div class="col-md-3">
                                  <input class="form-control release_list" placeholder="" type="file" name="releasePledgeAccessory" id="releasePledgeAccessory" >
                              </div>
                        </div>
                        <div class="form-group clearfix" data-operater-bottom>   
                            <div class="col-xs-12 btn-choose col-md-offset-2">
                                <a href="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-id="submit-release-pledge">确定</span>
                            </div>
                        </div> 
                    </div>              
                </form>
            </div>
        </div>
    </div>
</div>