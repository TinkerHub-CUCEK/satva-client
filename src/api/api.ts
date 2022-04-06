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
  eventId: string;
  branch: string;
  captainMail: string;
  branchTeamId: number;
  participants: Participant[];
}

export const apiEndpoint = 'https://satva-server.herokuapp.com/';

export async function registerUser(
  username: string,
  email: string,
  password: string,
  branch: string,
  sem: number,
  adminPass: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'user/register', {
      name: username,
      email: email,
      password: password,
      branch: branch,
      sem: sem,
      adminpass: adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerUser error', e);
    return null;
  }
}

export async function loginUser(
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
    return null;
  }
}

export async function createEvent(
  name: string,
  startTime: Date,
  endTime: Date,
  minUsersPerTeam: number,
  maxUsersPerTeam: number,
  status: string,
  adminPass: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'events/create', {
      name: name,
      startTime: startTime,
      endTime: endTime,
      minUsersPerTeam: minUsersPerTeam,
      maxUsersPerTeam: maxUsersPerTeam,
      status: status,
      adminpass: adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::createEvent ', e);
    return null;
  }
}

export async function listEvents() {
  try {
    const response = await getRequest(apiEndpoint + 'events/listevents');
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::listEvents ', e);
    return null;
  }
}

export async function updateEvent(
  name: string,
  startTime: Date,
  endTime: Date,
  minUsersPerTeam: number,
  maxUsersPerTeam: number,
  status: string,
  adminPass: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'events/update', {
      name: name,
      startTime: startTime,
      endTime: endTime,
      minUsersPerTeam: minUsersPerTeam,
      maxUsersPerTeam: maxUsersPerTeam,
      status: status,
      adminpass: adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::updateEvent ', e);
    return null;
  }
}

export async function registerEvent(
  eventId: string,
  branch: string,
  captainMail: string,
  password: string,
  branchTeamId: number,
  participants: Participant[],
) {
  const eventReg: EventRegistration = {
    eventId: eventId,
    captainMail: captainMail,
    branch: branch,
    branchTeamId: branchTeamId,
    participants: participants,
  };
  try {
    const response = await postRequest(apiEndpoint + 'events/register', {
      ...eventReg,
      password: password,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerEvent ', e);
    return null;
  }
}
