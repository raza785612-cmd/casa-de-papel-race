import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { STATION_PASSWORDS, allMissionsData } from '../missionsData';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // States לניהול הנעילה והקלט
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  
  // שליפת נתוני המשתמש והמשימה הספציפית
  const team = JSON.parse(localStorage.getItem('race_user'));
  const mission = allMissionsData[team?.username]?.[id];

  // איפוס הדף בכל פעם שה-ID בכתובת משתנה (מעבר בין תחנות)
  useEffect(() => {
    setIsUnlocked(false);
    setInputPass("");
    window.scrollTo(0, 0);
  }, [id]);

  const handleUnlock = () => {
    // בדיקה מול מערך הסיסמאות הסטטי - מוודא שאין רווחים מיותרים
    if (inputPass.trim() === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);
    } else {
      alert("קוד תחנה שגוי ❌");
    }
  };

  const getGoogleMapsLink = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const getEmbedMap = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // מקרה קצה: המשימה לא קיימת בג'ייסון עבור המשתמש הזה
  if (!mission) {
    return (
      <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '20px' }} dir="rtl">
        <div>
          <h2 style={{ marginBottom: '20px' }}>משימה לא נמצאה במערכת ⚠️</h2>
          <button onClick={() => navigate('/station/1')} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px' }}>חזרה לתחנה 1</button>
        </div>
      </div>
    );
  }

  // --- תצוגה 1: דף נעול (מבקש סיסמה) עם ניווט מהיר ---
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
          <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '10px' }}>תחנה <span style={{ color: '#dc2626' }}>{id}</span></h1>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>הזן קוד משימה לחשיפת הפרטים</p>
          
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
              padding: '18px', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            חשיפת משימה ⚡
          </button>

          {/* סרגל ניווט מהיר בתוך דף הנעילה */}
          <div style={{ 
            marginTop: '30px', display: 'flex', justifyContent: 'space-between', 
            alignItems: 'center', borderTop: '1px solid #1e293b', paddingTop: '20px' 
          }}>
            <button 
              onClick={() => navigate(`/station/${Math.max(1, Number(id) - 1)}`)}
              disabled={Number(id) <= 1}
              style={{ 
                background: 'transparent', color: Number(id) <= 1 ? '#334155' : '#94a3b8', 
                border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
              }}
            >
              ⬅️ תחנה קודמת
            </button>

            <span style={{ color: '#334155', fontSize: '12px' }}>|</span>

            <button 
              onClick={() => navigate(`/station/${Number(id) + 1}`)}
              style={{ 
                background: 'transparent', color: '#94a3b8', 
                border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
              }}
            >
              תחנה הבאה ➡️
            </button>
          </div>
        </div>

        {/* קישור חזרה למסך הראשי */}
        <button 
          onClick={() => navigate('/')}