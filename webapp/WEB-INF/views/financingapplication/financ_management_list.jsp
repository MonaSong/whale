<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css">
<script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/financmanagement/financ_management_list.js"></script>
<title>融资列表</title>
<div  class="main-content-container">
         <div class="s-container">
                <!-- 公用错误信息提示 -->
                <div name="publicError"></div>
                <!-- 页面主体内容 -->             
                 <div class="s-page-content">
                       <div class="whale-well whale-well-min clearfix">
                            <div class="whale-well-headding pull-left">
                                <h4 class="whale-well-title" id="winery-special-title"></h4>
                            </div>
                            <div class="whale-well-body hide-status">
                                <div class="col-md-4 increasingly">
                                    <p><b class="red">10</b></p>
                                    <p>融资申请(家)</p>
                                </div>
                                <div class="col-md-4 increasingly">
                                    <p><b class="red">10</b></p>
                                    <p>当前放款(家)</p>
                                </div>
                                <div class="col-md-4 increasingly">
                                    <p><b class="red">30</b></p>
                                    <p>累计放款(家)</p>
                                </div>
                            </div>
                            <div class="whale-well-footer pull-right">
                                <div class="search-bar hide-status">
                                    <input type="text" class="form-control icon-search" placeholder="酒厂名称/申请编号" id="finance-search-str"/>
                                    <i class="w-icon-search" id="finance-search-btn"></i>
                                </div>
                            </div>
                       </div>
                       <div class="tabbable whale-tab" id="finance-management-tab">
                            <div class="pull-right z-i-10 text-static" data-role="add-finance-box">
                                <a id="add-new-finance" class="btn btn-primary btn-red hide-status btn-fixed-width" href="<%=request.getContextPath()%>/finance/financ_management_page?management_status=0" >新增融资</a>
                            </div>
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active" data-status="NOT_END"><a href="javascript:void(0)">申请中（<b></b>）</a></li>
                                <li role="presentation" data-status="AGREE"><a href="javascript:void(0)">申请通过（<b></b>）</a></li>
                                <li role="presentation" data-status="REFUSE"><a href="javascript:void(0)">未通过（<b></b>）</a></li>
                            </ul>
                            
                            <div class="tab-content">
                                <div class="tab-pane fade in active" id="finace-management-list">
                                </div>
                                <div id="pageBar" role="page-bar"></div>
                                <div class="no-content-container"></div>
                            </div>
                            </div>
                 </div>
         </div>
</div>