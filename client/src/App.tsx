import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { ApiProvider } from './api/ApiProvider';
import { AppContextProvider } from './contexts/AppContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ApiProvider>
      <AppContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </ApiProvider>

  );
}

export default App;