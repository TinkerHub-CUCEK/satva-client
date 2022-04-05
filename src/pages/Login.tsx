import {useState} from 'react';
import {loginUser} from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const response = await loginUser(email, password);
    if (response.status) {
      console.log('success');
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
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
