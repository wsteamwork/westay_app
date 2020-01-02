import {TransformerInclude} from 'types/ResponseTemplate';

export interface PlaceIndexResponse {
  name: string
  description: string
  longitude: string
  latitude: string
  guidebook: TransformerInclude<GuidebookRes>
}

export interface GuidebookRes {
  id: number
  name: string
  icon: string
  lang: string
}
