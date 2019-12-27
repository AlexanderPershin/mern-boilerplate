import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticle, clearArticle, setAlert } from '../../actions/index';
import axios from 'axios';

const EditArticle = () => {
  let { id } = useParams();
  let history = useHistory();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const article = useSelector(state => state.article);
  const alerts = useSelector(state => state.alerts);

  useEffect(() => {
    dispatch(fetchArticle(id));

    return () => {
      // Clear page from prev info
      dispatch(clearArticle());
    };
  }, [id]);

  useEffect(() => {
    if (article && article.title && article.body) {
      setTitle(article.title);
      setBody(article.body);
    }
  }, [article]);

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

      const result = await axios.post(`/api/articles/edit/${id}`, newArticle);

      if (!result) {
        // TODO: set error alert here
        dispatch(setAlert(`Error editing article ${article.title}`, 'danger'));
      } else {
        dispatch(
          setAlert(`You are successfuly edited ${article.title}`, 'success')
        );
      }

      history.push('/dashboard');
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
      <h2>Edit Article</h2>
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
        <button type='submit'>Confirm Changes</button>
      </form>
    </div>
  );
};

export default EditArticle;
