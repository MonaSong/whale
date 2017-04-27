<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/messagemanagenment/message_trigger.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/messagemanagenment/message_remind.css">
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_detail.js"></script>
<title>消息管理</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
<div class="s-page-content">
    <div class="whale-well whale-well-min clearfix">
        <div class="whale-well-headding pull-left">
            <h4 class="whale-well-title">消息管理</h4>
       </div>
       </div>
           <!-- 消息详情页 -->
<div class="whale-pane-body user-information">
                <form class="form-horizontal form-content form-data-pane col-xs-12" role="form" action="">
                    <div class="form-group">
                        <label for="message_header" class="col-md-2 control-label">消息标题：</label>
                        <div class="col-md-6">
                            <p class="form-control" id="message_headerid" name="message_headerid" disabled="disabled"></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">业务类型：</label>
                        <div class="col-md-6">
                            <p class="form-control" id="servicetype" name="servicetype" disabled="disabled"></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">消息接收人：</label>
                        <div class="col-md-6 col-xs-12 col-sm-12 col-lg-6">
                            <table id="message_list_table" class="message_detaile table table-striped table-bordered hover">
                                <thead>
                                    <tr>
                                        <td  data-id="">手机号</td>
                                        <td data-id="">姓名</td>
                                        <td data-id="">所属机构</td>
                                        <td data-id="">发送状态</td>
                                        <td data-id="">接收时间</td>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">消息内容:</label>
                        <div class="col-md-6">
                            <textarea class="form-control textarea-view" id="messageContent" name="messageContent" disabled="disabled">
                
                            </textarea>
                        </div>
                    </div>
						<div class="form-group form-group-md user-save">
						    <label class="col-md-2 control-label" for="message_content"></label>                            
						       <div class="col-md-5 btn-choose">
						           <span class="btn btn-primary btn-red btn-confirm btn-message">返回</span>
						       </div>
						 </div>
                </form>
                </div>
            </div>
        </div>
    </div>

