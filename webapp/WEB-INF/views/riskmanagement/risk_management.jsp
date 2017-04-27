<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/riskmanagement/risk_management.css"></link>
<title>风险管理</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left ">
                    <h4 class="whale-well-title">风险管理</h4>
                </div>
                <div class="whale-well-footer pull-right">
                    <div class="search-bar">
                        <input type="text" class="form-control searchStr" placeholder="风险编号/酒厂名称" />
                        <i class="w-icon-search search"></i>
                    </div>
                </div>
            </div>
            <div class="tabbable whale-tab" id="my-work-ct">
                <ul class="nav nav-tabs sm-tab" role="tablist">
                    <li role="presentation" class="active" data-status="0">
                        <a href="javascript:void(0)">审核中<b></b></a>
                    </li>
                    <li role="presentation" data-status="1">
                        <a href="javascript:void(0)">已确认<b></b></a>
                    </li>
                    <li role="presentation" data-status="2">
                        <a href="javascript:void(0)">已关闭<b></b></a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="risk_management">

                    </div>
                    <div id="pageBar" role="page-bar"></div>
                    <div class="no-content-container"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<%=request.getContextPath()%>/js/riskmanagement/risk_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/riskmanagement/risk_management_list.js"></script>