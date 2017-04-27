<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="../layouts/head.jsp"%>

<html>
<head>
<meta charset="UTF-8">
<title>test </title>

<script type="text/javascript">
	$(document).ready(
			function() {

				$("#test_form").click(
						function() {
							var formData = new FormData();
							formData.append("files", document
									.getElementById("file1").files[0]);
							formData.append("files", document
									.getElementById("file2").files[0]);

							formData.append("fileNames", "file1");
							formData.append("fileNames", "file2");

							formData.append('person', new Blob([ JSON
									.stringify({
										"name" : "xiaoming",
										"address" : "上海"
									}) ], {
								type : "application/json"
							}));
							$.ajax({
								type : 'post',
								data : formData,
								url : contextPath + "/test/param2",
								contentType : false,
								processData : false,
								success : function(msg) {
									console.debug(msg);
								}
							});
						});

			});
</script>

</head>
<body>

	<h1>上传文件</h1>
	<form enctype="multipart/form-data"
		action="/whale/test/accessory/upload" method="post">
		fileName:<input name="fileName" type="text"><br /> filePath:<input
			name="file" type="file" /><br /> <input type="submit"
			value="submit" />
	</form>

	<h1>传递文件和对象</h1>
	<form name="test_r" id="test_form" action="/whale/test/param2"
		method="post" enctype="multipart/form-data">
		fileName:<input name="name" type="text" value="1"><br />
		filePath:<input name="address" type="text" value="2" /><br />
		fileName:<input type="file" class="file" id="file1" name="file">
		fileName:<input type="file" class="file" id="file2" name="file">
		<br> <span id='the_form'>submit</span>
	</form>




</body>
</html>