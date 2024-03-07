import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const EventForm = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventType: '',
    eventDate: '',
    location: '',
    maxParticipants: '',
    costPerParticipant: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });
      const data = await response.json();
      console.log(data.message);
      // Tilføj logik for at vise en succesmeddelelse eller redirect brugeren
    } catch (error) {
      console.error("Der opstod en fejl:", error);
      // Håndter fejlen, evt. ved at vise en fejlmeddelelse til brugeren
    }
  };
  

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Navn</Form.Label>
          <Form.Control type="text" name="eventName" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Type</Form.Label>
          <Form.Control type="text" name="eventType" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Dato</Form.Label>
          <Form.Control type="date" name="eventDate" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sted</Form.Label>
          <Form.Control type="text" name="location" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maks Deltagere</Form.Label>
          <Form.Control type="number" name="maxParticipants" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Omkostning per deltager</Form.Label>
          <Form.Control type="number" name="costPerParticipant" required onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Opret Event
        </Button>
      </Form>
    </Container>
  );
};


export default EventForm;
