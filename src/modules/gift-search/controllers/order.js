import { transformIntoObject, filterAgainstObjectKeys } from 'helpers/array/utils';
import { getAllPrimaryKeysForindex } from '../helpers/idbStorage';
import { curry } from 'ramda';

const _getOrderedList = async (db, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    const {universe, orderBy, isOrderByReversed} = requestData;

    const 
        validatedItemIdObject = transformIntoObject(filteredObjectIdsMappedByGroup.get(true)),
        fullItemListOrdered = await getAllPrimaryKeysForindex(db, universe, orderBy, isOrderByReversed);

    return filterAgainstObjectKeys(fullItemListOrdered, validatedItemIdObject);
}
export const getOrderedList = curry(_getOrderedList);
