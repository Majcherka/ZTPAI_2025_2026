import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Listings from './components/Listings';
import Login from './pages/Login';
import Register from './pages/Register';
import AddListing from './pages/AddListing';
import ListingDetails from './pages/ListingDetails';
import MyProfile from './pages/MyProfile';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard'; 

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/favorites" element={<Favorites />} />
        
        {/* 2. Dodajemy nową trasę */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;