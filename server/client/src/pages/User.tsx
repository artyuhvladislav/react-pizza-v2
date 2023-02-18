import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserFileImg, UserInfoField } from '../components';
import { authSelector } from '../redux/auth/selectors';
import { saveUserInfo } from '../redux/userInfo/slice';
import { userInfoSelector } from './../redux/userInfo/selectors';

const User = () => {
  const { email, logged } = useSelector(authSelector);
  const userInfo = useSelector(userInfoSelector);
  const [userData, setUserData] = React.useState(userInfo);
  const dispatch = useDispatch();
  console.log(userData);
  const handleSaveUserInfo = () => {
    dispatch(saveUserInfo(userData));
  };

  const handleInput = (e: any) => {
    const name = e.target.value;
    setUserData({ ...userData, name });
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
            {/* <p className="cabinet__info_text">name</p>
            <input
              className="cabinet__info_input"
              type="text"
              value={userData.name}
              onChange={(e) => handleInput(e)}
            /> */}

            {/* <p className="cabinet__info_text">surname: </p>
            <input
              className="cabinet__info_input"
              type="text"
              name="surname"
              placeholder="enter surname"
              // onChange={handleInputs}
              value={userInfo.surname}
            /> */}
            <p className="cabinet__info_text">address: </p>
            <input
              className="cabinet__info_input"
              type="text"
              name="address"
              placeholder="enter address"
            />
            <p className="cabinet__info_text">avatar: </p>
            <UserFileImg />
            <button onClick={handleSaveUserInfo}>save data</button>
          </div>
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
