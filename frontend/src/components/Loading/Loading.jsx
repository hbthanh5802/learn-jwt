import PropTypes from 'prop-types';
import './Loading.scss';

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 24,
  color: 'light',
};

function Loading({ size, color }) {
  const styles = {
    width: size,
    height: size,
  };
  return (
    <div className="loader" style={styles} data-color={color}>
      <svg viewBox="0 0 80 80">
        <circle
          stroke={color === 'light' ? 'white' : '#6d28d9'}
          cx="40"
          cy="40"
          r="32"
        ></circle>
      </svg>
    </div>
  );
}

export default Loading;
