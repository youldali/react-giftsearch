import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './css/navBar.css'

const navBar = (props) => (
  <Menu pointing secondary fluid className='navbar'>
    <Menu.Item name='Gastronomie' color='red' active onClick={this.handleItemClick} />
    <Menu.Item name='Aventure'  onClick={this.handleItemClick} />
    <Menu.Item name='Bien-être'  onClick={this.handleItemClick} />
    <Menu.Item name='Occasion' onClick={this.handleItemClick} />
  </Menu>
)

export default navBar;