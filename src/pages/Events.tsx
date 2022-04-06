import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Event, listEvents} from '../api/api';
import {ROUTES} from '../routes';
import {mongoDbToCSV} from '../utility';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listEvents().then(list => setEvents(list.data));
  }, []);

  const handleRegisterClick = (id: string) => {
    navigate(ROUTES.registerEvent + id);
  };

  console.log(mongoDbToCSV(events));

  return (
    <div>
      <div>Event List</div>
      {events.map(item => (
        <div key={item.name}>
          <h1>{item.name}</h1>
          <button onClick={() => handleRegisterClick(item._id)}>
            RegisterEvent
          </button>
        </div>
      ))}
    </div>
  );
};

export default Events;
