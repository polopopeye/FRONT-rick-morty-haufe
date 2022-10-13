import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import { Home } from './components/home';
import Layout from './components/layout/Layout';
import { Login } from './components/login/login';
import PageNotFound from './views/404/PageNotFound';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider authType="cookie" authName={'_token'}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth loginPath="/login">
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer
            position="top-center"
            rtl={false}
            newestOnTop={false}
          />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}

export default App;
