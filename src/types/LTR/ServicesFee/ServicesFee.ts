
export interface IServicesFee {
  included_fee: typeService[]
}

export interface typeService {
  id: number,
  value: number,
  calculate_function: number,
  included: number,
  name?: string,
  calculate_function_txt?: string,
  icon?: string | null
}

export interface serviceFeeType {
  id:number,
  value:string
}
