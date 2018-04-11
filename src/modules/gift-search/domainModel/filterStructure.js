//@flow
import type { FilterName, FilterGroup, FilterCriteria, CreateFilterOperand, FilterOperand  } from '../types';
import { curry } from 'ramda';

const _createFilterStructure = async (universe: string, filterName: FilterName, filterGroup: FilterGroup, filterCriteria: FilterCriteria) => {
    const { operator, field, operand } = filterCriteria;
    const operandResolved = await getOperandValue(universe, operand);

    return Object.freeze({
        filterName,
        filterGroup,
        operator,
        field,
        operand: operandResolved
    });
};
const createFilterStructure = curry(_createFilterStructure);

const _getOperandValue = (universe: string, operandToResolve: FilterOperand | CreateFilterOperand): Promise<FilterOperand> => 
    typeof operandToResolve === 'function' ? operandToResolve(universe) : Promise.resolve(operandToResolve);
const getOperandValue = curry(_getOperandValue);


export default createFilterStructure;