<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/winmanagement/winerymanagement.css"></link>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<div class="main-content-container">
		<div class="s-container">
			<!-- 页面主体内容 -->
			<div class="s-page-content">
				<div class="whale-well whale-well-min clearfix">
					<div class="whale-well-headding pull-left">
						<h4 class="whale-well-title">风险管理</h4>
					</div>
				</div>
				<div id="left-menu" class="left-menu">
					<ul>
						<li class="active"><a href="javascript:void(0)">启动解压</a></li>
						<li class="done"><a href="javascript:void(0)">解除保单</a></li>
						<li class="repulse"><a href="javascript:void(0)">解除质押</a></li>
						<li class="active"><a href="javascript:void(0)">收货</a></li>					
					</ul>
				</div>
				<div class="form-container">
					<div class="tab-pane" id="yiwanc">
						<div class="data-list clearfix">
							<div class="data-list-body clearfix">
								<div class="data-list-desation">
								<div class="data-list-heading">
								<h4 class="data-list-title">发起理赔(平安银行)</h4>
							</div>
									<div class="col-xs-4">
										<p>还款编号：LZLJ20160905</p>
										<p>资金方：平安银行</p>
										<p>还款总额：28,000,000,00元</p>								
									</div>
									<div class="col-xs-4">
										<p>酒厂名称：宜宾五粮液集团有限公司</p>								
										<p>融资金额：30,000,000,00元</p>
										<p>还款总额：14,000,000,00元</p>
									</div>
									<div class="col-xs-4">
										<p>融资期限：1年期</p>
										<p>还款状态：已结清</p>
									</div>
								</div>
							</div>

							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">取消</button>
								<button type="button" class="btn btn-default">确定</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>