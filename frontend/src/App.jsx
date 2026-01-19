import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Listings from './components/Listings';
import Login from './pages/Login';
import Register from './pages/Register';
import AddListing from './pages/AddListing';
import ListingDetails from './pages/ListingDetails'; 

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-listing" element={<AddListing />} />
        
        {/* 2. NOWA TRASA (parametr :id) */}
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;