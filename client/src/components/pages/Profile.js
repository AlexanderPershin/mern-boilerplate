import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { deleteProfile, updateProfile } from '../../actions';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
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

  useEffect(() => {
    // update profile
    if (profile) {
      const { company, website, location, bio, social } = profile;
      setProfileData(prev => ({
        company,
        website,
        location,
        bio
      }));
      setSicialData(social);
    }
  }, [profile]);

  const renderNameAndPhoto = () => {
    if (user) {
      const { username, avatar } = user;

      return (
        <figure className='userInfo'>
          <img src={avatar} />
          <figcaption>{username}</figcaption>
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

    dispatch(updateProfile(profileData, socialData));
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
    dispatch(deleteProfile());
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

      <button className='profile__deleteAccount' onClick={handleDeleteAccount}>
        Delete My Account
      </button>
    </div>
  );
};

export default Profile;
