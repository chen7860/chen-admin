import { defHttp } from '/@/utils/http/axios';
enum Api {
  GetConcurrency = '/getConcurrency',
}

export function getConcurrencyData() {
  return defHttp.get<string[]>({ url: Api.GetConcurrency });
}
