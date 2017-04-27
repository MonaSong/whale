<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>

<script src="<%=request.getContextPath()%>/js/tools/tools.js"></script>
<script src="<%=request.getContextPath()%>/js/agencymanagement/agency_management_requestdata.js"></script>
<script src="<%=request.getContextPath()%>/js/agencymanagement/agency_list.js"></script>
<link href="<%=request.getContextPath()%>/css/agencymanagement/agency_management.css" rel="stylesheet">
<title>机构管理</title>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">机构管理</h4>
                    </div>
                    <div class="whale-well-footer pull-right">
                        <div class="search-bar">
                            <input type="text" class="form-control searchStr" placeholder="机构名称/机构类型" /> <i class="w-icon-search search"></i>
                        </div>
                    </div>
                </div>
                <div class="tabbable whale-tab" id="my-work-ct">
	                <ul class="nav nav-tabs" role="tablist">
	                    <li role="presentation" class="active list" data-status="000"><a href="#list">机构列表</a></li>
                        <li role="presentation" class="type" data-status="001"><a href="#type">机构类型</a></li>
	                    <div class="btn-choose">
	                       <span class="pull-right batch-disable btn-yellow">批量禁用</span>
                           <span class="pull-right batch-enable btn-green">批量启用</span>
                           <span class="pull-right btn-add  btn-red">新增机构</span>
	                    </div>
	                </ul>
                <div class="tab-content mywork">
                    <div class="tab-pane fade in dataTable_div agency-list active" id="list">
                        <table id="agency_table" class="table table-agency-list table-striped table-bordered hover">
                            <thead>
                              <tr>
                                <td data-id=""class="checkbox-list" ><input type="checkbox" id="selectAll"></td>
                                <td data-id="">机构序号</td>
                                <td data-id="">机构名称</td>
                                <td data-id="">机构类型</td>
                                <td data-id="">联系人</td>
                                <td data-id="">联系电话</td>
                                <td data-id="">启用状态</td>
                              </tr>
                            </thead>
                            <tbody id="agencylist">
                           
                            </tbody>
                        </table>
                        <div id="pageBar" role="page-bar">
                                
                        </div>
                        <div class="no-content-container"></div>
                    </div>
                    <div class="tab-pane dataTable_div agency-type" id="type">
                        <table id="agency_type_table" class="table agency-table table-striped table-bordered hover">
                            <thead>
                                <tr>
                                    <td data-id="">机构类型序号</td>
                                    <td data-id="">类型名称</td>
                                    <td data-id=""></td>
                                </tr>
                           </thead>
                           <tbody class="agency-tbody">
                            
                           </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 启用禁用modal -->
    <div class="modal fade" id="start" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content audit">
                <div class="modal-header audit-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">x</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="mySmallModalLabel">机构状态</h4>
                </div>
                <div class="modal-body">
                    <div class="information-content">
                        <p class="text-left">请勾选机构序号</p>
                    </div>
                    <div class="pull-right btn-choose btn-group">
                       <span class="btn btn-start" data-dismiss="modal">确定</span>           
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>