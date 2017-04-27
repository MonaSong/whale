<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../layouts/head.jsp"%>
<!DOCTYPE html>
<title>平台登录</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/zmm.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/login/no_winery_login.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/login/no_winery_login.js"></script>
<body>
<!-- 错误信息提示 -->
<div name="publicError"></div>
    <!--二级导航栏-->
<header class="header-section navbar navbar-fixed-top navbar-default nav-menu">
        <div class="navbar-h">
            <img src="<%=request.getContextPath()%>/imgs/common/icon_logo.png">
        </div>
</header>
<div class="container u-login-container">     
<div id="login" class="login">
    <div class="login-title">
        <span class="login-member center">基酒金融业务管理系统</span>
    </div>
    <form class="form-horizontal whale-remind" role="form" method="get" id="login-form" action="">
        <div class="forms form-item-account" id="form-item-account">
            <div class="regiser">
                <i class="icon-username imgs"></i>
                <input type="text" id="mobile" name="mobile" class="form-control wri_code field" placeholder="请输入手机号码">
            </div>
        </div>
        <div class="forms form-item-account" id="form-item-account">
            <i class="icon-username imgs-password"></i>
            <div class="regiser login_error">
                <input type="password" id="password" name="password" class="form-control wri_code field" placeholder="密码">
            </div>
        </div>
        <div class="login-remember">
            <label class="pull-left"><input type="checkbox" class='status pull-left'><span class="pull-left next-login">记住我</span></label>
            <div class="pull-right">
                <b class="forget" data-toggle="modal" data-target="#myModal">忘记密码</b>
            </div>
        </div>
        <div class="submit btn-choose center">
            <span class="btn submit-file btn-red  btn-primary" data-toggle="modal">登录</span>
        </div>
    </form>
</div>
</div>
<div class="footer">
  <div class="footer-img">
    <img src="<%=request.getContextPath()%>/imgs/login/silhouette.png">
  </div>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
         <button type="button" class="close" data-dismiss="modal">
             <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
         </button>
          <h4 class="modal-title">忘记密码</h4>
      </div>
      <div class="modal-body">
        <form method="get" class="form-horizontal" role="form" id="retrieve-form" action="">
            <div class="form-group form-group-md">
                <label class="col-md-3 control-label login-left" for="mobile">手机号：</label>
                <div class="col-md-8 login-right phone">
                    <input class="form-control mobile" type="text" id="phone" name="phone">
                </div>
            </div>
            <div class="form-group form-group-md">
                <label class="col-md-3 control-label login-left" for="code">验证码：</label>
                <div class="col-md-8 login-right passwordtxt">
                    <input class="form-control" type="text" id="code" name="code">
                    <input type="button" class="btn btn-primary obtain code btn-red" value="获取验证码">
                </div>
            </div>
            <div class="form-group form-group-md">
                <label class="col-md-3 control-label login-left" for="passwords">新密码：</label>
                <div class="col-md-8 login-right">
                    <input type="password" class="form-control" id="passwords" name="passwords" password="*">
                </div>
            </div>
            <div class="form-group form-group-md">
                <label class="col-md-3 control-label login-left" for="secondPassword">重复新密码：</label>
                <div class="col-md-8 login-right">
                    <input type="password" class="form-control" id="secondPassword" name="secondPassword" password="*">
                </div>
            </div>
        </form>
      </div>
        <div class="modal-footer btn-choose">
            <a  class="btn btn-default btn-gray btn-cancel btn-away" data-dismiss="modal">
                取消</a>
            <span class="btn btn-primary btn-red btn-confirm btn-assign btn-save">确认</span>
        </div>
    </div>
  </div>
</div>






    <!-- 忘记密码修改成功 -->
    <div class="modal fade" id="modifySucess" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content forget-password">
                <div class="modal-header main-header">
			         <button type="button" class="close" data-dismiss="modal">
			             <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
			         </button>
			          <h4 class="modal-title">忘记密码</h4>
                </div>
                <div class="modal-body">
                    <h4>您已成功设置密码</h4>
                </div>
		        <div class="modal-footer btn-choose">
		            <span class="btn btn-primary btn-red btn-confirm btn-assign" data-dismiss="modal"
		               >确认</span>
		        </div>
            </div>
        </div>
    </div>

</body>