import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useUserContext } from '../context/usercontext';

export default function Login() {
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { users } = useUserContext(); // Get users from context

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleLogin = () => {
        const user = users.find(user => user.email === email); // Find user by email
        if (user) {
            if (status === 'admin') {
                navigate('/admin');
            } else if (status === 'worker') {
                navigate('/worker', { state: { email: user.email } }); // Pass email to Worker
            }
        } else {
            alert('Invalid email address or status'); // Show alert for invalid email or status
        }
    };


    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div style={{ width: "50%", height: "100%", padding: "2%" }}>
                    <h1>USER LOGIN</h1>
                    <label>Email</label><br />
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", padding: "15px", margin: "10px 0" }}
                    /><br />
                    <label>Status</label><br />
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        style={{ width: "100%", boxSizing: "border-box", padding: "15px", margin: "10px 0" }}
                    >
                        <option value="">Select Status</option>
                        <option value="admin">Admin</option>
                        <option value="worker">Worker</option>
                    </select>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div style={{ width: "50%", height: "100%", boxSizing: "border-box" }}>
                    <img src='./timesheet.jpg' style={{ width: "100%", height: "100vh" }} alt="Timesheet" />
                </div>
            </div>
        </div>
    );
}
