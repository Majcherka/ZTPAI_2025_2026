import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await api.get('/listings/me');
        setListings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyListings();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Mój Profil - Moje Ogłoszenia</h2>
      {listings.length === 0 ? (
        <Alert variant="info">Nie dodałeś jeszcze żadnych ogłoszeń.</Alert>
      ) : (
        <Row>
          {listings.map((listing) => (
            <Col key={listing.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Badge bg="success" className="mb-2">{listing.price} zł</Badge>
                  <Card.Text>{listing.city}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  <Button 
                    variant="outline-primary" 
                    className="w-100" 
                    onClick={() => navigate(`/listings/${listing.id}`)}
                  >
                    Zobacz szczegóły
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

export default MyProfile;