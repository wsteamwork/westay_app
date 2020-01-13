import { TransformerInclude } from "../ResponseTemplate";

export interface ProfileInfoRes {
  id: number
  uuid: string
  name: string
  email: string
  gender: number
  city_id: number | null
  district_id: number | null
  gender_txt: string
  birthday: string | null
  address: string | null
  phone: string
  account_number: number | null
  avatar: string | null
  avatar_url: string
  level: number
  level_txt: string
  vip: number
  vip_txt: string
  point: number
  money: number
  status: number
  status_txt: string
  type: number
  type_txt: string
  job: string | null
  emergency_contact: string | null
  description: string
  city: TransformerInclude<City>;
  district: TransformerInclude<District>;
}


export interface City {
  name: string
  id: number | null

}
export interface District {
  name: string
  id: number | null

}

export interface ProfileViewInfoRes {
  id: number
  name: string
  email: string
  gender: number
  gender_txt: string
  birthday: string | null
  avatar: string | null
  avatar_url: string
  description: string | null
  status: number,
  status_txt: string
  merchant: number
  city: string
  district: string
  created_at: string
}
