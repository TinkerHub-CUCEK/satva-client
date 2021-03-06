import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import RegisterEvent from './pages/RegisterEvent';
import Events from './pages/Events';
import {ROUTES} from './routes';
import EventTableViwer from './pages/EventTableViwer';
import EventRegTableViwer from './pages/EventRegTableViewer';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.register} element={<Register />} />
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.adminLogin} element={<AdminLogin />} />
          <Route path={ROUTES.createEvent} element={<CreateEvent />} />
          <Route path={ROUTES.updateEvent} element={<UpdateEvent />} />
          <Route path={ROUTES.events} element={<Events />} />
          <Route path={ROUTES.eventsViewer} element={<EventTableViwer />} />
          <Route
            path={ROUTES.registerEvent + ':id'}
            element={<RegisterEvent />}
          />

          <Route
            path={ROUTES.registrationsList + ':id'}
            element={<EventRegTableViwer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
