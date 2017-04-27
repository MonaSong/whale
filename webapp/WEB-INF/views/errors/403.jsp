<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
</head>
<body>
    <h1>这个是越权访问的错误提示页面(用户没有权限做此操作)</h1>
	<a href="<c:url value="/views/login.jsp" />">登录</a>
</body>
</html>