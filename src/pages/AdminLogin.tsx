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
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col px-12 space-y-6 py-16 border-black  rounded justify-center items-center border ">
        <h1 className="text-2xl text-gray-700 font-light uppercase pb-4">
          AdminLogin
        </h1>
        <ErrorField errorText={error} />
        <input
          className="px-6 py-3 border-2 border-black rounded"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-gray-800 uppercase font-light rounded text-white  px-8 py-3"
          onClick={handleSubmitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
