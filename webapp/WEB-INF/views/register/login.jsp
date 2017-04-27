<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../layouts/head.jsp"%>
<!DOCTYPE html>
<title>首页</title>
<script>
    var SessionMessage = "<%=session.getAttribute("message")%>";
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/login/login.js"></script>
<script src="<%=request.getContextPath()%>/js/tools/request.js"></script>
<script src="<%=request.getContextPath()%>/js/register/win_regester_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/register/login_warn.js"></script>
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/layouts/zmm.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/login/login.css" rel="stylesheet">

<body>
    <!--首页顶部导航-->
    <header class="my-top-bar-container">    
        <div class="my-top-navbar">
            <ul class="nav navbar-nav navbar-right">
                <li class="current">
                    <span class="top-operator">
                        <div class="top_loginbar">
	                        <span>请</span>
	                        <a href="<%=request.getContextPath()%>/login_page" class="blue userlogin">登录</a>
	                        <a href="javascript:void(0)" class="small-slash">/</a> 
	                        <a href="<%=request.getContextPath()%>/user_register_page" class="blue userRegister">注册</a>
                        </div>
                        <div class="mobile-show">
                            <img class="select_img" src="<%=request.getContextPath()%>/imgs/common/select.png">
                        </div>
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
                    <li class="current"><a href="javascript:void(0)">首页</a></li>
                    <li><a href="javascript:void(0)">找基酒</a></li>
                    <li class="active"><a href="javascript:void(0)">找资金</a></li>
                    <li><a href="javascript:void(0)">行业资讯</a></li>
                </ul>
            </div>
            <div class="my-search-bar">
                <input type="text" class="form-control"><i class="w-icon-search search"></i>
            </div>
        </div>
    </header>
    <!--登录-->      
    <div class="main  winery-regist clearfix">
        <div class='container'>
            <div class='row banner-container'>
                <div class='col-xs-12 banner-box'>
                    <div class='row'>
                       <div class='col-xs-12'>
                           <div id="carousel-example-generic" class="carousel slide banner pull-left" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carousel-example-generic" data-slide-to="0"
                                        class="active"></li>
                                </ol>
                                <div class="carousel-inner" role="listbox">
                                    <div class="item active">
                                        <img src="<%=request.getContextPath()%>/imgs/login/banner-01.png" alt="宣传图片">
                                        <div class="carousel-caption"></div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class='col-lg-3 login-box'>
                 <div class="login loginbar winery-regist-info login_finace">
                    <div class="login_information">
                        <div class="wine_finance_img">
                            <img src="<%=request.getContextPath()%>/imgs/login/logo.png">
                        </div>
                        <div class="finance_point"></div>
                        <div class="finance_point1"></div>
                        <div class="finance_point2"></div>
                        <div class="finance_point3"></div>
                        <p class="center base_liquor_loan">基酒抵押贷款</p>
                    <div class="warn_information">
                        <p class="center base_liquor_benefit">用库存换原料 &nbsp;&nbsp;让风险变效益</p>
                        <div class="login_warn">
                        
                        </div>
                    </div>
                    <div class="loan_login center">
                       <span type="button" class="btn loan-apply">贷款资格申请</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>     
    </div>
    </div>
    <!-- 什么是基酒金融 -->
    <div class="my-container-box about-base-win">
        <div class="my-container">
            <div class="base-win-info first-info">
                <img src="<%=request.getContextPath()%>/imgs/login/base-win-1.png" class="ani-rgt">
                <div class="base-win-info-text ani-lft base-win-fancing">
                    <h3>什么是基酒金融？</h3>
                    <p>基酒金融是一款专注于酒行业的全生态供应链金融服务产品。由中酒国际发起，凭借基酒在线平台和专业的服务团队，通过提供优质便捷的金融服务来满足市场需求。</p>
                </div>
            </div>
            <div class="base-win-info second-info">
                <img src="<%=request.getContextPath()%>/imgs/login/base-win-2.png" class="ani-lft">
                <div class="base-win-info-text pull-right ani-rgt base-win-two-fancing">
                    <h3>为什么选择基酒金融？</h3>
                    <p>中酒国际拥有贯通厂商、经销商、电子商务及终端客户的架构体系，拥有国家政策以及各级机构的强力支持，拥有专业的项目、渠道以及网络运营团队，拥有严谨有效的金融咨询及投资策略体系，更拥有打通各个环节的综合整合能力。中酒国际将在粮食贸易以及供应链金融方面为广大酒企提供多方位的服务与支持。</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 产品特色 -->
    <div class="my-container-box product-introduction">
        <div class="my-container-title">
            <span>产品特色</span>
        </div>
        <div class="my-container">
            <!--第一个-->
            <div class="product_feature">
                <div class="product_introduction">
                    <div class="circleProgress_wrapper">
                        <span class="img_pic service"></span>
                        <div class="wrapper right">
                            <div class="circleProgress circleright"></div>
                        </div>
                        <div class="wrapper left">
                            <div class="circleProgress circleleft"></div>
                        </div>
                    </div>
                    <p class="p_introduction">专业服务</p>
                </div>
                <!--第二个-->
                <div class="product_introduction">
                    <div class="circleProgress_wrapper">
                        <span class="img_pic security"></span>
                        <div class="wrapper right">
                            <div class="circleProgress circleright"></div>
                        </div>
                        <div class="wrapper left">
                            <div class="circleProgress circleleft"></div>
                        </div>
                    </div>
                    <p  class="p_introduction">安全保障</p>
                </div>
                <!--第三个-->
                <div class="product_introduction">
                    <div class="circleProgress_wrapper">
                        <span class="img_pic easy"></span>
                        <div class="wrapper right">
                            <div class="circleProgress circleright"></div>
                        </div>
                        <div class="wrapper left">
                            <div class="circleProgress circleleft"></div>
                        </div>
                    </div>
                    <p  class="p_introduction">无忧采购</p>
                </div>
                <!--第四个-->
                <div class="product_introduction">
                    <div class="circleProgress_wrapper">
                        <span class="img_pic profit"></span>
                        <div class="wrapper right">
                            <div class="circleProgress circleright"></div>
                        </div>
                        <div class="wrapper left">
                            <div class="circleProgress circleleft"></div>
                        </div>
                    </div>
                    <p  class="p_introduction">成本透明</p>
                </div>
                <!--第五个-->
                <div class="product_introduction">
                    <div class="circleProgress_wrapper">
                        <span class="img_pic lines"></span>
                        <div class="wrapper right">
                            <div class="circleProgress circleright"></div>
                        </div>
                        <div class="wrapper left">
                            <div class="circleProgress circleleft"></div>
                        </div>
                    </div>
                    <p  class="p_introduction">额度灵活</p>
                </div>
                <!--第六个-->
                <div class="product_introduction">
                    <div class="circleProgress_wrapper">
                        <span class="img_pic rising"></span>
                        <div class="wrapper right">
                            <div class="circleProgress circleright"></div>
                        </div>
                        <div class="wrapper left">
                            <div class="circleProgress circleleft"></div>
                        </div>
                    </div>
                    <p  class="p_introduction">手续便捷</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 贷款流程 -->
    <div class="my-container-box finance-process">
        <div class="my-container-title"><span>贷款流程</span></div>
        <div class="my-container ">
            <!--<img src="<%=request.getContextPath()%>/imgs/login/finance-process.png" alt="">--> 
            <div class="shake_pic">
                <b class="pic_logo  apply"></b>
                <span></span>
                <span></span>
                <p>酒厂提出<br>融资申请</p>

                <b class="pic_logo  audits"></b>
                <span></span>
                <span></span>
                <p>各方审核</p>

                <b class="pic_logo  assessment assessment-bg-icon"></b>
                <span></span>
                <span></span>
                <p>样酒评估</p>

                <b class="pic_logo  contract"></b>
                <span></span>
                <span></span>
                <p>签订《粮食<br>采购合同》</p>

                <b class="pic_logo complete"></b>
                <p>完成放款</p>
            </div>
        </div>
    </div>
             
    <!-- 常见问题 -->
    <div class="my-container-box every-problem">
        <div class="my-container-title"><span>常见问题</span></div>
        <div class="my-container common-problem">
            <div class="line-top-point"></div>
            <div class="line-bottom-point"></div>
            <div class="line"></div>
            <div class="product-user">
                <h3>这个产品针对的用户是谁？</h3>
                <p>白酒基酒生产厂商，此项金融服务仅针对合作与中酒国际贸易平台的厂商。</p>
            </div>
            <div class="problem-one text-center">1</div>
            <div class="problem-two text-center">2</div>
            <div class="product-require">
                <h3>质押基酒有什么要求呢？</h3>
                <p>浓香型、酱香型、清香型、凤香型基酒经中酒国际指定检验检测机构检验评估，符合生产技术指标。</p>
            </div>
            <div class="problem-three text-center">3</div>
            <div class="finace-quota">
                <h3>融资额度能达到多少？</h3>
                <p>根据酒厂经营情况及可提供的质押基酒数量综合评估确定。</p>
            </div>
            <div class="problem-four text-center">4</div>
            <div class="finace-date">
                <h3>融资期限多久？</h3>
                <p>一年期和三年期。</p>
            </div>
            <div class="problem-five text-center">5</div>
            <div class="finace-way">
                <h3>还款方式？</h3>
                <p>按月付息/按季付息，到期还本。</p>
            </div>
            <div class="problem-six text-center">6</div>
            <div class="finace-cost">
                <h3>融资成本？</h3>
                <p>一年期：综合年化15%（利息6%+综合服务费9%）</p>
                <p>三年期：综合年化16%（利息6.5%+综合服务费9.5%）</p>
                <p>综合成本由利息和综合服务费用组成。综合服务费用涵盖：监管费、</p>
                <p>保险费（履约责任险、财产险、监管责任险）、融资服务费；不包</p>
                <p>括基酒检验检测及评估费用。综合服务费用期限与融资期限对应。</p>
            </div>
        </div>
    </div>
    
    <!-- 合作伙伴 -->
    <div class="my-container-box us-contact">
        <div class="my-container-title"><span>合作伙伴</span></div>
        <div class="my-container">
            <img src="<%=request.getContextPath()%>/imgs/login/contact.png" alt="">
        </div>
    </div>
    
    <!-- 服务信息 -->
    <div class="my-container-box us-service">
        <div class="my-container">
            <img src="<%=request.getContextPath()%>/imgs/login/us-service.png" alt="">
        </div>
    </div>

    <!-- 底部 -->
    <div class="footer clearfix">
        <div class="container">
            <div class="footer-bar">
                <div class="widget">
                    <p>关于我们</p>
                    <div class="footer-entrance"></div>
                    <p>
                        <a href="javascript:void(0)">公司简介</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">加入我们</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">联系我们</a>
                    </p>
                </div>
                <div class="widget">
                    <p>权益保障</p>
                    <div class="footer-activity"></div>
                    <p>
                        <a href="javascript:void(0)">服务协议</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">权利声明</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">隐私政策</a>
                    </p>
                </div>
                <div class="widget">
                    <p>常见问题</p>
                    <div class="footer-policy"></div>
                    <p>
                        <a href="javascript:void(0)">找回密码</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">查看招标</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">关注官方</a>
                    </p>
                </div>
                <div class="widget">
                    <p>操作指引</p>
                    <div class="footer-service"></div>
                    <p>
                        <a href="javascript:void(0)">注册登录</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">认证流程</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">询价流程</a>
                    </p>
                </div>
                <div class="widget">
                    <p>贷款指南</p>
                    <div class="footer-about"></div>
                    <p>
                        <a href="javascript:void(0)">找如何代办款</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">资质相关问题</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">贷款注意事项</a>
                    </p>
                    <p>
                        <a href="javascript:void(0)">其他问题</a>
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
    <span data-role="back-to-top">回到顶部</span>   
</body>
</html>
</body>

</html>