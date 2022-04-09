import {format} from 'date-fns';
import {useState} from 'react';
import {api_updateEvent} from '../api/api';

const UpdateEvent = () => {
  const [eventname, setEventname] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [minUsersPerTeam, setMinUsersPerTeam] = useState<string>('1');
  const [maxUsersPerTeam, setMaxUsersPerTeam] = useState<string>('1');
  const [status, setStatus] = useState('started');

  const handleSubmit = async () => {
    const response = await api_updateEvent(
      eventname,
      startTime,
      endTime,
      Number(minUsersPerTeam),
      Number(maxUsersPerTeam),
      status,
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
          Update Event
        </h2>

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Event name"
          value={eventname}
          onChange={e => setEventname(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Start time"
          type="date"
          value={format(startTime, 'yyyy-MM-dd')}
          onChange={e => setStartTime(new Date(e.target.value))}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="End time"
          value={format(endTime, 'yyyy-MM-dd')}
          onChange={e => setEndTime(new Date(e.target.value))}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Min users per team"
          value={minUsersPerTeam}
          onChange={e => setMinUsersPerTeam(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Max users per team"
          value={maxUsersPerTeam}
          onChange={e => setMaxUsersPerTeam(e.target.value)}
        />

        <input
          className="px-6 py-3 border-2 border-black rounded"
          placeholder="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
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

export default UpdateEvent;
