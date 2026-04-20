import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
collection,
addDoc,
query,
where,
getDocs,
doc,
getDoc
} from "firebase/firestore";

export default function Dashboard() {

const [user,setUser] = useState(null);
const [status,setStatus] = useState("Not Marked");

const today = new Date().toISOString().split("T")[0];

useEffect(()=>{
loadUser();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const loadUser = async()=>{

const local = JSON.parse(localStorage.getItem("user"));

const snap = await getDoc(doc(db,"employees",local.id));

const freshUser = {
id: snap.id,
...snap.data()
};

setUser(freshUser);

checkToday(freshUser);
};

const checkToday = async(u)=>{

const q = query(
collection(db,"attendance"),
where("userId","==",u.id),
where("date","==",today)
);

const snap = await getDocs(q);

if(!snap.empty){
setStatus("Present");
}

};

const markAttendance = async()=>{

const q = query(
collection(db,"attendance"),
where("userId","==",user.id),
where("date","==",today)
);

const snap = await getDocs(q);

if(!snap.empty){
alert("Already marked today");
return;
}

await addDoc(collection(db,"attendance"),{
userId:user.id,
name:user.firstName,
date:today,
status:"present",
createdAt:new Date()
});

setStatus("Present");
};

if(!user) return null;

return(
<div style={styles.container}>

{/* TOP BAR */}
<div style={styles.topbar}>

<div>
<h2 style={styles.title}>
Welcome back, {user.firstName}
</h2>

<div style={styles.subtitle}>
Mark your attendance for today
</div>
</div>

</div>

<div style={styles.grid}>

{/* STATUS CARD */}
<div style={styles.card}>

<div style={styles.cardTitle}>
Today's Status
</div>

<div style={{
...styles.status,
background:
status==="Present"
? "rgba(34,197,94,.15)"
: "rgba(239,68,68,.15)"
}}>
{status}
</div>

{status !== "Present" ? (

<button 
style={styles.button}
onClick={markAttendance}
>
Mark Present
</button>

):(

<button style={styles.disabled}>
Already Marked
</button>

)}

</div>

{/* DATE CARD */}
<div style={styles.card}>

<div style={styles.cardTitle}>
Today
</div>

<div style={styles.bigDate}>
{new Date().toLocaleDateString()}
</div>

</div>

</div>

</div>
);
}

const styles={

container:{
color:"white"
},

topbar:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:25,
flexWrap:"wrap"
},

profile:{
display:"flex",
alignItems:"center",
gap:10
},

avatar:{
width:50,
height:50,
borderRadius:"50%",
objectFit:"cover",
border:"2px solid #ec1d25"
},

name:{
fontSize:14,
opacity:.8
},

title:{
margin:0
},

subtitle:{
opacity:.6,
fontSize:14
},

grid:{
display:"flex",
gap:20,
flexWrap:"wrap"
},

card:{
background:"linear-gradient(135deg,#020617,#111827)",
padding:25,
borderRadius:16,
border:"1px solid #1f2937",
minWidth:260,
flex:1
},

cardTitle:{
fontSize:14,
opacity:.7,
marginBottom:10
},

status:{
padding:"8px 14px",
borderRadius:20,
display:"inline-block",
marginBottom:20
},

button:{
padding:12,
width:"100%",
borderRadius:10,
border:"none",
background:"linear-gradient(135deg,#ec1d25,#b31217)",
color:"white",
cursor:"pointer",
fontWeight:600
},

disabled:{
padding:12,
width:"100%",
borderRadius:10,
border:"none",
background:"#374151",
color:"white"
},

bigDate:{
fontSize:22,
fontWeight:600
}

};
