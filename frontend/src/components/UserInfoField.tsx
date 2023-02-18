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
    const value = e.target.value;
    setInputValue(value);
    setUserData((prevState: any) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <>
      <p className="cabinet__info_text">{fieldName}</p>

      <input
        className="cabinet__info_input"
        type={fieldName === 'number' ? 'number' : 'text'}
        value={inputValue}
        onChange={(e) => handleInput(e)}
        onBlur={(e) => handleInput(e)}
      />
    </>
  );
};
