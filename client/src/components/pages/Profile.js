import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.auth);

  const renderNameAndPhoto = () => {
    if (user) {
      return (
        <figure className='userInfo'>
          <img src={user.avatar} />
          <figcaption>{user.username}</figcaption>
        </figure>
      );
    } else {
      return null;
    }
  };

  return (
    <div className='profile'>
      <h1>This is your profile</h1>
      {renderNameAndPhoto()}
      <p className='profile__info'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis ab
        neque asperiores deleniti nostrum mollitia quod, odio in perspiciatis ea
        ut molestiae necessitatibus eligendi eveniet accusantium dolore qui! Eum
        neque alias eaque, deserunt vero ratione doloremque quisquam quidem
        obcaecati, nesciunt provident debitis ipsum maiores commodi iste ab non
        placeat.
      </p>
    </div>
  );
};

export default Profile;
