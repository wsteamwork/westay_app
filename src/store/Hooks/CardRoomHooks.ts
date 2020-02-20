import { AxiosRes } from 'types/ResponseTemplate';
import { axios } from 'utils/api';

export const getHomePageCollection = async (
  type: string,
  limit: number = -1,
): Promise<AxiosRes<any>> => {
  try {
    const res: AxiosRes<any> = await axios.get(
      `long-term-rooms/home-page-collection/${type}?limit=${limit}`,
    );

    return res;
  } catch (e) {
    return e;
  }
};
