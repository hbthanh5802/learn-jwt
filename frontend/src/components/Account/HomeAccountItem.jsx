import PropTypes from 'prop-types';

import randomNumber from '@/utils/randomNumber';

HomeAccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

HomeAccountItem.defaultProps = {
  data: {},
};

function HomeAccountItem(props) {
  const { data } = props;
  return (
    <div className="flex justify-between bg-white shadow-lg rounded-lg p-4 space-x-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <img
          src={`https://avatar.iran.liara.run/public/${randomNumber(1, 100)}`}
          alt=""
          className="h-[40px] w-[40px] object-cover object-center rounded-full"
        />

        <div className="flex flex-col justify-start items-start text-gray-900">
          <h3 className="text-lg font-medium">{data?.username}</h3>
          <h4 className="text-sm text-gray-600">{data?.email}</h4>
        </div>
      </div>
      {/* Button container */}
      <div className="flex flex-col space-y-3">
        <button className="px-2 py-1 text-white bg-red-500 text-center rounded-lg shadow hover:bg-red-600 duration-150">
          Delete
        </button>
      </div>
    </div>
  );
}

export default HomeAccountItem;
