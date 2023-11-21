import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { empty, setInState } from "../lib"
import http  from "../http"
import { Loading, SubmitButton } from "../components"
import { useNavigate, useParams } from "react-router-dom"

export const Edittask = () => {

    const [form, setForm] = useState({})
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`tasks/${params.id}`)
            .then(({data}) => setTask(data))
            .catch(() => {})
            .finally(() => setLoadingPage(false))
    }, [])

    useEffect(() => {
        if (!empty(task)){
            setForm({
                title: task.title,
                description: task.description,
                assigned: task.assigned,
                status: task.status,
                dueDate: task.dueDate
            })
        }
    }, [task])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`tasks/${params.id}`, form)
            .then(() => navigate(`/tasks/${task._id}/edit`))
            .catch((e) =>{console.error(e)})
            .finally(() => setLoading(false))
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="6" className="mx-auto">
                    <h1>Edit Task</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="6" className="mx-auto">
                    {loadingPage ? <Loading /> : <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control name="title" id="title" defaultValue={form.title}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control name="description" id="description" defaultValue={form.description}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="assigned">Assigned to</Form.Label>
                            <Form.Control name="assigned" id="assigned" defaultValue={form.assigned}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <Form.Select name="status" id="status" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.status} required>
                                <option value="true" >In-progress</option>
                                <option value="false" >Completed</option>
                            </Form.Select>

                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="dueDate" className="form-label">Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                id="dueDate"defaultValue={form.dueDate}
                                onChange={ev => 
                                    setInState(ev, form, setForm)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <SubmitButton loading={loading} icon="fa-save" 
                            label="Save" />  
                        </div>
                    </Form>}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}
