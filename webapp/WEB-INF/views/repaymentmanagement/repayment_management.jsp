<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css">

<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/repaymentmanagement/repayment_management.css">
<script src="<%=request.getContextPath()%>/js/repaymentmanagement/repayment_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/repaymentmanagement/repayment_management.js"></script>
<title>还款管理</title>
<div class="main-content-container">
	<div class="s-container">
		<!-- 页面主体内容 -->
		<div class="s-page-content">
			<div class="whale-well clearfix whale-well-min rapayment-title">
				<div class="whale-well-headding pull-left">
					<h4 class="whale-well-title"></h4>
				</div>
				<div class="whale-well-body hide-status">
					<div class="col-xs-4">
						<p class="whale-red">30,000,000元</p>
						<p>当前还款总额</p>
					</div>
					<div class="col-xs-4">
						<p class="whale-red">30,000,000元</p>
						<p>当前已还总额</p>
					</div>
					<div class="col-xs-4">
						<p class="whale-red">300,000,00元</p>
						<p>当前剩余还款</p>
					</div>
				</div>
				<div class="whale-well-footer pull-right">
					
				</div>
			</div>
			<div class="tabbable whale-tab" id="repay-management-tab">
			    <input id="add-new-repay" type='button' class="btn pull-right z-i-10 btn-red" disabled='disabled' value="风险提示">
				<ul class="nav nav-tabs" role="tablist">
					<li class="active" role="presentation" data-status='0'><a href="javascript:void(0)">正常（<b></b>）</a></li>
					<li role="presentation" data-status="1"><a href="javascript:void(0)">欠息（<b></b>）</a></li>
					<li role="presentation" data-status="2"><a href="javascript:void(0)">已结清（<b></b>）</a></li>
					<li role="presentation" data-status="3"><a href="javascript:void(0)">逾期（<b></b>）</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane fade in active" id="repay_management_list">	
					</div>
					<div id="pageBar" role="page-bar"></div>
					<div class="no-content-container"></div>
				</div>
			</div>	
	</div>
	</div>
</div>