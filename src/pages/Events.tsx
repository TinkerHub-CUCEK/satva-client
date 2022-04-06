import {useState, useEffect} from 'react';
import {Event, listEvents} from '../api/api';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    listEvents().then(list => setEvents(list.data));
  }, []);

  return (
    <div>
      <div>Event List</div>
      {events.map(item => (
        <div key={item.name}>
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Events;
