 // @flow
 import type { Action, BoxesStatistics, FilterStatistic, FiltersStatisticsByFilter, State } from 'modules/actions/types';
 import type { FilterName } from '../types';

 export
 type BoxesStatisticsState = BoxesStatistics;
 
 const initialState = {
    filtersStatisticsByFilter: {},
    numberOfMatchingBoxes: 0,
    totalNumberOfBoxes: 0,
 };
 function boxesStatisticsReducer (state: BoxesStatisticsState = initialState, action: Action): BoxesStatisticsState {
     switch (action.type){
         case "BOX_LIST_SEARCH/SET_BOXES_STATISTICS":
             return action.boxesStatistics;
         default:
             return state;
     }
 }
 
 export default boxesStatisticsReducer;
 
 export 
 const selectors = {
     getFiltersStatistics: (state: State): FiltersStatisticsByFilter => state.boxSearch.boxesStatistics.filtersStatisticsByFilter,
     getFilterStatisticForFilter: (state: State, filterName: FilterName): FilterStatistic => state.boxSearch.boxesStatistics.filtersStatisticsByFilter[filterName],
     getNumberOfMatchingBoxes: (state: State): number => state.boxSearch.boxesStatistics.numberOfMatchingBoxes,
     getTotalNumberOfBoxes: (state: State): number => state.boxSearch.boxesStatistics.totalNumberOfBoxes,
 };
 