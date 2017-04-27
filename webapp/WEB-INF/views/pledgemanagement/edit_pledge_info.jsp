        <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
        <link href="<%=request.getContextPath()%>/css/pledgemanagement/pledge_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/pledgemanagement/edit_pledge_info.js"></script>
        <title>质押监管</title>
        <!-- 页面主容器 -->
        <div  class="main-content-container">
        <div class="s-container">
        <div name="publicError"></div>
        <!-- 页面内容 -->
        <div class="s-page-content clearfix">
        <div class="whale-well whale-well-min clearfix">
        <div class="whale-well-headding pull-left">
        <h4 class="whale-well-title">质押物信息</h4>
        </div>
        </div>
        <div class="form-container no-menu">
            <div class="form-container-no-menu">
                <div class="container whale-container">    
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- 质押就位信息 -->
                            <div class="clearfix form-data-pane hide-status winery-peledge-info" id="winery-peledge-info"> 
                                <div class="form-group clearfix">                        
                                    <span class="pull-right hide-status text-static" data-management-info="">
                                        <b data-role-name=""></b>
                                        <b data-true-name=""></b>
                                        <b data-management-time=""></b>
                                    </span>
                                    <h4 for="" class="col-md-5 black">质押就位<span data-role="winery-name"></span></h4>
                                </div>
                                <div class="form-group clearfix">
                                    <label for="" class="col-md-2 text-right control-label text-static">监管方：</label>
                                    <div class="col-md-6">
                                        <input type="text" disabled="" class="form-control" name="jgName">
                                    </div>
                                </div>
                                
                                <div data-id="pledge-box">
                                    
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-2 text-right text-static">合计质押基酒价格：</label>
                                    <div class="col-md-6">
                                        <input type="text" disabled="" class="form-control" name="pledgeTotalPrice">
                                    </div>
                                    <div class="col-md-2 text-static">元</div>
                                </div>
                            </div>
                            <!-- 质押监管信息 -->
                            <form role="form" action="" data-pane-id="edit-pledge-info" class="form-horizontal form-data-pane col-md-12" style="display: block;">
                                <div class="col-md-12">
                                    <div class="form-group clearfix"> 
                                        <h4 for="" class="col-md-5 black">质押监管<span data-role="jg-operator"></span></h4>                          
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>                              
                                    </div>              
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>基酒类型：</label>
                                        <div class="col-md-5">                                
                                            <div id="baseWineTypesContainer" class="base-win-container"></div>
                                            <span  name="baseWineTypes">
                                                <a href="javascript:void(0)" id="select-base-wine" >请选择基酒类型</a>
                                                <div id="allBaseWinTypes" class="hide-status base-win-info">
                                                    <span><label><input type="checkbox" value="酱香型">酱香型</label></span>
                                                    <span><label><input type="checkbox" value="浓香型">浓香型</label></span>
                                                    <span><label><input type="checkbox" value="清香型">清香型</label></span>
                                                    <span><label><input type="checkbox" value="兼香型">兼香型</label></span>
                                                    <span><label><input type="checkbox" value="米香型">米香型</label></span>
                                                    <span><label><input type="checkbox" value="凤香型">凤香型</label></span>
                                                    <span><label><input type="checkbox" value="芝麻香型">芝麻香型</label></span>
                                                    <span><label><input type="checkbox" value="豉香型">豉香型</label></span>
                                                    <span><label><input type="checkbox" value="特香型">特香型</label></span>
                                                    <span><label><input type="checkbox" value="老白干香型">老白干香型</label></span>
                                                    <span><label><input type="checkbox" value="馥郁香型">馥郁香型</label></span>
                                                    <span><label><input type="checkbox" value="药香型">药香型</label></span>
                                                    <span><label><input type="checkbox" value="其他">其他</label></span>
                                                    <span class="btn btn-primary" id="confirm-base-win">确定</span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>数量：</label>
                                        <div class="col-md-5">
                                            <input type="text"    class="form-control" name="baseWineNum" value="">
                                        </div>
                                        <div class="col-md-2 text-static">吨</div>
                                    </div>  
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>生产日期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="productionTime" value="" data-date>
                                        </div>
                                    </div>
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>评估价值：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money" class="form-control" name="evaluationPrice" value="">
                                        </div>
                                        <div class="col-md-2 text-static">元</div>
                                    </div> 
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>质权人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="pledgeeName" value="">
                                        </div>
                                    </div> 
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>出质人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="pledgorName" value="">
                                        </div>
                                    </div>
                                     <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>出质日期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="qualityDate" value="" data-date>
                                        </div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>监管方：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="regulatorName" value="">
                                        </div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>质押物清单：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="pledgeBillAccessory" id="pledgeBillAccessory" >
                                        </div>
                                    </div>
                                    <div class="form-group clearfix">                
                                        <h4 class="col-md-5 black">监管方责任保险单</h4>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保单名称：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="regulatorPolicyName" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>投保人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="regulatorPolicyHolder" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保险人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="regulatorInsurer" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保险费：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money" class="form-control" name="regulatorPolicyPremium" value="">
                                        </div>
                                        <div class="col-md-2 text-static">元</div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>有效期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="regulatorPolicyPeriod"  value="">
                                        </div>
                                        <div class="col-md-2 text-static">年</div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>监管责任保险单：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="regulatorPolicyAccessory" id="regulatorPolicyAccessory">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix">                
                                        <h4 class="col-md-5 black">财产保险单</h4>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保单名称：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="propertyPolicyName" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>投保人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="propertyPolicyHolder" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保险人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="propertyInsurer" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>保险费：</label>
                                        <div class="col-md-5">
                                            <input type="text"  data-role="whale-money" class="form-control" name="propertyPolicyPremium" value="">
                                        </div>
                                        <div class="col-md-2 text-static">元</div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>有效期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="propertyPolicyPeriod" value="">
                                        </div>
                                        <div class="col-md-2 text-static">年</div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>财产保险单：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="propertyPolicyAccessory" id="propertyPolicyAccessory">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operater-bottom>   
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn"  data-id="pledge-info-confirm" data-info="监管方操作员" data-submit>确定</span>
                                        </div>
                                    </div>                       
                            </form>
                            <!-- 真安信审员的审核信息 -->
                            <div data-pane-id="zhen-an-credit">
                                <div class="form-group clearfix"> 
                                    <h4 for="" class="col-md-5 black">质押监管<span data-role="jg-operator"></span></h4>                          
                                    <span class="pull-right hide-status text-static" data-management-info="">
                                        <b data-role-name=""></b>
                                        <b data-true-name=""></b>
                                        <b data-management-time=""></b>
                                    </span>                              
                                </div> 
                                <div class="form-group">
                                    <label for="" class="col-md-2 text-right">审核结果：</label>
                                    <div class="col-md-5">
                                        <select name="zhen-an-credit-result" id="" class="form-control" disabled="disabled">
                                            <option value="agree">审核通过</option>
                                            <option value="return">退回修改</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-2 text-right">审核意见：</label>
                                    <div class="col-md-9 textarea-view">
                                        <textarea name="zhen-an-credit-msg" id="" cols="10" rows="5" class="form-control" disabled="disabled"></textarea>
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
        </div>
         
    </div>