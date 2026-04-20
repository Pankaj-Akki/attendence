import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout({ children }) {

const location = useLocation();
const navigate = useNavigate();

const [open,setOpen] = useState(false);
const [mobile,setMobile] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{
const check = ()=> setMobile(window.innerWidth < 768);
check();
window.addEventListener("resize",check);
return ()=>window.removeEventListener("resize",check);
},[]);

const logout = ()=>{
localStorage.removeItem("user");
navigate("/");
};

const link = (path)=>({
display:"block",
padding:"12px 14px",
borderRadius:10,
color:"white",
textDecoration:"none",
marginBottom:6,
background:
location.pathname === path
? "rgba(236,29,37,.15)"
: "transparent",
border:
location.pathname === path
? "1px solid #ec1d25"
: "1px solid transparent"
});

return (
<div style={styles.wrapper}>

{/* TOPBAR */}
<div style={styles.topbar}>

{mobile && (
<button
style={styles.menuBtn}
onClick={()=>setOpen(true)}
>
☰
</button>
)}

<img
src="https://akkistudios.com/wp-content/uploads/2024/03/akki-studios-logo-white.png"
alt="Company Logo"
style={styles.topLogo}
/>

<img
src={user?.photo || "https://i.pravatar.cc/150"}
alt="User Profile"
style={styles.profile}
onClick={()=>navigate("/profile")}
/>

</div>

{/* overlay */}
{mobile && open && (
<div
style={styles.overlay}
onClick={()=>setOpen(false)}
/>
)}

{/* SIDEBAR */}
<div style={{
...styles.sidebar,
left: mobile ? (open ? 0 : -260) : 0
}}>

<img
src="https://akkistudios.com/wp-content/uploads/2024/03/akki-studios-logo-white.png"
alt="Sidebar Logo"
style={styles.logo}
/>

<Link to="/dashboard" style={link("/dashboard")}>
Dashboard
</Link>

<Link to="/calendar" style={link("/calendar")}>
Calendar
</Link>

<Link to="/leave" style={link("/leave")}>
Apply Leave
</Link>

<Link to="/myleaves" style={link("/myleaves")}>
My Leaves
</Link>

<Link to="/colleagues" style={link("/colleagues")}>
Colleagues
</Link>

<Link to="/profile" style={link("/profile")}>
Profile
</Link>

<Link to="/change-password" style={link("/change-password")}>
Change Password
</Link>

<button onClick={logout} style={styles.logout}>
Logout
</button>

</div>

{/* CONTENT */}
<div style={{
...styles.content,
marginLeft: mobile ? 0 : 240
}}>
{children}
</div>

</div>
);
}

const styles={

wrapper:{
display:"flex"
},

topbar:{
position:"fixed",
top:0,
left:0,
right:0,
height:60,
background:"#020617",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 15px",
borderBottom:"1px solid #1f2937",
zIndex:1000
},

menuBtn:{
background:"transparent",
border:"none",
color:"white",
fontSize:22,
cursor:"pointer"
},

topLogo:{
height:30
},

profile:{
width:36,
height:36,
borderRadius:"50%",
cursor:"pointer",
border:"2px solid #ec1d25",
objectFit:"cover"
},

overlay:{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,.5)",
zIndex:999
},

sidebar:{
position:"fixed",
top:0,
bottom:0,
width:240,
background:"rgba(2,6,23,.95)",
backdropFilter:"blur(20px)",
padding:20,
borderRight:"1px solid #1f2937",
display:"flex",
flexDirection:"column",
transition:".25s",
zIndex:1000
},

logo:{
height:40,
marginBottom:20
},

logout:{
marginTop:"auto",
background:"transparent",
border:"1px solid #ec1d25",
color:"#ec1d25",
padding:12,
borderRadius:10,
cursor:"pointer"
},

content:{
flex:1,
padding:"80px 25px 25px 25px",
width:"100%"
}

};
