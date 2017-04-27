<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/maturitydecompression/matuirty_decompression.css"></link>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/maturity_decompression_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/maturitydecompression/winery_receipt.js"></script>
<!-- 首页内容显示区 -->
<title>收货</title>
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
            <%@ include file="../layouts/maturity_menu.jsp"%>
            </div>
            <div class="form-container">
                <form role="form" method="get" id="winery-receipt" action="" data-id="assistant-audit-control" class="form-horizontal winery_receipt form-data-pane col-xs-12 matuirty">
                    <div class="col-md-12">
                        <div class="form-group clearfix">
                            <span class="pull-right text-static" data-management-info>
                                <b data-role-name=""></b>
                                <b data-true-name=""></b>
                                <b data-management-time=""></b>
                            </span>
                            <h4 class="col-md-5 black"><span class="winert_top">收</span> 货<span name="liftingPledge"></span></h4>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label control-label-right ">收货清单：</label>
                            <div class="col-md-6 pic_show line_spacing">
                                  <div class="register_div">
                                      <div class="upfilebox">
                                          <input class="form-control taxRegistration" onchange="readFile(this)" type="file" name="wineryreceipt" id="wineryreceipt">
                                          <label class="lable lable-pic"></label>
                                      </div>
                                      <div id="register-view"></div>
                                  </div>
                            </div>
                        </div>
                       <div class="form-group" id="winery_receipt_submit" data-operater-bottom> 
                         <label class="col-md-2 control-label"></label>
                            <div class="col-md-2  btn-choose line_spacing" >
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-operation" data-back-to="">返回</a> 
                            </div>
                            <div class="col-md-2 btn-choose btn-right line_spacing">
                                <span class="btn btn-primary btn-red btn-confirm submit-winery" data-role="target-btn" data-id="assistant-audit">确定</span>
                            </div>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>