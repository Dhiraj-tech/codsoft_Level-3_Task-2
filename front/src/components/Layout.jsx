import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Layout.css"
import "bootstrap"
import { Link, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage, isEmpty } from "../lib"
import { clearUser, setUser } from "../store"
import { useEffect } from "react"
import http from "../http"
import { Button, Container, Nav, NavDropdown,  Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const Layout = () => {
    const user = useSelector(st => st.user.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isEmpty(user)){
            const token = fromStorage('user_token')

            if(!isEmpty(token)) {
                http.get('profile/details')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        clearStorage('user_token')
                    })
            }
        }
    }, [user])

    const handleLogout = (ev) => {
        ev.preventDefault()
        
        dispatch(clearUser())
        clearStorage('user_token')
        window.location.replace("/");
    }

    return  <>   <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
        <Link to="/" className="navbar-brand">Project Management</Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mx-auto"></Nav>
                   <Nav>
                    {isEmpty(user) ? 
                    <><Nav.Item>
                        <NavLink className="nav-link" to="/register">
                        <i className="fas fa-user-edit me-2"></i>Register
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>Login
                        </NavLink>
                </Nav.Item></> : 
                        <Nav>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/dashboard">
                                Dashboard
                            </NavLink>
                        </Nav.Item>
                            <NavDropdown title={<><i className="fa-solid fa-user-circle 
                            me-2"></i>{user.name}</>} align="end">
                                <div className="dropdown-item text-end"></div>
                                <Link to="/edit-profile" className="dropdown-item">
                                    <i className="me-2"></i>Edit Profile
                                </Link>
                                <Link to="/change-password" className="dropdown-item">
                                    <i className="me-2"></i>Change Password
                                </Link>
                                <hr className="nav-dropdown-divider" />
                                <Button variant="link" className="dropdown-item rounded-0"
                                onClick={handleLogout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                                </Button>
                            </NavDropdown>
                        </Nav>
                        }
                        
                     </Nav>
            
           
        </Navbar.Collapse>
    </Container>
</Navbar>
<Outlet />

    </>
    
  
}

