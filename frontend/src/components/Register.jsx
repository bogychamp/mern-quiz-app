import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("http://localhost:3000/users/", {
                username,
                email,
                password
            });
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError("Registration failed. Username or email might already be taken.");
        }
    };

    return (
        <div className="quiz-card fade-in" style={{ maxWidth: '450px', textAlign: 'center' }}>
            
            {/* СТИЛЬНАЯ СТРОГАЯ SVG ИКОНКА СОЗДАНИЯ ПОЛЬЗОВАТЕЛЯ */}
            <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#f0f4ff', borderRadius: '50%', marginBottom: '20px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="17" y1="11" x2="23" y2="11"></line>
                </svg>
            </div>

            <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', fontSize: '24px', color: 'var(--text-main)' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 30px 0' }}>Join QuizApp to log scores</p>

            {error && (
                <div style={{ backgroundColor: '#fde8e8', color: '#9b1c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: '500', textAlign: 'left' }}>
                    {error}
                </div>
            )}

            {success && (
                <div style={{ backgroundColor: '#def7ec', color: '#03543f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', textAlign: 'center' }}>
                    Account created successfully! Redirecting to login...
                </div>
            )}

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '14px' }}>Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => {
                            e.target.setCustomValidity(""); 
                            setUsername(e.target.value);
                        }} 
                        onInvalid={(e) => e.target.setCustomValidity("Please enter a username.")} 
                        required 
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        placeholder="Choose a username"
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '14px' }}>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => {
                            e.target.setCustomValidity(""); 
                            setEmail(e.target.value);
                        }} 
                        onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address.")}
                        required 
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        placeholder="name@example.com"
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '14px' }}>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => {
                            e.target.setCustomValidity("");
                            setPassword(e.target.value);
                        }} 
                        onInvalid={(e) => e.target.setCustomValidity("Please enter a password.")}
                        required 
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        placeholder="Create a strong password"
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '14px' }}>
                    Register
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-muted)', fontSize: '14px' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
            </p>
        </div>
    );
}

export default Register;