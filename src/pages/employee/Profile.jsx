import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile(){

const [user,setUser]=useState(null);

useEffect(()=>{
setUser(JSON.parse(localStorage.getItem("user")));
},[]);

const save = async()=>{

await updateDoc(doc(db,"employees",user.id),user);

localStorage.setItem("user",JSON.stringify(user));

alert("Profile Updated");
};

if(!user) return null;

return(
<div style={styles.page}>

<div style={styles.header}>
<h2>My Profile</h2>
</div>

<div style={styles.card}>

{/* avatar */}
<div style={styles.avatarWrap}>

<label style={styles.avatarLabel}>

<input
type="file"
style={{display:"none"}}
onChange={(e)=>{
const reader = new FileReader();
reader.onload = ()=>{
setUser({...user,photo:reader.result});
};
reader.readAsDataURL(e.target.files[0]);
}}
/>

<img
src={user.photo || "https://i.pravatar.cc/150"}
style={styles.avatar}
/>

<div style={styles.edit}>Change</div>

</label>

</div>

{/* form grid */}
<div style={styles.grid}>

<div>
<label style={styles.label}>First Name</label>
<input
style={styles.input}
value={user.firstName || ""}
onChange={e=>setUser({...user,firstName:e.target.value})}
/>
</div>

<div>
<label style={styles.label}>Last Name</label>
<input
style={styles.input}
value={user.lastName || ""}
onChange={e=>setUser({...user,lastName:e.target.value})}
/>
</div>

<div>
<label style={styles.label}>Email</label>
<input
style={styles.input}
value={user.email || ""}
onChange={e=>setUser({...user,email:e.target.value})}
/>
</div>

<div>
<label style={styles.label}>Blood Group</label>
<input
style={styles.input}
value={user.blood || ""}
onChange={e=>setUser({...user,blood:e.target.value})}
/>
</div>

</div>

<div style={{marginTop:20}}>
<label style={styles.label}>Address</label>
<textarea
style={styles.textarea}
value={user.address || ""}
onChange={e=>setUser({...user,address:e.target.value})}
/>
</div>

<button style={styles.button} onClick={save}>
Save Profile
</button>

</div>
</div>
);
}

const styles={

page:{
color:"white"
},

header:{
marginBottom:20
},

card:{
background:"linear-gradient(135deg,#020617,#111827)",
padding:30,
borderRadius:16,
border:"1px solid #1f2937",
maxWidth:900
},

avatarWrap:{
display:"flex",
justifyContent:"center",
marginBottom:25
},

avatarLabel:{
cursor:"pointer",
position:"relative",
display:"inline-block"
},

avatar:{
width:110,
height:110,
borderRadius:"50%",
objectFit:"cover",
border:"3px solid #ec1d25"
},

edit:{
position:"absolute",
bottom:-5,
left:"50%",
transform:"translateX(-50%)",
background:"#ec1d25",
padding:"4px 10px",
borderRadius:20,
fontSize:12
},

grid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:20
},

label:{
fontSize:13,
opacity:.7,
display:"block",
marginBottom:6
},

input:{
width:"100%",
padding:12,
borderRadius:10,
border:"1px solid #1f2937",
background:"#020617",
color:"white"
},

textarea:{
width:"100%",
padding:12,
borderRadius:10,
border:"1px solid #1f2937",
background:"#020617",
color:"white",
minHeight:100
},

button:{
marginTop:25,
width:"100%",
padding:14,
borderRadius:12,
border:"none",
background:"linear-gradient(135deg,#ec1d25,#b31217)",
color:"white",
fontWeight:600,
cursor:"pointer"
}

};