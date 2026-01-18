import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings/');
        setListings(response.data);
      } catch (error) {
        console.error("Błąd pobierania ogłoszeń:", error);
      }
    };

    fetchListings();
  }, []);

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
                  <Badge bg="primary">{listing.price} zł</Badge>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{listing.city}</Card.Subtitle>
                <Card.Text>
                  {listing.description.substring(0, 100)}...
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0">
                <small className="text-muted">Dodano przez ID: {listing.user_id}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Listings;