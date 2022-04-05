import {useState} from 'react';
import {registerEvent} from '../api/api';
import {useStore} from '../store';

interface RegisterEventProps {
  eventId: string;
}

const RegisterEvent = ({eventId}: RegisterEventProps) => {
  const [username, setUsername] = useState('');
  const [registernumber, setRegisternumber] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [sem, setSem] = useState('');
  const [email, setEmail] = useState('');
  const [paymentDone, setPaymentDone] = useState('1');

  const captainMail = useStore(state => state.captainMail);
  const captainPass = useStore(state => state.captainPass);

  const handleSubmit = async () => {
    if (captainPass && captainMail) {
      const response = await registerEvent(
        eventId,
        username,
        registernumber,
        phone,
        branch,
        Number(sem),
        email,
        paymentDone == '1',
        captainMail,
        captainPass,
      );

      if (response.status) {
        console.log('success');
      } else {
        console.log('Error', response.message);
      }
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Register Event</h2>

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
