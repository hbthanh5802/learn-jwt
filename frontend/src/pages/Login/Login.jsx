import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FaAngleLeft } from 'react-icons/fa6';
import Loading from '@/components/Loading';
import images from '@/assets/images';
import { login } from '@/redux/authSlice';

function Login() {
  const emailInputId = useId();
  const password = useId();
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const navigate = useNavigate();
  // const message = useSelector((state) => state.auth.message);

  const handleInputChange = (field, event) => {
    setInputValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = inputValues;
    try {
      await dispatch(login({ username, password })).unwrap();
      // handle result here
      toast.success('Login Successfully!', {
        autoClose: 1000,
        onClick: () => navigate('/'),
        onClose: () => navigate('/'),
      });
    } catch (error) {
      // handle error here
      toast.error('Username or Password is incorrect!');
      navigate('/login');
    }
  };

  return (
    <div className="login-wrapper flex items-center justify-center bg-violet-50 h-screen mx-auto">
      <div className="flex w-full md:max-w-5xl m-8 rounded-lg shadow-lg shadow-violet-200">
        <div className="relative w-1/2 hidden md:block select-none">
          <img
            src={images.loginIllustration}
            alt=""
            className="object-cover h-full object-bottom"
          />
          <img
            src={images.loginIllustrationFront}
            alt=""
            className="absolute left-0 bottom-0 right-0 z-10 h-full object-cover animate-bounce-slow"
          />
        </div>
        {/* Flex Form Container */}
        <form
          className="flex flex-col space-y-8 p-12 bg-white rounded-lg w-full md:w-1/2 md:rounded-l-none md:rounded-r-xl"
          onSubmit={handleLogin}
        >
          {/* Header form container */}
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <Link
              to={'/'}
              className="flex items-center space-x-2 text-lg hover:text-violet-700 duration-150"
            >
              <FaAngleLeft />
              <span>Back</span>
            </Link>
            <h2 className="text-2xl font-semibold text-violet-950">
              Welcome back!
            </h2>
          </div>
          {/* Input group container */}
          <div className="w-full flex flex-col space-y-2 text-black text-lg">
            <label htmlFor={emailInputId}>Username</label>
            <input
              id={emailInputId}
              type="text"
              className="px-4 py-3 outline-none border-2 border-violet-300 rounded-lg  placeholder:text-gray-300 focus:border-violet-600 transition-all duration-150"
              name="username"
              placeholder="Username..."
              value={inputValues.username || ''}
              onChange={(e) => handleInputChange('username', e)}
            />
          </div>
          {/* Input group container */}
          <div className="w-full flex flex-col space-y-2 text-black text-lg">
            <label htmlFor={password}>Password</label>
            <input
              id={password}
              type="text"
              name="password"
              className="px-4 py-3 outline-none border-2 border-violet-300 rounded-lg  placeholder:text-gray-300 focus:border-violet-600 transition-all duration-150"
              placeholder="Password..."
              value={inputValues.password || ''}
              onChange={(e) => handleInputChange('password', e)}
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full py-4 bg-violet-700 text-white text-lg font-medium rounded-lg hover:bg-violet-500 duration-150"
          >
            {isFetching ? <Loading size={26} /> : <span>Login</span>}
          </button>

          <div className="flex items-center space-x-1">
            <p>{`Don't have account?`}</p>
            <Link
              to={'/register'}
              className="hover:text-orange-600 duration-150 font-semibold hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
