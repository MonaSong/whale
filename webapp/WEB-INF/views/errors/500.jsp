<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
</head>
<body>
	<h1>错误500展示</h1>

	${requestScope['javax.servlet.error.message']}

	<%-- 	<%
	    exception.printStackTrace(response.getWriter());
	%> --%>

</body>
</html>