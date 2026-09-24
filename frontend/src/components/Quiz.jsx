import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

function Quiz() {
    const { user } = useContext(UserContext);
    
    
    const [gameStarted, setGameStarted] = useState(false);
    
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(false); // Изначально false
    const [error, setError] = useState("");
    const [finalScore, setFinalScore] = useState(null);
    const [feedback, setFeedback] = useState(""); 
    const [isAnimating, setIsAnimating] = useState(true);

    const startQuiz = async () => {
        setLoading(true);
        setError("");
        setFinalScore(null);
        setFeedback("");
        setIsAnimating(true);
        setGameStarted(true); 
        try {
            const res = await axios.get("http://localhost:3000/quiz/start", {
                withCredentials: true //browser send cookies/session on the server for backend to recognise user
            });
            setCurrentQuestion(res.data);
        } catch (err) {
            setError("Failed to start the quiz. Please check the backend connection.");
            setGameStarted(false); 
        } finally {
            setLoading(false);
        }
    };

  

    const handleAnswerClick = async (selectedAnswer) => {
        setIsAnimating(false);
        try {
            const res = await axios.post("http://localhost:3000/quiz/answer",  //reacr send text of answer on server
                { answer: selectedAnswer }, 
                { withCredentials: true }
            );

            setFeedback(`${res.data.message} (+${res.data.pointsEarned} points)`);//server count pount by Eiler formula

            setTimeout(() => {// function wait 1,2 seconds to use read if answer is right
                setFeedback(""); //message green if right and red if wrong
                if (res.data.nextQuestion) {
                    setCurrentQuestion(res.data.nextQuestion);
                    setIsAnimating(true);
                } else {
                    setFinalScore(res.data.finalScore);
                    setCurrentQuestion(null);
                    setGameStarted(false); 
                }
            }, 1200); 

        } catch (err) {
            setError("Error submitting answer.");
            setIsAnimating(true);
        }
    };

    
    if (!user) {
        return (
            <div className="guest-background">
                <div className="quiz-card fade-in" style={{ maxWidth: '540px', textAlign: 'center', padding: '55px 40px' }}>
                    <div style={{ marginBottom: '35px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', width: '110px', height: '110px', backgroundColor: 'var(--primary-color)', borderRadius: '50%', filter: 'blur(28px)', opacity: '0.15' }} />
                        <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
                            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8" />
                            <path d="M12 18h.01" strokeWidth="3" />
                            <path d="M16 18a4 4 0 0 1-8 0" />
                            <circle cx="12" cy="12" r="10" opacity="0.1" fill="var(--primary-color)"/>
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '30px', color: 'var(--text-main)', margin: '0 0 16px 0', fontWeight: '800' }}>Test Your Knowledge</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15.5px', lineHeight: '1.6', margin: '0 0 38px 0' }}>
                        Join thousands of players and test your skills. Create an account to track your progress and compete on the global leaderboard.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px', margin: '0 auto' }}>
                        <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Sign In to Play</Link>
                        <Link to="/register" style={{ textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>Create Account</Link>
                    </div>
                </div>
            </div>
        );
    }

   
    if (!gameStarted && finalScore === null) {
        return (
            <div className="guest-background">
                <div className="quiz-card fade-in" style={{ maxWidth: '540px', textAlign: 'center', padding: '50px' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                    </div>
                    <h2 style={{ fontSize: '28px', color: 'var(--text-main)' }}>Ready, {user.username}?</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: '20px 0 35px 0' }}>
                        You are about to start a 10-question challenge. <br/>
                        Points are awarded based on speed and accuracy. <br/>
                        <b>Good luck!</b>
                    </p>
                    <button className="btn-primary" onClick={startQuiz} style={{ width: '200px', fontSize: '17px' }}>
                        Start Quiz Now
                    </button>
                </div>
            </div>
        );
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-muted)' }}>Preparing your questions...</div>;
    if (error) return <div className="quiz-card" style={{ textAlign: 'center', color: '#dc3545' }}>{error} <br/> <button onClick={() => setGameStarted(false)}>Back</button></div>;

    
    if (finalScore !== null) {
        return (
            <div className="quiz-card fade-in" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '28px' }}>Quiz Completed! 🏆</h2>
                <p style={{ fontSize: '22px', margin: '25px 0' }}>
                    Final Score: <strong style={{ color: 'var(--score-color)' }}>{finalScore}</strong>
                </p>
                <button className="btn-primary" onClick={startQuiz}>Play Again</button>
            </div>
        );
    }

    
    return (
        <div className={`quiz-card ${isAnimating ? 'fade-in' : ''}`}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '6px', backgroundColor: 'var(--primary-color)', width: `${(currentQuestion?.questionNumber / 10) * 100}%`, transition: 'width 0.3s ease' }} />
            <div className="quiz-metadata">
                <span></span> 
                <span>Question: {currentQuestion?.questionNumber} of 10</span>
            </div>
            <h3 className="quiz-question" dangerouslySetInnerHTML={{ __html: currentQuestion?.question }} />
            <div className="quiz-answers-container">
                {currentQuestion?.options.map((answer, index) => (
                    <button key={index} className="quiz-answer-btn" onClick={() => handleAnswerClick(answer)} dangerouslySetInnerHTML={{ __html: answer }} />
                ))}
            </div>
            {feedback && <div className="quiz-feedback">{feedback}</div>}
        </div>
    );
}

export default Quiz;