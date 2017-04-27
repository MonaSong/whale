<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<script src="<%=request.getContextPath()%>/js/mymanagement/my_management_reqdata.js"></script>
<script src="<%=request.getContextPath()%>/js/mymanagement/my_management.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/mymanagement/my_management.css">
<title>我的办理</title>
<!-- 首页内容显示区 -->
<div  class="main-content-container">
         <div class="s-container">
            <!-- 错误信息提示 -->
            <div name="publicError"></div>
            <!-- 页面主体内容 -->             
             <div class="s-page-content">
                  <div class="whale-well whale-well-min clearfix">
                      <div class="whale-well-headding pull-left">
                          <h4 class="whale-well-title">我的办理</h4>
                      </div>
                  </div>
                  <div class="tabbable whale-tab" id="my-work-ct">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active" data-status="0"><a href="javascript:void(0)">待办理(<b></b>)</a></li>
                        <li role="presentation" data-status="1"><a href="javascript:void(0)" >办理中(<b></b>)</a></li>
                        <li role="presentation" data-status="2"><a href="javascript:void(0)" >已办理(<b></b>)</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="dai" class="tab-pane active fade in">
                               <table id="my-work" class="table table-striped table-bordered table-hover">
                                      <thead>
                                          <tr> 
                                              <th class="" data-id="">序号</th>
                                              <th class="" data-id="">业务编号</th>
                                              <th class="" data-id="winery-name">企业名称</th>
                                              <th class="" data-id="">业务类型</th>
                                              <th class="" data-id="">办理事项</th>
                                              <th class="" data-id="">办理状态</th>
                                              <th class="" data-id="">到达时间</th>
                                              <th class="" data-id="">办理时间</th>
                                              <th class="" data-id="">操作</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                            
                                      </tbody>
                              </table>
                              <div id="pageBar" role="page-bar"></div>
                              <div class="no-content-container"></div>
                        </div>
                    </div>
                  </div>              
             </div>
         </div>
    </div>