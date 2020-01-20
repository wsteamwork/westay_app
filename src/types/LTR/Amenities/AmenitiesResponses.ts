import { TransformerInclude } from '../../ResponseTemplate';
export interface AmenitiesIndexRes {
  id: number;
  icon: string;
  icon_name: string;
  comfort_trans: TransformerInclude<AmenitiesTranslatesRes[]>;
  type: number;
  type_txt: string;
}

export interface AmenitiesTranslatesRes {
  id: number;
  comfort_id: number;
  name: string;
  lang: string;
  description?: string | null;
}
