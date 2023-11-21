import "@fortawesome/fontawesome-free/css/all.min.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import http from "../http"
import { setInState } from "../lib"
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

export const Task = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState()

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('tasks', form)
            .then(() => {
                navigate('/tasks')
            })
            .catch((err) =>{ console.error(err)})
            .finally(() => setLoading(false))
    }
       

    return <Container className="my-4">
            <h1 className="mb-4">Create Task</h1>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label htmlFor="title" className="form-label">Title</Form.Label>
                  <Form.Control
                    name="title"
                    id="title"
                    placeholder="E.g. Computer Assignment submission"
                    onChange={ev => setInState(ev, form, setForm)}
                    required
                  />
                </Form.Group>
              </Row>
    
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label htmlFor="description" className="form-label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    id="description"
                    placeholder="E.g. Assignment has to submit before Sunday!"
                    style={{ height: "200px" }}
                    onChange={ev => 
                        setInState(ev, form, setForm)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label htmlFor="assigned" className="form-label">Assigned to</Form.Label>
                  <Form.Control
                    name="assigned"
                    id="assigned"
                    onChange={ev => setInState(ev, form, setForm)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <Form.Select name="status" id="status" 
                     onChange={ev => setInState(ev, form, setForm)} value={form.status} required>
                        <option value="true" >In-progress</option>
                        <option value="false" >Completed</option>
                  </Form.Select>

              </Row>
    
              <Row className="mb-3">
                <Form.Group as={Col} md={4}>
                  <Form.Label htmlFor="dueDate" className="form-label">Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    onChange={ev => 
                        setInState(ev, form, setForm)}
                    required
                  />
                </Form.Group>
              </Row>
    
              <div className="text-start">
                  <button loading={loading} type="submit" id="submit" name="submit" className="btn btn-primary"> Create Task</button>
              </div>
              
            </Form>
          </Container>
}
