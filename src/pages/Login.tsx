import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {api_loginUser} from '../api/api';
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
    const response = await api_loginUser(email, password, branch);
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
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col px-12 space-y-6 py-16 border-black  rounded justify-center items-center border ">
        <h2 className="text-2xl text-gray-700 font-light uppercase pb-4">Captain Login</h2>
        <ErrorField errorText={error} />
        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Branch"
          value={branch}
          onChange={e => setBranch(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="bg-gray-800 uppercase font-light rounded text-white  px-8 py-3"
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
