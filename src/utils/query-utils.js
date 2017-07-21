import _ from 'lodash';

const toSortParams = (originSortFromServer, lastToggleSortField) => {
  const newSort = [];
  if (_.isEmpty(originSortFromServer)) {
    // empty sort -> add new element
    const firstSort = `${lastToggleSortField},asc`;
    newSort.push(firstSort);
  } else {
    let found = false;
    _.forEach(originSortFromServer, (sortItem) => {
      const prop = sortItem.property;
      const dir = sortItem.direction;
      let directionRes = '';
      if (lastToggleSortField === prop) {
        // found -> switch to use inputted direction
        found = true;
        if (dir.toLowerCase() === 'asc') {
          directionRes = `${prop},desc`;
        } else {
          directionRes = `${prop},asc`;
        }
      } else {
        // use current direction
        directionRes = `${prop},${dir.toLowerCase()}`;
      }
      newSort.push(directionRes);
    });
    if (!found) {
      // if not found -> add new element
      const firstSort = `${lastToggleSortField},asc`;
      newSort.push(firstSort);
    }
  }
  return newSort;
};

export {
  toSortParams,
};
