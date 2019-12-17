import React, { useState } from 'react';
import axios from 'axios';

// For testing puposes use from browser console
// using global objec window
// axios.post('/api/articles', {title: "Test", body: "Lorem ipsum"});
window.axios = axios;

const Dashboard = () => {
  // This component should be avalable only for registered and logged users

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newArticle = {
      title,
      body
    };

    setTitle('');
    setBody('');

    const result = await axios.post('/api/articles', newArticle);
    const { msg } = result.data;

    alert(msg);
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleBody = e => {
    setBody(e.target.value);
  };

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <h2>Create New Article</h2>
      <form className='articleForm' onSubmit={handleSubmit}>
        <input
          placeholder='Enter article title'
          type='text'
          name='title'
          value={title}
          onChange={handleTitle}
        />
        <textarea
          placeholder='Enter article body'
          name='body'
          cols='30'
          rows='10'
          value={body}
          onChange={handleBody}
        ></textarea>
        <button type='submit'>Publish Article</button>
      </form>
    </div>
  );
};

export default Dashboard;
