<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/maturitydecompression/matuirty_decompression.css"></link>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/maturity_decompression_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/maturity_decompression.js"></script>
<!-- 首页内容显示区 -->
<title>到期解押</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 错误信息提示 -->
        <div name="publicError"></div>
        <!-- 页面主体内容 -->
        <div class="s-page-content">
             <div class="whale-well whale-well-min clearfix">
            <div class="whale-well-headding  pull-left">
                <h4 class="whale-well-title">到期解押</h4>
            </div>
        <div class="whale-well-footer pull-right">

          </div>          
        </div>
            <div class="tabbable whale-tab" id="my-work-ct">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active" data-status="0"><a
                            href="javascript:void(0)">解押中<b class='notUsed'></b></a></li>
                        <li role="presentation" data-status="1"><a
                            href="javascript:void(0)">已解押<b class='alread'></b></a></li>
                    </ul>
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="maturity_decompression">

                    </div>
                   <div id="pageBar" role="page-bar"></div>
                   <div class="no-content-container"></div>
                </div>
            </div>
            </div>
        </div>
    </div>