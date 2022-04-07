import {useState} from 'react';
import {api_registerUser} from '../api/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [sem, setSem] = useState<string | number>('6');

  const handleSubmit = async () => {
    const response = await api_registerUser(
      name,
      email,
      password,
      branch,
      Number(sem),
    );
    if (response.status) {
      console.log('success');
    } else {
      console.log('Error', response.message);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Register Captain</h2>
      <input
        placeholder="username"
        value={name}
        onChange={e => setName(e.target.value)}
      />

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

      <input
        placeholder="sem"
        value={sem}
        onChange={e => setSem(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Register;
