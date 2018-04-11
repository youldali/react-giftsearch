//@flow
import type { FilteredObjectIdsMappedByGroup } from '../types';

import { transformIntoObject, filterAgainstObjectKeys } from 'helpers/array/utils';
import { getAllPrimaryKeysForindex } from '../helpers/idbStorage';
import { curry } from 'ramda';

const _getOrderedList = async (db, requestData, itemIdListValidated: number[]) => {
    const {universe, orderBy, isOrderByReversed} = requestData;

    const 
        validatedItemIdObject = transformIntoObject(itemIdListValidated),
        fullItemIdListOrdered = await getAllPrimaryKeysForindex(db, universe, orderBy, isOrderByReversed);

    return filterAgainstObjectKeys(fullItemIdListOrdered, validatedItemIdObject);
}
export const getOrderedList = curry(_getOrderedList);
