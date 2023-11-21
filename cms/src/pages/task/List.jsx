import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import http from "../../http"
import { confirmAlert } from "react-confirm-alert"
import { dtFormat } from "../../lib"

export const List = () => {

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('cms/tasks')
        .then(({data}) => setTasks(data))
        .catch(() => { })
        .finally(() => setLoading(false))

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { 
                        setLoading(true)
                        http.delete(`cms/tasks/${id}`)
                            .then(() => loadData())
                            .catch(() => {})
                            .finally(() => setLoading(false)) 
                    }
                },
                {
                    label:'No',
                    onClick: () => { }
                }
            ]
        })
    }

    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col>
                    <h1>Tasks</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    { loading ?
                        <Loading/>: <DataTable searchable={['Title','Description','Assigned to','Status','Due Date', 'Created At', 'Updated At']} sortable={
                        ['Title','Description','Due Date', 'Created At', 'Updated At']} data={tasks.map(task => {
                            return {
                                'Title': task.title,
                                'Description': task.description,
                                'Assigned to': task.assigned,
                                'Status': task.status ? 'In-progress' : 'Completed',
                                'Due Date': task.dueDate,
                                'Created At': dtFormat(task.createdAt),
                                'Updated At': dtFormat(task.updatedAt),
                                'Actions': <>
                                    <Link to={`/tasks/${task._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                        <i className="fa-solid fa-edit"></i>
                                    </Link>
                                    <Button type="button" variant="danger" size="sm" 
                                    title="Delete" onClick={() => handleDelete(task._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                                </>
                            }
                        })} /> }
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}