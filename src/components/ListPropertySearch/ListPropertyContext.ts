import { AxiosResponse } from 'axios';
import { axios } from '../../utils/api';

export interface RoomTypeData {
  id: number;
  value: string;
}

export const getRoomType = async (): Promise<RoomTypeData[]> => {
  const res: AxiosResponse<RoomTypeData[]> = await axios.get('rooms/type');
  return res.data;
};
