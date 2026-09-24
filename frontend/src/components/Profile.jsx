import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import axios from 'axios';

function Profile() {
    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users/profile", {
                    withCredentials: true
                });
                setProfileData(res.data);
            } catch (err) {
                setError("Failed to load profile data from the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (!user) {
        return <Navigate replace to="/login" />;
    }

    if (loading) return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading profile...</div>;
    if (error) return <div style={{ padding: '20px', color: '#dc3545', textAlign: 'center' }}>{error}</div>;

    return (
        <div className="quiz-card fade-in" style={{ maxWidth: '480px', textAlign: 'center' }}>
            
            {/* СТИЛЬНАЯ МИНИМАЛИСТИЧНАЯ SVG ИКОНКА ПРОФИЛЯ СВЕРХУ */}
            <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#f0f4ff', borderRadius: '50%', marginBottom: '20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </div>

            <h2 style={{ margin: 0, fontSize: '24px', color: 'var(--text-main)' }}>User Profile</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '5px 0 25px 0' }}>Your personal account details</p>
            
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
            
            {profileData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', padding: '0 10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6f6f6', paddingBottom: '10px' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Username</span>
                        <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{profileData.username}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6f6f6', paddingBottom: '10px' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Email Address</span>
                        <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{profileData.email}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6f6f6', paddingBottom: '10px' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Personal High Score</span>
                        <span style={{ fontWeight: '700', color: 'var(--score-color)', fontSize: '17px' }}>{profileData.highScore || 0} pts</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Database User ID</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace' }}>{profileData._id}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;