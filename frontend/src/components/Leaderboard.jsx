import { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get("http://localhost:3000/quiz/leaderboard");
                setLeaders(res.data);
            } catch (err) {
                console.error("Error loading leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);


    const renderRankBadge = (index) => {
        if (index === 0) {
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                    <circle cx="12" cy="12" r="10" fill="#f1c40f" stroke="#f39c12" strokeWidth="2"/>
                    <path d="M12 7v10M10 9h2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            );
        }
        if (index === 1) {
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                    <circle cx="12" cy="12" r="10" fill="#b2bec3" stroke="#7f8c8d" strokeWidth="2"/>
                    <path d="M9 10a3 3 0 0 1 6 0c0 1-1 1.5-2 2.5l-4 3.5h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        }
        if (index === 2) {
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                    <circle cx="12" cy="12" r="10" fill="#e67e22" stroke="#d35400" strokeWidth="2"/>
                    <path d="M9 9h5l-2.5 3.5M9 15h4a2.5 2.5 0 0 0 0-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        }
        return <span style={{ fontWeight: '600', color: 'var(--text-muted)', paddingLeft: '6px', fontSize: '14px' }}>{index + 1}</span>;
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)' }}>Loading leaderboard...</div>;

    return (
        <div className="leaderboard-card fade-in">
            <h2 style={{ textAlign: 'center', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '10px 0 5px 0' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                Leaderboard
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 25px 0' }}>Top global quiz performers</p>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '20px' }} />
            
            {leaders.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No records yet. Be the first!</p>
            ) : (
                <table className="leaderboard-table">
                    <thead>
                        {/* ИСПРАВЛЕНИЕ: Используем переменную var(--bg-color) вместо жесткого белого цвета */}
                        <tr style={{ backgroundColor: 'var(--bg-color)' }}>
                            <th style={{ width: '70px', paddingLeft: '15px', borderRadius: '8px 0 0 8px' }}>Rank</th>
                            <th>Player</th>
                            <th style={{ textAlign: 'right', paddingRight: '15px', borderRadius: '0 8px 8px 0' }}>High Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map((player, index) => (
                            <tr key={player._id}>
                                <td style={{ verticalAlign: 'middle', paddingLeft: '15px' }}>
                                    {renderRankBadge(index)}
                                </td>
                                <td style={{ fontWeight: '600', color: 'var(--text-main)', verticalAlign: 'middle' }}>{player.username}</td>
                                <td className="leaderboard-score" style={{ verticalAlign: 'middle', paddingRight: '15px' }}>{player.highScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Leaderboard;