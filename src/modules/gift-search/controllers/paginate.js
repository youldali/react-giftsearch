import { getItemList } from '../helpers/idbStorage';
import { curry } from 'ramda';

const _getPaginatedGiftList = (db, requestData, perPage: number, orderedFilteredIdList: number[]): Promise<any> => {
    const {universe, page} = requestData;

    const 
        begin = (page - 1) * perPage,
        end = page * perPage,
        paginatedIdList = orderedFilteredIdList.slice(begin, end);

    return getItemList(db, universe, paginatedIdList);
}
export const getPaginatedGiftList = curry(_getPaginatedGiftList);
