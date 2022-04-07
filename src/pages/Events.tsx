import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {api_listEvents, Event} from '../api/api';
import {ROUTES} from '../routes';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api_listEvents().then(list => setEvents(list.data));
  }, []);

  const handleRegisterClick = (id: string) => {
    navigate(ROUTES.registerEvent + id);
  };

  const handleRegistrationsClick = (id: string) => {
    navigate(ROUTES.registrationsList + id);
  };

  return (
    <div>
      <div>Event List</div>
      {events.map(item => (
        <div key={item.name}>
          <h1>{item.name}</h1>
          <button onClick={() => handleRegisterClick(item._id)}>
            RegisterEvent
          </button>

          <button onClick={() => handleRegistrationsClick(item._id)}>
            Registrations
          </button>
        </div>
      ))}
    </div>
  );
};

export default Events;
