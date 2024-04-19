import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';

HistoryRouter.propTypes = {
  basename: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.any,
};

function HistoryRouter({ basename, children, history }) {
  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
