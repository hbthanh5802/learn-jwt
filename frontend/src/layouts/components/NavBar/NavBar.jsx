import { NavLink } from 'react-router-dom';
import images from '@/assets/images';
import { useSelector } from 'react-redux';
import HeaderAccount from '@/components/Account/HeaderAccount';

function NavBar() {
  const userData = useSelector((state) => state.auth?.currentUser?.data);

  return (
    <nav className="w-full flex items-center justify-between mx-auto py-6 my-4 space-x-16">
      <div className="nav-logo">
        <img src={images.logo} alt="Bookmark Logo" className="h-8" />
      </div>

      {userData ? (
        <HeaderAccount />
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
