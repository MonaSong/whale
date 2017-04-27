/**
 * @Author yugang
 * @Date 2016-11-08
 * @description 合作伙伴请求接口封装
 */

var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //所有请求接口对象
    var application = {};

    /**
     * 获取邀请码列表
     */
    application.get_cooperativeapplication_data = function (param,callback) {
    	var url = '/partner/partnerselect';
    	BaseRequest.sync_get(param,url,callback);
    }
    return application;
})();


