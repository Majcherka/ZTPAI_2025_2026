import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Listings from './components/Listings';
import Login from './pages/Login';
import Register from './pages/Register';
import AddListing from './pages/AddListing'; 

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* 2. NOWA TRASA: */}
        <Route path="/add-listing" element={<AddListing />} />
      </Routes>
    </Router>
  );
}

export default App;