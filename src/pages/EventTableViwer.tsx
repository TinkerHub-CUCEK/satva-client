import {useEffect, useState} from 'react';
import {listEvents} from '../api/api';
import {
  downloadCSV,
  formatMongoDBDates,
  mongoDbToCSV,
  removeIdsFromMongoDBItem,
} from '../utility';
import {Event} from '../api/api';

const EventTableViwer = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    listEvents().then(list => setEvents(removeIdsFromMongoDBItem(list.data)));
  }, []);

  if (events.length == 0) {
    return null;
  }

  formatMongoDBDates(events);

  const handleDownload = () => {
    downloadCSV(mongoDbToCSV(events));
  };

  return (
    <div>
      <h1>EventTableViwer</h1>
      <table style={{margin: 'auto'}}>
        <thead>
          {Object.keys(events[0]).map(item => (
            <th key={item}>{item}</th>
          ))}
        </thead>

        <tbody>
          {events.map((item, id) => (
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

export default EventTableViwer;
