import _ from 'lodash';

export const sort = (items, term, order) => {
//   console.log(items);
//   console.log(term)
//   console.log(order)
  return _.orderBy(items, term, order);
};
