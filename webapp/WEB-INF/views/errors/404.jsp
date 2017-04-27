<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
</head>
<body>
    <%=request.getAttribute("javax.servlet.forward.request_uri") %>
    <h1>页面不存在</h1>
	<a href="<c:url value="/views/login.jsp" />">登录</a>
</body>
</html>