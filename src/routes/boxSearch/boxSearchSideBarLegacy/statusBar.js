//@flow

import React from 'react';
import OrderByDropdown from './orderBy';
import DisplayAs from './displayAs';
import ListCount from './listCount';
import './css/statusBar.css'

export
const StatusBar = () => (
	<div className='gift-list__status-bar'>
		<div className='gift-list__list-count-wrapper'>
			<ListCount />
		</div>
		<div>
			<DisplayAs value='list' icon='list layout' />
			<DisplayAs value='card' icon='grid layout' />
		</div>
		<OrderByDropdown />   	
  </div>
);

export default
StatusBar;
