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
      <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h2>משימה לא נמצאה במערכת ⚠️</h2>
      </div>
    );
  }

  // --- תצוגה 1: דף נעול (מבקש סיסמה) ---
  if (!isUnlocked) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#020617', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
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
        </div>
      </div>
    );
  }

  // --- תצוגה 2: דף המשימה הפתוח ---
  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: '#020617', overflowY: 'auto', zIndex: 100 
    }} dir="rtl">
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* כרטיס המשימה העיקרי */}
        <div style={{ backgroundColor: '#0f172a', borderRadius: '2rem', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          
          {/* תמונה (אם קיימת) */}
          {mission.img && (
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img src={mission.img} alt="Mission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ padding: '25px', textAlign: 'right' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#dc2626', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>● משימת שטח</div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: 0, lineHeight: '1.2' }}>{mission.task}</h2>
            </div>

            {/* מודיעין */}
            {mission.intel && (
              <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRight: '4px solid #dc2626', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#fecaca', fontStyle: 'italic' }}>{mission.intel}</p>
              </div>
            )}

            {/* כתובת ומיקום */}
            {mission.address && (
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>מיקום יעד</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{mission.address}</div>
                </div>
              </div>
            )}

            {/* מפה אינטראקטיבית */}
            {mission.map && (
              <div style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b', marginBottom: '20px' }}>
                <iframe
                  width="100%" height="160" frameBorder="0"
                  src={getEmbedMap(mission.map)}
                  title="map"
                  style={{ filter: 'grayscale(1) contrast(1.2)' }}
                ></iframe>
                <a href={getGoogleMapsLink(mission.map)} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold' }}>
                  פתיחה ב-GOOGLE MAPS ↗
                </a>
              </div>
            )}

            {/* גריד נתונים (מלווה, שעות, קבוצה) - שים לב: אין כאן TREE */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {mission.escort && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>👤 מלווה</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.escort}</div>
                </div>
              )}
              {mission.hours && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>🕒 זמנים</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#dc2626' }}>{mission.hours}</div>
                </div>
              )}
              {mission.group && (
                <div style={{ gridColumn: '1 / span 2', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>👥 קבוצה רשומה</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.group}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* כפתור סיום משימה */}
        <button 
          onClick={() => navigate(`/station/${Number(id) + 1}`)} 
          style={{ 
            width: '100%', padding: '20px', backgroundColor: '#dc2626', color: 'white', 
            borderRadius: '1.5rem', border: 'none', fontSize: '18px', fontWeight: '900',
            boxShadow: '0 10px 20px rgba(220, 38, 38, 0.3)', cursor: 'pointer'
          }}
        >
          סיימנו, המשימה הבאה ⚡
        </button>

        {/* חזרה לתחנה קודמת (אופציונלי) */}
        {Number(id) > 1 && (
          <button 
            onClick={() => navigate(`/station/${Number(id) - 1}`)} 
            style={{ width: '100%', padding: '12px', background: 'transparent', color: '#94a3b8', border: '1px solid #334155', borderRadius: '1rem', cursor: 'pointer' }}
          >
            ⬅️ חזרה לתחנה {Number(id) - 1}
          </button>
        )}
      </div>
    </div>
  );
};

// ה-Export שחובה להוסיף כדי שה-Build יצליח
export default Station;