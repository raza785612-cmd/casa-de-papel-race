import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti'; // אופציונלי: ספריית קונפטי קלה

const Finish = () => {
  const navigate = useNavigate();
  const team = JSON.parse(localStorage.getItem('race_user'));

  useEffect(() => {
    // הפעלת קונפטי ברגע שהדף נטען
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#fbbf24', '#ffffff']
    });
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#020617', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', overflowY: 'auto', zIndex: 100, textAlign: 'center'
    }} dir="rtl">
      
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
        <div style={{
          backgroundColor: '#0f172a', borderRadius: '3rem', padding: '50px 30px',
          border: '2px solid #dc2626', boxShadow: '0 0 50px rgba(220, 38, 38, 0.2)'
        }}>
          <div style={{ fontSize: '70px', marginBottom: '20px' }}>🏆</div>
          
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '10px' }}>
            כל הכבוד, צוות <span style={{ color: '#dc2626' }}>{team?.username}</span>!
          </h1>
          
          <div style={{ 
            height: '2px', width: '60px', backgroundColor: '#dc2626', 
            margin: '20px auto', borderRadius: '2px' 
          }}></div>
          
          <p style={{ color: '#e2e8f0', fontSize: '20px', lineHeight: '1.6', marginBottom: '30px' }}>
            סיימתם את כל המשימות של <br />
            <strong>THE AMAZING RACE</strong>
          </p>
          
          <div style={{ 
            backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid #fbbf24', 
            padding: '20px', borderRadius: '1.5rem', marginBottom: '40px' 
          }}>
            <p style={{ color: '#fbbf24', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
              נא להתעדכן מול המנטור על המיקום הסופי ונקודת המפגש.
            </p>
          </div>

          <button 
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent', color: '#64748b', border: 'none', 
              fontSize: '14px', cursor: 'pointer', textDecoration: 'underline'
            }}
          >
            יציאה מהמערכת
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finish;