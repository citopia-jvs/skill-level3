import { Route, Routes } from 'react-router-dom';
import Home from './pages/Homepage/Home';
import About from './pages/About/About';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/informations' element={<About />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
