import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";

export const RouteList = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<Pages.Home />} />

                <Route path="register" element={<Pages.Register />}></Route>

                <Route path="login" element={<Pages.Login />}></Route>

                <Route path="tasks/:id/edit" element={<Pages.Edittask />} />

                <Route path="dashboard" element={<Pages.Dashboard />} />

                <Route path="tasks" element={<Pages.Task />} />

                <Route path="edit-profile" element={<Pages.EditProfile />} />

                <Route path="change-password" element={<Pages.ChangePassword />} />

                <Route path="*" element={<h1 className="text-center">404 Page Not Found</h1>} />
            </Route>
            
        </Routes>
    </BrowserRouter>
    
}