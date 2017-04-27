<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/head.jsp"%>

<script src="${ctx}/js/lib/DataTables-1.10.12/jquery.dataTables.min.js"></script>
<script src="${ctx}/js/lib/DataTables-1.10.12/dataTables.bootstrap.js"></script>
<!--使用bootbox来做提示对话框  -->
<script src="${ctx}/js/lib/bootbox-4.4.0/bootbox.min.js"></script>
<!--使用HubSpot Messager做提示对话框 -->
<script src="${ctx}/js/lib/messenger-1.5.0/messenger.min.js"></script>
<script src="${ctx}/js/lib/messenger-1.5.0/messenger-theme-flat.js"></script>
<link href="${ctx}/css/lib/DataTables-1.10.12/jquery.dataTables.min.css" rel="stylesheet">
<link href="${ctx}/css/lib/DataTables-1.10.12/dataTables.bootstrap.min.css" rel="stylesheet">
<!--使用HubSpot Messager做提示对话框 -->
<link href="${ctx}/css/lib/messenger-1.5.0/messenger.css" rel="stylesheet">
<link href="${ctx}/css/lib/messenger-1.5.0/messenger-theme-future.css" rel="stylesheet">
<link href="${ctx}/css/lib/messenger-1.5.0/messenger-theme-air.css" rel="stylesheet">
<script src="${ctx}/js/businesslog/index.js"></script>
<link href="${ctx}/css/businesslog/index.css" rel="stylesheet">


<div class="dataTable_div">
    <table id="businesslog_table" class="table table-striped table-bordered hover">
        <thead>
            <tr>
                <th>产生时间</th>
                <th>操作员</th>
                <th>事件名称</th>
                <th>IP地址</th>
                <th>操作系统</th>
                <th>浏览器</th>
                <th>浏览器版本</th>
                <th>访问设备</th>
                <th>调用类</th>
                <th>调用方法</th>
                <th>运行结果</th>
            </tr>
        </thead>
        <tfoot>
           <tr>
                <th>产生时间</th>
                <th>操作员</th>
                <th>事件名称</th>
                <th>IP地址</th>
                <th>操作系统</th>
                <th>浏览器</th>
                <th>浏览器版本</th>
                <th>访问设备</th>
                <th>调用类</th>
                <th>调用方法</th>
                <th>运行结果</th>
            </tr>
        </tfoot>
    </table>
</div>
</div>