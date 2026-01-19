import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Listings from './components/Listings';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Tu zaraz dodamy dodawanie ogłoszeń */}
      </Routes>
    </Router>
  );
}

export default App;