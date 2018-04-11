//@flow

import type { FilterGroup, FilteredObjectStatus, FilteredObjectIdsMappedByGroup } from '../types';
import { findIntersectionOfSortedArrays } from 'helpers/array/utils'
import { curry } from 'ramda';

export
const createFilterStatisticStructure = () => {
    const filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup = new Map();
    filteredObjectIdsMappedByGroup
        .set(true, [])
        .set(false, []);

    return {
        addFilteredObjectStatus(filteredObjectStatus: FilteredObjectStatus, id: number){
            return (
                filteredObjectStatus.pass 
                    ? this.addToBoolean(true, id) :
                filteredObjectStatus.filterGroupRejected 
                    ? this.addToGroup(filteredObjectStatus.filterGroupRejected, id) : this.addToBoolean(false, id)
            );
        },

        addToBoolean(hasPassed: boolean, id: number){
            // $FlowFixMe
            filteredObjectIdsMappedByGroup
                .get(hasPassed)
                .push(id);
            
            return this;
        },

        addToGroup(group: FilterGroup, id: number){
            const listForGroup = filteredObjectIdsMappedByGroup.get(group);
            listForGroup 
                ? listForGroup.push(id)
                : filteredObjectIdsMappedByGroup.set(group, [id]);

            return this;
        },

        getfilteredObjectIdsMappedByGroup(): FilteredObjectIdsMappedByGroup {
            return new Map(filteredObjectIdsMappedByGroup);
        }
    };
};
export default createFilterStatisticStructure;