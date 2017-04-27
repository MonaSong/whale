<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/repaymentmanagement/repayment_management.css"></link>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">还款管理</h4>
                </div>
                <div class="whale-well-body">
                    <div class="col-xs-4">
                        <p class="whale-red">30,000,000元</p>
                        <p>累计还款总额</p>
                    </div>
                    <div class="col-xs-4">
                        <p class="whale-red">30,000,000元</p>
                        <p>累计应还款</p>
                    </div>
                    <div class="col-xs-4">
                        <p class="whale-red">300,000,00元</p>
                        <p>累计还款项目</p>
                    </div>
                </div>
                <div class="whale-well-footer pull-right">
                    <div class="search-bar">
                        <input type="text" class="form-control" placeholder="" name="">
                        <i class="w-icon-search"></i>
                    </div>
                </div>
            </div>
            <div class="tabbable whale-tab">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active list" data-status="000"><a href="#plan">还款计划</a></li>
                    <li role="presentation" class="type" data-status="001"><a href="#started">启动解押</a></li>
                </ul>
                <div class="tab-content mywork">
                    <div class="tab-pane fade in dataTable_div repayment-list active" id="plan">
                        <table id="agency_table" class="table table-striped table-bordered hover">
                            <thead>
                              <tr>
                                <td class="center" data-id=""><input type="checkbox" id="selectAll"></td>
                                <td class="center" data-id="">业务编号</td>
                                <td class="center" data-id="">期次</td>
                                <td class="center" data-id="">还款日期</td>
                                <td class="center" data-id="">还款金额</td>
                                <td class="center" data-id="">还款状态</td>
                                <td class="center" data-id="">还款凭证</td>
                                <td class="center" data-id="">收款凭证</td>
                              </tr>
                            </thead>
                            <tbody id="repaymentlist">
                           
                            </tbody>
                        </table>
                        <div id="pageBar" role="page-bar">
                                
                        </div>
                    </div>
                    <div class="tab-pane dataTable_div start-solve" id="started">
                        <table id="start-solve_table" class="table table-striped table-bordered hover">
                            <thead>
                                <tr>
                                   <td class="center" data-id=""><input type="checkbox" id="selectAll"></td>
	                               <td class="center" data-id="">业务编号</td>
	                               <td class="center" data-id="">期次</td>
	                               <td class="center" data-id="">还款日期</td>
	                               <td class="center" data-id="">还款金额</td>
	                               <td class="center" data-id="">还款状态</td>
	                               <td class="center" data-id="">还款凭证</td>
	                               <td class="center" data-id="">收款凭证</td>
                                </tr>
                           </thead>
                           <tbody>
                            
                           </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>