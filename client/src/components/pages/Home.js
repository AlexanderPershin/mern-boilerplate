import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { fetchArticles } from '../../actions/index';
// import axios from 'axios';

import ArticleList from '../parts/ArticleList';

const Home = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  return (
    <div className='home'>
      <h1>Wellcome to our website</h1>
      <h2>Latest articles:</h2>
      <ArticleList
        keyprop='home_articles'
        startingAmount={5}
        loadmore={5}
        selector={useSelector(state => state.articles)}
        fetcher={(skip, amount, sort) =>
          dispatch(fetchArticles(skip, amount, sort))
        }
      />
    </div>
  );
};

export default connect()(Home);
