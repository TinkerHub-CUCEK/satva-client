import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../api/api';
import ErrorField from '../components/ErrorField';
import {ROUTES} from '../routes';
import {useStore} from '../store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [error, setError] = useState('');
  const setCaptain = useStore(state => state.setCaptain);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await loginUser(email, password, branch);
    if (response.status) {
      console.log('success');
      setCaptain({
        captainMail: email,
        captainPass: password,
        captainBranch: branch,
      });
      navigate(ROUTES.home);
    } else {
      console.log('Error', response.message);
      setError(response.message);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Captain Login</h2>
      <ErrorField errorText={error} />
      <input
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="branch"
        value={branch}
        onChange={e => setBranch(e.target.value)}
      />

      <input
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
