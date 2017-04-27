<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/basewinonline/base_win_online.css"></link>
<style type="text/css">
  body{
    background-color: #f2f2f2;
  }
</style>
<div class="container" data-role="find-base-win-container">
    <div class="head"></div>
    <div data-role="base-win" class="container-box">
        <div class="menu">
             <ul>
               <li><a href="<%=request.getContextPath()%>/basewineonline/index_page" title="首页"></a></li>
               <li><a href="<%=request.getContextPath()%>/basewineonline/find_base_win_page" title="找基酒"></a></li>
               <li><a href="<%=request.getContextPath()%>/" title="找资金"></a></li>
               <li><a href="<%=request.getContextPath()%>/basewineonline/industry_information_page" title="行业资讯"></a></li>
             </ul>
        </div>
    </div>
    <div class="footer">
        <div class="about-us"></div>
        <div class="company-info"></div>
    </div>
</div>

