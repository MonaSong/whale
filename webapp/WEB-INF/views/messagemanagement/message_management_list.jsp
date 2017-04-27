<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/yjx.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/messagemanagenment/message_remind.css">
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_management_list.js"></script>
<!-- 首页内容显示区 -->
<title>消息管理</title>
<div  class="main-content-container">
         <div class="s-container">
            <!-- 页面主体内容 -->
             <div class="s-page-content">
                  <div class="whale-well whale-well-min clearfix">
                      <div class="whale-well-headding pull-left">
                          <h4 class="whale-well-title">消息管理</h4>
                      </div>
                  </div>
                  <!-- 消息列表页面 -->
                  <div class="tabbable whale-tab" id="my-management-ct">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active message_list" data-status="1"><a href="#message_list">消息列表</a></li>
                        <li role="presentation" class="message_template" data-status="3"><a href="#message_template">消息模板</a></li>
                    </ul>
                     <div class="tab-content"> 
                        <div class="tab-pane fade in active dataTable_div" id="message_list">
                             <table id="message_list_table" class="table table-striped table-bordered hover">
                                 <thead>
                                     <tr>
                                         <td data-id="">消息编号</td>
                                         <td data-id="">消息标题</td>
                                         <td data-id="">业务类型</td>
                                         <td data-id="">发送方式</td>
                                         <td data-id="">发送状态</td>
                                         <td data-id="">发送时间</td>
                                     </tr>
                                 </thead>
                                 <tbody id="message_list">
                                 
                                 </tbody>
                             </table>
                          <div id="pageBar" class="pageBar" role="page-bar"></div>
                         </div>
                         <div class="tab-pane dataTable_div" id="message_template">
                             <table id="message_template_table" class="table table-striped table-bordered hover">
                                 <thead>
                                     <tr>
                                         <td data-id="">模板名称</td>
                                         <td data-id="">模板类型</td>
                                         <td data-id="">业务类型</td>
                                         <td data-id="">节点名称</td>
                                         <td data-id="">启用状态</td>
                                     </tr>
                                 </thead>
                                 <tbody id="messagefinace" class="messagefinace">
                                 
                                 </tbody>
                             </table>
                         </div>                                  
                    </div> 
                  </div>
             </div>
         </div>
    </div>
    



