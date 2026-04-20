import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/employee/Dashboard";
import Calendar from "./pages/employee/Calendar";
import Leave from "./pages/employee/Leave";
import MyLeaves from "./pages/employee/MyLeaves";
import Profile from "./pages/employee/Profile";
import ChangePassword from "./pages/employee/ChangePassword";
import Colleagues from "./pages/shared/Colleagues";
import HRDashboard from "./pages/hr/HRDashboard";

import Layout from "./components/Layout";

function App(){
return(
<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>} />

<Route 
path="/dashboard" 
element={<Layout><Dashboard/></Layout>} 
/>

<Route 
path="/calendar" 
element={<Layout><Calendar/></Layout>} 
/>

<Route 
path="/leave" 
element={<Layout><Leave/></Layout>} 
/>

<Route 
path="/myleaves" 
element={<Layout><MyLeaves/></Layout>} 
/>

<Route 
path="/profile" 
element={<Layout><Profile/></Layout>} 
/>
<Route path="/change-password" element={
<Layout><ChangePassword/></Layout>
} />

<Route path="/hr" element={<HRDashboard/>} />


<Route
path="/colleagues"
element={<Layout><Colleagues/></Layout>}
/>
</Routes>

</BrowserRouter>
);
}

export default App;