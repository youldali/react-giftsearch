//@flow
import type { FilterName, FilterGroup, FilterCriteria, CreateFilterOperand, FilterOperand, FiltersSelectedState  } from '../types';
import { getAllUniqueKeysForIndex } from './idbStorage';
import { curry } from 'ramda';
import 'core-js/fn/array/includes.js';

type GetOperandAsync = (universe: string, field: string) => Promise<FilterOperand>;


const _getOperand = (field: string, universe: string, getOperandsLocally: GetOperandAsync) => 
    getOperandsLocally(universe, field);
export const getOperand = curry(_getOperand);


const _getIsFilterOperandSelected = (filtersSelectedState: FiltersSelectedState, filterName: FilterName, operand: String | Number) => {
    const thisFilterSelectedState = filtersSelectedState[filterName];
    return (
        thisFilterSelectedState === undefined ? false :
        Array.isArray(thisFilterSelectedState) ? thisFilterSelectedState.includes(operand) : true
    );
};
export const getIsFilterOperandSelected = curry(_getIsFilterOperandSelected);
