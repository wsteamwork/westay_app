import { AxiosResponse } from 'axios';
import { SearchSuggestData, SearchSuggestRes } from 'types/Search/SearchResponse';
import { axios } from 'utils/api';

export const getSuggestion = async (value: string): Promise<any> => {
  const res: AxiosResponse<SearchSuggestRes> = await axios.get(`search-suggestions?key=${value}`);
  let dataChange: SearchSuggestData[] = [];
  //@ts-ignore
  Object.keys(res.data.data[0]).map((key) => {
    //@ts-ignore
    res.data.data[0][key].map((item) => {
      dataChange.push(item);
    });
  });
  return dataChange;
};
