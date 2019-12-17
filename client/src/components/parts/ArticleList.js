import React, { useEffect } from 'react';

import ArticleItem from './ArticleItem';

const ArticleList = ({ articles }) => {
  const renderArticles = () => {
    return articles.map(({ _id, title, body, authorName }) => (
      <ArticleItem
        key={_id}
        _id={_id}
        title={title}
        body={body}
        authorName={authorName}
      />
    ));
  };

  return (
    <ol className='article__list'>
      {articles.length > 0 ? renderArticles() : <span>Loading...</span>}
    </ol>
  );
};

export default ArticleList;
