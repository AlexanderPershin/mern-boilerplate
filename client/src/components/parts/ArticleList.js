import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import ArticleItem from './ArticleItem';

// Here starting amount - amount of articles loaded by default
// Loadmore - amount of articles loaded by clicking button

const ArticleList = ({
  keyprop,
  startingAmount,
  loadmore,
  selector,
  fetcher,
  moreLoader,
  editable = false
}) => {
  const list = selector;
  const dispatch = useDispatch();

  const [loadMoreTimes, setLoadMoreTimes] = useState(loadmore);

  useEffect(() => {
    fetcher(0, startingAmount, -1);
  }, []);

  const loadMoreItems = () => {
    setLoadMoreTimes(prev => prev + loadmore);

    // const newAmount = startingAmount + loadMoreTimes;

    // fetcher(0, newAmount, -1);
    dispatch(moreLoader(list.length, loadmore));
  };

  const renderArticles = () => {
    return list.map(({ _id, title, body, authorName, _user, ...rest }) => (
      <ArticleItem
        key={_id}
        _id={_id}
        _user={_user}
        title={title}
        body={body}
        editable={editable}
      />
    ));
  };

  return (
    <ol key={keyprop} className='article__list'>
      {list.length > 0 ? renderArticles() : <span>Loading...</span>}
      <li className='article__loadmore' onClick={loadMoreItems}>
        Load More &uarr;
      </li>
    </ol>
  );
};

export default ArticleList;
