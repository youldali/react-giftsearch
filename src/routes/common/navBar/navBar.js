import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './css/navBar.css'

const navBar = (props) => (
  <Menu pointing secondary fluid className='navbar'>
    <Menu.Item name='Gastronomie' color='red' active > 
    	<Link to="/gastronomy">Gastronomie</Link>
    </Menu.Item>
    <Menu.Item name='Aventure' color='yellow' >
			<Link to="/adventure">Aventure</Link>
    </Menu.Item>    
    <Menu.Item name='Bien-être' >
			<Link to="/well-being">Bien-être</Link>
    </Menu.Item>        	
    <Menu.Item name='Occasion' >
			<Link to="/occasion">Occasion</Link>
    </Menu.Item>        	
  </Menu>
)

export default navBar;