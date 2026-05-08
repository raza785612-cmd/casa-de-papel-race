import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Finish = () => {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const team = JSON.parse(localStorage.getItem('race_user'));

  // הגדר כאן את הסיסמה הסופית לסיום המרוץ
  const FINAL_PASSWORD = "2026"; 

  const handleUnlock = () => {
    if (inputPass.trim() === FINAL_PASSWORD) {
      setIsUnlocked(true);
      // הפעלת קונפטי רק ברגע הפתיחה
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#fbbf24', '#ffffff']
      });
    } else {
      alert("קוד סיום שגוי ❌");
    }
  };

  // אם הדף עדיין נעול - מציגים את תיבת הכניסה
  if (!isUnlocked) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
      }} dir="rtl">
        <div style={{ 
          width: '100%', maxWidth: '350px', backgroundColor: '#0f172a', 
          padding: '30px', borderRadius: '2rem', border: '1px solid #1e293b', textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🏁</div>
          <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '10px' }}>קו הסיום</h1>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>הכנס את קוד הסיום שקיבלת מהסגל</p>
          
          <input 
            type="text" 
            inputMode="numeric" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="----"
            style={{ 
              width: '100%', background: '#020617', border: '1px solid #334155', 
              color: 'white', padding: '16px', borderRadius: '1rem', 
              marginBottom: '15px', textAlign: 'center', fontSize: '1.5rem', outline: 'none'
            }}
          />
          
          <button 
            onClick={handleUnlock} 
            style={{ 
              width: '100%', background: '#dc2626', color: 'white', border: 'none', 
              padding: '18px', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer'
            }}
          >
            סיום המרוץ ⚡
          </button>
        </div>
      </div>
    );
  }

  // אם הקוד נכון - מציגים את דף הניצחון
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
            כל הכבוד, <span style={{ color: '#dc2626' }}>{team?.username}</span>!
          </h1>
          
          <div style={{ 
            height: '2px', width: '60px', backgroundColor: '#dc2626', 
            margin: '20px auto', borderRadius: '2px' 
          }}></div>
          
          <p style={{ color: '#e2e8f0', fontSize: '20px', lineHeight: '1.6', marginBottom: '30px' }}>
            סיימת את כל המשימות של <br />
            <strong>בית הנייר</strong>
          </p>
          
          <div style={{ 
            backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid #fbbf24', 
            padding: '20px', borderRadius: '1.5rem', marginBottom: '40px' 
          }}>
            <p style={{ color: '#fbbf24', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
              נא להתעדכן מול הסגל על ההמשך
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