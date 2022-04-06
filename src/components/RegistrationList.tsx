import React from 'react';
import {EventRegistration} from '../api/api';
interface RegistrationListProps {
  registrations: EventRegistration[];
}
const RegistrationList = ({registrations}: RegistrationListProps) => {
  return (
    <div>
      {registrations.map(item => (
        <div key={item.branchTeamId}>
          <h1>{item.branchTeamId}</h1>
        </div>
      ))}
    </div>
  );
};

export default RegistrationList;
