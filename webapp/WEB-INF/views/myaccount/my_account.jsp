<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<script src="<%=request.getContextPath()%>/js/myaccount/my_account_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/myaccount/my_account.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/myaccount/my_account.css">
<title>我的账户</title>
<!-- 首页内容显示区 -->
<div  class="main-content-container">
         <div class="s-container">
            <!-- 错误信息提示 -->
            <div name="publicError" class="outside_error"></div>
            <!-- 页面主体内容 -->
             <div class="s-page-content">
                  <div class="whale-well whale-well-min clearfix">
                      <div class="whale-well-headding pull-left">
                          <h4 class="whale-well-title">我的账户</h4>
                      </div>
                  </div>
                  <div class="tabbable whale-tab clearfix" id="my-work-ct">
                        <div class="row">
                          <div class="col-xs-12">
                                <div class="form-data-pane">
                                      <div class="col-xs-9">
                                            <form id="cur-user" class="form-horizontal col-xs-12">
	                                             <div class="form-group">
	                                                 <label class="col-xs-3 text-right control-label ">用户角色：</label>
	                                                 <div class="col-xs-5">
	                                                     <input class="form-control" placeholder="" disabled name="role" value="">
	                                                 </div>
	                                             </div>
	
	                                             <div class="form-group">
	                                               <label class="col-xs-3 text-right control-label ">姓名：</label>
	                                               <div class="col-xs-5">
	                                                 <input class="form-control" placeholder=""  name="trueName" value="">
	                                               </div>
	                                             </div>
	
	                                             <div class="form-group usertype">
	                                                 <div class="col-xs-5">
	                                                     <input class="form-control" placeholder=""  name="userId" value="" type="hidden" />
	                                                 </div>
	                                             </div>
	
	                                             <div class="form-group">
                                                      <label class="col-xs-3 text-right control-label ">手机号：</label>
                                                      <div class="col-xs-5">
                                                        <input class="form-control" placeholder="" disabled name="mobile" value="">
                                                      </div>
                                                      <div class="col-xs-1">
                                                          <span role="button" class="btn btn-primary modifyPhone btn-red btn-confirm" data-toggle="modal">修改手机号</a>
                                                      </div>
                                                  </div>
	                                              <div class="form-group modify_password">
                                                      <i class="col-md-3 col-md-offset-3" data-toggle="modal" data-target="#modal-modify-pwd">修改登录密码？</i>
                                                  </div>
	                                             <div class="form-group">
	                                               <div class="col-xs-offset-3 col-xs-3 btn-choose">
	                                                 <a href="<%=request.getContextPath()%>/anagement_page" class="btn btn-default btn-gray btn-cancel">取消</a>
	                                               </div>
	                                               <div class="col-xs-3 col-md-3 btn-choose">
	                                                 <span class="btn btn-primary btn-red btn-confirm" id="modify-user-info" data-info="修改用户信息成功！">确定</span>
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


    <!-- 修改手机号 -->
    <div id="modal-modify-phone" class="modal modal-modify-phone" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="blue bigger">修改手机号</h4>
              </div>
                <!-- 错误信息提示 -->
            <div name="publicError"></div> 
              <div class="modal-body">
                 <form action="" class="form-horizontal" id="old-mobile" class="old-mobile">
                    <!-- 验证原手机 -->
                        <div class="form-group first-group">
                            <label class="col-xs-3 text-right control-label ">原手机号码：</label>
                            <div class="col-xs-7">
                                <input class="form-control original-phone" disabled="" name="" data-name="mobile" value="">
                            </div>
                        </div>
                        <div class="form-group first-group">
                            <label class="col-xs-3 text-right control-label ">验证码：</label>
                            <div class="col-xs-7">
                                <input class="form-control" placeholder="" name="firstVerifyCode" value="">
                                <input type="button" class="btn btn-primary btn-red get-old-mobile-verify" id="get-old-mobile-verify" value="获取验证码">
                            </div>
                        </div>
                        <div class="form-group first-group">
                            <div class="col-xs-7 col-xs-offset-3">
                                <span class="btn btn-primary btn-red btn-fixed-width" id="next-step" >下一步</span>
                            </div>
                        </div>
                    
                    </form>
                    <!-- 填写新手机 -->
                    <form action="" id="new-mobile"  class="new-mobile form-horizontal">
                          <div class="form-group first-group">
                              <label class="col-xs-3 text-right control-label ">新手机号码：</label>
                              <div class="col-xs-7">
                                  <input class="form-control" placeholder="" name="newMobile" value="">
                              </div>
                          </div>
                          <div class="form-group first-group">
                              <label class="col-xs-3 text-right control-label ">验证码：</label>
                              <div class="col-xs-7">
                                  <input class="form-control" placeholder="" name="newCode" value="">
                                  <input type="button" class="btn btn-primary btn-red get-new-mobile-verify" data-name="get-new-mobile-verify" value="获取验证码">
                              </div>
                          </div>
                  </form>                 
              </div>
              <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">
                  <i class="ace-icon fa fa-times"></i>
                     取消
                </button>

                <button class="btn  btn-primary btn-red" id="save-new-mobile-no">
                  <i class="ace-icon fa fa-check"></i>
                     保存
                </button>
              </div>
            </div>
        </div>
  </div>

    <!-- 修改密码 -->

    <div id="modal-modify-pwd" class="modal" tabindex="-1" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">×</button>
              <h4 class="blue bigger">修改密码</h4>
            </div>

            <div class="modal-body">
               <form action="" class="form-horizontal" id="password-form">
                    <div class="form-group">
                        <label class="col-xs-3 text-right control-label ">原密码：</label>
                        <div class="col-xs-7">
                            <div name="publicError"></div>
                            <input type="password" class="form-control" placeholder="请输入原密码" name="oldPassword" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 text-right control-label ">新密码：</label>
                        <div class="col-xs-7">
                            <input type="password" class="form-control" placeholder="6-16位字母、数字、符号，区分大小写" name="newPassword" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 text-right control-label ">确认新密码：</label>
                        <div class="col-xs-7">
                            <input type="password"class="form-control" placeholder="6-16位字母、数字、符号，区分大小写" name="reNewPassword" value="">
                        </div>
                    </div>
                 </form>
            </div>
            <div class="modal-footer"> 
              <button class="btn btn-default" data-dismiss="modal">
                <i class="ace-icon fa fa-times"></i>
                   取消
              </button>
              <button class="btn  btn-primary btn-red" id="btn-modify-password">
                <i class="ace-icon fa fa-check"></i>
                   保存
              </button>
            </div>
          </div>
      </div>
  </div>

<!-- 修改个人信息成功 -->
  <div id="modal-modify-info" class="modal" tabindex="-1" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">×</button>
              <h4 class="blue bigger">成功</h4>
            </div>

            <div class="modal-body">
               <h4>修改个人信息成功！</h4>
            </div>
          </div>
      </div>
  </div>

