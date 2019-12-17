import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { fetchArticles } from '../../actions/index';

import ArticleList from '../parts/ArticleList';

const Home = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(0, 5));
  }, []);

  return (
    <div className='home'>
      <h1>Wellcome to our website</h1>
      <h2>Latest articles:</h2>
      <ArticleList articles={articles} />
    </div>
  );
};

export default connect()(Home);
