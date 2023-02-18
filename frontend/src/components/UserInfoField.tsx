import React from 'react';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../redux/userInfo/selectors';

interface UserInfoFiledProps {
  value: string;
  fieldName: string;
  setUserData: any;
}

export const UserInfoField = ({ value, fieldName, setUserData }: UserInfoFiledProps) => {
  const [inputValue, setInputValue] = React.useState(value);
  const userInfo = useSelector(userInfoSelector);

  const handleInput = (e: any) => {
    const name = e.target.value;
    setInputValue(name);
    setUserData({ ...userInfo, name });
  };

  // React.useEffect(() => {
  //   const handleClickOutside = (e: any) => {
  //     if (inputRef.current && !inputRef.current.contains(e.target)) {
  //       console.log('click outside');
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, []);

  return (
    <>
      <p className="cabinet__info_text">{fieldName}</p>

      <input
        className="cabinet__info_input"
        type="text"
        value={inputValue}
        onChange={(e) => handleInput(e)}
      />
    </>
  );
};
