import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {registerEvent} from '../api/api';
import ErrorField from '../components/ErrorField';
import {ROUTES} from '../routes';
import {useStore} from '../store';

const RegisterEvent = () => {
  const {id} = useParams();
  const [username, setUsername] = useState('');
  const [registernumber, setRegisternumber] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [sem, setSem] = useState('');
  const [email, setEmail] = useState('');
  const [paymentDone, setPaymentDone] = useState('1');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const captain = useStore(state => state.captain);

  const handleSubmit = async () => {
    if (captain) {
      const eventId = id ? id : '';
      const response = await registerEvent(
        eventId,
        username,
        registernumber,
        phone,
        branch,
        Number(sem),
        email,
        paymentDone == '1',
        captain.captainMail,
        captain.captainPass,
      );

      if (response.status) {
        console.log('success');
        setError('');
      } else {
        console.log('Error', response.message);
        setError(response.message);
      }
    } else {
      navigate(ROUTES.login);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Register Event</h2>

      <ErrorField errorText={error} />
      <input
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="registernumber"
        value={registernumber}
        onChange={e => setRegisternumber(e.target.value)}
      />

      <input
        placeholder="phone no"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <input
        placeholder="branch"
        value={branch}
        onChange={e => setBranch(e.target.value)}
      />

      <input
        placeholder="Sem"
        value={sem}
        onChange={e => setSem(e.target.value)}
      />

      <input
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <select
        value={paymentDone}
        onChange={e => setPaymentDone(e.target.value)}>
        <option value="1">yes</option>
        <option value="0">No</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RegisterEvent;
