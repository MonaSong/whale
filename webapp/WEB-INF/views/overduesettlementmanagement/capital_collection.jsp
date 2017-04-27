<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/overduesettlementmanagement/overdue_settlement_management.css"></link>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementrequestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/capital_collection.js"></script>
<title>资方收款</title>
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
                <!-- 资方收款 -->
                <form role="form" action="" data-pane-id="capital-collection" class="form-horizontal form-data-pane col-md-12 hide-status capital_form clearfix">
                    <div class="col-xs-12">
                         <div class="form-group clearfix">
                             <span class="pull-right hide-status text-static" data-management-info="">
                                 <b data-role-name=""></b>
                                 <b data-true-name=""></b>
                                 <b data-management-time=""></b>
                             </span>
                             <h4 class="col-md-5 black">资方收款<b name="institutionName"></b></h4>
                         </div>                
                         <div class="form-group">
                              <label class="col-md-2 control-label">收款金额：</label>
                              <div class="col-md-3">
                                  <input class="form-control" placeholder="" type='text' data-role="whale-money" name="collectedAmount">
                              </div>
                              <div class="col-md-1 text-static">
                                  元
                              </div>
                           </div>
                              <div class="form-group">
                                  <label class="col-md-2 control-label">收款凭证：</label>
                                  <div class="col-md-3">
                                      <input class="form-control" placeholder="" type="file" name="collectAccessory" id="collectAccessory">
                                  </div>
                              </div>
                            <div class="form-group" data-operater-bottom>   
                                <div class="col-xs-12 btn-choose col-md-offset-2">
                                    <a herf="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                    <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-id="submit-capital-collection">确定</span>
                                </div>
                            </div> 
                      </div>            
                </form>

                <!-- 资方收款-监管方 -->
                <form role="form" action="" data-pane-id="jg-operator" class="form-horizontal form-data-pane col-md-12 hide-status">
                   <div class="col-xs-12">
                        <div class="form-group clearfix">
                           <span class="pull-right hide-status" data-management-info="">
                               <b data-role-name=""></b>
                               <b data-true-name=""></b>
                               <b data-management-time=""></b>
                           </span>
                           <h4 class="col-md-2 black">资方收款</h4>
                        </div>                
                        <div class="complete-icon-info">              
                            <div class="form-group">
                                <span class="common-img green-complete-icon"></span>
                                <label class="control-label text-left">本步骤已办理完毕。</label>
                            </div>
                            <div class="form-group">
                                  <label class="control-label text-left">您所在的机构没有权限查看本页面内容</label>
                            </div>
                        </div> 
                      </div>                
                </form>


            </div>
        </div>
    </div>
</div>