import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

export default function LeaveApproval(){

  const [data,setData] = useState([]);

  useEffect(()=>{
    load();
  },[]);

  const load = async()=>{
    const snap = await getDocs(collection(db,"leaves"));
    setData(
      snap.docs.map(d=>({
        id:d.id,
        ...d.data()
      }))
    );
  };

  const approve = async(id)=>{
    await updateDoc(doc(db,"leaves",id),{
      status:"approved"
    });
    load();
  };

  const reject = async(id)=>{
    await updateDoc(doc(db,"leaves",id),{
      status:"rejected"
    });
    load();
  };

  return(
    <div className="page">
      <h2>Leave Approval</h2>

      {data.map(l=>(
        <div className="card" key={l.id}>
          <h4>{l.name}</h4>
          <p>{l.from} → {l.to}</p>
          <p>{l.reason}</p>

          {l.status==="pending" && (
            <div>
              <button onClick={()=>approve(l.id)}>
                Approve
              </button>

              <button
                className="danger"
                onClick={()=>reject(l.id)}
              >
                Reject
              </button>
            </div>
          )}

          <span className={`status ${l.status}`}>
            {l.status}
          </span>
        </div>
      ))}
    </div>
  )
}