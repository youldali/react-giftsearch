//@flow
import type { FilterConfig  } from '../types';
import { curry } from 'ramda';

const createFilterStructure = (filterConfig: FilterConfig ) => 
    Object.freeze(filterConfig);

export default createFilterStructure;