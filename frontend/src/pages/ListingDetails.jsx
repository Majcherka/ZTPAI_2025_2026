import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';

function ListingDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/listings/${id}`);
        setListing(response.data);
      } catch (err) {
        setError("Nie udało się pobrać ogłoszenia.");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );

  if (error || !listing) return (
    <Container className="mt-5">
      <Alert variant="danger">{error || "Ogłoszenie nie istnieje"}</Alert>
      <Button variant="secondary" onClick={() => navigate('/')}>Wróć do listy</Button>
    </Container>
  );

  return (
    <Container className="mt-5">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/')}>
        &larr; Wróć do ogłoszeń
      </Button>

      <Card className="shadow-lg">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
             <h1 className="display-5">{listing.title}</h1>
             <Badge bg="success" style={{ fontSize: '1.2rem' }}>{listing.price} zł</Badge>
          </div>
          
          <h4 className="text-muted mb-4">{listing.city}</h4>
          
          <Card.Text style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            {listing.description}
          </Card.Text>

          <hr />
          
          <div className="d-flex justify-content-between text-muted">
            <small>ID Ogłoszenia: {listing.id}</small>
            <small>ID Wystawiającego: {listing.user_id}</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ListingDetails;