import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import Header from './components/Header/Header';
import 'react-loading-skeleton/dist/skeleton.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <AppRouter />
      </main>
    </Router>
  );
};

export default App;
