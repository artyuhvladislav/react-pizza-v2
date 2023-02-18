import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserInfoField } from '../components';
import { authSelector } from '../redux/auth/selectors';
import { saveUserInfo } from '../redux/userInfo/slice';
import { userInfoSelector } from './../redux/userInfo/selectors';

const User = () => {
  const { email, logged } = useSelector(authSelector);
  const userInfo = useSelector(userInfoSelector);
  const [userData, setUserData] = React.useState(userInfo);
  const dispatch = useDispatch();

  const handleSaveUserInfo = () => {
    console.log({ userData });
    dispatch(saveUserInfo(userData));
  };
  return (
    <>
      {logged ? (
        <div className="cabinet">
          <h2 className="cabinet__title">
            <span>{email}</span> user's cabinet
          </h2>
          <div className="cabinet__info">
            <h3 className="cabinet__info_title">user info</h3>
            <UserInfoField fieldName="name" value={userInfo.name} setUserData={setUserData} />
            <UserInfoField fieldName="surname" value={userInfo.surname} setUserData={setUserData} />
            <UserInfoField fieldName="address" value={userInfo.address} setUserData={setUserData} />
            <UserInfoField fieldName="number" value={userInfo.number} setUserData={setUserData} />
            <br />
            <button className="button button--outline" onClick={handleSaveUserInfo}>
              save data
            </button>
          </div>
          <br />
          <Link to="/" className="button button--outline go-back-btn">
            <span>go back</span>
          </Link>
        </div>
      ) : (
        <div className="container">
          <h3>You are not logged in click button to sign in</h3>
          <Link to="/auth">
            <button className="button">sign in</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default User;
