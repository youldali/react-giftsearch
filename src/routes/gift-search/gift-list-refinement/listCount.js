//@flow

import { connect } from 'react-redux';
import React from 'react';
import { selectors } from 'modules/gift-search/index';
import './css/listCount.css'

type ListCountProps = {
  numberOfFilteredElements: number,
  totalNumberOfElements: number
};

export
const ListCount = ({numberOfFilteredElements, totalNumberOfElements}: ListCountProps) => {
  if(totalNumberOfElements === 0)
    return null;

  return(
  	<div>
     	<h3 className='gift-list__count-number'>{numberOfFilteredElements} coffrets disponibles</h3>
     	{numberOfFilteredElements !== totalNumberOfElements &&
     		<div>sur {totalNumberOfElements} dans cette catégorie</div>
     	}
    </div>
  )
};  

//Store connection
const mapStateToProps = (state: Object): Object => {
  const numberOfFilteredElements = selectors.getFilteredList(state).length;
  const totalNumberOfElements = selectors.getList(state).length;
	return {
		numberOfFilteredElements,
		totalNumberOfElements
	}
}


export default
connect(mapStateToProps, null)(ListCount);
