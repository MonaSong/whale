<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/overduesettlementmanagement/overdue_settlement_management.css"></link>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementrequestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/release_policy.js"></script>
<title>解除保单</title>
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
                <!-- 解押保单 -->
                <form role="form" action="" data-pane-id="release-policy" class="form-horizontal form-data-pane col-md-12 clearfix">
                  <div class="col-xs-12">
                       <div class="form-group clearfix">
                           <span class="pull-right hide-status text-static" data-management-info="">
                               <b data-role-name="">角色：姓名</b>
                               <b data-true-name="">办理时间：</b>
                               <b data-management-time="">2016-12-12</b>
                           </span>
                           <h4 class="col-md-5 black">解除保单<b name="institutionName"></b></h4>
                       </div>                
                            <div class="form-group">
                                <label class="col-md-2 control-label">收款金额：</label>
                                <div class="col-md-3">
                                    <input class="form-control" placeholder="" type='text' data-role="whale-money" name="insuranceCollectedAmount">
                                </div>
                                <div class="col-md-1 text-static">
                                   元
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">收款凭证：</label>
                                <div class="col-md-3">
                                    <input class="form-control" placeholder="" type="file" name="insuranceCollectedFile" id="insuranceCollectedFile">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label">解押通知书：</label>
                                <div class="col-md-3">
                                    <input class="form-control" placeholder="" type="file" name="insuranceClosePledgeFile" id="insuranceClosePledgeFile">
                                </div>
                            </div>
                          <div class="form-group clearfix" data-operater-bottom>   
                              <div class="col-xs-12 btn-choose col-md-offset-2">
                                  <a herf="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                  <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-id="submit-release-policy">确定</span>
                              </div>
                          </div> 
                      </div>                
                </form>
            </div>
        </div>
    </div>
</div>