import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { setupAxios } from './api/axiosAuth.js';
import HistoryRouter from '@/utils/History';
import { myHistory } from '@/utils/History/history.js';
import './index.css';

setupAxios(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <HistoryRouter history={myHistory}>
        <App />
      </HistoryRouter>
    </PersistGate>
  </Provider>
);
