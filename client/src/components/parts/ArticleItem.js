import React from 'react';
import { Link } from 'react-router-dom';

const ArticleItem = ({ _id, title, body, authorName }) => {
  return (
    <li className='article__item'>
      <h3>{title}</h3>
      <p>{body}</p>
      <i>{authorName}</i>
      <Link to={`/article/${_id}`}>Read more...</Link>
    </li>
  );
};

export default ArticleItem;
