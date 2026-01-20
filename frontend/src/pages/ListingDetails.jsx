import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  const [message, setMessage] = useState('');
  const [msgStatus, setMsgStatus] = useState('');

  const token = localStorage.getItem('token');
  const currentUserId = parseInt(localStorage.getItem('user_id'));

  useEffect(() => {
    fetchListing();
    if (token) {
      checkFavorite();
    }
  }, [id, token]);

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/${id}`);
      setListing(response.data);
    } catch (err) {
      setError('Nie udało się pobrać ogłoszenia.');
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await api.get('/favorites/');
      const favorites = response.data;
      const isFav = favorites.some(fav => fav.id === parseInt(id));
      setIsFavorite(isFav);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await api.post('/messages/', {
        recipient_id: listing.user_id,
        content: message
      });
      setMsgStatus('success');
      setMessage('');
    } catch (err) {
      console.error(err);
      setMsgStatus('error');
    }
  };

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" />
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  if (!listing) return null;

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Card.Title as="h2" className="mb-3">{listing.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {listing.city} • {listing.price} PLN
              </Card.Subtitle>
            </div>
            {token && (
              <Button 
                variant="link" 
                onClick={toggleFavorite} 
                className="text-danger p-0" 
                style={{ fontSize: '2rem' }}
              >
                {isFavorite ? <HeartFill /> : <Heart />}
              </Button>
            )}
          </div>
          
          <Card.Text className="mt-4" style={{ whiteSpace: 'pre-line' }}>
            {listing.description || "Brak opisu."}
          </Card.Text>

          <hr className="my-4" />

          {/* Sekcja Wiadomości */}
          {token && currentUserId !== listing.user_id ? (
            <div className="mt-4">
              <h4>Skontaktuj się z właścicielem</h4>
              
              {msgStatus === 'success' && (
                <Alert variant="success">Wiadomość została wysłana!</Alert>
              )}
              {msgStatus === 'error' && (
                <Alert variant="danger">Nie udało się wysłać wiadomości.</Alert>
              )}

              <Form onSubmit={handleSendMessage}>
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Napisz wiadomość..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Wyślij wiadomość
                </Button>
              </Form>
            </div>
          ) : (
            !token && (
              <Alert variant="info">
                <Alert.Link href="/login">Zaloguj się</Alert.Link>, aby skontaktować się z właścicielem.
              </Alert>
            )
          )}

          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Wróć
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ListingDetails;