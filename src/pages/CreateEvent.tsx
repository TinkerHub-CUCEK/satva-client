import {format} from 'date-fns';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {api_createEvent} from '../api/api';
import ErrorField from '../components/ErrorField';
import {ROUTES} from '../routes';

const CreateEvent = () => {
  const [eventname, setEventname] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [minUsersPerTeam, setMinUsersPerTeam] = useState('1');
  const [maxUsersPerTeam, setMaxUsersPerTeam] = useState('1');
  const [maxTeamsPerBranch, setMaxTeamsPerBranch] = useState('1');
  const [status, setStatus] = useState('started');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await api_createEvent(
      eventname,
      startTime,
      endTime,
      Number(minUsersPerTeam),
      Number(maxUsersPerTeam),
      Number(maxTeamsPerBranch),
      status,
    );
    if (response.status) {
      console.log('success');
      navigate(ROUTES.events);
    } else {
      console.log('Error', response.message);
      setError(response.message);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Create Event</h2>
      <ErrorField errorText={error} />
      <input
        placeholder="eventname"
        value={eventname}
        onChange={e => setEventname(e.target.value)}
      />

      <input
        placeholder="startTime"
        type="date"
        value={format(startTime, 'yyyy-MM-dd')}
        onChange={e => setStartTime(new Date(e.target.value))}
      />

      <input
        placeholder="endTime"
        value={format(endTime, 'yyyy-MM-dd')}
        onChange={e => setEndTime(new Date(e.target.value))}
      />

      <input
        placeholder="minUsersPerTeam"
        value={minUsersPerTeam}
        onChange={e => setMinUsersPerTeam(e.target.value)}
      />

      <input
        placeholder="maxUsersPerTeam"
        value={maxUsersPerTeam}
        onChange={e => setMaxUsersPerTeam(e.target.value)}
      />

      <input
        placeholder="maxTeamsPerBranch"
        value={maxTeamsPerBranch}
        onChange={e => setMaxTeamsPerBranch(e.target.value)}
      />

      <input
        placeholder="Status"
        value={status}
        onChange={e => setStatus(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateEvent;
