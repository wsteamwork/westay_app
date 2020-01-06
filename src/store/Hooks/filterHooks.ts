import _ from 'lodash';
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

/**
 * Hook allow list of item can be expand
 * @param {T[]} data
 * @returns {[T[] , boolean , ((newState: (boolean | (() => boolean))) => void)]}
 */
export const useExpandableList = <T>(data: T[]): [T[], boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [list, setList]         = useState<T[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const newList = isExpand ? data : _.slice(data, 0, 3);
      setList(newList);
    }
  }, [isExpand, data]);

  return [list, isExpand, setIsExpand];
};
