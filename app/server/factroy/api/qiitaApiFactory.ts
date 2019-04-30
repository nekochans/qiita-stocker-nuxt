import QiitaApi from '../../repositories/qiitaApi'
import { IQiitaApi } from '../../domain/qiitaApiinterface'

export default class QiitaApiFactory {
  static create(): IQiitaApi {
    return new QiitaApi()
  }
}
