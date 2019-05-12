import request from '@/utils/request'

export default {
  getAll(params) {
    return request({
      url: '/lpr_getAll',
      method: 'get',
      params
    })
  }
}