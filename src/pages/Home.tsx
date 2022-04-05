import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link to="login">Captain Login</Link>
        <Link to="register">Captain Register(admin)</Link>
        <Link to="eventcreate">Create event(admin)</Link>
        <Link to="eventregister">event register</Link>
        <Link to="eventupdate">Update event(admin)</Link>
      </div>
    </div>
  );
};

export default Home;
