import {useState} from 'react';
import {
  EventRegistration,
  Participant,
  registerEvent,
  updateRegistration,
} from '../api/api';
import {useStore} from '../store';
import ErrorField from './ErrorField';
import Participants from './Participants';
interface RegistrationListProps {
  registrations: EventRegistration[];
  loadEventRegistraions: any;
  eventId: string;
}
const RegistrationList = ({
  registrations,
  loadEventRegistraions,
  eventId,
}: RegistrationListProps) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const captain = useStore(state => state.captain);

  const handleAddTeamClick = async () => {
    if (captain) {
      setIsLoading(true);
      const newId = registrations.length + 1;
      const result = await registerEvent(
        eventId,
        captain.captainBranch,
        captain.captainMail,
        captain.captainPass,
        newId,
        [],
      );
      if (!result.status) {
        setError(result.message);
        setIsLoading(false);
      } else {
        setError('');
        await loadEventRegistraions();
        setIsLoading(false);
      }
    }
  };

  const handleAddPartClick = async (
    regId: string,
    participants: Participant[],
  ) => {
    if (captain) {
      const newP: Participant = {
        username: '',
        sem: 0,
        registernumber: '',
        phone: '',
        email: '',
        paymentDone: false,
      };

      const res = await updateRegistration(
        eventId,
        regId,
        captain.captainMail,
        captain.captainPass,
        [...participants, newP],
      );
      await loadEventRegistraions();

      if (!res.status) {
        setError(res.message);
      }
    }
  };

  const handleTeamUpdateClick = async (
    regId: string,
    participants: Participant[],
  ) => {
    if (captain) {
      const res = await updateRegistration(
        eventId,
        regId,
        captain.captainMail,
        captain.captainPass,
        participants,
      );

      if (!res.status) {
        setError(res.message);
      }
    }
  };

  return (
    <div>
      <ErrorField errorText={error} />
      <button onClick={handleAddTeamClick} disabled={isLoading}>
        Add Team
      </button>
      {registrations.map(item => (
        <div
          key={item.branchTeamId}
          style={{padding: 10, backgroundColor: '#f4f4f4', margin: 10}}>
          <h1>Team {item.branchTeamId}</h1>
          <button
            onClick={() => handleAddPartClick(item._id, item.participants)}>
            Add Participant
          </button>
          {item.participants.map((p, id) => (
            <Participants key={id} id={id} participants={item.participants} />
          ))}

          <button
            onClick={() => handleTeamUpdateClick(item._id, item.participants)}>
            Update Team
          </button>
        </div>
      ))}
    </div>
  );
};

export default RegistrationList;
