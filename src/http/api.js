import {request} from './axios'

export class UserService {
  static async barchart(params) {
    return request('/barchart', params, 'get')
  }

  static async linechart(params) {
    return request('/linechart', params, 'get')
  }
}


