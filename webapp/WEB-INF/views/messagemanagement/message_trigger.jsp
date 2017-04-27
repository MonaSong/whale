<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/layouts.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layouts/yjx.css"></link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/messagemanagenment/message_trigger.css"></link>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_timer.js"></script>
<script src="<%=request.getContextPath()%>/js/messagemanagenent/message_trigger.js"></script>
<!-- 首页内容显示区 -->
<title>消息管理</title>
<div class="main-content-container">
    <div class="s-container">
        <!-- 页面主体内容 -->
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">消息管理</h4>
                </div>
            </div>

            <!-- 触发型消息 -->
            <div class="whale-pane-body news-information">
                <form class="form-horizontal form-content form-data-pane col-xs-12" role="form" id="message-form" action="">
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="template_name">模板名称：</label>
                        <div class="col-md-5 right-message">
                            <input class="form-control message" disabled id="template_name" name="template_name">
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="service_type">触发节点：</label>
                        <div class="col-md-2 right-message">
                            <input class="form-control message" disabled id="trigger_node" name="service_type">
                        </div>
                        <div class="col-md-1">
                            
                        </div>
                        <div class="col-md-2 right-message">
                            <input class="form-control message" disabled id="news_node" name="news_node">
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="service_type">触发条件：</label>
                        <div class="col-md-5 right-message">
                            <input class="form-control message" disabled id="trigger_condition" name="trigger_condition">
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="template_type">模板类型：</label>
                        <div class="col-md-5 right-message">
                            <input class="form-control message" disabled id="message_title" name="message_title">
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="message_title">消息标题：</label>
                        <div class="col-md-5 right-message">
                            <input class="form-control" id="messageTitle" name="messageTitle">
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="service_role">业务办理角色：</label>
                        <div class="col-md-4 right-message">
                            <div class="" id="service_role" name="service_role"></div>
                        </div>
                        <div class="col-md-2 btn-choose">
                            <span  class="btn btn-primary btn-add btn-blue" data-toggle="modal" data-target=".bs-example-modal-md"><i class="img-message icon-add"></i>添加</span>
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="service_role">通知角色：</label>
                        <div class="col-md-4 right-message">
                            <div id="service" name="service_role"></div>
                        </div>
                        <div class="col-md-2 btn-choose">
                            <span class="btn btn-primary btn-service btn-add btn-blue"  data-toggle="modal" data-target=".bs-example-modal"><i class="img-message icon-add"></i>添加</span>
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label" for="message_content">消息内容：</label>
                        <div class="col-md-5 right-message">
                            <textarea class="form-control textarea-view"  id="textara_content" name="messageContent">
                
                            </textarea>
                            <span class="pull-right parameter control-label" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="icon-explain"></i>参数说明</span>
                        </div>
                    </div>
                    <div class="form-group message-form-group">
                        <label class="col-md-2 control-label">发送方式：</label>
                        <div class="col-md-9 right-message" id="messagesendtype">
                        
                        </div>
                    </div>
                    <div class="form-group message-form-group form-group-sm">
                        <label class="col-md-2 control-label" for="agency-status">模板状态：</label>
                        <div class="col-md-3 right-message" id="message-status">
                        
                        </div>
                    </div>
                       <div class="form-group message-form-group">
                         <label class="col-md-2 control-label"></label>
                            <div class="col-md-2 right-message btn-choose user-save">
                                <a href="#" class="btn btn-default btn-gray btn-cancel btn-message-call">返回</a> 
                            </div>
                            <div class="col-md-2 right-message btn-choose user-save btn-right">
                                <span class="btn btn-primary btn-red btn-confirm btn-message-role">保存</span>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
    

<!-- 已参与流程模态框 -->
<div class="modal fade bs-example-modal-md" tabindex="-1"
    role="dialog" aria-labelledby="mySmallModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content audit-fail">
            <div class="modal-header fail-header">
                <span type="button" class="close" data-dismiss="modal">
                    <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
                </span>
                <h4 class="modal-title" id="mySmallModalLabel">选择角色</h4>
            </div>
            <div class="modal-body">
                <div class="information-content">
                  <table  class="table table-striped table-bordered hover message-table" id="message-send">
                   <thead>
                      <tr>
                        <th><input type="checkbox" id="selectAll"></th>
                        <th>角色编号</th>
                        <th>角色名称</th>
                        <th>机构类型</th>
                      </tr>
                   </thead>
                   <tbody>
                   
                   </tbody>
                  </table>
                </div>
                    <div class="modal-footer btn-choose">  
                        <a href="#" class="btn btn-default btn-gray btn-cancel btn-away audit-close" data-dismiss="modal">取消</a> 
                        <span class="btn btn-primary btn-red btn-confirm btn-assign audit-sure" data-dismiss="modal">确定</span>
                    </div>
            </div>
        </div>
    </div>
</div>
<!-- 通知角色模态框  -->                           
<div class="modal fade bs-example-modal" tabindex="-1"
    role="dialog" aria-labelledby="mySmallModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content audit-fail">
            <div class="modal-header fail-header">
                <span type="button" class="close" data-dismiss="modal"> <span class="message-img icon-delete"></span> <span class="sr-only">Close</span></span>
                <h4 class="modal-title" id="mySmallModalLabel">选择角色</h4>
            </div>
            <div class="modal-body">
                <div class="information-content">
                  <table  class="table table-striped table-bordered hover message-table" id="message-role">
                   <thead>
                      <tr>
                        <th><input type="checkbox" id="selectRole"></th>
                        <th>角色编号</th>
                        <th>角色名称</th>
                        <th>机构类型</th>
                      </tr>
                   </thead>
                   <tbody>
                   
                   </tbody>
                  </table>
                </div>
                   <div class="modal-footer btn-choose">  
                       <a href="#" class="btn btn-default btn-gray btn-cancel btn-away audit-close" data-dismiss="modal">取消</a> 
                       <span class="btn btn-primary btn-red btn-confirm btn-assign message-Role" data-dismiss="modal">确定</span>
                   </div>
            </div>
        </div>
    </div>
</div>

<!-- 参数说明模态框  -->                           
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md parameter-list">
        <div class="modal-content audit-fail description">
            <div class="modal-header fail-header">
                <span type="button" class="close" data-dismiss="modal">
                    <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
                </span>
                <h4 class="modal-title" id="mySmallModalLabel">变量说明</h4>
            </div>
                <ol class="title_list">
                <p>变量使用说明：</p>
                <li>1、变量指消息模板中的变量，在发送消息时根据具体业务获取对应的数据。</li>
                <li>2、变量是系统创建的参数，由［］及中文组成，［］为英文半角，用户不能自己创建和编辑。</li>
                <li>3、选择变量时，只能选择模板对应的变量，不可选择超出模板限定之外的变量。但在给定的变量中，变量是否选用由业务人员自行考量。</li>
                </ol>
            <div class="modal-body message_time_table">
                <div class="information-content">
                  <table  class="table table-striped table-bordered hover parameter-table" id="message-role">
                   <thead>
                      <tr>
                        <td class="table-style text-center">模板名称</td>
                        <td class="table-style text-center">业务类型</td>
                        <td class="table-style text-center">触发节点</td>
                        <td class="table-style text-center">触发条件</td>
                        <td class="table-style text-center">对应变量</td>
                        <td class="table-style text-center">示例</td>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                         <td>入驻申请通过通知模板</td>
                         <td>贷款资格申请</td>
                         <td>总监审核</td>
                         <td>当前节点通过</td>
                         <td>[酒厂机构名称]、[渠道总监审批通过时间]</td>
                         <td>[酒厂机构名称]、你方在基酒金融提交的企业贷款资格申请已通过审核，已可以基酒金融板块中发起融资业务。</td>
                     </tr>
                      <tr>
                         <td>融资申请提交通知模板</td>
                         <td>融资申请</td>
                         <td>融资申请</td>
                         <td>当前节点通过</td>
                         <td>[酒厂机构名称]、[姓名]、[申请时间]、[融资申请业务编号]</td>
                         <td>[酒厂机构名称]由[姓名]于[申请时间]提交融资申请，业务编号为[融资申请业务编号]。</td>
                     </tr>
                      <tr>
                         <td>资质审核未通过通知模板</td>
                         <td>融资申请</td>
                         <td>资质审核</td>
                         <td>资方或履约保险方当前节点拒绝融资</td>
                         <td>[机构名称]、[拒绝时间]、[酒厂机构名称]、[融资申请业务编号]、[审核意见]</td>
                         <td>[机构名称]已于[拒绝时间]在资质审核环节拒绝了[酒厂机构名称]业务编号为[融资申请业务编号]的融资申请，拒绝理由为[审核意见]，请知悉。注此处机构名称、拒绝时间、审核意见均指拒绝融资的信息</td>
                     </tr>
                      <tr>
                         <td>合同审核通过通知模板</td>
                         <td>融资申请</td>
                         <td>合同审核-资方办理完毕</td>
                         <td>当前节点通过</td>
                         <td>[酒厂机构名称]、[融资申请业务编号]、[资方机构名称]、[资方审核通过时间]</td>
                         <td>[酒厂机构名称]，你方融资申请编号为[融资申请编号]的基酒贷款申请，合同审核已通过，请知悉。</td>
                     </tr>
                      <tr>
                         <td>放款完成通知模板</td>
                         <td>融资申请</td>
                         <td>放款确认-资方办理完毕</td>
                         <td>当前节点通过</td>
                         <td>[酒厂机构名称]、[融资申请业务编号]、[放款时间]、[放款金额]、[贷款金额账户]</td>
                         <td>[酒厂机构名称]，你方融资申请编号为[融资申请编号]的基酒贷款申请，已于[放款时间]放款至[贷款单位账户]，放款金额为[放款金额]请知悉。</td>
                     </tr>
                      <tr>
                         <td>还款提醒模板</td>
                         <td>还款管理</td>
                         <td>还款计划</td>
                         <td>每一期还款日前X天</td>
                         <td>[酒厂机构名称]、[融资申请业务编号]、[还款业务编号]、[还款期次]、[第x期的还款日期]、[第x期的还款金额]</td>
                         <td>[酒厂机构名称]，你方融资申请编号为[融资申请编号]的基酒还款，[还款期次]的还款日期为[第x期的还款日期]、金额为[第x期的还款金额]，请提前将款项存入，谢谢配合。</td>
                     </tr>
                      <tr>
                         <td>解押通知模板</td>
                         <td>到期解押</td>
                         <td>启动解押</td>
                         <td>当前节点通过</td>
                         <td>[酒厂机构名称]、[融资申请业务编号]、[质押物业务编号]、[还款业务编号]、[资方机构名称]、[资方到期解押启动时间]</td>
                         <td>[酒厂机构名称]，融资申请编号为[融资申请编号]的基酒贷款已结清，[资方机构名称]已于[到期解押启动时间]发起解押流程，请知悉。</td>
                     </tr>
                      <tr>
                         <td>理赔通知模板</td>
                         <td>逾期理赔</td>
                         <td>发起理赔</td>
                         <td>当前节点通过</td>
                         <td>[酒厂机构名称]、[融资申请业务编号]、[逾期理赔业务编号]、[质押物业务编号]、[还款业务编号]、[机构名称]、[资方逾期理赔启动时间]</td>
                         <td>融资申请编号为[融资编号]的基酒贷款，[资方机构名称]已于[逾期理赔启动时间]发起逾期理赔流程，请知悉。</td>
                     </tr>
                   </tbody>
                  </table>
            </div>
        </div>
    </div>
  </div>
</div>