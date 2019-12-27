import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser, getProfile } from './actions';

// Layout. Contains header, content and footer
import Layout from './components/hoc/Layout';
// Actual pages components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Article from './components/pages/Article';
import NewArticle from './components/pages/NewArticle';
import EditArticle from './components/pages/EditArticle';
import Profile from './components/pages/Profile';
import ProfilesList from './components/pages/ProfilesList';
// Private route hoc
import PrivateRoute from './components/hoc/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in and write to redux store
    dispatch(fetchUser());
    dispatch(getProfile());
  }, []);

  return (
    <BrowserRouter>
      <div className='app'>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/article/:id' component={Article} />
            <PrivateRoute exact path='/new/article/' component={NewArticle} />
            <PrivateRoute
              exact
              path='/edit/article/:id'
              component={EditArticle}
            />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route exact path='/profiles' component={ProfilesList} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
