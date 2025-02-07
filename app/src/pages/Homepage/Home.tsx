import { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Skeleton from 'react-loading-skeleton';
import { fetchDataRequest } from '../../redux/slices/dataSlice';
import { Link } from 'react-router-dom';
import { calculateDaysUntilBirthday } from '../../utils';

function App() {
  const dispatch = useDispatch();
  const dummyData = useSelector((state: RootState) => state.dummyData);
  const userValues = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const daysUtilBirthday = calculateDaysUntilBirthday(new Date(userValues.dateNaissance || ''));

  if (!dummyData) {
    return <div data-testid='loading'>Chargement...</div>;
  }

  if (dummyData.error) {
    return <h1 data-testid='error'>Une erreur est survenue</h1>;
  }

  return (
    <>
      <h1 className='welcome-title' data-testid='welcome-title'>
        Welcome Home
      </h1>
      {dummyData.loading ? (
        <Skeleton duration={2} height={200} width={500} borderRadius={10} />
      ) : (
        <img className='welcome-img' src={dummyData.url} height={200} width={400} alt='Bienvenue' data-testid='welcome-img' />
      )}
      <h2>👋</h2>
      <br />
      {userValues.dateNaissance ? (
        <p>Votre anniversaire est dans {daysUtilBirthday} jours 🎉</p>
      ) : (
        <>
          <p>Vous n'avez pas encore renseigné votre anniversaire.</p>
          <Link to='/informations' data-testid='infos-link'>
            Renseigner ma date d'anniversaire
          </Link>
        </>
      )}
    </>
  );
}

export default App;
