import HomeAccountItem from '@/components/Account/HomeAccountItem';
import Loading from '@/components/Loading';
import { getAllUsers } from '@/redux/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePage() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const users = useSelector((state) => state.user.allUsers);
  const fetching = useSelector((state) => state.user.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      token: accessToken,
    };
    dispatch(getAllUsers(params))
      .unwrap()
      .then(() => {})
      .catch(() => {
        toast.error('Failed to get all users', { autoClose: 500 });
        toast.info('You will need to login. Redirecting...', {
          delay: 1000,
          autoClose: 1000,
          onClose: () => navigate('/login', { replace: true }),
        });
      });
  }, [dispatch, accessToken, navigate]);

  return (
    <div className="w-full flex justify-center">
      {fetching ? (
        <Loading size={32} color="dark" />
      ) : users?.length === 0 ? (
        <p>No accounts found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {users?.map((user, index) => (
            <HomeAccountItem key={index} data={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
