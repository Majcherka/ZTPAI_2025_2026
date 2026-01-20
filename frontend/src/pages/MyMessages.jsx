import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Tab, Tabs, Table, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyMessages() {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const resReceived = await api.get('/messages/received');
        setReceived(resReceived.data);

        const resSent = await api.get('/messages/sent');
        setSent(resSent.data);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać wiadomości.");
        if (err.response && (err.response.status === 401)) {
           navigate('/login');
        }
      }
    };

    fetchMessages();
  }, [navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pl-PL');
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-primary">Moje Wiadomości</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs defaultActiveKey="received" id="messages-tabs" className="mb-3">
        
        {/* Zakładka ODEBRANE */}
        <Tab eventKey="received" title={`Odebrane (${received.length})`}>
          {received.length === 0 ? (
            <Alert variant="info">Nie masz żadnych nowych wiadomości.</Alert>
          ) : (
            <div className="shadow-sm p-3 bg-white rounded">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th style={{width: '20%'}}>Od kogo</th>
                    <th style={{width: '60%'}}>Treść</th>
                    <th style={{width: '20%'}}>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {received.map((msg) => (
                    <tr key={msg.id}>
                      <td className="fw-bold">{msg.sender_email}</td>
                      <td>{msg.content}</td>
                      <td className="text-muted small">{formatDate(msg.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Tab>

        {/* Zakładka WYSŁANE */}
        <Tab eventKey="sent" title={`Wysłane (${sent.length})`}>
          {sent.length === 0 ? (
            <Alert variant="light">Nie wysłałeś jeszcze żadnych wiadomości.</Alert>
          ) : (
            <div className="shadow-sm p-3 bg-white rounded">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th style={{width: '20%'}}>Do kogo</th>
                    <th style={{width: '60%'}}>Treść</th>
                    <th style={{width: '20%'}}>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {sent.map((msg) => (
                    <tr key={msg.id}>
                      <td>{msg.recipient_email}</td>
                      <td className="text-muted">{msg.content}</td>
                      <td className="text-muted small">{formatDate(msg.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Tab>

      </Tabs>
    </Container>
  );
}

export default MyMessages;