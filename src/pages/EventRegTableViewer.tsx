import {useEffect, useState} from 'react';
import {api_listEventRegistrations, EventRegistration} from '../api/api';
import {
  downloadCSV,
  formatMongoDBDates,
  mongoDbToCSV,
  removeIdsFromMongoDBItem,
} from '../utility';
import {useParams} from 'react-router-dom';
import {useStore} from '../store';

const formatEventRegData = (data: EventRegistration[]) => {
  let array: any = [];

  data.forEach(item => {
    const branch = item.branch;
    const team = item.branchTeamId;
    item.participants.forEach((item: any) => {
      item['branch'] = branch;
      item['teamID'] = team;
    });
    array = [...array, ...item.participants];
  });

  return array;
};

const EventRegTableViwer = () => {
  const {id} = useParams();
  const eventId = id ? id : '';
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const captain = useStore(state => state.captain);
  const admin = useStore(state => state.adminPass);

  useEffect(() => {
    if (admin || captain) {
      setIsLoading(true);
      api_listEventRegistrations(eventId)
        .then(list => {
          if (admin) {
            setRegistrations(
              removeIdsFromMongoDBItem(formatEventRegData(list.data)),
            );
            console.log('admin');
          } else if (captain) {
            const branchOnlyData = list.data.filter(
              (item: EventRegistration) => item.branch == captain.captainBranch,
            );
            setRegistrations(
              removeIdsFromMongoDBItem(formatEventRegData(branchOnlyData)),
            );
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [admin, captain]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (registrations.length == 0) {
    return (
      <div>
        <h1>OOPS! No registrations</h1>
      </div>
    );
  }

  formatMongoDBDates(registrations);
  console.log(registrations);

  const handleDownload = () => {
    downloadCSV(mongoDbToCSV(registrations));
  };

  return (
    <div>
      <h1>Event Registrations</h1>
      <table style={{margin: 'auto'}}>
        <thead>
          {Object.keys(registrations[0]).map(item => (
            <th key={item}>{item}</th>
          ))}
        </thead>

        <tbody>
          {registrations.map((item, id) => (
            <tr key={id}>
              {Object.values(item).map(item2 => (
                <td key={item2}>{item2}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handleDownload}>Download Excel</button>
      </div>
    </div>
  );
};

export default EventRegTableViwer;
