<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/winmanagement/win_management.css" rel="stylesheet">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<div  class="main-content-container">
         <div class="s-container">
              <!-- 错误信息提示 -->
              <div name="publicError"></div>
	            <!-- 页面主体内容 -->             
	             <div class="s-page-content">
	                   <div class="whale-well clearfix">
					            <div class="whale-well-headding pull-left">
					                <h4 class="whale-well-title">酒厂详情</h4>
					            </div>
					        </div>
	                   <div class="tabbable whale-tab">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li role="presentation" class="active"><a href="#shenhezhong">审核中<b>（5）</b></a></li>
                                        <li role="presentation"><a href="#yijihuo">已激活<b>（10）</b></a></li>
                                        <li role="presentation"><a href="#weitongguo">未通过<b>（5）</b></a></li>
                                        <li class="pull-right"><span class="btn btn-primary">重新分配</span></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade in active" id="shenhezhong">
                                                 <div class="data-list clearfix">
                                                       <div class="data-list-heading">
                                                           <h4 class="data-list-title">
                                                               申请编号：<b>HY20160905001</b>
                                                           </h4>
                                                       </div>
                                                       <div class="data-list-body clearfix">
                                                           <div class="data-list-left pull-left">
                                                               <div class="whale-bage bage-blue">合作申请</div>
                                                               <span>等待审核</span>
                                                           </div>
                                                           <div class="data-list-right">
                                                               <div class="col-xs-6">
                                                                   <p>酒厂名称：泸州老窖集团股份有限公司</p>
                                                                   <p>联系人：陆敏</p>
                                                               </div>
                                                               <div class="col-xs-6">
                                                                   <p>申请时间：2016/09/03</p>
                                                                   <p>手机号：13052587892</p>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>                                       
                                        </div>
                                        <div class="tab-pane" id="yijihuo">
                                                <div class="data-list clearfix">
                                                       <div class="data-list-heading">
                                                           <h4 class="data-list-title">
                                                                    <label>
		                                                                   <input type="checkbox">
		                                                                                                    申请编号：<b>HY20160905001</b>
                                                                   </label>
                                                           </h4>
                                                       </div>
                                                       <div class="data-list-body clearfix">
                                                           <div class="data-list-left pull-left">
                                                               <span>负责人：</span>
                                                               <span>XXX(省区经理)</span>
                                                           </div>
                                                           <div class="data-list-right">
                                                               <div class="col-xs-6">
                                                                   <p>酒厂名称：泸州老窖集团股份有限公司</p>
                                                                   <p>联系人：陆敏</p>
                                                               </div>
                                                               <div class="col-xs-6">
                                                                   <p>申请时间：2016/09/03</p>
                                                                   <p>手机号：13052587892</p>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>  
                                        </div>
                                        <div class="tab-pane" id="weitongguo">
                                                <div class="data-list clearfix">
                                                       <div class="data-list-heading">
                                                           <h4 class="data-list-title">
                                                                                                    申请编号：<b>HY20160905001</b>
                                                           </h4>
                                                       </div>
                                                       <div class="data-list-body clearfix">
                                                           <div class="data-list-left pull-left">
                                                               <div class="whale-bage bage-red">助理审核</div>
                                                               <span>拒绝</span>
                                                           </div>
                                                           <div class="data-list-right">
                                                               <div class="col-xs-6">
                                                                   <p>酒厂名称：泸州老窖集团股份有限公司</p>
                                                                   <p>联系人：陆敏</p>
                                                               </div>
                                                               <div class="col-xs-6">
                                                                   <p>申请时间：2016/09/03</p>
                                                                   <p>手机号：13052587892</p>
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