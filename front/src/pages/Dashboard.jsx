import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../cms/src/components";
import http from "../../../cms/src/http";
import { confirmAlert } from "react-confirm-alert"

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => http.get('tasks')
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
                        http.delete(`tasks/${id}`)
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

  return (
    <>
      <Container className="my-4">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h1> Dashboard</h1>
          <div className="d-flex align-items-center gap-2">
          <Button variant="primary" onClick={() => {
                navigate("/tasks");
              }}>Add Task
          <i className="fa-solid fa-plus ms-2"
              type="button"
              title="Create task"
            />
      </Button>
            
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned to</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          { loading ?
                        <Loading/>:
          <tbody>
           
                    {tasks.map((task) => (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.assigned}</td>
                        <td>{task.status ? 'In-progress' : 'Completed'}</td>
                        <td>{task.dueDate}</td>
                        <td className="d-flex gap-2">
                          
                            
                              <Link to={`/tasks/${task._id}/edit`} className="btn 
                                    btn-dark btn-sm me-2" title="Edit">
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  style={{ color: "#ffffff" }}
                                />
                              </Link>
                            
                          <Button
                            size="sm"
                            variant="danger"
                            title="Delete Task"
                            onClick={() => handleDelete(task._id)}
                          >
                            <i className="fa-solid fa-trash" />
                          </Button>
                          
                          
                        </td>
                      </tr>
                    ))}
                 
              
            
          </tbody>}
        </Table>
      </Container>
    </>
  );
}
