import {matchSorter} from 'match-sorter';

function useFilter(items, value) {
  if (!value) {
    return items;
  }
  return matchSorter(items ? items : [], value, {
    keys: ['author', 'publisher', 'title'],
  });
}

export {useFilter};
