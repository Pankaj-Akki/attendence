import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function MyLeaves(){

const [data,setData] = useState([]);
const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{
load();
},[]);

const load = async()=>{

const q = query(
collection(db,"leaves"),
where("userId","==",user.id)
);

const snap = await getDocs(q);

setData(
snap.docs.map(d=>({
id:d.id,
...d.data()
}))
);

};

const cancelLeave = async(id)=>{

if(!id){
alert("Invalid leave");
return;
}

const ok = window.confirm("Cancel this leave?");
if(!ok) return;

await deleteDoc(doc(db,"leaves",id));

load();

};

return(
<div className="page">

<h2>My Leaves</h2>

{data.length===0 && (
<div style={styles.empty}>
No leaves applied
</div>
)}

<div style={styles.grid}>

{data.map((l,i)=>(
<div style={styles.card} key={i}>

<div style={styles.row}>

<div>
<div style={styles.date}>
{l.from} → {l.to}
</div>

<div style={styles.reason}>
{l.reason}
</div>
</div>

<span style={
l.status==="approved"
? styles.approved
: l.status==="rejected"
? styles.rejected
: styles.pending
}>
{l.status}
</span>

</div>

<div style={styles.footer}>

<button
style={styles.cancel}
onClick={()=>cancelLeave(l.id)}
>
Cancel Leave
</button>

</div>

</div>
))}

</div>

</div>
);
}

const styles={

grid:{
display:"grid",
gap:15,
marginTop:15
},

card:{
background:"linear-gradient(135deg,#020617,#111827)",
padding:20,
borderRadius:14,
border:"1px solid #1f2937",
boxShadow:"0 10px 25px rgba(0,0,0,.3)"
},

row:{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
},

date:{
fontWeight:600,
fontSize:14
},

reason:{
opacity:.7,
fontSize:13,
marginTop:4
},

footer:{
marginTop:15,
display:"flex",
justifyContent:"flex-end"
},

cancel:{
background:"rgba(239,68,68,.15)",
color:"#ef4444",
border:"1px solid rgba(239,68,68,.3)",
padding:"6px 14px",
borderRadius:8,
cursor:"pointer"
},

approved:{
background:"rgba(34,197,94,.15)",
color:"#22c55e",
padding:"4px 10px",
borderRadius:20,
fontSize:12
},

pending:{
background:"rgba(250,204,21,.15)",
color:"#facc15",
padding:"4px 10px",
borderRadius:20,
fontSize:12
},

rejected:{
background:"rgba(239,68,68,.15)",
color:"#ef4444",
padding:"4px 10px",
borderRadius:20,
fontSize:12
},

empty:{
opacity:.6,
marginTop:10
}

};