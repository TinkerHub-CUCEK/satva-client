import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ROUTES} from '../routes';
import {useStore} from '../store';

const Home = () => {
  const captain = useStore(state => state.captain);
  const navigate = useNavigate();

  useEffect(() => {
    if (captain) {
      navigate(ROUTES.events);
    }
  }, [captain]);

  return (
    <div>
      <p>Home</p>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link to={ROUTES.login}>Captain Login</Link>
      </div>
    </div>
  );
};

export default Home;
