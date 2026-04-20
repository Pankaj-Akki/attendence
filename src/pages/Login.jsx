import { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const q = query(
      collection(db, "employees"),
      where("phone", "==", phone.trim()),
      where("password", "==", password.trim())
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      const user = {
        id: snap.docs[0].id,
        ...snap.docs[0].data()
      };

      localStorage.setItem("user", JSON.stringify(user));

      user.role === "hr"
        ? navigate("/hr")
        : navigate("/dashboard");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.overlay}></div>

      <div style={styles.card}>

        <img
          src="https://akkistudios.com/wp-content/uploads/2024/03/akki-studios-logo-white.png"
          alt="Company Logo"
          style={styles.logo}
        />

        <input
          style={styles.input}
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

      </div>

      <div style={styles.footer}>

        <div style={styles.left}>
          <a 
            style={styles.link} 
            href="https://www.linkedin.com/company/6990098" 
            target="_blank" 
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a 
            style={styles.link} 
            href="https://www.facebook.com/akkistudios" 
            target="_blank" 
            rel="noreferrer"
          >
            Facebook
          </a>

          <a 
            style={styles.link} 
            href="https://www.instagram.com/akkistudiosindia/" 
            target="_blank" 
            rel="noreferrer"
          >
            Instagram
          </a>
          
        </div>

        <div style={styles.center}></div>

        <div style={styles.right}>
          © All rights reserved Akki Studios
        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'DM Sans', sans-serif",
    backgroundImage:
      "url(https://akkistudios.com/wp-content/uploads/2026/04/19873.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    padding:20
  },

  overlay:{
    position:"absolute",
    inset:0,
    background:"rgba(2,6,23,.75)"
  },

  card: {
    backdropFilter: "blur(20px)",
    background: "rgba(17,24,39,0.6)",
    padding: 40,
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    width: "100%",
    maxWidth:360,
    color: "white",
    border:"1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    position:"relative",
    zIndex:2
  },

  logo:{
    width:160,
    marginBottom:10,
    alignSelf:"center"
  },

  input: {
    padding: 14,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(2,6,23,0.6)",
    color: "white",
    width:"100%"
  },

  button: {
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#ec1d25,#b31217)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    width:"100%"
  },

  footer:{
    position:"absolute",
    bottom:10,
    left:20,
    right:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:12,
    color:"white",
    zIndex:2,
    flexWrap:"wrap",
    gap:10,
  },

  left:{
    display:"flex",
    gap:15,
    flexWrap:"wrap"
  },

  center:{
    textAlign:"center",
    flex:1,
    minWidth:200
  },

  right:{
    textAlign:"right"
  },

  link:{
    color:"white",
    textDecoration:"none",
    opacity:.8
  }
};
