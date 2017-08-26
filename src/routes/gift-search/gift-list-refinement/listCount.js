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

  const isListFiltered = numberOfFilteredElements !== totalNumberOfElements;
  return(
  	<div>
     	<h3 className='gift-list__count-number'>
        {numberOfFilteredElements} coffrets 
        {isListFiltered && <span> correspondant à vos critères</span>}
      </h3>

     	{isListFiltered && <div>sur {totalNumberOfElements} dans cette catégorie</div>}
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
