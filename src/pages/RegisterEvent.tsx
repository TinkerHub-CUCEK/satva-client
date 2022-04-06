import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  EventRegistration,
  listEventRegistrations,
  registerEvent,
} from '../api/api';
import ErrorField from '../components/ErrorField';
import RegistrationList from '../components/RegistrationList';
import {ROUTES} from '../routes';
import {useStore} from '../store';

const RegisterEvent = () => {
  const {id} = useParams();
  const eventId = id ? id : '';
  const navigate = useNavigate();
  const captain = useStore(state => state.captain);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  useEffect(() => {
    listEventRegistrations(eventId).then(response => {
      if (response.status && captain) {
        setRegistrations(
          response.data.filter(
            (item: EventRegistration) => (item.branch = captain.captainBranch),
          ),
        );
      }
    });
  }, [id]);

  // const handleSubmit = async (branchTeamId: number) => {
  //   if (captain) {
  //     const response = await registerEvent(
  //       eventId,
  //       captain.captainBranch,
  //       captain.captainMail,
  //       captain.captainPass,
  //       branchTeamId,
  //       [],
  //     );

  //     if (response.status) {
  //       console.log('success');
  //       setError('');
  //     } else {
  //       console.log('Error', response.message);
  //       setError(response.message);
  //     }
  //   } else {
  //     navigate(ROUTES.login);
  //   }
  // };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Register Event</h2>
      <RegistrationList registrations={registrations} />
    </div>
  );
};

export default RegisterEvent;
