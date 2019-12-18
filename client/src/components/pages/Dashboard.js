import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentArticles } from '../../actions/index';

import ArticleList from '../parts/ArticleList';

// For testing puposes use from browser console
// using global objec window
// axios.post('/api/articles', {title: "Test", body: "Lorem ipsum"});
// window.axios = axios;

const Dashboard = () => {
  // This component should be avalable only for registered and logged users
  const articles = useSelector(state => state.currentArticles);
  const dispatch = useDispatch();

  return (
    <div className='dashboard'>
      <h1>This is your dashboard</h1>
      <ul className='dashboard__actions'>
        <li className='dashboard__action'>
          <Link to='/new/article'>New Article</Link>
        </li>
        <li className='dashboard__action'>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>

      <h2>Your articles:</h2>
      <ArticleList
        editable={true}
        keyprop='current_articles'
        startingAmount={2}
        loadmore={2}
        selector={useSelector(state => state.currentArticles)}
        fetcher={(skip, amount, sort) =>
          dispatch(fetchCurrentArticles(skip, amount, sort))
        }
      />
    </div>
  );
};

export default Dashboard;
