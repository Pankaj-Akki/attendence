import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Leave() {

const user = JSON.parse(localStorage.getItem("user"));

const [type,setType] = useState("full");
const [from,setFrom] = useState("");
const [to,setTo] = useState("");
const [half,setHalf] = useState("first");
const [shortFrom,setShortFrom] = useState("");
const [shortTo,setShortTo] = useState("");
const [reason,setReason] = useState("");

const apply = async () => {

if(type==="full" && (!from || !to))
return alert("Select dates");

if(type==="half" && !from)
return alert("Select date");

if(type==="short" && (!shortFrom || !shortTo))
return alert("Select time");

await addDoc(collection(db,"leaves"),{
userId:user.id,
name:user.firstName,
type,
from,
to,
half,
shortFrom,
shortTo,
reason,
status:"pending",
createdAt:new Date()
});

alert("Leave Applied");

};

return(
<div className="page">

<h2>Apply Leave</h2>

<div style={styles.card}>

{/* leave type */}
<div style={styles.tabs}>

<button
style={type==="full"?styles.active:styles.tab}
onClick={()=>setType("full")}
>
Full Day
</button>

<button
style={type==="half"?styles.active:styles.tab}
onClick={()=>setType("half")}
>
Half Day
</button>

<button
style={type==="short"?styles.active:styles.tab}
onClick={()=>setType("short")}
>
Short Leave
</button>

</div>

{/* FULL DAY */}
{type==="full" && (
<div style={styles.row}>

<div style={styles.field}>
<label>From Date</label>
<input
type="date"
value={from}
onChange={e=>setFrom(e.target.value)}
style={styles.input}
/>
</div>

<div style={styles.field}>
<label>To Date</label>
<input
type="date"
value={to}
onChange={e=>setTo(e.target.value)}
style={styles.input}
/>
</div>

</div>
)}

{/* HALF DAY */}
{type==="half" && (
<div style={styles.row}>

<div style={styles.field}>
<label>Date</label>
<input
type="date"
value={from}
onChange={e=>setFrom(e.target.value)}
style={styles.input}
/>
</div>

<div style={styles.field}>
<label>Select Half</label>
<select
value={half}
onChange={e=>setHalf(e.target.value)}
style={styles.input}
>
<option value="first">First Half</option>
<option value="second">Second Half</option>
</select>
</div>

</div>
)}

{/* SHORT */}
{type==="short" && (
<div style={styles.row}>

<div style={styles.field}>
<label>From Time</label>
<input
type="time"
value={shortFrom}
onChange={e=>setShortFrom(e.target.value)}
style={styles.input}
/>
</div>

<div style={styles.field}>
<label>To Time</label>
<input
type="time"
value={shortTo}
onChange={e=>setShortTo(e.target.value)}
style={styles.input}
/>
</div>

</div>
)}

<div style={styles.fieldFull}>
<label>Reason</label>
<textarea
placeholder="Enter leave reason..."
value={reason}
onChange={e=>setReason(e.target.value)}
style={styles.textarea}
/>
</div>

<button style={styles.button} onClick={apply}>
Apply Leave
</button>

</div>
</div>
);
}

const styles={

card:{
width:"100%",
background:"linear-gradient(135deg,#020617,#111827)",
padding:25,
borderRadius:16,
border:"1px solid #1f2937"
},

tabs:{
display:"flex",
gap:10,
marginBottom:20,
flexWrap:"wrap"
},

tab:{
background:"#020617",
border:"1px solid #1f2937",
padding:"10px 16px",
borderRadius:8,
color:"white",
cursor:"pointer"
},

active:{
background:"#ec1d25",
border:"1px solid #ec1d25",
padding:"10px 16px",
borderRadius:8,
color:"white",
cursor:"pointer"
},

row:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:20,
marginBottom:15
},

field:{
display:"flex",
flexDirection:"column",
gap:6
},

fieldFull:{
display:"flex",
flexDirection:"column",
gap:6,
marginTop:10
},

input:{
width:"100%",
padding:12,
background:"#020617",
border:"1px solid #1f2937",
borderRadius:10,
color:"white"
},

textarea:{
width:"100%",
padding:12,
background:"#020617",
border:"1px solid #1f2937",
borderRadius:10,
color:"white",
minHeight:100
},

button:{
marginTop:20,
background:"#ec1d25",
border:"none",
padding:"14px 20px",
borderRadius:12,
color:"white",
fontWeight:600,
cursor:"pointer",
width:200
}

};