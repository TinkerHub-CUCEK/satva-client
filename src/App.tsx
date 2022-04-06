import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import RegisterEvent from './pages/RegisterEvent';
import Events from './pages/Events';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="eventcreate" element={<CreateEvent />} />
          <Route path="eventupdate" element={<UpdateEvent />} />
          <Route path="events" element={<Events />} />
          <Route
            path="eventregister"
            element={<RegisterEvent eventId="624c0de80af339fcf30b4a13" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
