<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/overduesettlementmanagement/overdue_settlement_management.css"></link>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementrequestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementdetail.js"></script>
<title>发起理赔</title>

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
	            <!-- 发起理赔 -->
	            <form role="form" action="" data-pane-id="start_over_due" class="form-horizontal form-data-pane col-md-12 hide-status clearfix">
                  <div class="col-xs-12">
                       <div class="form-group clearfix">
                           <span class="pull-right hide-status text-static" data-management-info="">
                               <b data-role-name=""></b>
                               <b data-true-name=""></b>
                               <b data-management-time=""></b>
                           </span>
                           <h4 class="col-md-5 black">发起理赔<b name="institutionName"></b></h4>
                       </div>  

                       <div class="data-list-right">
                           <div class="col-md-4">
                                  <p>还款编号：<b name="repaymentBusinessKey"></b></p>
                                  <p>资金方：<b name="loanCompanyName"></b></p>
                                  <p>融资金额：<b name="loanAmoun"></b></p>
                                  <P>逾期期次：<b name="overdueTimes"></b></P>
                              </div>
                              <div class="col-md-4">
                                  <p>酒厂名称：<b name="wineryCompanyName"></b></p>
                                  <p>履约保险方：<b name="insurerInstitutionName"></b></p>
                                  <P>融资期限：<b name="financingPeriod"></b></P>
                                  <p>还款总额：<b name="repaymentTotalAmount"></b></p>
                              </div>
                              <div class="col-md-4">
                                  <P>监管方：<b name="regulatorInstitutionName"></b></P>
                                  <p>已还总额：<b name="alreadyRepaymentAmount"></b></p>
                              </div>
                       </div>

                       <div class="form-group  col-md-12" >
                           <label class="col-md-2 control-label text-left">赔付金额：</label>
                           <div class="col-md-3">
                               <input class="form-control" type='text' data-role="whale-money"  name='compensationAmount' id='compensationAmount'>
                           </div>
                           <div class="col-md-1 text-static">
                               元
                           </div>
                       </div>

                       <div class="form-group col-md-12">
                            <label class="col-md-2 control-label text-left">理赔申请书：</label>
                            <div class="col-md-3">
                                <input class="form-control" placeholder="" type="file" name="receiptAccessory" id="receiptAccessory">
                            </div>
                       </div>

                       <div class="form-group clearfix  btn-choose" data-operater-bottom>   
    		                    <div class="col-xs-12 col-md-offset-2  btn-choose">
    		                        <a href="<%=request.getContextPath()%>/overdue/overdue_settlement_page" class="btn btn-default btn-gray btn-cancel">取消</a>

    		                        <span class="btn btn-primary btn-red btn-confirm col-md-offset-1"  data-role="target-btn" id="submit-new-overdue-data">确定</span>
    		                    </div>
                       </div>
                   </div>                       
	            </form>

              <!-- 发起理赔-监管方 -->
              <form role="form" action="" data-pane-id="jg-operator" class="form-horizontal form-data-pane col-md-12 hide-status">
                 <div class="col-xs-12">
                     <div class="form-group clearfix">
                         <span class="pull-right hide-status" data-management-info="">
                             <b data-role-name=""></b>
                             <b data-true-name=""></b>
                             <b data-management-time=""></b>
                         </span>
                         <h4 class="col-md-2 black">发起理赔</h4>
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