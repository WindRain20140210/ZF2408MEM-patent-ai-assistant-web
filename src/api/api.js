import request from './http';

// 报告详情页面 参数 报告id
export function generate_pdf(data) {
    let url = '/generate-pdf';
    return request({
        url,
        method: 'post',
        data,
    });
}

// 报告详情页面 参数 报告id
export function report_delete(data) {
    let url = '/v1/report/delete';
    
    return request({
        url,
        method: 'post',
        data,
    });
}

// 报告详情页面 参数 报告id
export function report_detail(data) {
    let url = '/v1/report/detail';
    
    return request({
        url,
        method: 'post',
        data
    });
}

// 报告列表 参数 用户id
export function report_list(data) {
    let url = '/v1/report/list';
    return request({
        url,
        method: 'post',
        data: {
            'user_id': '21914df4-4745-43da-979a-c4adca6a58c0'
        }
    });
}

/** 返回
 * {"data": [
    {
       "id": integer // 序号
       "title": string // 报告名称
       "status": integer  啥？？ 这个是最后更新时间吗？？
       "is_deleted": integer 干啥？？
       "batch_id": integer 啥？？
    }
    ]
} 
    分页是假分页吗？？？？ ===》 是的
    删除是哪个接口？？ ==》没写
    搜索前端假搜索吗？？ ===》 是的
 */

// 过滤页面我自己写

// 报告创建
export function report_save(data) {
    let url = '/v1/patent_report/save';
    return request({
        url,
        method: 'post',
        data: {
            'user_id': '21914df4-4745-43da-979a-c4adca6a58c0',
            'title': '', // 是啥
            'batch_id': '' // 是啥 => 空
        }
    });
}
/**
 * 是下载按钮吗？
 * {"data": [
    {
       "id": integer //   报告id  返回的是啥？？没有数据流？？
    }
    ]
}
 */

/**
 * 详情页面的 title 、上次更新时间 从哪里取到 ？？
 * 
 */