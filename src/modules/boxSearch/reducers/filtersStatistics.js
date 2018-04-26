 // @flow
 import type { Action, FilterStatistic, FiltersStatisticsByFilter } from 'modules/actions/types';
 import type { FilterName } from '../types';

 type FiltersStatisticsState = FiltersStatisticsByFilter;
 
 const initialState = {};
 function filtersStatisticsReducer (state: FiltersStatisticsState = initialState, action: Action): FiltersStatisticsState {
     switch (action.type){
         case "BOX_LIST_SEARCH/SET_FILTERS_STATISTICS":
             return action.filtersStatisticsByFilter;
         default:
             return state;
     }
 }
 
 export default filtersStatisticsReducer;
 
 export 
 const selectors = {
     getFiltersStatistics: (state: Object) => state.boxSearch.filtersStatistics,
     getFilterStatisticForFilter: (state: Object, filterName: FilterName) => state.boxSearch.filtersStatistics[filterName]
 };
 