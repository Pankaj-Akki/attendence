import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
collection,
getDocs,
query,
where
} from "firebase/firestore";

export default function Attendance(){

const [employees,setEmployees] = useState([]);
const [selected,setSelected] = useState(null);
const [logs,setLogs] = useState([]);
const [leaves,setLeaves] = useState([]);

const [month,setMonth] = useState(new Date().getMonth());
const [year,setYear] = useState(new Date().getFullYear());

useEffect(()=>{
loadEmployees();
},[]);

const loadEmployees = async()=>{

const snap = await getDocs(collection(db,"employees"));

const list = snap.docs
.map(d=>({id:d.id,...d.data()}))
.filter(emp=>emp.role !== "hr");

setEmployees(list);
};

const openEmployee = async(emp)=>{

setSelected(emp);

const q = query(
collection(db,"attendance"),
where("userId","==",emp.id)
);

const snap = await getDocs(q);
setLogs(snap.docs.map(d=>d.data()));

const lq = query(
collection(db,"leaves"),
where("userId","==",emp.id),
where("status","==","approved")
);

const lsnap = await getDocs(lq);
setLeaves(lsnap.docs.map(d=>d.data()));
};

const getMonthData = ()=>{

if(!selected) return [];

const days = new Date(year,month+1,0).getDate();
const today = new Date().toISOString().split("T")[0];

let data=[];

for(let i=1;i<=days;i++){

const d = new Date(year,month,i)
.toISOString()
.split("T")[0];

const present = logs.find(l=>l.date===d);

const leave = leaves.find(l=>d>=l.from && d<=l.to);

let status="future";

if(present) status="present";
else if(leave) status="leave";
else if(d < today) status="absent";

data.push({
date:d,
status,
time:present?.createdAt?.toDate
? present.createdAt.toDate().toLocaleTimeString()
: "-"
});

}

return data;
};

const monthData = getMonthData();

return(
<div className="page">

<h2>Employee Attendance</h2>

{/* employee grid */}
<div style={styles.grid}>

{employees.map(emp=>(
<div
key={emp.id}
style={styles.card}
onClick={()=>openEmployee(emp)}
>

<div style={styles.avatar}>
{emp.firstName?.charAt(0)}
</div>

<div>{emp.firstName}</div>

</div>
))}

</div>

{/* employee box */}
{selected && (

<div style={styles.logs}>

<div style={styles.logsHeader}>

<h3>{selected.firstName} Attendance</h3>

<button
style={styles.close}
onClick={()=>setSelected(null)}
>
Close
</button>

</div>

{/* filters */}
<div style={styles.filters}>

<select
value={month}
onChange={e=>setMonth(Number(e.target.value))}
>
{[
"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"
].map((m,i)=>(
<option key={i} value={i}>{m}</option>
))}
</select>

<select
value={year}
onChange={e=>setYear(Number(e.target.value))}
>
<option>2024</option>
<option>2025</option>
<option>2026</option>
<option>2027</option>
</select>

</div>

<table style={styles.table}>

<thead>
<tr>
<th style={styles.th}>Date</th>
<th style={styles.th}>Status</th>
<th style={styles.th}>Time</th>
</tr>
</thead>

<tbody>

{monthData.map((d,i)=>(
<tr key={i}>

<td style={styles.td}>{d.date}</td>

<td style={styles.td}>
<span style={
d.status==="present"
? styles.present
: d.status==="leave"
? styles.leave
: d.status==="absent"
? styles.absent
: styles.future
}>
{d.status}
</span>
</td>

<td style={styles.td}>{d.time}</td>

</tr>
))}

</tbody>

</table>

</div>

)}

</div>
);
}

const styles={

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
gap:20,
marginTop:20
},

card:{
background:"#020617",
padding:20,
borderRadius:14,
border:"1px solid #1f2937",
cursor:"pointer",
textAlign:"center"
},

avatar:{
width:50,
height:50,
borderRadius:"50%",
background:"#ec1d25",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"0 auto 10px"
},

logs:{
marginTop:30,
background:"#020617",
padding:20,
borderRadius:16,
border:"1px solid #1f2937"
},

logsHeader:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
},

filters:{
display:"flex",
gap:10,
marginBottom:15
},

close:{
background:"#ec1d25",
border:"none",
padding:"6px 12px",
borderRadius:8,
color:"white"
},

table:{
width:"100%",
borderCollapse:"collapse"
},

th:{
textAlign:"left",
padding:10,
borderBottom:"1px solid #1f2937"
},

td:{
padding:10,
borderBottom:"1px solid #111827"
},

present:{
background:"rgba(34,197,94,.15)",
color:"#22c55e",
padding:"4px 10px",
borderRadius:20
},

absent:{
background:"rgba(239,68,68,.15)",
color:"#ef4444",
padding:"4px 10px",
borderRadius:20
},

leave:{
background:"rgba(250,204,21,.15)",
color:"#facc15",
padding:"4px 10px",
borderRadius:20
},

future:{
opacity:.3
}

};