import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FaAngleLeft } from 'react-icons/fa6';
import Loading from '@/components/Loading';
import images from '@/assets/images';
import { register } from '@/redux/authSlice';

function SignUp() {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, email } = inputValues;
    try {
      await dispatch(register({ username, password, email })).unwrap();
      // handle result here
      toast.success('Register Successfully!', {
        autoClose: 1000,
        onClick: () => navigate('/login'),
        onClose: () => navigate('/login'),
      });
    } catch (error) {
      // handle error here
      toast.error('Email or username is already used. Choose another one!');
      navigate('/register');
    }
  };

  return (
    <div className="login-wrapper flex items-center justify-center bg-violet-50 h-screen mx-auto">
      <div className="flex w-full md:max-w-5xl m-8 rounded-lg shadow-lg shadow-violet-200">
        <div className="relative w-1/2 hidden md:block select-none">
          <img
            src={images.registerIllustration}
            alt=""
            className="object-cover h-full object-bottom"
          />
          <img
            src={images.registerIllustrationFront}
            alt=""
            className="absolute left-0 bottom-0 right-0 z-10 h-full object-cover animate-bounce-slow"
          />
        </div>
        {/* Flex Form Container */}
        <form
          className="flex flex-col space-y-8 p-12 bg-white rounded-lg w-full md:w-1/2 md:rounded-l-none md:rounded-r-xl"
          onSubmit={handleRegister}
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
            <h2 className="text-2xl font-semibold text-yellow-900">Hello!</h2>
          </div>
          {/* Input group container */}
          <div className="w-full flex flex-col space-y-2 text-black text-lg">
            <label htmlFor={emailInputId}>Username</label>
            <input
              id={emailInputId}
              type="text"
              className="px-4 py-3 outline-none border-2 border-yellow-400 rounded-lg  placeholder:text-gray-300 focus:border-yellow-600 transition-all duration-150"
              name="username"
              placeholder="Username..."
              value={inputValues.username || ''}
              onChange={(e) => handleInputChange('username', e)}
              required
            />
          </div>
          {/* Input group container */}
          <div className="w-full flex flex-col space-y-2 text-black text-lg">
            <label htmlFor={emailInputId}>Email</label>
            <input
              id={emailInputId}
              type="email"
              className="px-4 py-3 outline-none border-2 border-yellow-400 rounded-lg  placeholder:text-gray-300 focus:border-yellow-600 transition-all duration-150"
              name="email"
              placeholder="Email..."
              value={inputValues.email || ''}
              onChange={(e) => handleInputChange('email', e)}
              required
            />
          </div>
          {/* Input group container */}
          <div className="w-full flex flex-col space-y-2 text-black text-lg">
            <label htmlFor={password}>Password</label>
            <input
              id={password}
              type="text"
              name="password"
              className="px-4 py-3 outline-none border-2 border-yellow-400 rounded-lg  placeholder:text-gray-300 focus:border-yellow-600 transition-all duration-150"
              placeholder="Password..."
              value={inputValues.password || ''}
              onChange={(e) => handleInputChange('password', e)}
              required
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full py-4 bg-yellow-700 text-white text-lg font-medium rounded-lg hover:bg-yellow-600 duration-150"
          >
            {isFetching ? <Loading size={26} /> : <span>Continue</span>}
          </button>

          <div className="flex items-center space-x-1">
            <p>{`Already have account?`}</p>
            <Link
              to={'/login'}
              className="hover:text-violet-600 duration-150 font-semibold hover:underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
