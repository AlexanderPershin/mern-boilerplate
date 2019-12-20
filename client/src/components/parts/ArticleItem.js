import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteArticle } from '../../actions/index';

const ArticleItem = ({
  _id,
  title,
  body,
  editable,
  _user,

  ...rest
}) => {
  const bodyLength = 350;
  const dispatch = useDispatch();

  const renderBody = () => {
    // Truncate text to 350 characters and add ellipsis
    return `${body.substring(0, bodyLength)}...`;
  };

  const renderEditLinks = id => {
    return (
      <>
        <Link className='article__edit' to={`/edit/article/${id}`}>
          Edit &#9998;
        </Link>
        <a
          className='article__delete'
          onClick={e => handleDeleteArticle(e, id)}
        >
          Delete &times;
        </a>
      </>
    );
  };

  const handleDeleteArticle = async (e, id) => {
    e.preventDefault();

    dispatch(deleteArticle(id));
  };

  return (
    <li className='article__item'>
      <h3 className='article__title'>{title}</h3>
      <p className='article__body'>{renderBody()}</p>
      <i className='article__author'>--{_user.username}</i>
      <Link className='article__readmore' to={`/article/${_id}`}>
        Read More &rarr;
      </Link>
      {editable && renderEditLinks(_id)}
    </li>
  );
};

export default ArticleItem;
