import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ChangePassword(){

const user = JSON.parse(localStorage.getItem("user"));

const [password,setPassword] = useState("");
const [confirm,setConfirm] = useState("");
const [show,setShow] = useState(false);

const change = async()=>{

if(!password || !confirm)
return alert("Fill all fields");

if(password !== confirm)
return alert("Passwords do not match");

await updateDoc(doc(db,"employees",user.id),{
password
});

alert("Password Changed");

setPassword("");
setConfirm("");
};

return(
<div className="page">

<div style={styles.wrapper}>

<div style={styles.card}>

<h2 style={styles.title}>Change Password</h2>
<div style={styles.subtitle}>
Update your account password
</div>

{/* NEW PASSWORD */}
<div style={styles.field}>
<label>New Password</label>
<input
type={show ? "text" : "password"}
placeholder="Enter new password"
value={password}
onChange={e=>setPassword(e.target.value)}
style={styles.input}
/>
</div>

{/* CONFIRM PASSWORD */}
<div style={styles.field}>
<label>Confirm Password</label>
<input
type={show ? "text" : "password"}
placeholder="Confirm password"
value={confirm}
onChange={e=>setConfirm(e.target.value)}
style={styles.input}
/>
</div>

{/* SHOW PASSWORD */}
<div style={styles.showRow}>
<label style={styles.checkbox}>
<input
type="checkbox"
checked={show}
onChange={()=>setShow(!show)}
/>
<span>Show Password</span>
</label>
</div>

<button onClick={change} style={styles.button}>
Update Password
</button>

</div>
</div>
</div>
);
}

const styles={

wrapper:{
display:"flex",
justifyContent:"center",
alignItems:"center",
paddingTop:20
},

card:{
width:"100%",
maxWidth:520,
background:"linear-gradient(135deg,#020617,#111827)",
padding:35,
borderRadius:18,
border:"1px solid #1f2937",
boxShadow:"0 10px 40px rgba(0,0,0,.4)"
},

title:{
margin:0,
marginBottom:6
},

subtitle:{
opacity:.6,
marginBottom:25
},

field:{
display:"flex",
flexDirection:"column",
marginBottom:18
},

input:{
marginTop:8,
padding:14,
borderRadius:12,
border:"1px solid #1f2937",
background:"#020617",
color:"white",
outline:"none"
},

showRow:{
display:"flex",
justifyContent:"flex-start",
marginBottom:20
},

checkbox:{
display:"flex",
alignItems:"center",
gap:8,
cursor:"pointer",
opacity:.8
},

button:{
width:"100%",
padding:16,
borderRadius:14,
border:"none",
background:"linear-gradient(135deg,#ec1d25,#b31217)",
color:"white",
fontWeight:600,
cursor:"pointer",
fontSize:16
}

};