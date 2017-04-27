<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/maturitydecompression/matuirty_decompression.css"></link>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/maturity_decompression_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/relesae_policy.js"></script>
<!-- 首页内容显示区 -->
<title>解除保单</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 错误信息提示 -->
        <div name="publicError"></div>
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">到期解押</h4>
                </div>
            </div>
             <div id='left-menu' class="left-menu">
            </div>
            </div>
            <div class="form-container">
                <form role="form" method="get" id="release-form" action="" data-id="release-form-form" class="form-horizontal  form-data-pane col-xs-12  matuirty" >
                    <div class="col-md-12">
                        <div class="form-group clearfix">
                            <span class="pull-right text-static" data-management-info>
                                <b data-role-name=""></b>
                                <b data-true-name=""></b>
                                <b data-management-time=""></b>
                            </span>
                            <h4 class="col-md-5 black">解除保单<span name="liftingPledge"></span></h4>
                        </div>
                        <div class="form-group clearfix">
                            <label class="col-md-2 control-label control-label-right">质押物编号：</label>
                            <div class="col-md-5 line_spacing">
                                <p class="form-control-static" name="businessKey">
                                </p>
                            </div>
                        </div>
                        <div class="form-group clearfix">
                            <label class="col-md-2 control-label control-label-right ">解押通知书：</label>
                            <div class="col-md-5 line_spacing">
	                          <div class="register_div">
	                              <div class="upfilebox">
	                                  <input class="form-control taxRegistration" onchange="readFile(this)" type="file" name="release_policy" id="release_policy">
	                                  <label class="lable lable-pic"></label>
	                              </div>
	                              <div id="register-view"></div>
	                          </div>
                            </div>
                        </div>
                       <div class="form-group" id="release-policy-list" data-operater-bottom> 
                         <label class="col-md-2 control-label"></label>
                            <div class="col-md-2  btn-choose line_spacing" >
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-operation" data-back-to="">返回</a> 
                            </div>
                            <div class="col-md-2 btn-choose user-save btn-right line_spacing">
                                <span class="btn btn-primary btn-red btn-confirm release_policy" data-role="target-btn" data-id="release-policy">确定</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>