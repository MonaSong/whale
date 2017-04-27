    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/pledge_supervision.js"></script>
        <title>质押监管</title>
        <!-- 页面主容器 -->
        <div  class="main-content-container">
        <div class="s-container">
        <div name="publicError"></div>
        <!-- 页面内容 -->
        <div class="s-page-content">
        <div class="whale-well whale-well-min clearfix">
        <div class="whale-well-headding pull-left">
        <h4 class="whale-well-title">融资申请</h4>
        </div>
        </div>
        <div id="left-menu" class="left-menu"></div>
        <div class="form-container">
            <div class="container whale-container">    
                <div class="row">
                    <div class="col-xs-12">
                        <div class="min-height-500-box clearfix">
                            <!-- 质押监管信息 -->
                            <form role="form" action="" data-pane-id="jg-edit-data" class="form-horizontal form-data-pane col-md-12" style="display: block;">
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">质押监管<span name="InstitutionName"></span></h4>
                                    </div>                
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">基酒类型：</label>
                                        <div class="col-md-5">
                                            <div name="baseWineTypes"></div>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">数量：</label>
                                        <div class="col-md-5">
                                            <input type="text"  class="form-control" disabled="" name="baseWineNum" value="">
                                        </div>
                                        <div class="col-md-2 text-static">吨</div>
                                    </div>  
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">生产日期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="productionTime" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">评估价值：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="evaluationPrice" value="">
                                        </div>
                                        <div class="col-md-2 text-static">元</div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">质权人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="pledgeeName" value="">
                                        </div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">出质人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="pledgorName" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">出质日期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="qualityDate" value="">
                                        </div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">监管方：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="regulatorName" value="">
                                        </div>
                                    </div> 
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">质押物清单：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" disabled="" name="pledgeBillAccessory" id="pledgeBillAccessory">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix">                
                                        <h4 class="col-md-5 black">监管方责任保险单</h4>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">保单名称：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="regulatorPolicyName" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">投保人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="regulatorPolicyHolder" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">保险人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="regulatorInsurer" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">保险费：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="regulatorPolicyPremium" value="">
                                        </div>
                                        <div class="col-md-2 text-static">元</div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">有效期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="regulatorPolicyPeriod" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">监管责任保险单：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" disabled="" name="regulatorPolicyAccessory" id="regulatorPolicyAccessory">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix">                
                                        <h4 class="col-md-5 black">财产保险单</h4>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">保单名称：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="propertyPolicyName" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">投保人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control"  disabled="" name="propertyPolicyHolder" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">保险人：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="propertyInsurer" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">保险费：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control"  disabled="" name="propertyPolicyPremium" value="">
                                        </div>
                                        <div class="col-md-2 text-static">元</div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">有效期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control"  disabled="" name="propertyPolicyPeriod" value="">
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">财产保险单：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" disabled="" name="propertyPolicyAccessory" id="propertyPolicyAccessory">
                                        </div>
                                    </div> 
                                </div>                   
                            </form>
                            <form role="form" action="" data-pane-id="zhenAn-audit" class="form-horizontal form-data-pane col-md-12" style="display: block;">      
                                <!-- 质押监管真安金服 -->
                                <div class="col-xs-12">
                                    <div class="form-group clearfix"> 
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>               
                                        <h4 class="col-md-5 black">质押监管<b name="InstitutionName"></b></h4>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>审核结果：</label>
                                        <div class="col-md-5">
                                            <select name="pledgeResult" id="" class="form-control" data-role="control-btn">
                                                <option value=""></option>
                                                <option value="agree">审核通过</option>
                                                <option value="return">退回修改</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="pledgeResultMsg" id="" data-role="control-btn"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <span class="clearfix"><br></span>
                                    <div class="form-group clearfix" data-operater-bottom>   
                                        <div class="col-md-5 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-role="target-btn" disabled data-id="zhenAn-supervision-confirm" data-info="真安信审员" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
         
    </div>