import images from '@/assets/images';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HeaderAccount() {
  const userData = useSelector((state) => state.auth?.currentUser);
  return (
    <Link className="header-account flex items-center rounded-xl space-x-2 duration-150">
      <img
        src={images.avatar}
        alt="Avatar"
        className="h-[32px] w-[32px] rounded-full bg-yellow-600 object-cover object-center"
      />
      <span className="text-black text-xl">
        {userData ? userData.username : 'Unknown Name'}
      </span>
    </Link>
  );
}

export default HeaderAccount;
