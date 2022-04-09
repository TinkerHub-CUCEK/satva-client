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
    <div className="px-12 h-screen">
      <div className="">
        <div className="text-center text-3xl font-light pb-24 pt-12">Event List</div>
        <div className="flex flex-wrap md:grid md:grid-cols-2 xl:grid xl:grid-cols-3 gap-6">
          {events.map(item => (
            <div
              className="border-2 py-12 px-4 w-full rounded space-y-4 border-black"
              key={item.name}>
              <h1 className="text-center text-2xl font-light uppercase">
                {item.name}
              </h1>
              <div className="flex flex-wrap gap-4 sm:grid sm:grid-cols-2">
                <button
                  className="dark-btn w-full"
                  onClick={() => handleRegisterClick(item._id)}>
                  Register Event
                </button>

                <button
                  className="outline-btn w-full"
                  onClick={() => handleRegistrationsClick(item._id)}>
                  Registrations
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
