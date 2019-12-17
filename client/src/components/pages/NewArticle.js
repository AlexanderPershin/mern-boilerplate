import React, { useState } from 'react';
import axios from 'axios';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (title === '' || body === '') {
      alert('You must enter title and body of your article!');
      return;
    } else {
      const newArticle = {
        title,
        body
      };

      setTitle('');
      setBody('');

      const result = await axios.post('/api/articles', newArticle);
      const { msg } = result.data;

      alert(msg);
    }
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleBody = e => {
    setBody(e.target.value);
  };

  return (
    <div className='newArticle'>
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

export default NewArticle;
