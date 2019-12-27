import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../parts/Loading';

import { getProfiles } from '../../actions';

import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(state => state.profiles);

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const renderProfiles = () => {
    if (profiles && profiles.length > 0) {
      return profiles.map(item => <ProfileItem key={item._id} {...item} />);
    } else {
      return <Loading />;
    }
  };

  return <div className='profilesList'>{renderProfiles()}</div>;
};

export default Profiles;
