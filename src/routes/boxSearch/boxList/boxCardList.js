//@flow

import type { BoxCollection } from 'modules/actions/types';

import React from 'react';
import BoxCard, {BoxCardPlaceholder} from './boxCard';



export
const BoxCardListPlaceholder = () => {
    const 
        nbOfPlaceholderToDisplay = 5,
        placeholderListComponent = [];
    for(let i = 0; i < nbOfPlaceholderToDisplay; i++){
        placeholderListComponent.push(<BoxCardPlaceholder key={i} />);
    }
    return (
        <div>
            {placeholderListComponent}
        </div>
    );
};


const BoxCardList = ({ boxCollection}: {boxCollection: BoxCollection }) => (
  <div>
    {boxCollection.map((box) =>
        <BoxCard key={box.id}
            name={box.name}
            url={box.url}
            img={box.img}
            subtitle={box.subtitle}
            minPersons={box.min_persons}
            maxPersons={box.max_persons}
            price={box.price}
            webExclusive={box.web_exclusive}
            rating={box.rating}
            showRating={box.show_rating}
            numberOfReviews={box.reviews_count}        
            description={box.description}
        />
    )}
  </div>
);

export default BoxCardList;
