import {request} from './axios'

export class UserService {

  static async barchart(params) {
    return request('/barchart', params, 'get')
  }

  static async circlechart(params) {
    return request('/circlechart', params, 'get')
  }

  static async linechart(params) {
    return request('/linechart', params, 'get')
  }

  static async ganttchart(params) {
    return request('/ganttchart', params, 'get')
  }
}


