//@flow

import { connect } from 'react-redux';
import React from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Radio, Menu } from 'semantic-ui-react';
import type { Filters, Dispatch } from 'modules/actions/types';

type FilterRadioProps = {
  filterLabel: string,
  isActive: boolean,
  setFilters: Function,
  resetFilters: Function,
  componentFilters: Filters
};
export 
const FilterRadio = (props: FilterRadioProps) => {
  const handleChange = () => {
    if(props.isActive)
      props.resetFilters(Object.keys(props.componentFilters));
    else
      props.setFilters(props.componentFilters);
  }  

  return (
      <Radio 
        toggle 
        label={props.filterLabel} 
        checked={props.isActive}
        onChange={handleChange}
      />
  );  
};


//Store connection
type OwnProps = {componentFilters: Filters};
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
	const { componentFilters } = ownProps;
	const isActive = selectors.areFiltersActive(state, Object.keys(componentFilters));

	return {
		...ownProps,
		isActive,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setFilters: (filters: Filters) => dispatch(actions.setFilters(filters)),
		resetFilters: (filters: Array<string>) => dispatch(actions.resetFilters(filters))
	}
}

export default
(FilterComponent: React.Element<*>) => connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
