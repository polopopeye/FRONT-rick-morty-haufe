import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import Details from './components/details/Details';
import { Home } from './components/home';
import LogOut from './components/home/LogOut';
import Layout from './components/layout/Layout';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import PageNotFound from './views/404/PageNotFound';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider authType="cookie" authName={'token'}>
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
            <Route path="/logout" element={<LogOut />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/character/:id"
              element={
                <RequireAuth loginPath="/login">
                  <Details />
                </RequireAuth>
              }
            />
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
