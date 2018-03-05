//@flow

import type { FilterGroup } from 'modules/gift-search/filter.config';
import type { FilteredObjectStatus } from './filter';

import { findIntersectionOfSortedArrays } from 'helpers/array/utils'
import { curry } from 'ramda';

type FilteredObjectIdsMappedByGroup = Map<string | boolean, number[]>;

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

        getfilteredObjectIdsMappedByGroup(group: FilterGroup, id: number): FilteredObjectIdsMappedByGroup {
            return new Map(filteredObjectIdsMappedByGroup);
        }
    };
};


const _findNumberOfItemMatchingFilter = (filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup, listOfIdsMatchingFilter: number[], filterGroup: FilterGroup, isFilterSelected: boolean): number[] => {
    const findIntersectionWithIdsMatchingFilters = findIntersectionOfSortedArrays(listOfIdsMatchingFilter);
    return (
        isFilterSelected ? findIntersectionWithIdsMatchingFilters(filteredObjectIdsMappedByGroup.get(true)) :
        filterGroup === undefined ? findIntersectionWithIdsMatchingFilters(filteredObjectIdsMappedByGroup.get(true)) : findIntersectionWithIdsMatchingFilters(filteredObjectIdsMappedByGroup.get(filterGroup))
    );
};

export const findNumberOfItemMatchingFilter = curry(_findNumberOfItemMatchingFilter);