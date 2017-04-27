    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/sampling_testing.js"></script>
        <title>取样检测</title>
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
                            <!-- 省区经理 -->
                            <form role="form" action="" data-pane-id="sampling-testing-manager" class="form-horizontal form-data-pane col-md-12">
                                <div class="col-xs-12">
                                    <div class="form-group">                                
                                        <label class="pull-right hide-status  text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </label>
                                        <div class="col-md-5 col-xs-12">
                                            <h4 class="black">取样检测<b name="institutionName"></b></h4>
                                        </div>
                                        
                                    </div>          
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">委托单位：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" disabled="" name="commissionCompany" value="">
                                        </div>
                                    </div>
                                    <div class="form-group" >
                                        <label class="col-md-2 control-label" name=""><b class="red">*</b>封样封库时间：</label>
                                        <div class="col-md-5">
                                            <input type="text" class="form-control" name="sealSampleTime" value="" data-date>
                                        </div>
                                    </div> 

                                    <!-- 检测报告 --> 
                                    <div class="form-group">
                                        <h4 class="col-md-2 black">检测报告</h4>
                                    </div>          
                                    <div class="form-group">
                                        <label class="col-md-2 control-label"><b class="red">*</b>检测报告编号：</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control"  name="inspectReportNum" value="">
                                        </div>
                                        <label class="col-md-1 control-label  text-left long-text"><b class="red">*</b>受检产品名称：</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" name="caryProductName" value="">
                                        </div>
                                    </div>

                                    <div class="form-group" >
                                        <label class="col-md-2 control-label" name=""><b class="red">*</b>检验单位：</label>
                                        <div class="col-md-5">
                                            <select name="inspectCompanyId" id="" class="form-control">
                                                <option value="" selected="selected">请选择检验单位</option>
                                            </select>
                                        </div>
                                    </div> 
                                    <div class="form-group" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>检测类别：</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" name="inspectType" value="">
                                        </div>
                                        <label class="col-md-1 control-label"><b class="red">*</b>检验时间：</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" name="inspectTime" value="" data-date>
                                        </div>
                                    </div> 

                                    <div class="form-group" >
                                        <label class="col-md-2 control-label"><b class="red">*</b>检验报告：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="inspectReportAccessory" id="inspectReportAccessory">
                                        </div>
                                    </div> 

                                    <!-- 评估报告 --> 
                                    <div class="form-group">
                                        <h4 class="col-md-2 black">评估报告</h4>
                                    </div>          
                                    <div class="form-group">
                                        <label class="col-md-2 control-label"><b class="red">*</b>评估报告编号：</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" name="assessmentReportNum" value="">
                                        </div>
                                        <label class="col-md-1 control-label text-left long-text"><b class="red">*</b>评估产品名称：</label>
                                         <div class="col-md-2">
                                             <input type="text" class="form-control" name="assessmentProductName" value="">
                                         </div>
                                    </div> 

                                    <div class="form-group">
                                        <label class="col-md-2 control-label"><b class="red">*</b>评估单位：</label>
                                        <div class="col-md-5">
                                            <select name="assessmentCompanyId"  class="form-control">
                                                <option value="" selected="selected">选择评估单位</option>
                                                <option value="2" selected="selected">评估单位2</option>
                                            </select>
                                        </div>
                                    </div> 
                                    <div class="form-group">
                                        <label class="col-md-2 control-label"><b class="red">*</b>评估价值：</label>
                                        <div class="col-md-2">
                                            <input type="text"  data-role="whale-money" class="form-control" name="assessmentPrice" value="">
                                        </div>
                                        <div class="col-md-1 text-static only-text">
                                            元/吨
                                        </div>
                                        <label class="col-md-1 control-label text-left long-text assessment-time"><b class="red">*</b>评估时间：</label>
                                        <div class="col-md-2 assessment-time-input">
                                            <input type="text" class="form-control" name="assessmentTime" value="" data-date>
                                        </div>
                                    </div>  

                                    <div class="form-group">
                                        <label class="col-md-2 control-label"><b class="red">*</b>评估报告：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="assessmentReportAccessory" id="assessmentReportAccessory">
                                        </div>
                                    </div> 

                                    <!-- 三方协议 --> 
                                    <div class="form-group">
                                        <h4 class="col-md-2 black">三方协议</h4>
                                    </div>          
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label"><b class="red">*</b>三方协议电子版：</label>
                                        <div class="col-md-5">
                                            <input type="file" class="form-control" name="protocolAccessory" id="protocolAccessory">
                                        </div>
                                    </div>

                                    <!-- 检测评估结论 --> 
                                    <div class="form-group">
                                        <h4 class="col-md-2 black">检测评估结论</h4>
                                    </div>          
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">评估结论：</label>
                                        <div class="col-md-5">
                                            <select name="inspectionResult" id="" class="form-control" data-role="control-btn">
                                                <option value="" ></option>
                                                <option value="agree" >评估通过</option>
                                                <option value="return">重新提交质押物</option>
                                                <option value="refuse_apply">申请融资终止</option>                            
                                            </select>
                                        </div>
                                    </div> 
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">评估意见：</label>
                                        <div class="col-md-9">
                                            <textarea name="inspectionResultMsg" data-role="control-btn" value="" rows="5" cols="100" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                            <label class="col-md-2 control-label"><b class="red">*</b>取样过程实况：</label>
                                            <div class="col-md-5 clearfix no-padding-left sample-upload-pic">
                                                <span class="col-md-8">
                                                    <input type="file" name="samplePicAccessory" class="form-control" id="samplePicAccessory">
                                                    
                                                </span>
                                                <b class="col-md-3 text-static hide-status" data-role="upload-pic">请上传图片</b>                                                  
                                            </div>

                                            <div class="col-md-5 col-md-offset-2 no-padding-left">
                                                <span class="col-md-8">
                                                    <input type="file" name="simpleVideoAccessory" class="form-control" id="simpleVideoAccessory">
                                                    
                                                </span> 
                                                <b class="col-md-3 text-static hide-status" data-role="upload-video">请上传视频</b>
                                            </div>
                                    </div>

                                    <div class="form-group  clearfix btn-choose" data-operater-bottom>
                                        <div class="col-xs-12 col-md-offset-2 ">
                                            <a href="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-role="target-btn" data-id="confirm-provincial-testing" data-info="中酒省区经理">确定</span>
                                        </div> 
                                    </div>
                                </div>     
                            </form>  

                            <!-- 信贷专员 -->
                            <form role="form" action="" data-pane-id="sampling-testing-credit" class="form-horizontal form-data-pane col-md-12">
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">取样检测<b name="institutionName"></b></h4>
                                    </div>          
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select name="creditSamplingResult" id="" class="form-control" data-role="control-btn">
                                                <option value="" ></option>
                                                <option value="agree">同意</option>
                                                <option value="return">退回修改</option>                           
                                            </select>
                                        </div>
                                    </div> 
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea name="creditSamplingOpinion" value="" rows="5" cols="100" class="form-control" data-role="control-btn"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>

                                    <div class="form-group btn-choose clearfix" data-operater-bottom>
                                        <br>
                                        <div class="col-xs-12 col-md-offset-2">
                                            <a href="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-id="confirm-redit-testing" data-info="中酒信贷专员" data-role="target-btn">确定</span>
                                        </div> 
                                    </div>
                                </div>
                            </form>

                            <!-- 信贷专员-融资终止-->
                            <form role="form" action="" data-pane-id="sampling-testing-cancel-credit" class="form-horizontal form-data-pane col-md-12">
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>:
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-2 black">取样检测<b name="institutionName"></b></h4>
                                    </div>          
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select name="creditFinanceEndResult" class="form-control" data-role="control-btn">
                                                <option value="" ></option>
                                                <option value="refuse">同意终止</option>
                                                <option value="agree">不同意终止</option>                           
                                            </select>
                                        </div>
                                    </div> 
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea name="creditFinanceEndOpinion" value="" rows="5" cols="100" class="form-control" data-role="control-btn"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>

                                    <div class="form-group btn-choose clearfix" data-operater-bottom>
                                        <br>
                                        <div class=" col-md-offset-2 col-xs-12 ">
                                            <a href="" class="btn btn-default btn-cancel btn-gray" data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red" data-id="cancel-credit-testing" data-info="中酒信贷专员" data-role="target-btn">确定</span>
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
