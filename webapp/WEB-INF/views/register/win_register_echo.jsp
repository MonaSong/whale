<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../layouts/head.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>入驻申请</title>
<!--省市联动文件  -->
<script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var roleid = "<%=session.getAttribute("roleid")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<script src="<%=request.getContextPath()%>/js/register/win_regester_management_requestdata.js"></script>
<link href="<%=request.getContextPath()%>/css/register/win_register.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/register/win_register_echo.js"></script>

</head>
<body>
    <!--首页顶部导航-->
    <header class="my-top-bar-container">    
        <div class="my-top-navbar">
            <ul class="nav navbar-nav navbar-right">
                <li class="current">
                    <span class="top-operator">
                        <div class="top_loginbar">
	                        <span>请</span>
	                        <a href="javascript:void(0)" class="user loginUser">登录</a>
	                        <a href="javascript:void(0)" class="small-slash">/</a> 
	                        <a href="javascript:void(0)" class="blue userRegister">注册</a>
	                    </div>
	                    <img class="select_img" src="<%=request.getContextPath()%>/imgs/common/select.png">    
                    </span>
                    <div class="sign-out">
                        <span>退出</span>
                    </div>
                </li>
                <li class="current"><a href="">客服电话:400-067-1919</a></li>                              
            </ul>
        </div>      
    </header>
    <!--二级导航栏-->
    <header class="header-section navbar navbar-fixed-top navbar-default nav-menu">
        <div class="container navbar-header-content">
            <div class="navbar-logo">
                <img src="<%=request.getContextPath()%>/imgs/login/base-win-logo.png">
            </div>
            <div  class="head-nav-bar">
                <ul>
                    <li class="current"><a href="<%=request.getContextPath()%>/basewineonline/index_page">首页</a></li>
                    <li><a href="<%=request.getContextPath()%>/basewineonline/find_base_win_page">找基酒</a></li>
                    <li class="active"><a class="backLogin" href="javascript:void(0)">找资金</a></li>
                    <li><a href="<%=request.getContextPath()%>/basewineonline/industry_information_page">行业资讯</a></li>
                </ul>
            </div>
            <div class="my-search-bar">
                <input type="text" class="form-control"><i class="w-icon-search search"></i>
            </div>
        </div>
    </header>
    
    <div class="whale-well whale-well-min clearfix container loan-apply">
        <div class="whale-well-headding pull-left">
            <h4 class="whale-well-title">贷款资格申请</h4>
        </div>
    </div>
    <!--入驻申请-->
    <div class="register container">
        <div class="settled-application">
           <p class="company-infor">企业信息</p>
           <!-- 错误信息提示 -->
           <div name='publicError'></div>
            <div class="row">
                <div class="col-md-12">
                    <form method="post" class="form-horizontal" enctype="multipart/form-data" role="form" id="user-register" action="">
                        <div class="whale-pane col-md-12">
                             <div class="whale-pane-heading">
                                <h4 class="whale-pane-title">联系人信息</h4>
                            </div>
                            <div class="whale-pane-body register-boty">
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="mobile"><b class="red">*</b>手机号：</label>
                                    <div class="col-md-5">
                                        <input class="form-control" type="text" id="mobile" disabled='disabled' name="mobile" placeholder="输入您的手机号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="trueName"><b class="red">*</b>姓名：</label>
                                    <div class="col-md-5">
                                        <input class="form-control" type="text" id="trueName" disabled='disabled' name="trueName" placeholder="联系人姓名">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="userDuty">联系人职务：</label>
                                    <div class="col-md-5">
                                        <input class="form-control" type="text" id="userDuty" disabled='disabled' name="userDuty" placeholder="联系人职务">
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <div class="whale-pane col-md-12">
                             <div class="whale-pane-heading">
                                <h4 class="whale-pane-title">企业基本信息</h4>
                            </div>
                            <div class="whale-pane-body register-boty">
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="companyName"><b class="red">*</b>单位全称：</label>
                                    <div class="col-md-5">
                                        <input class="form-control" type="text" id="companyName" disabled='disabled' name="companyName" placeholder="输入单位全称，最长30个字符">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="companyAddress"><b class="red">*</b>联系地址：</label>
                                    <div class="col-md-3">
                                        <select id="companyProvince" disabled='disabled' class="form-control"></select>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="companyCity" disabled='disabled' class="form-control"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label"></label>
                                    <div class="col-md-5">
                                        <input class="form-control address" type="text" id="companyAddress" disabled='disabled' name="companyAddress" placeholder="输入联系地址，最长30个字符">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="businessLicenseNum"><b class="red">*</b>营业执照号码：</label>
                                    <div class="col-md-5">
                                        <input class="form-control" type="text" id="businessLicenseNum" disabled='disabled' name="businessLicenseNum" placeholder="输入您单位的营业执照号码">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="inviteCode">邀请码：</label>
                                    <div class="col-md-5">
                                        <input class="form-control" type="text" id="inviteCode" disabled='disabled' name="inviteCode" placeholder="请输入邀请码（邀请码可以为空）">
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <div class="whale-pane col-md-12">
                             <div class="whale-pane-heading">
                                <h4 class="whale-pane-title">企业证照信息</h4>
                            </div>
                            <div class="whale-pane-warning">
                                <p class="text-center">支持jpg(*.jpg、*.jpeg)、bmp、png、gif格式图片。单个文件不超过10M</p>
                            </div>
                            <div class="whale-pane-body register-boty">
                                <div class="form-group">
                                    <label class="col-md-4 control-label"><b class="red">*</b>营业执照电子版正本：</label>
                                    <div class="col-md-6 pic_show">
                                        <div class="register_div">
                                            <div class="upfilebox">
                                                <input class="form-control bussinessLicense" type="file" id="bussinessLicense" name="bussinessLicense">
                                                <label class="lable lable-pic"></label>
                                            </div>
                                            <div id="register-view"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label"><b class="red">*</b>税务登记扫描件：</label>
                                    <div class="col-md-6 pic_show">
                                        <div class="register_div">
                                            <div class="upfilebox">
                                                <input class="form-control taxRegistration" type="file" id="taxRegistration" name="taxRegistration">
                                                <label class="lable lable-pic"></label>
                                            </div>
                                            <div id="register-view"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label"><b class="red">*</b>法人代表身份证正面扫描件：</label>
                                    <div class="col-md-6 pic_show">
                                        <div class="register_div">
                                            <div class="upfilebox">
                                                <input class="form-control legalFrontCardPic" type="file" id="legalFrontCardPic" name="legalFrontCardPic">
                                                <label class="lable lable-pic"></label>
                                            </div>
                                            <div id="register-view"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label"><b class="red">*</b>法人代表身份证反面扫描件：</label>
                                    <div class="col-md-6 pic_show">
                                        <div class="register_div">
                                            <div class="upfilebox">
                                                <input class="form-control legalBackCardPic" type="file" id="legalBackCardPic" name="legalBackCardPic">
                                                <label class="lable lable-pic"></label>
                                            </div>
                                            <div id="register-view"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label"><b class="red">*</b>酒厂现场照片：</label>
                                    <div class="col-md-6 pic_show">
                                        <div class="register_div">
                                            <div class="upfilebox">
                                                <input class="form-control wineryLivePic" type="file" id="wineryLivePic" name="wineryLivePic">
                                                <label class="lable lable-pic"></label>
                                            </div>
                                            <div id="register-view"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
     <!-- 服务信息 -->
    <div class="my-container-box us-service">
        <div class="my-container">
            <img src="<%=request.getContextPath()%>/imgs/login/us-service.png" alt="">
        </div>
    </div>
    <!--底部-->
    <div class="footer clearfix">
        <div class="container">
            <!-- <div class="row footer-list">
                <ul class="list-service clearfix">
                    <li>
                        <a><i class="iconfont"></i>优质多样化行业资讯</a>
                    </li>
                    <li>
                        <a><i class="iconfont"></i>安全的资金链</a>
                    </li>
                    <li>
                        <a><i class="iconfont"></i>100%真实基酒供应链</a>
                    </li>
                    <li>
                        <a><i class="iconfont"></i>贷款方式便捷</a>
                    </li>
                    <li>
                        <a><i class="iconfont"></i>一站式服务</a>
                    </li>
                </ul>
            </div> -->
            <div class="footer-bar">
                <div class="widget">
                    <p>关于我们</p>
                    <div class="footer-entrance"></div>
                    <p>
                        <a href="#">公司简介</a>
                    </p>
                    <p>
                        <a href="#">加入我们</a>
                    </p>
                    <p>
                        <a href="#">联系我们</a>
                    </p>
                </div>
                <div class="widget">
                    <p>权益保障</p>
                    <div class="footer-activity"></div>
                    <p>
                        <a href="#">服务协议</a>
                    </p>
                    <p>
                        <a href="#">权利声明</a>
                    </p>
                    <p>
                        <a href="#">隐私政策</a>
                    </p>
                </div>
                <div class="widget">
                    <p>常见问题</p>
                    <div class="footer-policy"></div>
                    <p>
                        <a href="#">找回密码</a>
                    </p>
                    <p>
                        <a href="#">查看招标</a>
                    </p>
                    <p>
                        <a href="#">关注官方</a>
                    </p>
                </div>
                <div class="widget">
                    <p>操作指引</p>
                    <div class="footer-service"></div>
                    <p>
                        <a href="#">注册登录</a>
                    </p>
                    <p>
                        <a href="#">认证流程</a>
                    </p>
                    <p>
                        <a href="#">询价流程</a>
                    </p>
                </div>
                <div class="widget">
                    <p>贷款指南</p>
                    <div class="footer-about"></div>
                    <p>
                        <a href="#">找如何代办款</a>
                    </p>
                    <p>
                        <a href="#">资质相关问题</a>
                    </p>
                    <p>
                        <a href="#">贷款注意事项</a>
                    </p>
                    <p>
                        <a href="#">其他问题</a>
                    </p>
                </div>
                <!-- <div class="widget">
                    <p><img src="imgs/login/icon_reweima.png"></p>

                </div> -->
                <div class="widget phone">
                    <p>客服热线：（工作时间09:00-18:00）</p>
                    <p>410-810-8818</p>
                    <p>service@joinku.com</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 版权信息 -->
    <div class="my-container-box clearfix copyright-information"> 
        <div class="my-container">
            <span class="pull-left">Copyright © 2016 Joinku.com，All Rights Reserved</span>
            <span class="pull-right">粤ICP备16014751号-2</span>
        </div>          
    </div>
</body>
</html>