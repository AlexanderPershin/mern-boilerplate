import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import {
  fetchArticle,
  clearArticle,
  likeArticle,
  dislikeArticle
} from '../../actions/index';

const Article = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(state => state.article);
  const user = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchArticle(id));
    return () => {
      // Clear page from prev info
      dispatch(clearArticle());
    };
  }, [id]);

  const renderDate = date => {
    const renderingDate = new Date(date);
    const month = renderingDate.getMonth() + 1;
    const day = renderingDate.getDate();
    const year = renderingDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const checkLike = () => {
    if (article && article.likes.filter(item => item === user._id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkDislike = () => {
    if (
      article &&
      article.dislikes.filter(item => item === user._id).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeClasses = classnames('article__like', { '-voted': checkLike() });
  const dislikeClasses = classnames('article__dislike', {
    '-voted': checkDislike()
  });

  const renderLikes = likes => {
    return (
      <span onClick={handleLike} className={likeClasses}>
        {likes && likes.length > 0 ? likes.length : 0} &#128077;
      </span>
    );
  };

  const renderDislikes = dislikes => {
    return (
      <span onClick={handleDislike} className={dislikeClasses}>
        {dislikes && dislikes.length > 0 ? dislikes.length : 0} &#128078;
      </span>
    );
  };

  const handleLike = () => {
    dispatch(likeArticle(id, user._id));
  };

  const handleDislike = () => {
    dispatch(dislikeArticle(id, user._id));
  };

  return (
    <div className='article'>
      {article ? (
        <>
          <h1 className='article__title'>{article.title}</h1>
          <p className='article__body'>{article.body}</p>
          <i className='article__author'>--{article._user.username}</i>
          <hr />
          <span className='article__published'>
            published: {renderDate(article.createdAt)}
          </span>
          <span className='article__updated'>
            updated: {renderDate(article.updatedAt)}
          </span>
          <hr />
          <div className='article__voteControls'>
            {renderLikes(article.likes)}
            {renderDislikes(article.dislikes)}
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Article;
