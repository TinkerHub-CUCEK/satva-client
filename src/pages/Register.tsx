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
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col px-12 space-y-6 py-16 border-black  rounded justify-center items-center border ">
        <h2 className="text-2xl text-gray-700 font-light uppercase pb-4">
          Register Captain
        </h2>
        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="username"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="branch"
          value={branch}
          onChange={e => setBranch(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="sem"
          value={sem}
          onChange={e => setSem(e.target.value)}
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

export default Register;
