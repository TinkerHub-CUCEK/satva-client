import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {api_listEventRegistrations, EventRegistration} from '../api/api';
import RegistrationList from '../components/RegistrationList';
import {useStore} from '../store';

const RegisterEvent = () => {
  const {id} = useParams();
  const eventId = id ? id : '';
  const captain = useStore(state => state.captain);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  const loadEventRegistraions = async () => {
    const response = await api_listEventRegistrations(eventId);
    if (response.status && captain) {
      setRegistrations(
        response.data.filter(
          (item: EventRegistration) => item.branch == captain.captainBranch,
        ),
      );
    }
  };

  useEffect(() => {
    loadEventRegistraions();
  }, [id]);

  return (
    <div className="">
      <h2 className="text-2xl text-center text-gray-700 font-light uppercase pb-4">
        Register Event
      </h2>
      <div className="px-12">
        <RegistrationList
          registrations={registrations}
          loadEventRegistraions={loadEventRegistraions}
          eventId={eventId}
        />
      </div>
    </div>
  );
};

export default RegisterEvent;
