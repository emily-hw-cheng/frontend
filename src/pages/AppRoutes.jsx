import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
