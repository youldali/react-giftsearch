 // @flow
 import type { Action, FilterStatistic, State } from 'modules/actions/types';
 import type { FilterName } from '../types';

 export
 type FiltersStatisticsState = { +[FilterName]: FilterStatistic };
 
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
     getFiltersStatistics: (state: State): FiltersStatisticsState => state.boxSearch.filtersStatistics,
     getFilterStatisticForFilter: (state: State, filterName: FilterName): FilterStatistic => state.boxSearch.filtersStatistics[filterName]
 };
 