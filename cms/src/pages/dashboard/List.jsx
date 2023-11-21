import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import http from '../../http';
import { useSelector } from 'react-redux';

export const List = () => {

  const user = useSelector(st => st.user.value || '')
  const [customers, setCustomers] = useState(0);
  const [tasks, setTasks] = useState(0);

  useEffect(() => {
    http.get('cms/customers').then((response) => {
      setCustomers(response.data);
    });
  }, []);
  const countcustomer = customers.length;
  
  
  useEffect(() => {
    http.get('cms/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);
  const counttask = tasks.length;

  return (
    <Container>
      <Row>
      <Col xs="12">
             <Row>
                <Col>
                    <h1 className='text-center mt-2'><u>Dashboard</u></h1>
               </Col>
           </Row>
       </Col>

        <Col xs="3" className="mt-3">
          <Card>
            <Card.Header>Total Customers<i className="fa-solid fa-user-friends ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{countcustomer}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs="3" className="mt-3">
          <Card>
            <Card.Header>Total Tasks<i className="fa-solid fa-tasks ms-2"></i></Card.Header>
            <Card.Body>
              <Card.Title>{counttask}</Card.Title>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


