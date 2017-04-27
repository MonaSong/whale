<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/global.jsp"%>
<%@ include file="../menu/menu.jsp"%>
<form action="${ctx}/workflow/process-deploy" method="post" enctype="multipart/form-data" style="margin-top: 1em;">
    <input type="file" name="file" />
    <input type="submit" value="Submit" class="btn" />
</form>
<table width="100%" class="table table-bordered table-hover table-condensed">
    <thead>
        <tr>
            <th>流程定义ID</th>
            <th>部署ID</th>
            <th>流程定义名称</th>
            <th>流程定义KEY</th>
            <th>版本号</th>
            <th>XML资源名称</th>
            <th>图片资源名称</th>
            <th width="200" colspan="3">操作</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach items="${processDefinitionList}" var="pd">
            <tr>
                <td>${pd.id }</td>
                <td>${pd.deploymentId }</td>
                <td>${pd.name }</td>
                <td>${pd.key }</td>
                <td>${pd.version }</td>
                <td>
                    <a target="_blank" href='${ctx }/workflow/read-resource?pdid=${pd.id }&resourceName=${pd.resourceName }'>${pd.resourceName }</a>
                </td>
                <td>
                    <a target="_blank" href='${ctx }/workflow/read-resource?pdid=${pd.id }&resourceName=${pd.diagramResourceName }'>${pd.diagramResourceName }</a>
                </td>
                <td>
                    <a href='${ctx }/workflow/delete-deployment?deploymentId=${pd.deploymentId }'>删除</a>
                </td>
                <td>
                    <a href='${ctx }/workflow/start/${pd.id }'>启动</a>
                </td>
                <td>
                    <a href='${ctx }/workflow/finished/list'>完成了的流程</a>
                </td>
            </tr>
        </c:forEach>
    </tbody>
</table>