/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Skeleton from 'react-loading-skeleton';
import { fetchDataRequest } from '../../redux/slices/dataSlice';
import { Link } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const { url, loading, error } = useSelector((state: RootState) => state.dummyData);
  const userValues = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const caluclBirthdayInDays = () => {
    const today = new Date();
    const birthdate = new Date(userValues.dateNaissance || '');
    const birthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    const timeDiff = birthday.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  if (error) {
    return <h1>Une erreur est survenue</h1>;
  }

  return (
    <>
      {loading ? (
        <Skeleton duration={2} height={200} width={400} borderRadius={10} />
      ) : (
        <img className='welcome-img' src={url} height={200} width={400} alt='Bienvenue' data-testid='welcome-img' />
      )}
      <h2>👋</h2>
      <br />
      {userValues.dateNaissance ? (
        <p>Votre anniversaire est dans {caluclBirthdayInDays()} jours 🎉</p>
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
