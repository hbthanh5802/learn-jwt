import HomeAccountItem from '@/components/Account/HomeAccountItem';
import { getAllUsers } from '@/redux/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const users = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(currentUser?.meta?.accessToken))
      .unwrap()
      .then(() => {
        console.log('Oke');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, [dispatch, currentUser]);

  return (
    <div className="w-full">
      {/* User list container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {/* User item container */}
        {users?.map((user, index) => (
          <HomeAccountItem key={index} data={user} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
