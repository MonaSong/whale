<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/overduesettlementmanagement/overdue_settlement_management.css"></link>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlementrequestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/overduesettlementmanagement/overdue_settlement.js"></script>
<title>逾期理赔</title>
<div class="main-content-container">
	<div class="s-container">
		<!-- 页面主体内容 -->
		<div class="s-page-content">
			<div class="whale-well whale-well-min clearfix">
				<div class="whale-well-headding pull-left">
					<h4 class="whale-well-title">逾期理赔</h4>
				</div>
				<div class="whale-well-footer pull-right">
					<div class="search-bar">
						<input type="text" class="form-control" placeholder="酒厂名称/理赔编号/资金方" id="overdue-searchstr"/>
						<i class="w-icon-search search" id="search-overdue-data"></i>
					</div>
				</div>
			</div>
			<div class="tabbable whale-tab" id="overdue-list">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active" data-status="0"><a href="javascript:void(0)">进行中<b></b></a></li>
                        <li role="presentation" data-status="1"><a href="javascript:void(0)">已完成<b></b></a></li>
                    </ul>
				<div class="tab-content">
					<div class="tab-pane fade in active" id="overdue-settlement">

				    </div>
                    <div id="pageBar" role="page-bar"></div>
                    <div class="no-content-container"></div>
			</div>
		</div>
	</div>
</div>