import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

export default function Login() {

    const [status, setStatus] = useState(''); // State to hold selected status
    const navigate = useNavigate(); // To change routes
  
    // Handle status change
    const handleStatusChange = (e) => {
      const selectedStatus = e.target.value;
      setStatus(selectedStatus);
      
    
      if (selectedStatus === 'admin') {
        navigate('/admin'); 
      } else if (selectedStatus === 'worker') {
        navigate('/worker');
      }
    };

    
  return (
    <div className={styles.Container}>
        <div className={styles.Content}>
            <div style={{width:"50%",height:"100%", padding:"2%"}}>

                <h1>USER LOGIN</h1>
                <label>Email</label><br></br>
                <input placeholder='Enter your email' style={{width:"100%",boxSizing:"border-box",padding:"15px",margin:"10px 0"}}></input><br></br>
                <label>Status</label><br></br>
                <select value={status} onChange={handleStatusChange} style={{width:"100%",boxSizing:"border-box",padding:"15px",margin:"10px 0"}}>
            <option value="">Select Status</option>
            <option value="admin">Admin</option>
            <option value="worker">Worker</option>
          </select>
                
            </div>
            <div style={{width:"50%",height:"100%",boxSizing:"border-box"}}>
                <img src='./timesheet.jpg' style={{width:"100%",height:"100vh"}}></img>
            </div>
        </div>

    </div>
  )
}
