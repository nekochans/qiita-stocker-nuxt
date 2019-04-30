import QiitaStockerApi from '../../repositories/qiitaStockerApi'
import { IQiitaStockerApi } from '../../domain/qiitaStockerApiinterface'

export default class QiitaStockerApiFactory {
  static create(): IQiitaStockerApi {
    return new QiitaStockerApi()
  }
}
