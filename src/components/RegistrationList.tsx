import {useState} from 'react';
import {
  api_registerEvent,
  api_updateRegistration,
  EventRegistration,
  Participant,
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
      const result = await api_registerEvent(
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

      const res = await api_updateRegistration(
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
      const res = await api_updateRegistration(
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
      <button
        className="dark-btn transition w-full"
        onClick={handleAddTeamClick}
        disabled={isLoading}>
        Add Team
      </button>
      <div className="space-y-2 pt-12">
        {registrations.map(item => (
          <div className="border rounded px-12" key={item.branchTeamId}>
            <h1 className="text-xl text-center font-gray-600 font-light pt-4">
              Team {item.branchTeamId}
            </h1>
            <div className="py-6"><button
              className="px-2 py-1 border bg-gray-700 text-white hover:bg-white border-gray-700  hover:text-black transition rounded"
              onClick={() => handleAddPartClick(item._id, item.participants)}>
              Add Participant
            </button></div>
            {item.participants.map((p, id) => (
              <Participants key={id} id={id} participants={item.participants} />
            ))}

            <div className="flex justify-center py-6">
              <button
                className="px-2 py-1 bg-white text-black border rounded hover:text-white hover:bg-gray-700 border-gray-700  transition"
                onClick={() =>
                  handleTeamUpdateClick(item._id, item.participants)
                }>
                Update Team
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationList;
