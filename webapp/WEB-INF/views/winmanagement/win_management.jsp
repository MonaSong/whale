<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<link href="<%=request.getContextPath()%>/css/winmanagement/win_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/winmanagement/win_management_list.js"></script>
<title>酒厂管理</title>
<div  class="main-content-container">
         <div class="s-container">
                <!-- 错误信息提示 -->
                <div name="publicError"></div>
                <!-- 页面主体内容 -->             
                 <div class="s-page-content">
                       <div class="whale-well whale-well-min clearfix">
                            <div class="whale-well-headding pull-left">
                                <h4 class="whale-well-title">酒厂管理</h4>
                            </div>
                            <div class="whale-well-body hide-status">
                                <div class="col-xs-4 increasingly">
                                    <p><b class="red">10</b></p>
                                    <p>融资申请中(家)</p>
                                </div>
                                <div class="col-xs-4 increasingly">
                                    <p><b class="red">10</b></p>
                                    <p>当前放款(家)</p>
                                </div>
                                <div class="col-xs-4 increasingly">
                                    <p><b class="red">30</b></p>
                                    <p>累计放款(家)</p>
                                </div>
                            </div>
                            <div class="whale-well-footer pull-right">
                                <div class="search-bar">
                                    <input type="text" class="form-control icon-search" placeholder="酒厂名称/申请编号" id="search-str"/>
                                    <i class="w-icon-search" id="win-search"></i>
                                </div>
                            </div>
                       </div>
                       <div class="tabbable whale-tab" id="win-management-tab">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active" data-status="0"><a href="javascript:void(0)">审核中（<b></b>）</a></li>
                                <li role="presentation" data-status="1"><a href="javascript:void(0)">已激活（<b></b>）</a></li>
                                <li role="presentation" data-status="2"><a href="javascript:void(0)">未通过（<b></b>）</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade in active" id="win-management-list">

                                </div>
                                <div id="pageBar" role="page-bar"></div>
                                <div class="no-content-container"></div>
                            </div>
                       </div>
                 </div>
         </div>
</div>