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
  fetcher
}) => {
  const list = selector;

  const [loadMoreTimes, setLoadMoreTimes] = useState(loadmore);

  useEffect(() => {
    fetcher(0, startingAmount, -1);
  }, []);

  const loadMoreItems = () => {
    setLoadMoreTimes(prev => prev + loadmore);

    const newAmount = startingAmount + loadMoreTimes;

    fetcher(0, newAmount, -1);
  };

  const renderArticles = () => {
    return list.map(({ _id, title, body, authorName }) => (
      <ArticleItem
        key={_id}
        _id={_id}
        title={title}
        body={body}
        authorName={authorName}
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
