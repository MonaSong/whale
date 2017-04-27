/**
 * @Author Mona
 * @date 2016-11-14
 * @description 配置文件
 */
//角色
var role = {};
role["jg_operator"] = { id:'R-0defbd716dd6446cb9d88146b52ebe58',name:'监管方操作员',isleader:false}
role["zj_leader"] = { id:'R-114dd47444984cb5b84769bc7b29f63e',name:'中酒领导',isleader:true}
role["ly_contract_operator"] = { id:'R-1be9448268ac433aa3c1bb091f58a748',name:'履约保险方操作员',isleader:false}
role["zf_system_administrator"] = { id:'R-22111c43f5d14390ab0a0d27622d7f41',name:'资方系统管理员',isleader:false}
role["jc_system_operator"] = { id:'R-2f6872de9e624d529f073adea82e03f6',name:'酒厂业务员',isleader:false}
role["zf_leader"] = { id:'R-578abf67746649e2969b18bd7c955b6f',name:'资方领导',isleader:true}
role["zj_region_manager"] = { id:'R-5c0abe296c664c0b81e091d78aaa2a42',name:'中酒省区经理',isleader:false}
role["jg_system_administrator"] = { id:'R-6af6bb4f7f334866834089c24e708974',name:'监管方系统管理员',isleader:false}
role["ly_system_administrator"] = { id:'R-6e1eb4329c6a4ef29cac51508656d26a',name:'履约保险方系统管理员',isleader:false}
role["jg_leader"] = { id:'R-7e4102c719f94b09968baa8f33c5025c',name:'监管方领导',isleader:true}
role["rz_system_administrator"] = { id:'R-82624fe2acb34c78abe600c4e9a9b011',name:'融资方系统管理员',isleader:false}
role["zj_channel_director"] = { id:'R-9bbf6e27fbec466d9048fc6e024749f2',name:'中酒渠道总监',isleader:false}
role["za_letter_trial"] = { id:'R-9c1a84bdf0b24abab4a5169627d10cd0',name:'真安信审员',isleader:false}
role["zj_credit_commissioner"] = { id:'R-9c2b0fc199f54d259d18e2fc4ff53b02',name:'中酒信贷专员',isleader:false}
role["zj_risk_management_commissioner"] = { id:'R-b80bef6a1c334154b3de10bbfd0db428',name:'中酒风控专员',isleader:false}
role["za_risk_management_center"] = { id:'R-b6f561d3141b4bad823683436ac62a43',name:'真安风控中心',isleader:false}
role["zj_transaction_assistant"] = { id:'R-bcaf53d9876b4a2d8194fb7ae97d236c',name:'中酒事务助理',isleader:false}
role["zf_management_operator"] = { id:'R-c9d112f3e7a443d8b9f3340ed9bd58da',name:'资方操作员',isleader:false}
role["za_leader"] = { id:'R-ce8b3a3a9092495b8f5a11ec95b3ceaa',name:'真安领导',isleader:true}
role["super_administrator"] = { id:'R-d1b28087b9da4b3bb7566a1992153dc9',name:'超级管理员',isleader:false}
role["ly_performance_leader"] = { id:'R-dc24ac18f9894558b426283c9cad99cc',name:'履约保险方领导',isleader:true}
role["jr_finace_system_administrator"] = { id:'R-efb0eca9ddd0477ebef256d971301471',name:'金融服务方系统管理员',isleader:false}
role["yy_operation_party_administrator"] = { id:'R-f1dbc687e97343f4a0d27ffb8e23b24a',name:'运营方系统管理员',isleader:false}
role["zj_winery_leader"] = { id:'R-f1fc04a1edd64987b5d4d2fc59698ec3',name:'酒厂领导',isleader:true}


/**
 * @Author Mona
 * @param {id} string 根据角色id 获取角色名称
 */
role.getName = function (id){
    var roleName = null;
    $.each(role,function(i,item){
        if(item.id==id){
            roleName = item.name;
            return false
        }
    })
    return roleName
}

/**
 * @Author Mona
 * @param {id} string 根据角色id 获取该角色是不是领导
 */

role.isLeader = function(id){
    var isLeader = false;
    $.each(role,function(i,item){
        if(item.id==id){
            isLeader = item.isLeader;
            return false
        }
    })
    return isLeader
}

/**
 * @Author Mona
 * @param {id} string 根据角色id 获取整个角色对象
 */
role.getRole = function(id){
    var roleObject = {};
    $.each(role,function(i,item){
        if(item.id==id){
            roleObject = item;
            return false
        }
    })
    return roleObject
}

/**
 * @Author Mona
 * @param {id} string  角色id 
 * @param {roleObject} 角色对象 例如 { id:'R-f1fc04a1edd64987b5d4d2fc59698ec3',name:'酒厂领导',isleader:true}
 */

role.compareTo = function(id,roleObject){
    
    if(roleObject.id==id){
        return true
    }
    return false
}
    

//机构类型
var institutionType = {};
institutionType["platform_operator"] = {id:'IT-00ddaf51506d4e9b9e99b2dc4dfb9cdc',name:'平台运营方',isFinancier:false}
institutionType["insurance_operator"] = {id:'IT-295ba5a065ac400f918badf34b8981b0',name:'履约保险方',isFinancier:false}
institutionType["financial_service_operator"] ={id:'IT-6ed51af3afa64eeebb0a5df96364fd60',name:'金融服务方',isFinancier:false}
institutionType["supervise_operator"] = {id:'IT-b263fc11b01648078919263f0061fbc6',name:'监管方',isFinancier:false}
institutionType["management_operator"] ={id:'IT-db90235d10ec48538a9432d7384a7429',name:'资方',isFinancier:false}
institutionType["finace_operrator"] = {id:'IT-f299e92151ce424baf5cdd42a8ad0007',name:'融资方',isFinancier:true}


/**
 * @Author Mona
 * @param {id} string 根据机构类型id 判断是否是融资方
 */

institutionType.isFinancier = function(id){
    var isFinancier = false;
    $.each(institutionType,function(i,item){
        if(id==item.id){
            isFinancier = item.isFinancier;
            return false
        }
    })
    return isFinancier
}

/**
 * @Author Mona
 * @param {id} string 根据机构类型id 获取机构名称
 */

institutionType.getInstitutionName = function(id){
    var institutionName = null;
    $.each(institutionType,function(i,item){
        if(id==item.id){
            institutionName = item.name;
            return false
        }
    })
    return institutionName
}

/**
 * @Author Mona
 * @param {id} string 根据机构类型id 获取整个对象
 */

institutionType.getInstitutionObject = function(id){
    var curItem = {};
    $.each(institutionType,function(i,item){
        if(id==item.id){
            curItem = item;
            return false
        }
    })
    return curItem
}

/**
 * @Author Mona
 * @param {id} string  机构类型id
 * @param {roleObject} 角色对象 例如 {id:'IT-f299e92151ce424baf5cdd42a8ad0007',name:'融资方',isFinancier:true}
 */
institutionType.compareTo = function(id,institutionTypeObject){
    
    if(institutionTypeObject.id==id){
        return true
    }
    return false
}


/**
* 路由配置
*/

var uiRouter = {};

//入驻申请
uiRouter["ru_zhu"] = {
    assistantAudit:{url:'/winmanage/assistant_audit_page',name:'中酒助理审核'},
    assignment:{url:'/winmanage/functional_distribution_page',name:'渠道总监审核'},
    managerAudit:{url:'/winmanage/manager_audit_page',name:'经理审核'},
    directorAudit:{url:'/winmanage/audit_director_page',name:'总监审核'}
}

//融资申请
uiRouter["rong_zi"] = {
     information_Audit:{url:'/finance/info_audit_page',name:'信息审核'},
                
     qualification_Aduit:{url:'/finance/qualification_audit_page',name:'资质审核'},
            
     finance_pledge:{url:'/finance/pledge_in_place_page',name:'质押物就位'},
           
     sampling_testing:{url:'/finance/province_sampling_page',name:'取样检测'},
               
     zhenAn_credit_upload_contract:{url:'/finance/upload_contract_page',name:'上传合同'},
                                
     contract_aduit:{url:'/finance/contract_audit_page',name:'合同审核'},
                              
     regulator_aduit:{url:'/finance/pledge_supervision_page',name:'质押监管'},
               
     insurance_aduit:{url:'/finance/performance_insurance_page',name:'履约保险'},
               
     loan_aduit:{url:'/finance/loan_confirmation_page',name:'放款确认'}            
}

//风险管理
uiRouter["risk"] = {
    risk_warning:{url:'/riskmanagement/risk_audit_page',name:'风险提示'},
    zhenAn_risk_risk_audit:{url:'/riskmanagement/risk_audit_page',name:'真安风控风险审核'},
    capital_risk_audit:{url:'/riskmanagement/risk_identification_page',name:'资方风险审核'},
}

//到期解压
uiRouter["decompression"] = {
        start_decompression:{url:'/maturity/start_decompression_page',name:'启动解押'},
        insurer_close_policy:{url:'/maturity/release_policy_page',name:'解除保单'},
        regulator_close_pledge:{url:'/maturity/lifting_of_pledge_page',name:'解除质押'},
        winery_receipt:{url:'/maturity/winery_receipt_page',name:'收货'}
}

//逾期理赔
uiRouter["overdue"] = {
    start_overdue:{url:'/overdue/overdue_detail_page',name:'发起理赔'},
    insurance_claim:{url:'/overdue/insurance_claim_page',name:'保险赔付'},
    capital_collection:{url:'/overdue/capital_collection_page',name:'资方收款'},
    zhongjiu_risk_start_back:{url:'/overdue/start_buyback_page',name:'启动回购'},
    insurer_close_policy:{url:'/overdue/release_policy_page',name:'解除保单'},
    regulator_close_pledge:{url:'/overdue/release_pedge_page',name:'解除质押'},
    zhongjiu_risk_receipt:{url:'/overdue/delivery_notes_page',name:'提货'}
}

var no_content_html = '<div class="no-content-box"> <b>暂无数据！</b><div class="common-img no-content-icon"></div></div>';