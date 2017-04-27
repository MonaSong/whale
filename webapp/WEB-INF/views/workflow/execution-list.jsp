<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../menu/menu.jsp"%>
<div>
    <h1>当前任务</h1>
</div>
<table width="100%" class="table table-bordered table-hover table-condensed">
    <thead>
        <tr>
            <th>执行ID</th>
            <th>流程实例ID</th>
            <th>所属流程</th>
            <th>流程定义ID</th>
            <th>当前节点</th>
            <th>查看图片</th>
            <th>查看详情</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach items="${currentActivityMap }" var="e">
            <tr>
                <td>${e.id}</td>
                <td>${e.processInstanceId}</td>
                <td>${e.name}</td>
                <td>${e.processDefinitionId}</td>
                <td>
                    <c:forEach items="${currentActivityMap[e.id]}" var="acid">
                        <c:set var="task" value="${taskMap[acid]}" />
                        <a href="${ctx }/chapter13/process/trace/view/${task.executionId}" target="_blank">
                            <%-- 处理[调用活动] --%>
                            <c:if test="${task.processDefinitionId != e.processDefinitionId}">
                                <span title='引用了外部流程'>${definitions[task.processDefinitionId].name}</span>
                                <i style="margin-left: 0.5em;" class="icon-circle-arrow-right"></i>
                            </c:if>
                            ${task.name}
                        </a>
                        <c:if test="${empty task.assignee}">（<span class="text-info">未签收</span>）</c:if>
                        <c:if test="${not empty task.assignee}">
                            （<span class="text-info">办理中</span>
                            <i class="icon-user"></i>
                            <span class="text-success">${task.assignee}</span>）
                        </c:if>
                    </c:forEach>
                </td>
                <td>
                    <a href="${ctx}/workflow/process/trace/data/auto/${e.processInstanceId}">查看图片</a>
                </td>
                <td>
                    <a href="${ctx}/workflow/process/trace/view/${e.processInstanceId}">查看详情</a>
                </td>
            </tr>
        </c:forEach>
    </tbody>
</table>
