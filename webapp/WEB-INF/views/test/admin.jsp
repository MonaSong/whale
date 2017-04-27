<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>Admin page</title>
</head>
<body>
    Dear <strong><font color="red">${user}</font></strong>, Welcome to Admin Page.
    <a href="<c:url value="/logout" />">Logout</a>
    <p/>
    <a href="<c:url value="/workflow/process-instance/list" />">访问应用</a>
</body>
</html>