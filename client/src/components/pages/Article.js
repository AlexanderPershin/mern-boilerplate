import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
    return `${month}/${day}/${year}`;
  };

  // const renderLikes = likes => {
  //   if (likes.length > 0) {
  //     return <span>{likes.length} people liked this article</span>;
  //   } else {
  //     return null;
  //   }
  // };

  const handleLike = () => {
    dispatch(likeArticle(id));
  };

  const handleUnlike = () => {
    dispatch(dislikeArticle(id));
  };

  return (
    <div className='article'>
      {article ? (
        <>
          <h1>{article.title}</h1>
          <p>{article.body}</p>
          <i>{article.authorName}</i>
          <hr />
          <span>published: {renderDate(article.createdAt)}</span>
          <br />
          {renderDate(article.createdAt) ===
          renderDate(article.updatedAt) ? null : (
            <span>edited: {renderDate(article.updatedAt)}</span>
          )}
          <hr />
          <button onClick={handleLike}>Like</button>
          <button onClick={handleUnlike}>Dislike</button>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Article;
