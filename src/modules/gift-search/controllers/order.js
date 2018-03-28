import { transformIntoObject } from 'helpers/array/utils';
import { curry, compose } from 'ramda';

const _getOrderedList = async (db, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    const {universe, orderBy} = requestData;

    const 
        validatedItemIdObject = compose(transformIntoObject, filteredObjectIdsMappedByGroup.get(true)),
        fullObjectListOrder = await getAllUniqueKeysForIndex(db, universe, orderBy);

    return orderItemIdList(validatedItemIdObject, fullObjectListOrder);
}
export const getOrderedList = curry(_getOrderedList);


const _orderItemIdList = (itemIdListOrdered: number[], itemIdsValidated: {[number]: any}) =>
itemIdListOrdered.filter( itemId => itemIdsValidated[itemId] !== undefined)
export const orderItemIdList = curry(_orderItemIdList);