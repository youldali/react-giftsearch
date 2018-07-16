//@flow

import React from 'react'
import { connect } from 'react-redux';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import makeConnectedFilter, { FilterRadio } from './checkboxFilter';
import FilterForPrice from './sliderFilter';
import { Menu, Icon, Button } from 'semantic-ui-react'
import './css/filterContainer.css';
import type { Dispatch, Filters } from 'modules/actions/types';


const FilterRadioButton = makeConnectedFilter(FilterRadio);

type FiltersWrapperProps = {
  filters: Filters,
  resetAllFilters: Function
};
export const
FiltersWrapper = ( props: FiltersWrapperProps) => {
  
  const isOneFilterActive = !!Object.keys(props.filters).length;

  return (
    <div>
      {
        isOneFilterActive &&
        <Button onClick={props.resetAllFilters} color='google plus' >
          <Icon name='delete' /> Supprimer les filtres
        </Button>
      }
      <Menu vertical fluid>
        <Menu.Item>
          <Menu.Header>Budget</Menu.Header>
          <Menu.Menu>
            <Menu.Item>
              <FilterForPrice 
                componentFilters={ {minPrice: undefined, maxPrice: undefined} } 
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>A profiter avec</Menu.Header>
          <Menu.Menu>
            <Menu.Item>
              <FilterRadioButton 
                filterLabel={
                  <label>En solitaire  
                    <span className='filter-option__icon'>
                      <Icon name='user' color='orange' size='large' fitted/>
                    </span>
                  </label> 
                }
                componentFilters={ {forOnePerson: true} }
               />
            </Menu.Item>
            <Menu.Item>
              <FilterRadioButton 
                filterLabel={
                    <label>En couple 
                       <span className='filter-option__icon'>
                          <Icon name='male' fitted color='orange' size='large' />
                          <Icon name='female' fitted color='orange' size='large' />
                        </span>
                      </label>
                }
                componentFilters={ {forCouple: true} } 
              /> 
            </Menu.Item>
            <Menu.Item>
              <FilterRadioButton 
                filterLabel={
                  <label>En groupe 
                    <span className='filter-option__icon'>
                      <Icon name='users' color='orange' size='large' />
                    </span>
                  </label>
                }
                componentFilters={ {forPersonsRange: 3} }
              />
            </Menu.Item>  
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Divers</Menu.Header>
          <Menu.Menu>
            <Menu.Item>
              <FilterRadioButton 
                filterLabel={
                  <label>Les + populaires 
                    <span className='filter-option__icon'>
                      <Icon name='star' color='yellow' size='large' />
                    </span>
                  </label>
                }
                componentFilters={ {mostPopular: true} }
              />
            </Menu.Item>
            <Menu.Item>
              <FilterRadioButton 
                filterLabel={<label>Exclu web 
                    <span className='filter-option__icon'>
                      <Icon.Group size='large'>
                        <Icon name='mail outline' />
                        <Icon corner name='edge' />
                      </Icon.Group>
                    </span>
                  </label>
                }
                componentFilters={ {excluWeb: true} }
              />
            </Menu.Item>            
          </Menu.Menu>
        </Menu.Item>      

      </Menu>
    </div>
  );
};


//Store connection
const mapStateToProps = (state: Object): Object => {
  const filters = selectors.getAllFilters(state);
  return {
    filters
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    resetAllFilters: () => dispatch(actions.resetAllFilters()),
  };
};

export default
connect(mapStateToProps, mapDispatchToProps)(FiltersWrapper);
