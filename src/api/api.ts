import {useStore} from '../store';
import {getRequest, postRequest} from './request';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  branch: string;
  sem: number;
}

export interface Event {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  maxUsersPerTeam: number;
  minUsersPerTeam: number;
  status: string;
}

export interface Participant {
  sem: number;
  username: string;
  registernumber: string;
  phone: string;
  email: string;
  paymentDone: boolean;
}

export interface EventRegistration {
  _id: string;
  eventId: string;
  branch: string;
  captainMail: string;
  branchTeamId: number;
  participants: Participant[];
}

export const apiEndpoint = 'https://satva-server.herokuapp.com/';

export async function api_registerUser(
  username: string,
  email: string,
  password: string,
  branch: string,
  sem: number,
) {
  try {
    const response = await postRequest(apiEndpoint + 'user/register', {
      name: username,
      email: email,
      password: password,
      branch: branch,
      sem: sem,
      adminpass: useStore.getState().adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerUser error', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_loginUser(
  email: string,
  password: string,
  branch: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'user/login', {
      email: email,
      password: password,
      branch: branch,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerUser error', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_loginAdmin(adminPass: string) {
  try {
    const response = await postRequest(apiEndpoint + 'user/loginadmin', {
      adminpass: adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerUser error', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_createEvent(
  name: string,
  startTime: Date,
  endTime: Date,
  minUsersPerTeam: number,
  maxUsersPerTeam: number,
  maxTeamsPerBranch: number,
  status: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'events/create', {
      name: name,
      startTime: startTime,
      endTime: endTime,
      minUsersPerTeam: minUsersPerTeam,
      maxUsersPerTeam: maxUsersPerTeam,
      status: status,
      adminpass: useStore.getState().adminPass,
      maxTeamsPerBranch: maxTeamsPerBranch,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::createEvent ', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_listEvents() {
  try {
    const response = await getRequest(apiEndpoint + 'events/listevents');
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::listEvents ', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_updateEvent(
  name: string,
  startTime: Date,
  endTime: Date,
  minUsersPerTeam: number,
  maxUsersPerTeam: number,
  status: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'events/update', {
      name: name,
      startTime: startTime,
      endTime: endTime,
      minUsersPerTeam: minUsersPerTeam,
      maxUsersPerTeam: maxUsersPerTeam,
      status: status,
      adminpass: useStore.getState().adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::updateEvent ', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_registerEvent(
  eventId: string,
  branch: string,
  captainMail: string,
  password: string,
  branchTeamId: number,
  participants: Participant[],
) {
  try {
    const response = await postRequest(apiEndpoint + 'events/register', {
      eventId: eventId,
      captainMail: captainMail,
      branch: branch,
      branchTeamId: branchTeamId,
      participants: participants,
      password: password,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerEvent ', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_updateRegistration(
  eventId: string,
  regId: string,
  captainMail: string,
  password: string,
  participants: Participant[],
) {
  try {
    const response = await postRequest(
      apiEndpoint + 'events/updateregistration',
      {
        password: password,
        captainMail: captainMail,
        regId: regId,
        participants: participants,
        eventId: eventId,
      },
    );
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerEvent ', e);
    return {status: false, message: 'Error' + e};
  }
}

export async function api_listEventRegistrations(eventId: string) {
  try {
    const response = await postRequest(
      apiEndpoint + 'events/listregistrations',
      {
        eventId: eventId,
      },
    );
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::listEvents ', e);
    return {status: false, message: 'Error' + e};
  }
}
