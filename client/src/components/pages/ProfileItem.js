import React from 'react';

const ProfileItem = ({ user: { username, avatar } }) => {
  return (
    <figure className='profilesList__item'>
      <img src={avatar} />
      <figcaption>{username}</figcaption>
    </figure>
  );
};

export default ProfileItem;
