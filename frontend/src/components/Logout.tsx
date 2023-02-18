import AuthService from '../services';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/slice';

const LogOut = () => {
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      await AuthService.logout();
      dispatch(logout());
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  return (
    <button className="button button--auth" onClick={logOutHandler}>
      log out
    </button>
  );
};

export default LogOut;
