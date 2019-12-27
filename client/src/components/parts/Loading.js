import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [load, setLoad] = useState('Loading');

  useEffect(() => {
    const interv = setInterval(() => {
      if (load.length < 10) {
        setLoad(prev => prev + '.');
      } else {
        setLoad('Loading');
      }
    }, 500);
    return () => {
      clearInterval(interv);
    };
  });

  return <span className='loading'>{load}</span>;
};

export default Loading;
