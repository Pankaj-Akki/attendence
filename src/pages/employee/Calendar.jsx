import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { db } from "../../firebase";
import {
collection,
query,
where,
getDocs,
addDoc
} from "firebase/firestore";

export default function CalendarView() {

const [user,setUser] = useState(null);
const [attendance,setAttendance] = useState([]);
const [leaves,setLeaves] = useState([]);

useEffect(()=>{

const u = JSON.parse(localStorage.getItem("user"));
setUser(u);

if(u){
loadAttendance(u);
loadLeaves(u);
}

},[]);

const loadAttendance = async (u)=>{

const q = query(
collection(db,"attendance"),
where("userId","==",u.id)
);

const snap = await getDocs(q);
setAttendance(snap.docs.map(d=>d.data()));

};

const loadLeaves = async (u)=>{

const q = query(
collection(db,"leaves"),
where("userId","==",u.id),
where("status","==","approved")
);

const snap = await getDocs(q);
setLeaves(snap.docs.map(d=>d.data()));

};

const today = new Date().toISOString().split("T")[0];

const getStatus = (date)=>{

const d = date.toISOString().split("T")[0];

// present
const present = attendance.find(a=>a.date === d);
if(present) return "present";

// leave approved
const leave = leaves.find(l=> d >= l.from && d <= l.to);
if(leave) return "leave";

// past day = absent
if(d < today) return "absent";

return null;
};

const markToday = async(date)=>{

const clicked = date.toISOString().split("T")[0];

if(clicked !== today){
alert("You can only mark today");
return;
}

const exists = attendance.find(a=>a.date === today);

if(exists){
alert("Already marked");
return;
}

await addDoc(collection(db,"attendance"),{
userId:user.id,
name:user.firstName,
date:today,
status:"present",
createdAt:new Date()
});

loadAttendance(user);

};

const getMonthlySummary = ()=>{

let present=0;
let absent=0;
let leave=0;

const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();

const days = new Date(year,month+1,0).getDate();

for(let i=1;i<=days;i++){

const d = new Date(year,month,i)
.toISOString()
.split("T")[0];

const isPresent = attendance.find(a=>a.date === d);
const isLeaveDay = leaves.find(l=> d >= l.from && d <= l.to);

if(isPresent) present++;
else if(isLeaveDay) leave++;
else if(d < today) absent++;

}

return {present,absent,leave,total:days};

};

const summary = getMonthlySummary();

return(
<div className="page">

<h2 style={styles.title}>
Attendance Calendar
</h2>

{/* SUMMARY */}
<div style={styles.summary}>

<div style={styles.card}>
<span>Present</span>
<h3>{summary.present}</h3>
</div>

<div style={styles.card}>
<span>Absent</span>
<h3>{summary.absent}</h3>
</div>

<div style={styles.card}>
<span>Leave</span>
<h3>{summary.leave}</h3>
</div>

</div>

{/* CALENDAR */}
<div style={styles.calendarCard}>

<Calendar
onClickDay={markToday}
tileContent={({date})=>{

const status = getStatus(date);

if(status==="present")
return <div style={styles.present}></div>;

if(status==="absent")
return <div style={styles.absent}></div>;

if(status==="leave")
return <div style={styles.leave}></div>;

return null;

}}
/>

</div>

{/* LEGEND */}
<div style={styles.legend}>

<div style={styles.legendItem}>
<div style={styles.present}></div>
Present
</div>

<div style={styles.legendItem}>
<div style={styles.absent}></div>
Absent
</div>

<div style={styles.legendItem}>
<div style={styles.leave}></div>
Leave
</div>

</div>

</div>
);
}

const styles={

title:{
marginBottom:20
},

summary:{
display:"flex",
gap:20,
marginBottom:20,
flexWrap:"wrap"
},

card:{
flex:1,
minWidth:120,
background:"linear-gradient(135deg,#020617,#111827)",
padding:20,
borderRadius:14,
border:"1px solid #1f2937"
},


calendarCard:{
background:"#020617",
padding:20,
borderRadius:16,
border:"1px solid #1f2937"
},

present:{
height:8,
width:8,
background:"#22c55e",
borderRadius:"50%",
margin:"0 auto",
marginTop:2
},

absent:{
height:8,
width:8,
background:"#ef4444",
borderRadius:"50%",
margin:"0 auto",
marginTop:2
},

leave:{
height:8,
width:8,
background:"#facc15",
borderRadius:"50%",
margin:"0 auto",
marginTop:2
},

legend:{
marginTop:20,
display:"flex",
gap:20,
flexWrap:"wrap"
},

legendItem:{
display:"flex",
alignItems:"center",
gap:6
}

};