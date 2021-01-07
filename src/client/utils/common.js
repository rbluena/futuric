import Router from 'next/router';
import { findIndex } from 'lodash';

export const redirectTo = (location, res) => {
  if (process.browser) {
    if (location.match(/^(http|https):\/\//)) {
      window.location.href = location;
    } else {
      Router.push(location);
    }
  } else {
    res.writeHead(303, { Location: location });
    res.end();
  }
};

/**
 * Merging new item inside an array.-bottom-0
 *
 * Redux is using immer which enforce immutability, therefore here
 * is where we update old data with new ones.
 *
 * @param {Array} oldData Old data which new item should be merged into or removed from
 * @param {Object} newData New item to be added or removed
 * @param {Boolean} shouldBeRemoved True item should be removed completely instead of being replaced
 */
export const mergeUpdatedItem = (
  oldData = [],
  newData,
  shouldBeRemoved = false
) => {
  const data = [...oldData];

  const dataIndex = findIndex(oldData, (item) => item._id === newData._id);

  if (shouldBeRemoved) {
    data.splice(dataIndex, 1);
  } else {
    data.splice(dataIndex, 1, newData);
  }
  return data;
};
