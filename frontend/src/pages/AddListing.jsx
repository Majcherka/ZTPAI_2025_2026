import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function AddListing() {
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    price: '',
    description: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/listings/', {
        title: formData.title,
        city: formData.city,
        price: parseFloat(formData.price), 
        description: formData.description
      });
      
      alert("Ogłoszenie dodane pomyślnie!");
    } catch (err) {
      console.error(err);
      setError('Błąd podczas dodawania ogłoszenia. Czy jesteś zalogowany?');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Dodaj nowe ogłoszenie</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tytuł ogłoszenia</Form.Label>
          <Form.Control 
            type="text" name="title" required 
            placeholder="np. Pokój jednoosobowy w centrum"
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-3">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Miasto</Form.Label>
            <Form.Control 
              type="text" name="city" required 
              placeholder="np. Kraków"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Cena (zł/mc)</Form.Label>
            <Form.Control 
              type="number" name="price" required 
              placeholder="1500"
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Opis</Form.Label>
          <Form.Control 
            as="textarea" rows={4} name="description"
            placeholder="Opisz mieszkanie, współlokatorów..."
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Opublikuj ogłoszenie
        </Button>
      </Form>
    </Container>
  );
}

export default AddListing;