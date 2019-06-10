// @flow
import { compose, withState } from 'recompose';

import TipHomeView from './TipHomeView';

const listData = [
    {
        id: 1,
        cuisine: 'American',
        title: 'Applebees',
        subtitle: 'Elizabethton, Tn',
        image:
          'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
    },
    {
        id: 2,
        cuisine: 'Itlian',
        title: 'Pizza Inn',
        subtitle: 'Elizabethton, Tn',
        image:
          'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
    },
  ];

export default compose(  
    withState('data', 'setData', listData)
    )
    (TipHomeView);
