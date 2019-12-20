import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
  const user = useSelector(state => state.auth);
  const [profileData, setProfileData] = useState({
    company: '',
    website: '',
    location: '',
    bio: ''
  });

  const [socialData, setSicialData] = useState({
    youtube: '',
    twitter: '',
    facebook: '',
    linkeding: '',
    instagram: ''
  });

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

  const handleEditField = e => {
    const ev = e;
    const newProfileData = {
      ...profileData,
      [ev.target.name]: ev.target.value
    };

    setProfileData(newProfileData);
  };

  const handleEditSocial = e => {
    const ev = e;
    const newSocialData = {
      ...socialData,
      [ev.target.name]: ev.target.value
    };

    setSicialData(newSocialData);
  };

  const handlePostProfile = async e => {
    e.preventDefault();

    // TODO: make an action creator for updating profile
    // and deleting account

    const response = await axios.post('/api/profiles/current', {
      ...profileData,
      socials: { ...socialData }
    });

    // TODO: Clear form
  };

  const renderFormFields = () => {
    let fieldsArray = [];
    for (let item in profileData) {
      fieldsArray.push(
        <input
          className='profile__field'
          key={item}
          type='text'
          name={item}
          placeholder={`${item}`}
          value={profileData[item]}
          onChange={handleEditField}
        />
      );
    }
    return fieldsArray;
  };

  const renderSocialFields = () => {
    let fieldsArray = [];
    for (let item in socialData) {
      fieldsArray.push(
        <input
          className='profile__social'
          key={item}
          type='text'
          name={item}
          placeholder={`${item}`}
          value={socialData[item]}
          onChange={handleEditSocial}
        />
      );
    }
    return fieldsArray;
  };

  const handleDeleteAccount = async () => {
    const result = await axios.delete('/api/profiles');

    if (result) {
      console.log(result);

      console.log('Account deleted');
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
      <form className='profile__form' onSubmit={handlePostProfile}>
        {renderFormFields()}
        {renderSocialFields()}
        <button type='submit'>Confirm</button>
      </form>

      <button onClick={handleDeleteAccount}>Delete My Account</button>
    </div>
  );
};

export default Profile;
