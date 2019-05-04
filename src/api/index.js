import request from '@/utils/request'

export default {
  getAll(params) {
    return request({
      url: 'http://houlong66.cn:9091/mock/17/lpr_getAll',
      method: 'get',
      params
    })
  }
}