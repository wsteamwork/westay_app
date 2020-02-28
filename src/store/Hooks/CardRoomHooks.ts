import { axios } from 'utils/api';
import {AxiosRes} from 'types/ResponseTemplate';

// @ts-ignore
export const getHomePageCollection = async (type: string, limit: number = -1): Promise<AxiosRes<any>> => {
  try {
    const res:AxiosRes<any> = await axios.get(`long-term-rooms/home-page-collection/${type}?limit=${limit}`);

    return res;
  } catch (e) {
    // if (e) {
      console.log(e.response.data);
    // }
  }
};
