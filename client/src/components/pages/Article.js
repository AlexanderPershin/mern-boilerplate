import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import {
  fetchArticle,
  clearArticle,
  likeArticle,
  dislikeArticle,
  commentArticle,
  deleteCommentArticle
} from '../../actions/index';

import Loading from '../parts/Loading';

const Article = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(state => state.article);
  const user = useSelector(state => state.auth);

  const [comment, setComment] = useState('');

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
    if (
      user &&
      article &&
      article.likes.filter(item => item === user._id).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkDislike = () => {
    if (
      user &&
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

  const handleDeleteComment = (id, comment_id) => {
    dispatch(deleteCommentArticle(id, comment_id));
  };

  const renderComments = comments => {
    if (comments && comments.length > 0) {
      return comments.map(item => (
        <div key={item._id}>
          <p>{item.body}</p>
          <i>{item.user.username}</i>
          <span>{item.date}</span>
          {item.user._id === user._id ? (
            <button onClick={e => handleDeleteComment(id, item._id)}>
              Delete
            </button>
          ) : null}
        </div>
      ));
    }
  };

  const handleLike = () => {
    dispatch(likeArticle(id, user._id));
  };

  const handleDislike = () => {
    dispatch(dislikeArticle(id, user._id));
  };

  const handleComment = e => {
    setComment(e.target.value);
  };

  const handleAddComment = e => {
    e.preventDefault();
    if (comment) {
      dispatch(commentArticle(id, user, comment));
      setComment('');
    } else {
      return;
    }
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
          <div>{renderComments(article.comments)}</div>
          {user && (
            <form onSubmit={handleAddComment} className='article__commentForm'>
              <h2>Add a comment</h2>
              <textarea
                name='message_body'
                id='message_body'
                cols='30'
                rows='10'
                placeholder='Enter your comment'
                value={comment}
                onChange={handleComment}
              ></textarea>
              <button type='submit'>Send</button>
            </form>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Article;
