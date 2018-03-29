import { transformIntoObject, filterAgainstObjectKeys } from 'helpers/array/utils';
import { getAllPrimaryKeysForindex } from '../helpers/idbStorage';
import { curry, compose } from 'ramda';

const _getOrderedList = async (db, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    const {universe, orderBy} = requestData;

    const 
        validatedItemIdObject = compose(transformIntoObject, filteredObjectIdsMappedByGroup.get(true)),
        fullObjectListOrdered = await getAllPrimaryKeysForindex(db, universe, orderBy);

    return filterAgainstObjectKeys(fullObjectListOrdered, validatedItemIdObject);
}
export const getOrderedList = curry(_getOrderedList);
