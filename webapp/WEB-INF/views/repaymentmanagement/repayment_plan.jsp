<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/repaymentmanagement/repayment_management.css"></link>
<script src="<%=request.getContextPath()%>/js/repaymentmanagement/repayment_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/repaymentmanagement/repayment_plan.js"></script>
<title>还款管理</title>
<div class="main-content-container">
	<div class="s-container">
	    <!-- 错误信息提示 -->
        <div name='publicError'></div>
		<!-- 页面主体内容 -->
		<div class="s-page-content clearfix">
			<div class="whale-well whale-well-min clearfix">
				<div class="whale-well-headding pull-left">
					<h4 class="whale-well-title">还款计划</h4>
				</div>
				<div class="whale-well-footer pull-right">
                   <div class="enableRepay">
                       <input type='button' class="btn start_plan pull-right" value="启用还款计划">
                   </div>
               </div>
			</div>
			<div class="whale-pane-body">
                <form method="get" class="form-horizontal form-data-pane col-xs-12 col-md-12" role="form" id="repayment-form" action="">
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="repayment_num">融资编号：</label>
                        <div class="col-md-9 repayment_num">
                            <span id="repayment_num" name="repayment_num"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="win_name">酒厂名称：</label>
                        <div class="col-md-9 win_name">
                            <span id="win_name" name="win_name"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="lending_unit">放款单位：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="lending_unit" disabled="disabled" name="lending_unit">
                        </div>
                        <label class="col-md-3 control-label" for="lending_time">放款时间：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="lending_time" disabled="disabled" name="lending_time">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="lending_money">放款金额：</label>
                        <div class="col-md-3">
                            <input class="form-control col-xs-10" type='text' data-role="whale-money" id="lending_money" disabled="disabled" name="lending_money">
                        </div>
                        <div class="col-md-1 text-static">
                           <span>元</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="loan_term">贷款期限：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="loan_term" disabled="disabled" name="loan_term">
                        </div>
                        <div class="col-md-1 text-static">
                           <span>年</span>
                        </div>
                        <label class="col-md-2 control-label">还款期次：</label>
                        <div class="col-md-3">
                            <select class="form-control" id="repayment_period" disabled="disabled" name="repayment_period" data-search-selected></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="loan_annum">贷款年利率：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="loan_annum" disabled="disabled" name="loan_annum">
                        </div>
                        <div class="col-md-1 text-static">
                            <span>%</span>
                        </div>
                        <label class="col-md-2 control-label" for="repayment_way">还款方式：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="repayment_way" disabled="disabled" name="repayment_way">
                        </div>
                    </div>
                    <div class="form-group total">
                        <label class="col-md-2 control-label" for="repayment_total">还款总额：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="repayment_total" type="text" data-role="whale-money" disabled="disabled" name="repayment_total">
                        </div>
                        <div class="col-md-1 text-static">
                            <span>元</span>
                        </div>
                        <label class="col-md-2 control-label" for="repayment_date">首次还款日期：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="repayment_date" disabled="disabled" name="repayment_date" data_date>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" for="paid_total">已还总额：</label>
                        <div class="col-md-3">
                            <input class="form-control" id="paid_total" type="text" data-role="whale-money" disabled="disabled" name="paid_total">
                        </div>
                        <div class="col-md-1 text-static">
                            <span>元</span>
                        </div>
                    </div>
               
                <div class="tab-content mywork">
                    <div class="tab-pane fade in dataTable_div repayment-list active">
                        <table id="repayment_table" class="table table-striped table-bordered hover">
                            <thead>
                              <tr>
                                <td class="left col-md-2 repay_period" data-id="">期次</td>
                                <td class="left col-md-1" data-id="">还款日期</td>
                                <td class="left col-md-1" data-id="">还款金额（元）</td>
                                <td class="left col-md-2 repay_status" data-id="">还款状态</td>
                                <td class="left col-md-2" data-id="">还款凭证</td>
                                <td class="left col-md-2" data-id="">收款凭证</td>
                                <td class="left col-md-2" data-id="" id='operation'>操作</td>
                              </tr>
                          </thead>
                          <tbody id="repaymentlist">
                                      
                          </tbody>
                        </table>
                        <div id="pageBar" role="page-bar">
                                
                        </div>
                   </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label" ></label>
                  <div class="col-md-2">
                    <a href="<%=request.getContextPath()%>/repayment/repayment_page" class="btn btn-default btn-gray btn-close">返回</a>
                  </div>
                  <div class="col-md-2">
                    <span class="btn btn-red btn-save saveData">保存</span>
                    <input type="hidden" value="save" class="save_flag">
                    <input type="hidden" value="dis_Save" class="dis_saveflag">
                  </div>
                </div>
             </form>
            </div>	
	   </div>
	</div>
</div>


<!-- 启用还款计划modal -->
    <div class="modal fade" id="start" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">启用还款计划</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">是否启用还款计划？</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back" data-dismiss="modal">取消</span>
                       <span class="btn btn-start">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 禁用还款计划modal -->
    <div class="modal fade" id="forbidden" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">停用还款计划</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">是否停用还款计划？</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back" data-dismiss="modal">取消</span>
                       <span class="btn btn-forbidden">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--详情列表操作正常按钮modal -->
    <div class="modal fade" id="normal_operate" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">还款状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">是否确认当期还款正常？确认后不可修改。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back" data-dismiss="modal">取消</span>
                       <span class="btn btn-normalSave data-normalSave">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--详情列表操作欠息按钮modal -->
    <div class="modal fade" id="interest_operate" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">还款状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">是否确认当期还款欠息？确认后不可修改。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back" data-dismiss="modal">取消</span>
                       <span class="btn btn-interestSave data-interestSave">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--详情列表操作最后一期欠息按钮modal -->
    <div class="modal fade" id="last_interest_operate" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">还款状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">本期为最后一期还款，确认状态为欠息后仍可将状态改为正常或逾期。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group last_btn_group">
                       <span class="btn btn-default btn-back" data-dismiss="modal">取消</span>
                       <span class="btn btn-interestSave last_data-interestSave">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--详情列表操作逾期按钮modal -->
    <div class="modal fade" id="overdue_operate" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">还款状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">是否确认当期还款逾期？确认后不可修改。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back" data-dismiss="modal">取消</span>
                       <span class="btn btn-overdueSave data-overdueSave">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--详情列表操作逾期按钮modal -->
    <div class="modal fade" id="savedata" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">保存状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">当前数据没有保存或数据没有填完整，请保存数据。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back btn-disenabled" data-dismiss="modal">取消</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--启用数据保存modal -->
    <div class="modal fade" id="save_detial_data" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">保存状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">数据保存成功。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-detial data-detailSave" data-dismiss="modal">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!--提示上传凭证modal -->
    <div class="modal fade" id="saveVoucher" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">保存状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">已上传的凭证不能删除，凭证可做修改。</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-default btn-back btn-disenabled" data-dismiss="modal">取消</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>