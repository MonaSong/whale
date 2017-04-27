<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../menu/menu.jsp"%>
<table width="100%" class="table table-bordered table-hover table-condensed">
    <thead>
    <tr>
        <th>流程实例ID</th>
        <th>所属流程</th>
        <th>流程定义ID</th>
        <th>启动时间</th>
        <th>流程启动人</th>
        <th>结束时间</th>
        <th>父流程ID</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${historicProcessInstanceList }" var="hp">
        <tr>
            <td><%-- <a href="${ctx}/chapter13/history/process/finished/view/${hp.processInstanceId}"> --%>${hp.processInstanceId}</a></td>
            <td>${definitions[hp.processDefinitionId].name}</td>
            <td>${hp.processDefinitionId}</td>
            <td>${hp.startTime}</td>
            <td>${hp.startUserId}</td>
            <td>${hp.endTime}</td>
            <td><a href="${ctx}/chapter13/history/process/finished/view/${hp.superProcessInstanceId}">${hp.superProcessInstanceId}</a></td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<tags:pagination page="${page}" paginationSize="${page.pageSize}"/>
</div>
