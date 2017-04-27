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
				/* get请求传递多个数组 */
				$("#submit_1").click(function() {
					var params = "ages=1&ages=2&ages=3&names=a&names=b&names=c";

					$.ajax({
						type : 'get',
						url : contextPath + "/test/param/test1" + "?" + params,
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				
				/* post请求传递多个数组 */
				$("#submit_2").click(function() {
					$.ajax({
						type : 'post',
						data:{
							"names":["a","b","c"],
							"ages":[1,2,3]
						},
						url : contextPath + "/test/param/test2",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				
				/* post传递单个文件 */
				$("#submit_3").click(function() {
					var file = $("#file_1")[0].files[0];
					var formData = new FormData();
					formData.append("file",file);
					console.debug(file);
					$.ajax({
						type : 'post',
						data: formData,
						contentType :false,
						processData : false,
						url : contextPath + "/test/param/test3",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				/* post传递多个文件 */
				$("#submit_4").click(function() {
					var formData = new FormData();
					//组装文件
					formData.append("files",$("#file_2")[0].files[0]);
					formData.append("files",$("#file_3")[0].files[0]);
					//组装文件名字
					formData.append("fileNames","fileName1");
					formData.append("fileNames","fileName2");
					$.ajax({
						type : 'post',
						data: formData,
						contentType :false,
						processData : false,
						url : contextPath + "/test/param/test4",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				
				/* post传递多个文件和一个json对象 */
				$("#submit_5").click(function() {
					var formData = new FormData();
					//组装Json对象:
					formData.append('person', new Blob([ JSON
								.stringify({
									"name" : "xiaoming",
									"address" : "上海"
								}) ], {
							type : "application/json"
					}));
					//组装文件
					formData.append("files",$("#file_2")[0].files[0]);
					formData.append("files",$("#file_3")[0].files[0]);
					//组装文件名字
					formData.append("fileNames","fileName1");
					formData.append("fileNames","fileName2");
					$.ajax({
						type : 'post',
						data: formData,
						contentType :false,
						processData : false,
						url : contextPath + "/test/param/test5",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				/* post传递多个json对象 */
				$("#submit_6").click(function() {
					//组装参数
					var postData = [
						{ "name" : "xiaoming1", "address" : "上海1"},
						{ "name" : "xiaoming2", "address" : "上海2"}
						]
					//发送请求
					$.ajax({
						type : 'post',
						data: JSON.stringify(postData),
						contentType: 'application/json',
						url : contextPath + "/test/param/test6",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				
				/* post传递单个json对象 */
				$("#submit_7").click(function() {
					//组装参数
					var postData = { "name" : "xiaoming2", "address" : "上海2"}
					//发送请求
					$.ajax({
						type : 'post',
						data: JSON.stringify(postData),
						contentType: 'application/json',
						url : contextPath + "/test/param/test7",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				
				
				/* post传递包含文件的单个json对象 */
				$("#submit_8").click(function() {
					var name = $("#name_8").val();
					var age = $("#age_8").val();
					var photo = $("#file_8")[0].files[0];
					//组装参数
					var postData = { "name" : name, "age" : age,"photo":photo}
					var formData = new FormData();
					formData.append("fileNames", "file2");

					formData.append('person', new Blob([ JSON
							.stringify({
								"name" : "xiaoming",
								"address" : "上海"
							}) ], {
						type : "application/json"
					}));
					//发送请求
					$.ajax({
						type : 'post',
						data: postData,
						contentType: undefined,
						processData : false,
						url : contextPath + "/test/param/test8",
						success : function(msg) {
							console.debug(msg);
						}
					});
				});
				
				


			});
</script>

</head>
<body>
	<% 
	   HttpSession session=request.getSession();
       String userName=(String)session.getAttribute("userName");
       out.print("username="+userName);
    %>
	<h1>get请求传递多个数组</h1>
	<form id="param1">
		int数组: <input disabled="true" type="text" value="1,2,3"><br />
		String数组:<input disabled="true" type="text" value="a,b,c" /> <span
			id="submit_1">提交</span>
	</form>
	<h1>post请求传递多个数组</h1>
	<form id="param2">
		int数组: <input disabled="true" type="text" value="1,2,3"><br />
		String数组:<input disabled="true" type="text" value="a,b,c" /> <span
			id="submit_2">提交</span>
	</form>
	<h1>post单个文件上传</h1>
	<form id="param3">
		文件: <input id="file_1" type="file"><br /> <span
			id="submit_3">提交</span>
	</form>
	<h1>post多个文件上传</h1>
	<form id="param4">
		文件1: <input id="file_2" type="file"><br /> 文件2: <input
			id="file_3" type="file"><br /> <span id="submit_4">提交</span>
	</form>
	<h1>post传递多个文件和一个json对象</h1>
	<form id="param5">
		"json对象： <span>{'name': 'xiaoming','address': '上海'}</span> <br />
		文件1: <input id="file_4" type="file"><br /> 文件2: <input
			id="file_5" type="file"><br /> <span id="submit_5">提交</span>
	</form>
	<h1>post传递json对象List</h1>
	<form id="param6">
		"json对象1： <span>{'name': 'xiaoming1','address': '上海1'}</span> <br />
		"json对象2： <span>{'name': 'xiaoming2','address': '上海2'}</span> <br />
		<span id="submit_6">提交</span>
	</form>
	<h1>post传递单个json对象</h1>
	<form id="param7">
		"json对象： <span>{'name': 'xiaoming1','address': '上海1'}</span> <br /> <span
			id="submit_7">提交</span>
	</form>

	<h1>
		post传递包含文件的单个json对象
		<未完成>
	</h1>
	<form id="param8">
		age ： <input type="text" id="age_8" value="20"> <br /> name：
		<input type="text" id="name_8" value="小明"> <br /> photo:<input
			type="file" id="file_8"> <span id="submit_8">提交</span>
	</form>


</body>
</html>