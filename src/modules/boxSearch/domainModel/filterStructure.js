//@flow
import type { FilterConfig  } from '../types';
import { curry } from 'ramda';

const createFilterStructure = (filterConfig: FilterConfig ) => 
    Object.freeze({
        field: filterConfig.field,
        filterGroup: filterConfig.filterGroup,
        filterName: filterConfig.filterName,
        operand: filterConfig.operand,
        operator: filterConfig.operator,
    });

export default createFilterStructure;