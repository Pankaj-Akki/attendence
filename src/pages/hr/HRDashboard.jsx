import { useState } from "react";

import Attendance from "./Attendance";
import LeaveApproval from "./LeaveApproval";
import ExportCSV from "./ExportCSV";
import Colleagues from "../shared/Colleagues";

export default function HRDashboard(){

const [tab,setTab] = useState("attendance");

return(
<div>

<h1>HR Dashboard</h1>

<div style={styles.tabs}>

<button
onClick={()=>setTab("attendance")}
className={tab==="attendance" ? "activeTab":""}
>
Attendance
</button>

<button
onClick={()=>setTab("leave")}
className={tab==="leave" ? "activeTab":""}
>
Leave Approval
</button>

<button
onClick={()=>setTab("export")}
className={tab==="export" ? "activeTab":""}
>
Export CSV
</button>

<button
onClick={()=>setTab("chat")}
className={tab==="chat" ? "activeTab":""}
>
Chat
</button>

</div>

<div style={{marginTop:20}}>

{tab==="attendance" && <Attendance/>}
{tab==="leave" && <LeaveApproval/>}
{tab==="export" && <ExportCSV/>}
{tab==="chat" && <Colleagues/>}

</div>

</div>
);
}

const styles={
tabs:{
display:"flex",
gap:10,
marginTop:20,
flexWrap:"wrap"
}
}