import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Papa from "papaparse";

export default function ExportCSV(){

const exportCSV = async()=>{

const snap = await getDocs(collection(db,"attendance"));

const data = snap.docs.map(d=>d.data());

const csv = Papa.unparse(data);

const blob = new Blob([csv]);
const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "attendance.csv";
a.click();
};

return(
<div className="page">
<h2>Export Attendance</h2>

<div className="card">
<button onClick={exportCSV}>
Export CSV
</button>
</div>

</div>
);
}