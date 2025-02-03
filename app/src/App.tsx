import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import Header from './components/Header/Header';

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
