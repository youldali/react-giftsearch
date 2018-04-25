//@flow
import type { FilterName, CreateFilterOperand, FilterOperand, FilterConfig  } from '../types';
import { curry } from 'ramda';

const createFilterStructure = (filterConfig: FilterConfig ) => 
    Object.freeze(filterConfig);

export default createFilterStructure;