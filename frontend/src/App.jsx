import { BrowserRouter as Router , Route , Routes } from "react-router-dom"
import Login from "./Components/login/Login.jsx"
import Navbar from "./Components/navbar/Navbar.jsx"
import AdminLogin from "./Components/adminLogin/AdminLogin.jsx"
import UserView from "./Components/userView/UserView.jsx"
import AdminDashBoard from "./Pages/AdminDashBoard.jsx"
import UserProfile from "./Pages/UserProfile.jsx"
import EditUser from "./Components/editUser/EditUser.jsx"
import Register from "./Components/register/Register.jsx"
import PrivateRoutes from "./utils/PrivateRoutes.jsx"



function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route  element={<PrivateRoutes/>}>
                        <Route path='/' element={<Navbar/>}></Route>
                        <Route path="/profile" element={<UserProfile/>}></Route>
                    </Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/admin/login" element={<AdminLogin/>}></Route>
                </Routes>
            </Router>
            {/* <Login/> */}

            {/* <Register /> */}
            {/* <Navbar/>
            <UserProfile/> */}
            {/* <AdminLogin/> */}
            {/* <UserView></UserView> */}
            {/* <AdminDashBoard /> */}
            {/* <UserProfile/> */}
            {/* <EditUser /> */}

        </>
    )
}

export default App
