//@flow

import type { FilterGroup } from 'modules/gift-search/config';
import type { FilteredObjectStatus } from './filter';

type LoggerMap = Map<string | boolean, number[]>;

export
const createFilterStatisticStructure = () => {
    const loggerMap: LoggerMap = new Map();
    loggerMap
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
            loggerMap
                .get(hasPassed)
                .push(id);
            
            return this;
        },

        addToGroup(group: FilterGroup, id: number){
            const listForGroup = loggerMap.get(group);
            listForGroup 
                ? listForGroup.push(id)
                : loggerMap.set(group, [id]);

            return this;
        },

        getLoggerMap(group: FilterGroup, id: number): LoggerMap {
            return new Map(loggerMap);
        }
    };
};


export const findNumberForFilter = (loggerMap: LoggerMap, filterGroup: FilterGroup, listValidId: number[]): number => {

    return 0;
};

export default createFilterStatisticStructure;