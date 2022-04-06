import {useState} from 'react';
import {EventRegistration, registerEvent} from '../api/api';
import {useStore} from '../store';
import ErrorField from './ErrorField';
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
        </div>
      ))}
    </div>
  );
};

export default RegistrationList;
