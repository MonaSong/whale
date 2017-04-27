<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/messagemanagenment/message_remind.css"></link>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_content.js"></script>
<title>消息提醒</title>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">消息提醒</h4>
                    </div>
                </div>
                <div class="whale-pane-body user-information">
                    <div  class="form-horizontal form-data-pane whale-remind col-xs-12" role="form"
                        id="user-form1" action="">
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="username">消息标题：</label>
                            <div class="col-md-2">
                                <p class="form-control" id="messageTitle" name="messageTitle" disabled="disabled"></p>
                            </div>
                            <label class="col-md-1 control-label time-item">到达时间：</label>
                            <div class="col-md-2">
                                <p class="form-control-static" id="messagetime" name="messagetime" disabled="disabled"></p>
                            </div>
                        </div>
                        <div class="form-group form-group-md">
                            <label class="col-md-2 control-label"for="institutionId">业务类型：</label>
                            <div class="col-md-2">
                                <p class="form-control" id="messageServiceType" name="messageServiceType" disabled="disabled"></p>
                            </div>
                        </div>
	                     <div class="form-group form-group-md">
	                        <label class="col-md-2 control-label" for="message_content">消息内容：</label>
                                            <div class="col-md-9">
                                                <textarea class="form-control textarea-view" id="textara_content" disabled="disabled" name="managerAuditOpinion"
                                                    placeholder="请填写审核意见" data-role="control-btn"></textarea>
                                                <p data-role="font-length" class="hide-status">
                                                    还可以书写<b></b>个文字
                                                </p>
                                            </div>
	                    </div>
                        <div class="form-group form-group-md user-save">
                        <label class="col-md-2 control-label" for="message_content"></label>                            
                                <div class="col-md-5 btn-choose">
                                    <span class="btn btn-primary btn-red btn-confirm btn-save">返回</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
