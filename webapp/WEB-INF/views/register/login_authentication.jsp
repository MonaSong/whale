<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../layouts/head.jsp"%>
<title>忘记密码</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login_authentication.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<link href="<%=request.getContextPath()%>/css/login/login.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/register/user_register.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/login/login_authentication.css" rel="stylesheet">
<body>
<!-- 错误信息提示 -->
<div name='publicError'></div>
    <!--二级导航栏-->
<header class="header-section navbar navbar-fixed-top navbar-default nav-menu">
        <div class="navbar-h">
            <img src="<%=request.getContextPath()%>/imgs/common/icon_logo.png">
        </div>
</header>
<!-- 忘记密码 -->
<div class="user_register content">
    <div class="container ">
         <form class="form-horizontal form-data-pane whale-remind col-xs-12" role="form" method="get" id="user-form" action="">
               <div class="form-group">
               <label class="col-md-3 control-label">初次登录验证</label>
               </div>
                <div class="form-group center">
                    <p class="col-md-12 center" for="username">这是您首次登录本系统，请先验证手机号的有效性。本操作完成后将不会在出现</p>
                </div>
                <div class="forms form-item-account">
                <label class="form-reister">手机号：</label>
                    <div class="mobile">
                        <p class="form-control-static user-mobile"  disabled="disabled"></p>
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile">
                        <input class="form-control wri_code" type="text" id="code" name="code" placeholder="请输入手机验证码">
                        <input type="button" class="btn btn-primary creat_code obtain btn-gray" value="获取验证码">
                    </div>
                </div>
                <div class="forms form-item-account">
                    <div class="mobile">
                        <input class="wri_code form-control" id="picCode" name="picCode" placeholder="请输入验证码">
                         <span class='creat_code text-center'><img src="<%=request.getContextPath()%>/verfiyPic" onclick="this.src=this.src+'?'+Math.radom"></span>
                    </div>
                </div>
                <div class="forms form-item-account">
                   <div class=" center">
                       <span class="btn btn-primary btn-blue btn-submit confrim_btn" >提交</span>
                   </div>
                  </div>
                   </form>
            </div>
    <div class="contet">
        <div class="container">
            <div class="row hide">
                <span class="img_success"><img src="<%=request.getContextPath()%>/imgs/login/success.png"></span>
              <div class="time_login">  
                   <p class="center time">验证成功！<a class="loginbar">3秒进入登录页</a></p>
             </div>
            </div>
        </div>
    </div>
 </div>
    <!-- 底部 -->
<div class="footer">
  <div class="footer-img">
    <img src="<%=request.getContextPath()%>/imgs/login/silhouette.png">
  </div>
</div>
</body>
</html>
