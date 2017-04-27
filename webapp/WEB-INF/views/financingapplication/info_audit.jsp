    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
        <%@ include file="../common/global.jsp"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ include file="../layouts/left.jsp"%>
        <link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
        <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
        <script src="<%=request.getContextPath()%>/js/financmanagement/info_audit.js"></script>
        <title>信息审核</title>
        <!-- 页面主容器 -->
        <div  class="main-content-container"> 
        <div class="s-container">
        <!-- 页面内容 -->
        <div class="s-page-content">
        <div class="whale-well whale-well-min clearfix">
        <div class="whale-well-headding pull-left">
        <h4 class="whale-well-title">融资申请</h4>
        </div>
        </div>
        <div id="left-menu" class="left-menu">
        </div>
        <div class="form-container">
            <div name="publicError"></div> 
            <div class="container whale-container">    
                <div class="row">
                    <div class="col-xs-12">
                        <div class="min-height-500-box clearfix">
                            <!-- 中酒省区经理 -->
                            <form role="form" action="" data-pane-id="manager_Info_Audit" class="form-horizontal form-data-pane col-md-12">
                                <div class="col-xs-12">    
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">信息审核<span name="institutionName"></span></h4>
                                    </div>                
                                    <div class="form-group clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="provincialAuditResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">审核通过</option> 
                                                <option  value="return">退回修改</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="provincialAuditOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-xs-12 btn-choose col-md-offset-2">
                                            <a herf="" class="btn btn-default btn-gray btn-cancel" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-red btn-confirm col-md-offset-1" data-role="target-btn" disabled data-id="provincial-audit" data-info="中酒省区经理" data-submit>确定</span>
                                        </div>
                                    </div>
                                </div>                    
                            </form>

                            <!-- 中酒渠道总监 -->
                            <form role="form" action="" data-pane-id="director_Info_Audit" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">信息审核<span name="institutionName"></span></h4>
                                    </div>               
                                    <div class="form-group clearfix ">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="channelAuditResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="return">退回修改</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="channelAuditOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-xs-12 btn-choose col-md-offset-2">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-role="target-btn" disabled data-id="channel-audit" data-submit  data-info="中酒渠道总监">确定</span>
                                        </div>
                                    </div> 
                                </div>                   
                            </form>

                            <!-- 中酒信贷专员 -->
                            <form role="form" action="" data-pane-id="credit_Info_Audit" class="form-horizontal form-data-pane col-md-12">   
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class=" pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">信息审核<span name="institutionName"></span></h4>
                                    </div>            
                                    <div class="form-group clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="creditAuditResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="return">退回修改</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="creditAuditOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-xs-12 btn-choose col-md-offset-2">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-role="target-btn" disabled data-id="credit-audit" data-submit data-info="中酒信贷专员">确定</span>
                                        </div>
                                    </div>
                                </div>                    
                            </form>
                            <!--真安信审员 -->
                            <form role="form" action="" data-pane-id="zhenAn_Credit_Info_Aduit" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class=" pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">信息审核<span name="institutionName"></span></h4>
                                    </div>                   
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="letterAuditResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="return">退回修改</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div data-audit-status="agree">
                                        <div class="form-group">
                                            <label class="col-md-2 control-label"><b class="red">*</b>授信额度：</label>
                                            <div class="col-md-2">
                                                <input type="text" data-role="whale-money" class="form-control" name="creditLine" value="">
                                            </div>
                                            <div class="col-md-1 text-static">
                                                元
                                            </div>
                                            <div class="loan-term-text">
                                                <label class="col-md-1 control-label"><b class="red">*</b>贷款期限：</label>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control" name="loanTerm" value="20">
                                                </div>
                                                <div class="col-md-1 text-static">年</div>
                                            </div>
                                        </div>

                                        <!-- <div class="form-group">
                                            <label class="col-md-2 control-label"><b class="red">*</b>贷款期限：</label>
                                            <div class="col-md-5">
                                                <input type="text" class="form-control" name="loanTerm" value="20">
                                            </div>
                                            <div class="col-md-1 text-static">年</div>
                                        </div> -->

                                        <div class="form-group first-group">
                                            <label class="col-md-2 control-label"><b class="red">*</b>资方：</label>
                                            <div class="col-md-5">
                                                <select name="capitalInstitutionId" id="zf-institytion" class="form-control">
                                                    <option value="">请选择资方</option>
                                                    <option value="I-6ce7ce3995a447d9a4186550a3cd1c25">资方</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group first-group">
                                            <label class="col-md-2 control-label"><b class="red">*</b>监管方：</label>
                                            <div class="col-md-5">
                                                <select name="regulatorInstitutionId" id="jg-institytion" class="form-control">
                                                    <option value="">请选择监管方</option>
                                                    <option value="I-4d7ee76e41bc41c787e0e1a925ec89b0">监管方</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group first-group">
                                            <label class="col-md-2 control-label"><b class="red">*</b>履约保险方：</label>
                                            <div class="col-md-5">
                                                <select name="insurerInstitutionId" id="lvyue-institytion" class="form-control">
                                                    <option value="">请选择履约保险方</option>
                                                    <option value="I-153d7e05efba43a791f414d37c0367f5">履约保险方</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="letterAuditOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b>140</b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-xs-12 col-md-offset-2 btn-choose">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-role="target-btn" data-id="lettertrial-audit" data-submit data-info="真安信审员">确定</span>
                                        </div>
                                    </div>
                                </div>                    
                            </form>

                            <!-- 真安风控专员 -->
                            <form role="form" action="" data-pane-id="zhenAn_Risk_Info_Aduit" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class=" pull-right hide-status text-static" data-management-info="">
                                            <b data-role-name=""></b>
                                            <b data-true-name=""></b>
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">信息审核<span name="institutionName"></span></h4>
                                    </div>          
                                    <div class="form-group clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="riskAuditResult" data-role="control-btn">
                                                <option  value=""></option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="return">退回修改</option>
                                                <option  value="refuse">拒绝融资</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" >
                                        <label class="col-md-2 control-label" name="">审核意见：</label>
                                        <div class="col-md-9">
                                            <textarea class="form-control textarea-view" name="riskAuditOpinion"  data-role="control-btn" placeholder="请填写审核意见"></textarea>
                                            <p data-role="font-length">还可以书写<b></b>个文字</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix" data-operator-bottom>
                                        <div class="col-xs-12 btn-choose col-md-offset-2">
                                            <a herf="" class="btn btn-default btn-cancel btn-gray" data-cancel data-back-to>取消</a>
                                            <span class="btn btn-primary btn-confirm btn-red col-md-offset-1" data-role="target-btn" disabled data-id="risk-audit" data-submit data-info="真安风控专员">确定</span>
                                        </div>
                                    </div> 
                                </div>                   
                            </form>
                            
                            <!-- 酒厂 -->
                            <form role="form" action="" data-pane-id="winery" class="form-horizontal form-data-pane col-md-12"> 
                                <div class="col-xs-12">
                                    <div class="form-group clearfix">
                                        <span class="pull-right hide-status text-static" data-management-info="">
                                            <b data-management-time=""></b>
                                        </span>
                                        <h4 class="col-md-5 black">信息审核</h4>
                                    </div>          
                                    <div class="form-group  clearfix">
                                        <label class="col-md-2 control-label">审核结果：</label>
                                        <div class="col-md-5">
                                            <select class="form-control col-md-4" name="wineryAuditResult" disabled>
                                                <option  value=""></option>
                                                <option  value="agree">审核通过</option>
                                                <option  value="return">退回修改</option>
                                                <option  value="refuse">拒绝融资</option>
                                                <option  value="being-audited">正在审核</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div data-returned="winery" class="hide-status">
                                        <div class="form-group">
                                            <label class="col-md-2 control-label">审核意见：</label>
                                            <div class="col-md-9">
                                                <textarea name="winery-audit-msg" class="form-control" rows="4"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-passed="winery">
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label">授信额度：</label>
                                            <div class="col-md-5">
                                                <input type="text" class="form-control" disabled="" name="winery-credit">
                                            </div>
                                            <div class="col-md-1 text-static">
                                                元
                                            </div>
                                        </div>
                                        <div class="form-group first-group clearfix">
                                            <label class="col-md-2 control-label">贷款期限：</label>
                                            <div class="col-md-5">
                                                <input type="text" class="form-control" disabled="" name="winery-loanTerm">
                                            </div>
                                            <div class="col-md-1 text-static">
                                                年
                                            </div>
                                        </div>
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label" >资方：</label>
                                            <div class="col-md-5">
                                                <input type="text" disabled="" class="form-control" name="winery-zf">
                                            </div>
                                        </div> 
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label">监管方：</label>
                                            <div class="col-md-5">
                                                <input type="text" disabled="" class="form-control" name="winery-jg">
                                            </div>
                                        </div>
                                        <div class="form-group clearfix">
                                            <label class="col-md-2 control-label">履约保险方：</label>
                                            <div class="col-md-5">
                                                <input type="text" disabled="" class="form-control" name="winery-lvyue">
                                            </div>
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
