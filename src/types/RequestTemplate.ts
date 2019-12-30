export interface BaseGetRequestParams {
  include?: string,
  limit?: number
  page?: number
}

export interface PromiseCallBack<T = any> {
  callback: (...params: any[]) => Promise<T>,
  params: any[]
}
