<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/pledgemanagement/pledge_management.css"></link>
<script src="<%=request.getContextPath()%>/js/pledgemanagement/pledge_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/pledgemanagement/pledge_management_list.js"></script>
<title>质押列表</title>
<!-- 首页内容显示区 -->
<div class="main-content-container">
    <div class="s-container">
        <!-- 错误信息提示 -->
        <div name="publicError"></div>
        <!-- 页面主体内容 -->
        <div class="s-page-content">
               <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                     <h4 class="whale-well-title" id="winery-special-title"></h4>
                </div>
                <div class="whale-well-body hide-status">
                    <div class="col-xs-6 increasingly">
                        <p><b class="red">300,000,000元</b></p>
                        <p>质押物总额</p>
                    </div>
                    <div class="col-xs-6 increasingly">
                        <p><b class="red">3000000吨</b></p>
                        <p>质押物数量</p>
                    </div>
                </div>
                <div class="whale-well-footer pull-right">
                    <div class="search-bar hide-status">
                        <input type="text" class="form-control icon-search" placeholder="质押物编号/质权人" id="search-str" />
                        <i class="w-icon-search" id="search"></i>
                    </div>
                </div>
            </div>
                <div class="tabbable whale-tab" id="pledge-ct">
                    <div class="pull-right text-static">
                        <span class="btn btn-primary index-10 btn-red hide-status btn-fixed-width" disabled data-role="risk-tip">风险提示</span>
                    </div>
                    <ul class="nav nav-tabs" role="tablist">  
                        <li role="presentation" class="active" data-status="0">
                            <a href="javascript:void(0)">质押中（<b></b>）</a>
                        </li>
                        <li role="presentation" data-status="1">
                            <a href="javascript:void(0)">已解押（<b></b>）</a>
                        </li>
                        <li role="presentation" data-status="2" id="delete">
                            <a href="javascript:void(0)" class="delete_user">已处置（<b></b>）</a>
                        </li>
                        
                    </ul>
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="pledge_management">

                    </div>
                   <div id="pageBar" role="page-bar"></div>
                   <div class="no-content-container"></div>
                </div>
            </div>
        </div>
    </div>
    </div>