import {useEffect, useState} from 'react';
import {
  downloadCSV,
  formatMongoDBDates,
  mongoDbToCSV,
  removeIdsFromMongoDBItem,
} from '../utility';
import {api_listEvents, Event} from '../api/api';

const EventTableViwer = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api_listEvents().then(list =>
      setEvents(removeIdsFromMongoDBItem(list.data)),
    );
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
      <h1 className="text-2xl text-gray-700 text-center py-12 font-light uppercase pb-4">
        Event Table Viewer
      </h1>
      <div className="flex justify-center items-center">
        <table className="mb-12">
          <thead>
            {Object.keys(events[0]).map(item => (
              <th className="border uppercase py-2 px-6" key={item}>
                {item}
              </th>
            ))}
          </thead>

          <tbody>
            {events.map((item, id) => (
              <tr key={id}>
                {Object.values(item).map(item2 => (
                  <td className="border p-2" key={item2}>
                    {item2}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-gray-800 uppercase font-light rounded text-white px-8 py-2 border-2 transition border-gray-800 hover:bg-white hover:text-black"
          onClick={handleDownload}>
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default EventTableViwer;
