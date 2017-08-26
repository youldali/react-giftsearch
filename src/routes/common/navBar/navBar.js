//@flow

import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './css/navBar.css'
import type { RouterLocation } from 'modules/actions/types';

const navBar = ({location}: {location: RouterLocation}) => {
	const links = {
		'gastronomy': "/gift-search/gastronomy",
		'adventure': "/gift-search/adventure",
		'well-being': "/gift-search/well-being",
		'occasion': "/gift-search/occasion",
		'voyage': "/gift-search/voyage",
	};

	return(
	  <Menu pointing secondary fluid className='navbar'>
	    <Menu.Item name='Gastronomie' color='olive' active={links['gastronomy'] === location.pathname} > 
	    	<Link to={links['gastronomy']} >Gastronomie</Link>
	    </Menu.Item>
	    <Menu.Item name='Aventure' color='red' active={links['adventure'] === location.pathname}>
				<Link to={links['adventure']} >Aventure</Link>
	    </Menu.Item>    
	    <Menu.Item name='Bien-être' color='blue' active={links['well-being'] === location.pathname}>
				<Link to={links['well-being']} >Bien-être</Link>
	    </Menu.Item>        	
	    <Menu.Item name='Occasion' color='yellow' active={links['occasion'] === location.pathname}>
				<Link to={links['occasion']} >Occasion</Link>
	    </Menu.Item>
	    <Menu.Item name='Voyage' color='orange' active={links['voyage'] === location.pathname}>
				<Link to={links['voyage']} >Voyage</Link>
	    </Menu.Item>       
	  </Menu>
  );
}

export default navBar;