import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';

function Listings() {
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState(new Set()); 
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    fetchListings();
    if (isLoggedIn) {
      fetchFavorites();
    }
  }, []);

  const fetchListings = async () => {
    try {
      const response = await api.get('/listings/');
      setListings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/listings/favorites');
      const favIds = new Set(response.data.map(l => l.id));
      setFavorites(favIds);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (id, e) => {
    e.stopPropagation(); 
    if (!isLoggedIn) {
      alert("Zaloguj się, aby dodawać do ulubionych!");
      return;
    }

    try {
      await api.post(`/listings/${id}/favorite`);
      
      const newFavs = new Set(favorites);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      setFavorites(newFavs);
    } catch (error) {
      console.error("Błąd polubienia:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Dostępne Pokoje</h2>
      <Row>
        {listings.map((listing) => (
          <Col key={listing.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title>{listing.title}</Card.Title>
                  
                  {/* SERDUSZKO */}
                  <div style={{ cursor: 'pointer' }} onClick={(e) => toggleFavorite(listing.id, e)}>
                    {favorites.has(listing.id) ? (
                      <HeartFill color="red" size={24} />
                    ) : (
                      <Heart color="gray" size={24} />
                    )}
                  </div>
                </div>
                
                <Badge bg="primary" className="mb-2">{listing.price} zł</Badge>
                <Card.Subtitle className="mb-2 text-muted">{listing.city}</Card.Subtitle>
                <Card.Text>
                  {listing.description.substring(0, 100)}...
                </Card.Text>
              </Card.Body>
              
              <Card.Footer className="bg-white border-top-0 d-grid">
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate(`/listings/${listing.id}`)}
                >
                  Zobacz szczegóły
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Listings;