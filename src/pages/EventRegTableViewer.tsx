import {useEffect, useState} from 'react';
import {EventRegistration, listEventRegistrations} from '../api/api';
import {
  downloadCSV,
  formatMongoDBDates,
  mongoDbToCSV,
  removeIdsFromMongoDBItem,
} from '../utility';
import {useParams} from 'react-router-dom';

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

  useEffect(() => {
    listEventRegistrations(eventId).then(list =>
      setRegistrations(removeIdsFromMongoDBItem(formatEventRegData(list.data))),
    );
  }, []);

  if (registrations.length == 0) {
    return null;
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
