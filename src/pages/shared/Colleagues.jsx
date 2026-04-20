import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import {
collection,
getDocs,
query,
where,
addDoc,
orderBy,
onSnapshot
} from "firebase/firestore";

export default function Colleagues(){

const [users,setUsers] = useState([]);
const [selected,setSelected] = useState(null);
const [messages,setMessages] = useState([]);
const [text,setText] = useState("");

const bottomRef = useRef();

const me = JSON.parse(localStorage.getItem("user"));
const today = new Date().toISOString().split("T")[0];

useEffect(()=>{
loadUsers();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const loadUsers = async()=>{

const snap = await getDocs(collection(db,"employees"));

const list = await Promise.all(
snap.docs.map(async d=>{

const user = {id:d.id,...d.data()};

if(me.role !== "hr" && user.id === me.id) return null;

const q = query(
collection(db,"attendance"),
where("userId","==",user.id),
where("date","==",today)
);

const a = await getDocs(q);

return {
...user,
present: !a.empty
};

})
);

setUsers(list.filter(Boolean));
};

const chatId = (u)=>{
return [me.id,u.id].sort().join("_");
};

useEffect(()=>{

if(!selected) return;

const q = query(
collection(db,"messages"),
where("chatId","==",chatId(selected)),
orderBy("createdAt","asc")
);

const unsub = onSnapshot(q,(snap)=>{
setMessages(snap.docs.map(d=>d.data()));
});

return ()=>unsub();

},[selected]);

useEffect(()=>{
bottomRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);

const send = async()=>{

if(!text) return;

await addDoc(collection(db,"messages"),{
chatId:chatId(selected),
sender:me.id,
text,
createdAt:new Date()
});

setText("");
};

return(
<div style={styles.wrapper}>

<div style={styles.left}>

<h2>Colleagues</h2>

<div style={styles.grid}>
{users.map(u=>(
<div
key={u.id}
style={styles.card}
onClick={()=>setSelected(u)}
>

<div style={styles.avatarWrap}>
<img
src={u.photo || "https://i.pravatar.cc/150"}
alt="User"
style={styles.avatar}
/>

<div style={{
...styles.dot,
background: u.present ? "#22c55e" : "#ef4444"
}}/>
</div>

<div style={{flex:1}}>
<div style={styles.name}>
{u.firstName}
</div>

<div style={{
...styles.tag,
background: u.present
? "rgba(34,197,94,.15)"
: "rgba(239,68,68,.15)",
color: u.present ? "#22c55e" : "#ef4444"
}}>
{u.present ? "Present" : "Absent"}
</div>

</div>

</div>
))}
</div>

</div>

<div style={styles.chat}>

{!selected && (
<div style={styles.empty}>
Select employee to chat
</div>
)}

{selected && (
<>

<div style={styles.header}>
<img
src={selected.photo || "https://i.pravatar.cc/150"}
alt="Chat User"
style={styles.chatAvatar}
/>

<div>
<div>{selected.firstName}</div>
<div style={styles.sub}>
{selected.present ? "Present" : "Absent"}
</div>
</div>
</div>

<div style={styles.messages}>

{messages.map((m,i)=>(
<div
key={i}
style={
m.sender === me.id
? styles.myMsg
: styles.msg
}
>
{m.text}
</div>
))}

<div ref={bottomRef}/>

</div>

<div style={styles.inputRow}>

<input
value={text}
onChange={e=>setText(e.target.value)}
placeholder="Type message..."
style={styles.input}
/>

<button onClick={send} style={styles.send}>
Send
</button>

</div>

</>
)}

</div>

</div>
);
}

const styles={
wrapper:{ display:"flex", gap:20, height:"calc(100vh - 120px)" },
left:{ width:320 },
grid:{ display:"flex", flexDirection:"column", gap:10, marginTop:10 },
card:{ display:"flex", alignItems:"center", gap:12, background:"#020617", padding:12, borderRadius:12, border:"1px solid #1f2937", cursor:"pointer" },
avatarWrap:{ position:"relative" },
avatar:{ width:42, height:42, borderRadius:"50%" },
dot:{ position:"absolute", bottom:0, right:0, width:10, height:10, borderRadius:"50%", border:"2px solid #020617" },
name:{ fontWeight:500 },
tag:{ fontSize:11, padding:"3px 8px", borderRadius:20, marginTop:3, display:"inline-block" },
chat:{ flex:1, background:"#020617", border:"1px solid #1f2937", borderRadius:14, display:"flex", flexDirection:"column" },
empty:{ margin:"auto", opacity:.5 },
header:{ display:"flex", alignItems:"center", gap:10, padding:15, borderBottom:"1px solid #1f2937" },
chatAvatar:{ width:35, height:35, borderRadius:"50%" },
sub:{ fontSize:12, opacity:.6 },
messages:{ flex:1, padding:15, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 },
msg:{ alignSelf:"flex-start", background:"#111827", padding:"8px 12px", borderRadius:10, maxWidth:"60%" },
myMsg:{ alignSelf:"flex-end", background:"#ec1d25", padding:"8px 12px", borderRadius:10, maxWidth:"60%" },
inputRow:{ display:"flex", gap:10, padding:10, borderTop:"1px solid #1f2937" },
input:{ flex:1, padding:10, borderRadius:8, border:"1px solid #1f2937", background:"#020617", color:"white" },
send:{ background:"#ec1d25", border:"none", padding:"10px 15px", borderRadius:8, color:"white", cursor:"pointer" }
};
