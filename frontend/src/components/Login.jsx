import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { setUserContext } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:3000/users/login", {
                username,
                password
            }, { withCredentials: true });

            setUserContext(res.data);
            navigate("/"); 
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="quiz-card fade-in" style={{ maxWidth: '450px', textAlign: 'center' }}>
            
            {/* СТИЛЬНЫЙ SVG ЗАМОК ДЛЯ ФОРМЫ ВХОДА */}
            <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#f0f4ff', borderRadius: '50%', marginBottom: '20px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            </div>

            <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', fontSize: '24px', color: 'var(--text-main)' }}>Sign In</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 30px 0' }}>Access your quiz account</p>
            
            {error && (
                <div style={{ backgroundColor: '#fde8e8', color: '#9b1c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: '500', fontSize: '14px', textAlign: 'left' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '14px', color: 'var(--text-main)' }}>Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        placeholder="Enter your username"
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '14px', color: 'var(--text-main)' }}>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '14px' }}>
                    Login
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-muted)', fontSize: '14px' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
            </p>
        </div>
    );
}

export default Login;