import {TransformerInclude} from 'types/ResponseTemplate';

export interface ComfortIndexRes {
  id: number;
  icon: string;
  icon_name: string;
  details: TransformerInclude<ComfortTranslatesRes[]>;
  total_rooms: number;
  comfort_id: number;
  name_comfort: string;
  type: number;
  type_txt: string;
  name: string;
}

export interface ComfortTranslatesRes {
  id: number;
  comfort_id: number;
  name: string;
  icon: string;
  lang: string;
  description?: string | null;
}
