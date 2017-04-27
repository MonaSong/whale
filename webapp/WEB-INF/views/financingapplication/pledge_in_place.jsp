    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <script src="<%=request.getContextPath()%>/js/lib/cityselect/city.js"></script>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/pledge_in_place.js"></script>
        <title>质押就位</title>
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
                                <!-- 酒厂-质押物就位 -->
                                <form role="form" action="" id="winery-pledge" data-pane-id="winery-operater" class="form-horizontal form-data-pane col-md-12" style="display: block;">
                                    <div class="col-xs-12">
                                        <div class="" data-id="pledge-box">
                                            <div class="form-group clearfix">
                                                <span class="pull-right hide-status text-static" data-management-info="">
                                                    <b data-role-name=""></b>
                                                    <b data-true-name=""></b>
                                                    <b data-management-time=""></b>
                                                </span>
                                                <h4 class="col-md-5 black">质押就位<span name="wineryName"></span></h4>
                                            </div>                
                                            <div class="form-group  clearfix">
                                                <label class="col-md-2 control-label">监管方：</label>
                                                <div class="col-md-6">
                                                    <input type="text" disabled="" class="form-control" data-id="jg-name">
                                                </div>
                                            </div>                    
                                            
                                            <div data-pledge-pane>
                                                <div class="form-group clearfix" >
                                                    <label class="col-md-2 control-label"><b class="red">*</b>质押基酒类型</label>
                                                    <div class="col-md-6">
                                                        <div class="base-win-type-box" data-role="base-win-type-box">
                                                            <div class="base-win-container" data-role="base-win-container"></div>
                                                            <p><span class="blue select-base-win pointer" data-role="select-base-win">选择基酒类型:</span></p>
                                                            <div class="all-base-win-info hide-status" data-role="all-base-win-info">
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
                                                                <span class="btn btn-primary" data-role="confirm-base-win">确定</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group clearfix" >
                                                    <label class="col-md-2 control-label"><b class="red">*</b>生产日期：</label>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" data-id="productionTime" name="productionTime" value="" data-date>
                                                    </div>
                                                </div>
                                                <div class="form-group clearfix" >
                                                    <label class="col-md-2 control-label"><b class="red">*</b>质押基酒数量：</label>
                                                    <div class="col-md-6">
                                                        <input type="text" data-role="whale-number" class="form-control" data-id="baseWineNum" name="baseWineNum" value="">
                                                    </div>
                                                    <div class="col-md-1 text-static">
                                                        吨
                                                    </div>
                                                </div>
                                                <div class="form-group clearfix" >
                                                    <label class="col-md-2 control-label"><b class="red">*</b>质押基酒价值：</label>
                                                    <div class="col-md-6">
                                                        <input type="text" data-role="whale-money" class="form-control" data-id="baseWinePrice" name="baseWinePrice" value="">
                                                    </div>
                                                    <div class="col-md-1 text-static">
                                                        元
                                                    </div>
                                                </div>
                                                <div class="form-group clearfix" >
                                                    <label class="col-md-2 control-label"><b class="red">*</b>仓库地址：</label>
                                                    <div class="col-md-2">
                                                        <select name=""  class="form-control" data-id="warehouseProvince" id="cP">
                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <select name=""  class="form-control" data-id="warehouseCity" id="cC">
                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" class="form-control" data-id="warehouseAddress" name="warehouseAddress" value="">
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div> 
                                        <div class="form-group clearfix" >
                                            <label class="col-md-2 control-label"><b class="red">*</b>合计质押基酒价值：</label>
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" disabled="" data-id="pledgeTotalPrice">
                                            </div>
                                            <div class="col-md-1 text-static">
                                                元
                                            </div>
                                        </div>
                                        <div class="form-group clearfix btn-choose hide-status" data-operator>   
                                            <label class="col-md-2 control-label"> </label>
                                            <div class="col-md-5">
                                                <p><span class="btn btn-primary btn-red btn-confirm" data-id="add-pledge">新增质押物</span></p>
                                                <a herf="" class="btn btn-default btn-gray btn-cancel" data-cancel data-back-to>取消</a>
                                                <span class="btn btn-primary btn-red btn-confirm" data-role="target-btn" data-id="pledge-confirm" data-info="酒厂业务员" data-submit>确定</span>
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

        <!-- 空质押物容器 -->
        <!-- <div data-id="pledge-content">
                        <div data-pledge-pane>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-3 control-label">*质押基酒类型</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" data-id="baseWineType" value="基酒类型">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-3 control-label">*生产日期：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" data-id="productionTime" value="2016-12-10">
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-3 control-label">*质押基酒数量：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" data-id="baseWineNum" value="100">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            吨
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-3 control-label">*质押基酒价格：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" data-id="baseWinePrice" value="100">
                                        </div>
                                        <div class="col-md-1 text-static">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-3 control-label">*仓库地址：</label>
                                        <div class="col-md-3">
                                            <select name=""  class="form-control" data-id="warehouseProvince">
                                                <option value="湖北省" selected="selected">湖北省</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <select name=""  class="form-control" data-id="warehouseCity">
                                                <option value="武汉市" selected="selected">武汉市</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" class="form-control" data-id="warehouseAddress" value="硚口区">
                                        </div>
                                    </div>
                                    
                                </div>
                    </div>  -->            
    </div>