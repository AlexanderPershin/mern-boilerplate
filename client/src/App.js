import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from './actions';

// Layout. Contains header content and footer
import Layout from './components/hoc/Layout';
// Actual pages components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in and write to redux store
    dispatch(fetchUser());
  }, []);

  return (
    <BrowserRouter>
      <div className='app'>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
