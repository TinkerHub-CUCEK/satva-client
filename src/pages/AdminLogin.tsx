import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {api_loginAdmin} from '../api/api';
import ErrorField from '../components/ErrorField';
import {ROUTES} from '../routes';
import {useStore} from '../store';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setAdminPass = useStore(state => state.setAdminPass);
  const navigate = useNavigate();

  const handleSubmitClick = async () => {
    const result = await api_loginAdmin(password);
    if (result.status) {
      setAdminPass(password);
      navigate(ROUTES.home);
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h1>AdminLogin</h1>
      <ErrorField errorText={error} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmitClick}>Submit</button>
    </div>
  );
};

export default AdminLogin;
