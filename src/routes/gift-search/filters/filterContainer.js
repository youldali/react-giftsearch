import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

import MakeConnectedFilter, { FilterPriceRange, FilterRadio } from './filter';
import './css/filterContainer.css';


const FiltersContainer = (props) => {

  const FilterForPrice = MakeConnectedFilter(FilterPriceRange);
  const FilterForSolo = MakeConnectedFilter(FilterRadio);
  const FilterForCouple = MakeConnectedFilter(FilterRadio);
  const FilterForGroup = MakeConnectedFilter(FilterRadio);

  return (
    <Menu vertical fluid>
      <Menu.Item>
        <Menu.Header>Budget</Menu.Header>
        <Menu.Menu>
          <Menu.Item>
            <FilterForPrice filterLabel='Prix max' maxValue={500} />
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>A profiter avec</Menu.Header>
        <Menu.Menu>
          <Menu.Item>
            <FilterForSolo 
              filterLabel={<label>En solitaire  <span className='filter-option__icon'><Icon name='user' color='orange' size='large' fitted/></span> </label> }
              filterName='forPersonsRange'
              filterForValue={1}
             />
          </Menu.Item>
          <Menu.Item>
            <FilterForCouple 
              filterLabel={<label>En couple <span className='filter-option__icon'><Icon name='male' fitted color='orange' size='large' /><Icon name='female' fitted color='orange' size='large' /></span></label>}
              filterName='forPersons' 
              filterForValue={2} 
            /> 
          </Menu.Item>
          <Menu.Item>
            <FilterForGroup 
              filterLabel={<label>En groupe <span className='filter-option__icon'><Icon name='users' color='orange' size='large' /></span></label>}
              filterName='forPersonsRange'
              filterForValue={3} 
            />
          </Menu.Item>  
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default FiltersContainer;
  
   
