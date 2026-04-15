import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/apiHooks';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();
  useEffect(() => {
    const getUser = async () => {
      try {
        const {user} = await getUserByToken(localStorage.getItem('token'));
        if (user) {
          console.log('useri', user);
          setUser(user);
        }
      } catch (error) {
        console.log('error in profile component ', error);
      }
    };
    getUser();
  }, []);

  if (!user) {
    return <div>Ladataan profiilia..</div>;
  }
  return (
    <>
      <p>Hello {user.username}!</p>
      <p>Email: {user.email}</p>
      <p>Level: {user.level_name}</p>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
