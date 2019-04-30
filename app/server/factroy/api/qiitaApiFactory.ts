import QiitaApi from '../../repositories/qiitaApi'
import { IQiitaApi } from '../../domain/qiita'

export default class QiitaApiFactory {
  static create(): IQiitaApi {
    return new QiitaApi()
  }
}
