<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ include file="../layouts/left.jsp"%>
<script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
<link href="<%=request.getContextPath()%>/css/pledgemanagement/pledge_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/pledgemanagement/pledge_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/pledgemanagement/inspection_records.js"></script>
<title>巡检记录</title>
<!-- 页面主容器 -->
<div  class="main-content-container">
<div class="s-container">
<div name="publicError"></div>
<!-- 页面内容 -->
<div class="s-page-content clearfix">
<div class="whale-well whale-well-min clearfix">
<div class="whale-well-headding pull-left">
<h4 class="whale-well-title">巡检记录</h4>
</div>
</div>
<div class="form-container no-menu">
    <div class="form-container-no-menu">
        <div class="container whale-container">    
            <div class="row">
                <div class="col-xs-12">
                    <h4 class="records-title">巡检记录</h4> 
                    <div class="calendar" data-role="whale-canlander" id="calendar"> 
                        <div class="wrap">
                            <span class="span"><b id="theYear" class="theYear" role="the-year">2016</b>/<b id="theMonth" class="theMonth" role="the-month">1</b></span>
                            <span class="next_year" id="next_year" title="下一年" role="next-year"> >> </span>
                            <span class="next_month" id="next_month" title="下一月" role="next-month"> > </span>
                            <span class="prev_month" id="prev_month" title="上一月" role="prev-month"> < </span>
                            <span class="prev_year" id="prev_year" title="上一年" role="prev-year"> << </span>
                        </div>
                        <table class="">
                            <tr class="header">
                                <td>日</td>
                                <td>一</td>
                                <td>二</td>
                                <td>三</td>
                                <td>四</td>
                                <td>五</td>
                                <td>六</td>
                            </tr>
                        </table>       
                    </div>                                           
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
     
</div>