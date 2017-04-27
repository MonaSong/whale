
/**
 * 封装项目的所有网络请求
 */
var HttpUtils = (function() {
    /**
     * 封装基本请求方式
     */
    var BaseRequest = (function() {
        //发送请求的所有方式
        var request = {};
        /**
         * 基本请求
         */
        function baseRequestFunc(type, param, url, async, contentType, dataType, processData, opt_suc) {
            //这个里面是最基本的ajax
            $.ajax({
                type: type,
                data: param,
                url: contextPath + url + '.json',
                async: async, //默认为true
                contentType: contentType, //默认为application/x-www-form-urlencoded
                dataType: dataType, //默认为预期服务器返回的数据类型
                processData: processData, //默认为true
                success: function(data, textStatus, jqXHR) {
                    if ($.isFunction(opt_suc)) {
                        opt_suc(data, textStatus, jqXHR);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    renderErrorMsg(jqXHR, textStatus, errorThrown)
                }
            })
        }
        /**
         * get异步请求方式
         */
        request.get = function(param, url, callback) {
                baseRequestFunc('get', param, url, true, 'application/json', 'json', true, callback);
            }
            /**
             * get同步请求方式
             * param {param} object 
             */
        request.sync_get = function(param, url, callback) {
            baseRequestFunc('get', param, url, false, 'application/json', 'json', true, callback);
        }
            /**
             * post异步请求方式
             * param {param} object 
             */
        request.post = function(param, url, callback) {
                baseRequestFunc('post', param, url, true, 'application/json', 'json', true, callback);
            }
             /**
             * post异步请求方式需解析JSON
             * param {param} object 
             */
        request.stringify_post = function(param, url, callback) {
                baseRequestFunc('post', JSON.stringify(param), url, false, 'application/json', 'json', true, callback);
            }
            /**
             * post的requestBean请求方式 这种请求方式适用于字段较多，且需要formdata方式上传文件
             * param {param} object {param.files} array {param.fileNames} array {param.inputData} object
             */
        request.post_multipart_form_data = function(param, url, callback) {
                var form_data = new FormData();
                if (param.fileNames.length < 1 || param.files.length < 1) {
                    return
                }
                $.each(param.files, function(k, info_name) {
                    form_data.append('files', document.getElementById(info_name).files[0])
                })
                $.each(param.fileNames, function(i, item) {
                    form_data.append('fileNames', item);
                })

                form_data.append('requestBean', new Blob([JSON.stringify(param.inputData)], {
                    type: "application/json"
                }));
                baseRequestFunc('post', form_data, url, true, false, 'json', false, callback);
            }
            /**
             * post的formdata请求方式
             * param {param} object
             */
        request.post_form_data = function(param, url, callback) {
                var form_data = new FormData();
                $.each(param, function(i, item) {
                    form_data.append(i, item);
                })
                baseRequestFunc('post', form_data, url, true, false, 'json', false, callback);
            }
            /**
             * post的JSON.stringify(param)请求方式
             * param {param} object
             */
        request.post_string_data = function(param, url, callback) {
            var cur_data = JSON.stringify(param);
            baseRequestFunc('post', cur_data, url, true, 'application/json', 'json', false, callback);
        }
        return request;
    })();
    //整个项目的所有请求接口对象



    var application = {};
    /**
     * @Author yjx
     * @date 2016-11-16
     * @description 获取消息模板数据
     * @data object
     * @callback function 
     * @return 
     */
    application.get_message_management_data = function(param, callback) {
            var url = '/message/message_list';
            BaseRequest.sync_get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-16
         * @description 消息列表数据
         * @data object
         * @callback function 
         * @return 
         */
    application.get_list_translation = function(param, callback) {
            var url = '/message/find_all_send';
            BaseRequest.sync_get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-27
         * @description 消息模板状态修改
         * @data object
         * @callback function 
         * @return 
         */
    application.get_change_status = function(param, callback) {
            var url = '/message/change_message_status';
            BaseRequest.post_form_data(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-27
         * @description 消息发送状态统计
         * @data object
         * @callback function 
         * @return 
         */
    application.get_participation_role = function(param, callback) {
            var url = '/message/role_Of_institution_type';
            BaseRequest.get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-30
         * @description 已发消息列表详情接收人列表
         * @data object
         * @callback function 
         * @return 
         */
    application.get_Message_Recipients = function(param, callback) {
            var url = '/message/send_info_detail';
            BaseRequest.get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-12-2
         * @description 查询所有接受到的站内信
         * @data object
         * @callback function 
         * @return 
         */
    application.get_Receiving_letter = function(param, callback) {
            var url = '/message/station_letter_all';
            BaseRequest.sync_get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-16
         * @description 获取已读未读已删除数据
         * @data object
         * @callback function 
         * @return 
         */
    application.get_userCountRequest = function(param, callback) {
            var url = '/message/station_status_count';
            BaseRequest.get(param, url, callback);
        }
        /**
         * @description 标记已读删除
         * @param {param} 请求参数
         * @returns {callback} function 请求成功的回调函数，参数是请求成功之后返回的数据
         */
    application.get_messageRequest = function(param, callback) {
            var url ='/message/update_station_status';
            BaseRequest.post_form_data(param, url, callback);
        }
        /**
         * @description 消息模板回显
         * @param {param} 请求参数
         * @returns {callback} function 请求成功的回调函数，参数是请求成功之后返回的数据
         */
    application.get_messageRequestdata = function(param, callback) {
            var url = '/message/searchForRoleName';
            BaseRequest.sync_get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-27
         * @description 获取所有已参与流程角色
         * @data object
         * @callback function 
         * @return 
         */
    application.get_Management_role = function(param, callback) {
            var url = '/message/role_on_process';
            BaseRequest.sync_get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-29
         * @description 获取所有已通知角色列表
         * @data object
         * @callback function 
         * @return 
         */
    application.get_participation_role = function(param, callback) {
            var url = '/message/role_Of_institution_type';
            BaseRequest.sync_get(param, url, callback);
        }
        /**
         * @Author yjx
         * @date 2016-11-30
         * @description 模板消息修改保存
         * @data object
         * @callback function 
         * @return 
         */
    application.get_Message_save = function(param, callback) {
        var url = '/message/sms_group_update';
        BaseRequest.stringify_post(param, url, callback);
    }
    /**
     * @Author yjx
     * @date 2016-11-30
     * @description //获取所有流程定义节点
     * @data object
     * @callback function 
     * @return 
     */
    application.get_process_definition= function(param, callback) {
        var url = '/activiti/process_definition';
        BaseRequest.get(param, url, callback);
    }
    return application;
})();