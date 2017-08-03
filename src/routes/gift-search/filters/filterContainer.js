import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Filter from './filter';

const FiltersContainer = (props) => (
  <Menu vertical fixed='left'>
    <Menu.Item>
      <Menu.Header>Products</Menu.Header>

      <Menu.Menu>
        <Menu.Item name='enterprise' />
        <Menu.Item name='consumer'/>
          <Menu.Item name='shared' ><Filter filterLabel='Prix max' filterName='maxPrice' filterForValue={60} /></Menu.Item>
          <Menu.Item name='shared' ><Filter filterLabel='Solo' filterName='forPersonsRange' filterForValue={1} /></Menu.Item>
          <Menu.Item name='shared' ><Filter filterLabel='Couple' filterName='forPersons' filterForValue={2} /> </Menu.Item>              
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>CMS Solutions</Menu.Header>

      <Menu.Menu>
        <Menu.Item name='rails' />
        <Menu.Item name='python' />
        <Menu.Item name='php' />
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Hosting</Menu.Header>

      <Menu.Menu>
        <Menu.Item name='shared' />
        <Menu.Item name='dedicated' />
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Support</Menu.Header>

      <Menu.Menu>
        <Menu.Item name='email' >
          E-mail Support
        </Menu.Item>

        <Menu.Item name='faq' >
          FAQs
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

export default FiltersContainer;
  
