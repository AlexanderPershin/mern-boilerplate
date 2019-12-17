import React from 'react';
import { Link } from 'react-router-dom';

const ArticleItem = ({ _id, title, body, authorName }) => {
  const bodyLength = 350;

  const renderBody = () => {
    // Truncate text to 350 characters and add ellipsis
    return `${body.substring(0, bodyLength)}...`;
  };

  return (
    <li className='article__item'>
      <h3 className='article__title'>{title}</h3>
      <p className='article__body'>{renderBody()}</p>
      <i className='article__author'>--{authorName}</i>
      <Link className='article__readmore' to={`/article/${_id}`}>
        Read More &rarr;
      </Link>
    </li>
  );
};

export default ArticleItem;
