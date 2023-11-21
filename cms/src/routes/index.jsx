import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import { Auth, Customers, Dashboard, Profile, Tasks } from "../pages"
import { PrivateRoute } from "./PrivateRoute"

export const RouteList = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute element={<Dashboard.List />}/>} />

                <Route path="edit-profile" element={<PrivateRoute element={<Profile.Edit />}/>} />

                <Route path="change-password" element={<PrivateRoute element={<Profile.Password />}/>} />

                <Route path="customers" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Customers.List />} />
                    <Route path="create" element={<Customers.create />} />
                    <Route path=":id/edit" element={<Customers.Edit />} />
                </Route>
                <Route path="tasks" element={<PrivateRoute element={<Outlet />} />}>
                    <Route index element={<Tasks.List />} />
                    <Route path=":id/edit" element={<Tasks.Edit />} />
                </Route>

                <Route path="/login" element={<Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
