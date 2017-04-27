<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
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
						<h4 class="whale-well-title">酒厂详情</h4>
					</div>
				</div>
				<div class="form-container">
					<div class="tab-pane" id="yiwanc">
						<div class="data-list clearfix">
							<div class="data-list-body clearfix">
								<div class="data-list-heading">
								<h4 class="data-list-title">业务信息</h4>
							</div>
                            <form role="form" action="">
                                   <div class="form-horizontal form-data-pane">                                   
                                        <!-- 营业执照信息 -->
                                        <div class="whale-pane">                                 
                                              <div class="form-group">
                                                  <label class="col-xs-3 text-right control-label">中酒省区经理:</label>
                                                      <div class="col-xs-6">
                                                           <div class="btn-group">
															    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">当前中酒省区经理
															        <span class="caret"></span>
															    </button>
															    <ul class="dropdown-menu" role="menu">
															        <li>
															            <a href="#">赵钱孙</a>
															        </li>
															        <li>
															            <a href="#">行者孙</a>
															        </li>
															        <li>
															            <a href="#">注：此处不显示当前负责人</a>
															        </li>
															    </ul>
														</div>
                                                   </div>
                                              </div>        
                                        </div>
                                    </div>
                                </form>
							</div>
										<!--酒厂信息-->
							<div class="data-list-body clearfix data-list-winery">
								<div class="data-list-heading">
								<h4 class="data-list-title">酒厂信息</h4>
								</div>
                            <form role="form" action="">
                                   <div class="form-horizontal form-data-pane">                                   
                                        <!-- 联系人信息 -->
       									<div class="whale-pane">
		                                     <div class="whale-pane-heading">
		                                           <h4 class="whale-pane-title">联系人信息</h4>
		                                     </div>
		                                     <div class="whale-pane-body"> 
                                                   <span class="clearfix"></span>  
		                                           <div class="form-group">
			                                            <label class="col-xs-3 text-right control-label">手机号:</label>
			                                            <div class="col-xs-6">
			                                                <input class="form-control" placeholder="">
			                                            </div>
		                                            </div>  
		                                            <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">联系人:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div>
                                                               <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">职务:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div> 
                                                               <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">密码:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div> 
                                                               <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">邀请码:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div> 
		                                     </div>
		                                </div>
										<!-- 企业基本信息 -->
		                                <div class="whale-pane">
                                             <div class="whale-pane-heading">
                                                   <h4 class="whale-pane-title">企业基本信息</h4>
                                             </div>
                                             <div class="whale-pane-body">
                                                   <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">单位全称:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div>  
                                                    <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">联系地址:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div> 
                                                    <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">营业执照号码:</label>
                                                        <div class="col-xs-6">
                                                            <input class="form-control" placeholder="">
                                                        </div>
                                                    </div> 
                                             </div>
                                        </div>
                                         <!--企业执照信息 -->
                                          <div class="whale-pane">
                                             <div class="whale-pane-heading">
                                                   <h4 class="whale-pane-title">企业证照信息</h4>
                                             </div>
                                             <div class="whale-pane-body">
                                                   <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">营业执照电子版正本:</label>
                                                        <div class="col-xs-6">
                                                           <li class="look_over">查看</li>
                                                        </div>
                                                    </div>  
                                                    <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">税务登记扫描件:</label>
                                                        <div class="col-xs-6">
                                                             <li class="look_over">查看</li>
                                                        </div>
                                                    </div> 
                                                    <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">法人代表身份证正面扫描件:</label>
                                                        <div class="col-xs-6">
                                                             <li class="look_over">查看</li>
                                                        </div>
                                                    </div>
                                                     <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">法人代表身份证背面扫描件:</label>
                                                        <div class="col-xs-6">
                                                             <li class="look_over">查看</li>
                                                        </div>
                                                    </div>
                                                        <div class="form-group">
                                                        <label class="col-xs-3 text-right control-label ">酒厂现场照片:</label>
                                                        <div class="col-xs-6">
                                                             <li class="look_over">查看</li>
                                                        </div>
                                                    </div> 
                                             </div>
                                        </div>
                                    </div>
                                </form>                         
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default">确定</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>