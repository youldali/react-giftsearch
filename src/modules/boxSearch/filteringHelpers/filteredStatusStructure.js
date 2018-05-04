//@flow

import type { BoxesIdMappedByFilteredStatus, FilteredBoxStatus, FilterGroup } from '../types';
import { findIntersectionOfSortedArrays } from 'helpers/array/utils'
import { curry } from 'ramda';

export
const createBoxesFilteredStatusStructure = () => {
    const boxesIdMappedByFilteredStatus: BoxesIdMappedByFilteredStatus = new Map();
    boxesIdMappedByFilteredStatus
        .set(true, [])
        .set(false, []);

    const
        addToBoolean = (hasPassed: boolean, id: number) => {
            // $FlowFixMe
            boxesIdMappedByFilteredStatus
                .get(hasPassed)
                .push(id);
            
            return this;
        },

        addToGroup = (group: FilterGroup, id: number) => {
            const listForGroup = boxesIdMappedByFilteredStatus.get(group);
            listForGroup 
                ? listForGroup.push(id)
                : boxesIdMappedByFilteredStatus.set(group, [id]);

            return this;
        };

    return {
        addFilteredObjectStatus(FilteredBoxStatus: FilteredBoxStatus, id: number){
            return (
                FilteredBoxStatus.pass 
                    ? addToBoolean(true, id) :
                FilteredBoxStatus.filterGroupRejected 
                    ? addToGroup(FilteredBoxStatus.filterGroupRejected, id) : addToBoolean(false, id)
            );
        },

        getBoxesIdMappedByFilteredStatus(): BoxesIdMappedByFilteredStatus {
            return new Map(boxesIdMappedByFilteredStatus);
        }
    };
};
export default createBoxesFilteredStatusStructure;