import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

const navigate = useNavigate();
const location = useLocation();

const logout = ()=>{
localStorage.removeItem("user");
navigate("/");
};

return (
<div style={styles.sidebar}>

<h2 style={styles.logo}>Attendance</h2>

<Link
to="/dashboard"
style={linkStyle(location.pathname==="/dashboard")}
>
Dashboard
</Link>

<Link
to="/calendar"
style={linkStyle(location.pathname==="/calendar")}
>
Calendar
</Link>

<Link
to="/leave"
style={linkStyle(location.pathname==="/leave")}
>
Apply Leave
</Link>

<Link
to="/myleaves"
style={linkStyle(location.pathname==="/myleaves")}
>
My Leaves
</Link>

<Link
to="/profile"
style={linkStyle(location.pathname==="/profile")}
>
Profile
</Link>
<Link to="/colleagues" style={link("/colleagues")}>
Colleagues
</Link>
<Link
to="/change-password"
style={linkStyle(location.pathname==="/change-password")}
>
Password
</Link>

<button style={styles.logout} onClick={logout}>
Logout
</button>

</div>
);
}

const linkStyle = (active)=>({
padding:"12px 14px",
borderRadius:10,
textDecoration:"none",
color:"white",
background: active ? "rgba(236,29,37,.15)" : "transparent",
border: active ? "1px solid #ec1d25" : "1px solid transparent",
transition:".2s",
fontWeight:500
})

const styles = {

sidebar:{
width:240,
background:"rgba(2,6,23,.8)",
backdropFilter:"blur(20px)",
padding:20,
display:"flex",
flexDirection:"column",
gap:8,
borderRight:"1px solid #1f2937",
minHeight:"100vh"
},

logo:{
marginBottom:20,
fontWeight:600
},

logout:{
marginTop:"auto",
background:"transparent",
border:"1px solid #ec1d25",
color:"#ec1d25",
padding:12,
borderRadius:10,
cursor:"pointer",
transition:".2s"
}

};