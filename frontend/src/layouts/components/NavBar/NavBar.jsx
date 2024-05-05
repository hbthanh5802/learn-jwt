import { NavLink, useNavigate } from 'react-router-dom';
import images from '@/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAccount from '@/components/Account/HeaderAccount';
import Loading from '@/components/Loading';
import { logout } from '@/redux/authSlice';
import { toast } from 'react-toastify';

function NavBar() {
  const userData = useSelector((state) => state.auth?.currentUser);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success('Logout successfully!', {
          autoClose: 500,
          onClose: () =>
            navigate('/login', {
              replace: true,
            }),
        });
      })
      .catch((err) => {
        console.log('Failed logout', err);
      });
  };

  return (
    <nav className="w-full flex items-center justify-between mx-auto py-6 my-4 space-x-16">
      <div className="nav-logo">
        <img src={images.logo} alt="Bookmark Logo" className="h-8" />
      </div>

      {userData ? (
        <div className="flex space-x-4">
          <HeaderAccount />
          <button
            className="flex items-center justify-center text-center text-black px-4 py-2 hover:text-white hover:bg-violet-400 rounded-lg duration-150"
            onClick={handleLogout}
          >
            {isFetching ? <Loading /> : 'Logout'}
          </button>
        </div>
      ) : (
        <div className="nav-items flex items-center space-x-6">
          <NavLink to={'/register'} className={'text-lg'}>
            Sign Up
          </NavLink>
          <NavLink
            to={'/login'}
            className="px-6 py-2 text-center text-white text-lg bg-violet-500 rounded-lg hover:bg-violet-600 transition-all duration-150"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
