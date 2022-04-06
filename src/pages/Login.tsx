import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../api/api';
import {useStore} from '../store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const setCaptain = useStore(state => state.setCaptain);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await loginUser(email, password);
    if (response.status) {
      console.log('success');
      setCaptain({
        captainMail: email,
        captainPass: password,
        captainBranch: branch,
      });
      navigate('/home');
    } else {
      console.log('Error', response.message);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Captain Login</h2>

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
