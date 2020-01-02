import {TransformerInclude} from 'types/ResponseTemplate';

export interface RoomReviewIndexResponse {
  booking_id: number;
  user_id: number;
  id: number;
  room_id: number;
  status: number;
  status_txt: string;
  like: number;
  like_txt: string;
  recommend: number;
  recommend_txt: string;
  comment: string;
  cleanliness: number;
  cleanliness_txt: string;
  service: number;
  service_txt: string;
  quality: number;
  quality_txt: string;
  valuable: number;
  valuable_txt: string;
  avg_rating: number;
  created_at: string;
  updated_at: string;
  rating_room: number;
  total_like: number;
  user: TransformerInclude<UserReviewRes>;
}

export interface UserReviewRes {
  id: number;
  uuid: string;
  name: string;
  gender: number;
  gender_txt: string;
  birthday: string;
  address: string;
  description: string;
  job: string;
  city_id: number | null;
  district_id: number | null;
  emergency_contact: string;
  avatar: string;
  avatar_url: string;
  level: number;
  level_txt: string;
  vip: number;
  vip_txt: string;
  point: number;
  money: number;
  status: number;
  status_txt: string;
  subscribe: number;
  settings?: any | null;
}
