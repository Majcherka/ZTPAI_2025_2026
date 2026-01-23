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
import MyMessages from './pages/MyMessages';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings/:id" element={<ListingDetails />} />

        <Route 
          path="/add-listing" 
          element={
            <ProtectedRoute>
              <AddListing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <MyMessages />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;