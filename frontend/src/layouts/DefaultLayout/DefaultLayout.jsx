import PropTypes from 'prop-types';

import NavBar from '../components/NavBar';

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

function DefaultLayout({ children }) {
  return (
    <div className="container mx-auto">
      <div className="nav-bar">
        <NavBar />
      </div>
      {children}
    </div>
  );
}

export default DefaultLayout;
