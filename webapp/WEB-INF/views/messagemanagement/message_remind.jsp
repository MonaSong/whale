<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/messagemanagenment/message_remind.css"></link>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_remind.js"></script>
<!-- 首页内容显示区 -->
<title>消息提醒</title>
<div  class="main-content-container">
         <div class="s-container">
            <!-- 页面主体内容 -->
             <div class="s-page-content">
                  <div class="whale-well whale-well-min clearfix">
                      <div class="whale-well-headding pull-left">
                          <h4 class="whale-well-title">消息提醒</h4>
                      </div>
                      <div class="whale-well-footer pull-right">
                        <div class="search-bar">
                            <input type="text" class="form-control search_remind"
                                placeholder="消息标题" /> <i class="w-icon-search"></i>
                        </div>
                    </div>
                  </div>
                  
                  <!-- 消息模板页 -->
                  <div class="tabbable whale-tab" id="my-work-ct">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active" data-status="0"><a href="javascript:void(0)">未读<b class="notUsed"></b></a></li>
                        <li role="presentation" data-status="1"><a href="javascript:void(0)">已读<b class='alread'></b></a></li>
                        <li role="presentation" data-status="2" id="delete"><a href="javascript:void(0)">已删除<b class='detele_user'></b></a></li>
                        <div class="pull-right btn-choose header_remind">
                        <span class="btn btn-primary mark_hasread btn-red btn-confirm">标记已读</span>
                        <span class="btn btn-primary delete btn-red btn-confirm" data-toggle="modal" data-toggle="modal"data-target=".bs-example-modal-md">删&nbsp;&nbsp;&nbsp;&nbsp;除</span>
                        </div>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade in active" id="message_management">
                            <table id="message_table" class="table table-striped table-bordered hover">
                                <thead>
                                    <tr>
                                        <td data-id=""class="checkbox-list" ><input type="checkbox" id="selectAll"></td>
                                        <td data-id="">消息标题</td>
                                        <td data-id="">业务编号</td>
                                        <td data-id="">业务类型</td>
                                        <td data-id="time">接受时间</td>
                                        <td data-id="" id="operation">操作</td>
                                    </tr>
                                </thead>
                                <tbody id="userlist">

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
    
<!-- 删除模态框 -->
 <div class="modal fade bs-example-modal-md" id='noticeModal' tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content forget-password">
                <div class="modal-header main-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
                    </button>
                     <h4 class="modal-title">消息管理</h4>
                </div>
                <div class="modal-body">
                    <h4 class="admin_user">是否删除消息？</h4>
                </div>
                <div class="modal-footer btn-choose">
                    <a  class="btn btn-default btn-gray btn-cancel btn-away" data-dismiss="modal">
                        取消</a>
                    <span class="btn btn-primary btn-red btn-confirm btn-assign delete_message" data-dismiss="modal"
                       >确认</span>
                </div>
            </div>
        </div>
    </div>

