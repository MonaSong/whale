<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/overduesettlementmanagement/overdue_settlement_management.css"></link>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementrequestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/delivery_notes.js"></script>
<title>提货</title>
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
                <!-- 提货 -->
                <form role="form" action="" data-pane-id="delivery-notes" class="form-horizontal form-data-pane col-md-12">
                   <div class="col-xs-12">
                       <div class="form-group clearfix">
                           <span class="pull-right hide-status text-static" data-management-info="">
                               <b data-role-name=""></b>
                               <b data-true-name=""></b>
                               <b data-management-time=""></b>
                           </span>
                           <h4 class="col-md-5 black">提货<b name="institutionName"></b></h4>
                       </div>                
                            <div class="form-group">
                                <label class="col-md-2 control-label">提货单：</label>
                                <div class="col-md-3">
                                    <input class="form-control" placeholder="" type="file" name="deliveryAccessory" id="deliveryAccessory">
                                </div>
                            </div>
                          <div class="form-group " data-operater-bottom>   
                              <div class="col-xs-12 btn-choose col-md-offset-2">
                                  <a herf="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                  <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-id="submit-delivery-notes">确定</span>
                              </div>
                          </div>
                      </div>                
                </form>
            </div>
        </div>
    </div>
</div>