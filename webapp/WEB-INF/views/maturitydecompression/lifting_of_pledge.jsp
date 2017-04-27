<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/maturitydecompression/matuirty_decompression.css"></link>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/maturity_decompression_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/lifting_of_pledge.js"></script>
<!-- 首页内容显示区 -->
<title>解除质押</title>
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
            <div id="left-menu" class="left-menu">
            </div>
            <div class="form-container">
                <form role="form" class="form-horizontal form-data-pane col-xs-12  matuirty" method="get" data-id="lifting-pledge-form" id="lifting-pledge" >
                    <div class="col-md-12">
                        <div class="form-group clearfix">
                            <span class="pull-right text-static" data-management-info>
                                <b data-role-name=""></b>
                                <b data-true-name=""></b>
                                <b data-management-time=""></b>
                            </span>
                            <h4 class="col-md-5 black">解除质押<span name="liftingPledge"></span></h4>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label control-label-right">质押物编号：</label>
                            <div class="col-md-3 line_spacing">
                                <p class="form-control-static" name="businessKey">
                                </p>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-md-2 control-label control-label-right">基酒数量：</label>
                            <div class="col-md-2 line_spacing">
                                <input class="form-control" placeholder="" data-data="" type="text" data-role="whale-number" name="wineNumber" id="wineNumber">
                            </div>
                            <div class="text-left line_spacing txt">吨</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label control-label-right">解押日期：</label>
                                <div class="col-md-2 line_spacing">
                                    <input class="form-control" data-date="" value="请选择日期" name="closePledgeDate" id="closePledgeDate">
                                </div>
                                <label class="col-md-1 control-label control-label-right">签收人：</label>
                                <div class="col-md-2 line_spacing">
                                    <input class="form-control" placeholder="" name="receiver" id='receiver'>
                                </div>
                        </div>
                       <div class="form-group">
                          <label class="col-md-2 control-label control-label-right">解押清单：</label>
                      <div class="col-md-6 pic_show line_spacing">
                          <div class="register_div">
                              <div class="upfilebox">
                                  <input class="form-control taxRegistration" onchange="readFile(this)" type="file" name="wineryLivePic" id="wineryLivePic">
                                  <label class="lable lable-pic"></label>
                              </div>
                              <div id="register-view"></div>
                          </div>
                        </div>
                        </div> 
                       <div class="form-group" id="lifting-pledge-submit" data-operater-bottom> 
                         <label class="col-md-2 control-label"></label>
                            <div class="col-md-2  btn-choose line_spacing" >
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-operation" data-back-to="">返回</a> 
                            </div>
                            <div class="col-md-2 btn-choose btn-right line_spacing">
                                <span class="btn btn-primary btn-red btn-confirm submit-pledge" data-role="target-btn" data-id="lifting-pledgeList">确定</span>
                            </div>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>