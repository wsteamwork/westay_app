import { axios } from 'utils/api';

// @ts-ignore
export const getHomePageCollection = async (type: string, limit: number = -1): Promise<any[]> => {
  try {
    const res = await axios.get(`long-term-rooms/home-page-collection/${type}?limit=${limit}`);

    return res.data.data;
  } catch (e) {
    if (e) {
      console.error(e);
    }
  }
};
