<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/invitationcodemanagement/invitation_code_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/invitationcodemanagement/invitationcode_management_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/invitationcodemanagement/invititation_code_management.js"></script>
<title>邀请码管理</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 错误信息提示 -->
        <div name='publicError'></div>
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-max clearfix">
                <div class="whale-well-headding pull-left cephalosome">
                    <h4 class="whale-well-title">邀请码管理</h4>
                </div>
                <div class="whale-well-body">
                    <div class="col-xs-4 increasingly">
                        <p><b class="red allcode">3</b></p>
                        <p>累计生成邀请码(个)</p>
                    </div>
                    <div class="col-xs-4 increasingly">
                        <p><b class="red usercode">3</b></p>
                        <p>已使用邀请码(个)</p>
                    </div>
                    <div class="col-xs-4 increasingly">
                        <p><b class="red surpluscode">3</b></p>
                        <p>剩余邀请码(个)</p>
                    </div>
                </div>
                <div class="whale-well-footer pull-right">
                    <div class="search-bar">
                        <input type="text" class="form-control searchStr searchdata" placeholder="邀请码" /> <i class="w-icon-search search"></i>
                    </div>
                </div>
            </div>
            <div class="tabbable whale-tab" id="my-work-ct">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active" data-status="000">
                        <a href="javascript:void(0)">未使用（<b class='notUsed'></b>）</a>
                    </li>
                    <li role="presentation" data-status="001">
                        <a href="javascript:void(0)">已使用（<b class='alreadyUsed'></b>）</a>
                    </li>
                    <li role="presentation" class="lose" data-status="010">
                        <a href="javascript:void(0)">失效（<b class='invalid'></b>）</a>
                    </li>
                    <div class="btn-choose">
                        <span class="btn btn-primary addcode btn-red pull-right" data-toggle="modal">新增邀请码</span>
                    </div>
                </ul>
                <div class="modal fade excess" id="notcode" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content abnormal_code">
                            <div class="modal-header fail-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">x</span> <span class="sr-only">Close</span>
                                </button>
                                <h4 class="modal-title" id="mySmallModalLabel">邀请码</h4>
                            </div>
                            <div class="modal-body">
                                <div class="information-content">
                                    <p>用户持有未使用之邀请码数量不会超过20个。你的邀请码已满，请使用后再生成。</p>
                                    <button class="btn btn-primary pull-right audit-btn" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade notexcess" id="code" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content forget-password">
                            <div class="modal-header fail-header">
                                <span type="button" class="close" data-dismiss="modal">
                                    <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
                                </span>
                                <h4 class="modal-title" id="mySmallModalLabel">邀请码</h4>
                            </div>
                            <div class="modal-body">
                                <div class="information-content">
                                    <div class="row">
                                        <div class="col-xs-12 invitation-num">
                                            <label class="text-right text-static">生成数量：</label>
                                            <div class="col-md-7 select-content">
                                                <select class="form-control invitation_num creat">
                                                </select>
                                            </div>
                                            <span class="col-md-12 text-info col-xs-offset-3">用户持有未使用之邀请码数量不能超过20个</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer btn-choose ">
                                <a class="btn btn-default btn-gray btn-cancel btn-close btn-away" data-dismiss="modal">取消</a>
                                <span class="btn btn-primary btn-red btn-confirm btn-assign btn-save">确认</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content mywork">
                    <div class="tab-pane fade in dataTable_div agency-list active" id="list">
                        <table id="invitation_code_table" class="table table-striped table-bordered hover">
                            <thead>
                                <tr>
                                    <td data-id="" class="col-md-6 col-md-4">邀请码</td>
                                    <td class="company" data-id="">企业名称</td>
                                    <td class="creat-person" data-id="">生成人</td>
                                    <td class="creat-time col-md-6 col-md-2" data-id="">生成时间</td>
                                    <td class="user-time" data-id="">使用时间</td>
                                </tr>
                            </thead>
                            <tbody id="invitationlist">

                            </tbody>
                        </table>
                        <div id="pageBar" role="page-bar">

                        </div>
                        <div class="no-content-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>