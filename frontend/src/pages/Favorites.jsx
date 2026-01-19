import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/listings/favorites');
        setListings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Twoje Ulubione Ogłoszenia</h2>
      {listings.length === 0 ? (
        <Alert variant="info">Nie masz jeszcze ulubionych ogłoszeń. Kliknij serduszko na liście!</Alert>
      ) : (
        <Row>
          {listings.map((listing) => (
            <Col key={listing.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-danger">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{listing.title}</Card.Title>
                    <Badge bg="danger">Ulubione</Badge>
                  </div>
                  <Card.Subtitle className="mb-2 text-muted">{listing.city}</Card.Subtitle>
                  <Card.Text className="fw-bold">{listing.price} zł</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  <Button 
                    variant="outline-danger" 
                    className="w-100" 
                    onClick={() => navigate(`/listings/${listing.id}`)}
                  >
                    Zobacz ofertę
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favorites;