import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const ErrorHandler = ({ error }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!!error && !!error.error_id) {
      if (error.error_id === 400) {
        setMessage("Błąd ustawień wyszukiwania.")
      } else if (404 === error.error_id) {
        setMessage("Nie znaleziono żądanch treści.");
      } else if (410 > error.error_id && error.error_id > 400) {
        setMessage("Brak dostępu.")
      } else if (error.error_id >= 500) {
        setMessage("Błąd serwera.")
      }
    }

  }, [])

  NotificationManager.error(message, "Błąd", 2000);

  return (
    <Container className='mt-3 border border-2 border-black'>
      <Row>
        <Col xs={12} lg={{ "span": 8, "offset": 2 }} className='text-center'>
          <h1 className='text-404'>{(!!error ? error.error_id : null) || "Błąd"}</h1>
          <p className='text-center'>{message}<br />{!!error && !!error.error_message ? <small>({error.error_message})</small> : ""}</p>

        </Col>
      </Row>
    </Container>
  )
}

export default ErrorHandler;
