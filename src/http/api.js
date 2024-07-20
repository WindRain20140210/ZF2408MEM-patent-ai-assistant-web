import {request} from './axios'

export class UserService {

  /**
   * search page
   */
  static async getnumbers(params) {
    return request('/getnumbers', params, 'get')
  }

  static async search(params) {
    return request('/search', params, 'get')
  }

  /**
   * user records list page
   */
  static async userrecords(params) {
    return request('/userrecords', params, 'get')
  }

  static async deleterecord(params) {
    return request('/deleterecord', params, 'get')
  }

  static async test() {
    return request('/v1/report/detail', {id: 11})
  }
  /**
   * generate page
   * tables of generate report
   */
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


