import QiitaStockerApi from '../../repositories/qiitaStockerApi'
import { Api } from '../../domain/qiitaStockerApiinterface'

export default class QiitaStockerApiFactory {
  static create(): Api {
    return new QiitaStockerApi()
  }
}
