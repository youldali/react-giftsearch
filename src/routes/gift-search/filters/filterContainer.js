import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

import {MakeFilter, FilterRangeSlider, FilterRadio} from './filter';
import './css/filterContainer.css';


const FiltersContainer = (props) => (
  <Menu vertical floated='right'>
    <Menu.Item>
      <Menu.Header>Budget</Menu.Header>
      <Menu.Menu>
          <Menu.Item><Filter filterLabel='Prix max' filterName='maxPrice' filterForValue={60} /></Menu.Item>
          <Menu.Item>
            <Filter filterLabel='Prix max' filterName='maxPrice' maxValue={500} filterForValue={60} />
          </Menu.Item>
          <InputRange
            maxValue={500}
            minValue={0}
            value={50}
            />
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>A profiter avec</Menu.Header>
      <Menu.Menu>
        <Menu.Item>
          <Filter filterLabel='En solitaire' filterName='forPersonsRange' filterForValue={1} />
          <span className='filter-option__icon'><Icon name='user' color='orange' size='large' fitted/></span>
        </Menu.Item>
        <Menu.Item>
          <Filter filterLabel='En couple' filterName='forPersons' filterForValue={2} />
          <span className='filter-option__icon'><Icon name='male' fitted color='orange' size='large' /><Icon name='female' fitted color='orange' size='large' /></span>
        </Menu.Item>
        <Menu.Item>
          <Filter filterLabel='En groupe' filterName='forPersonsRange' filterForValue={3} />
          <span className='filter-option__icon'><Icon name='users' color='orange' size='large' /></span>
        </Menu.Item>  
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

export default FiltersContainer;
  
   
