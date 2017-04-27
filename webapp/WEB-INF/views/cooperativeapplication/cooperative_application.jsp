<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/cooperativeapplication/cooperative_application.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/cooperativeapplication/cooperative_application_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/cooperativeapplication/cooperative_application.js"></script>
<title>合作伙伴</title>
<body>
<div class="main-content-container">
    <div class="s-container">
        <!-- 错误信息提示 -->
        <div name='publicError'></div>
        <div class="s-page-content">
            <div class="whale-well whale-well-min clearfix">
                <div class="whale-well-headding pull-left">
                    <h4 class="whale-well-title">合作伙伴</h4>
                </div>
                <div class="whale-well-footer pull-right">
                    <div class="search-bar">
                        <input type="text" class="form-control searchStr" placeholder="合作方名称/合作方类型"/>
                        <i class="w-icon-search search"></i>
                    </div>
                </div>
            </div>
            <div class="tabbable whale-tab">
                <div class="tab-content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="dataTable_div">
                                <table id="cooperative_application_table" class="table table-striped table-bordered hover">
                                    <thead>
                                        <tr>
                                            <th class="left" data-id="">合作方序号</th>
                                            <th class="left" data-id="">合作方名称</th>
                                            <th class="left" data-id="">合作方类型</th>
                                            <th class="left" data-id="">联系人</th>
                                            <th class="left" data-id="">联系方式</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
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
    </div>
</div>
</body>
</html>