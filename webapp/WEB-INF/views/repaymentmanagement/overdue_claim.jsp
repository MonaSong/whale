<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/repaymentmanagement/over_dueclaim.css"></link>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<div class="main-content-container">
	<div class="s-container">
		<!-- 页面主体内容 -->
		<div class="s-page-content">
			<div class="whale-well clearfix">
			<div class="whale-well-headding pull-left">
				<h4 class="whale-well-title">逾期理赔</h4>
			</div>		  
		</div>
			<div class="tabbable whale-tab">
				<ul class="nav nav-tabs" role="tablist">
					<li class="active" role="presentation"><a href="#jingxingzhong">进行中<b>(20)</b></a></li>
					<li role="presentation"><a href="#yiwanc">已完成<b>(5)</b></a></li>
				</ul>			
				<div class="tab-content">
					<div class="tab-pane fade in active" id="jingxingzhong">
						<div class="data-list clearfix">
							<div class="data-list-heading">
								<h4 class="data-list-title">
									逾期编号：<b>HY20160905</b>
									<span class="underway march">进行中</span>
								</h4>
							</div>
							<div class="data-list-body clearfix">
								<div class="data-list-left pull-left">
									<div class="whale-bage bage-blue">保险赔付</div>
									<span>发起理赔已确定</span>
								</div>
							<div class="data-list-right">
                                <div class="col-xs-6">
                                     <p>酒厂名称：宜宾五粮液集团有限公司</p>
                                     <p>融资金额：30,000,000,00元</p>
                                     <p>还款总额：28,000,000,00元</p>
                                 </div>
                                 <div class="col-xs-6">
                                 <p>资金方：平安银行</p>
                                 <p>融资年限：1年期</p>
                                 <p>已还总额：14,000,000,00元</p>
                                </div>
                            </div>	
							</div>
						</div>
						<div class="data-list clearfix">
							<div class="data-list-heading">
								<h4 class="data-list-title">
									逾期编号：<b>HY20160905</b>
									<span class="underway march">进行中</span>
								</h4>
								
							</div>
							<div class="data-list-body clearfix">
								<div class="data-list-left pull-left">
									<div class="whale-bage bage-blue">保险赔付</div>
									<span>发起理赔已确定</span>
								</div>
							<div class="data-list-right">
                                <div class="col-xs-6">
                                     <p>酒厂名称：宜宾五粮液集团有限公司</p>
                                     <p>融资金额：30,000,000,00元</p>
                                     <p>还款总额：28,000,000,00元</p>
                                 </div>
                                 <div class="col-xs-6">
                                 <p>资金方：平安银行</p>
                                 <p>融资年限：1年期</p>
                                 <p>已还总额：14,000,000,00元</p>
                                </div>
                            </div>	
							</div>
						</div>
					</div>
					<div class="tab-pane" id="yiwanc">
						<div class="data-list clearfix">
							<div class="data-list-heading">
								<h4 class="data-list-title">
									申请编号：<b>HY20160905</b>
									<span class="underway">已完成</span>
								</h4>
							</div>
							<div class="data-list-body clearfix">
								<div class="data-list-left pull-left">
									<div class="whale-bage bage-red">提货</div>
									<span>发起理赔已确定</span>
								</div>
		  					<div class="data-list-right">
                                <div class="col-xs-6">
                                     <p>酒厂名称：宜宾五粮液集团有限公司</p>
                                     <p>融资金额：30,000,000,00元</p>
                                     <p>还款总额：28,000,000,00元</p>
                                 </div>
                                 <div class="col-xs-6">
                                 <p>资金方：平安银行</p>
                                 <p>融资年限：1年期</p>
                                 <p>已还总额：14,000,000,00元</p>
                                </div>
                            </div>						
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>	
	</div>
	</div>