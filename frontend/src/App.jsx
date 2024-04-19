import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import { publicRoutes } from '@/routes';
import { Fragment } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from './components/ToastMessage';

function App() {
  return (
    <BrowserRouter>
      <ToastMessage>
        <div className="App min-h-screen">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </ToastMessage>
    </BrowserRouter>
  );
}

export default App;
