<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<link href="<%=request.getContextPath()%>/css/layouts/yjx.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/partnermanagement/partner_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/partnermanagement/partner_management_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/partnermanagement/partner_list.js"></script>
<title>合作方管理</title>
<body>
    <div class="main-content-container">
        <div class="s-container">
            <!-- 错误信息提示 -->
            <div name='publicError'></div>
            <!-- 页面主体内容 -->
            <div class="s-page-content">
                <div class="whale-well whale-well-min clearfix">
                    <div class="whale-well-headding pull-left">
                        <h4 class="whale-well-title">合作方管理</h4>
                    </div>
                    <div class="whale-well-footer pull-right">
                        <div class="search-bar">
                            <input type="text" class="form-control searchStr" placeholder="合作方名称/合作方类型" />
                            <i class="w-icon-search search"></i>
                        </div>
                    </div>
                </div>
                <div class="tabbable whale-tab" id="my-work-ct">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active list" data-status="000"><a href="#list">合作方列表</a></li>
                        <li role="presentation" class="type" data-status="001"><a href="#type">合作方类型</a></li>
                        <div class="btn-choose">
	                        <span class="pull-right btn-red btn-addPartner btn-press">新增合作方</span>
	                    </div>
                    </ul>                    
                    <div class="tab-content mywork"> 
                        <div class="tab-pane fade in active dataTable_div content-list" id="list">
                             <table id="partner_list_table" class="table table-striped partner_list_table table-bordered hover">
                                 <thead>
                                     <tr>
                                         <td data-id="">合作方序号</td>
                                         <td data-id="">合作方名称</td>
                                         <td data-id="">合作方类型</td>
                                         <td data-id="">联系人</td>
                                         <td data-id="">联系方式</td>
                                         <td data-id="">启用状态</td>
                                     </tr>
                                 </thead>
                                 <tbody id="partnerlist" class="table-tbody">
                             
                                 </tbody>
                             </table>
                             <div id="pageBar" role="page-bar"></div>
                             <div class="no-content-container"></div>  
                         </div>                           
                         <div class="tab-pane  dataTable_div content-type" id="type">
                             <table id="partner_type_table" class="table partner_list_table table-striped table-bordered hover">
                                 <thead>
                                     <tr>
                                         <td data-id="">合作方序号</td>
                                         <td data-id="">合作方类型</td>
                                         <td data-id=""></td>
                                     </tr>
                                </thead>
                                <tbody class="partner-table-tbody">
                             
                                </tbody>
                             </table>
                         </div>        
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>