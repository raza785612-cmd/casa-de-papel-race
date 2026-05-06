import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { STATION_PASSWORDS, allMissionsData } from '../missionsData';
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const team = JSON.parse(localStorage.getItem('race_user'));

  useEffect(() => {
    setIsUnlocked(false);
    setInputPass("");
    window.scrollTo(0, 0);
  }, [id]);

  const handleUnlock = () => {
    if (inputPass === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);
    } else {
      alert("קוד תחנה שגוי");
    }
  };

  const handleNext = async () => {
    await supabase.from('mission_reports').insert([{ username: team?.username, station_id: id }]);
    navigate(`/station/${Number(id) + 1}`);
  };

  const mission = allMissionsData[team?.username]?.[id] || {};

  const getGoogleMapsLink = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const getEmbedMap = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // דף נעול (משתמש ב-CSS הקיים שלך ב-index.css שנראה טוב)
  if (!isUnlocked) {
    return (
      <div className="app-container">
        <div className="card">
          <h1>STATION <span className="red-text">{id}</span></h1>
          <p style={{ marginBottom: '20px', opacity: 0.7 }}>הזן קוד משימה לחשיפת הפרטים</p>
          <input 
            type="text" inputMode="numeric" value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="קוד סודי"
          />
          <button onClick={handleUnlock}>חשיפת משימה</button>
        </div>
      </div>
    );
  }

  // דף המשימה - משתמש בסטייל אגרסיבי כדי לא להימרח
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#020617', overflowY: 'auto', display: 'block', zIndex: 100
    }} dir="rtl">
      
      <div style={{
        maxWidth: '400px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px'
      }}>
        
        {/* כרטיס המשימה */}
        <div style={{ backgroundColor: '#0f172a', borderRadius: '2rem', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          
          {/* תמונה */}
          {mission.img && (
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img src={mission.img} alt="Mission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ padding: '25px', textAlign: 'right' }}>
            {/* כותרת */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#dc2626', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>● משימה פעילה</div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: 0, lineHeight: '1.2' }}>{mission.task}</h2>
            </div>

            {/* מודיעין */}
            {mission.intel && (
              <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRight: '4px solid #dc2626', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#fecaca', fontStyle: 'italic' }}>{mission.intel}</p>
              </div>
            )}

            {/* כתובת */}
            {mission.address && (
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>מיקום היעד</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{mission.address}</div>
                </div>
              </div>
            )}

            {/* מפה */}
            {mission.map && (
              <div style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b', marginBottom: '20px' }}>
                <div style={{ width: '100%', height: '160px' }}>
                  <iframe
                    width="100%" height="100%" frameBorder="0"
                    src={getEmbedMap(mission.map)}
                    title="map"
                    style={{ filter: 'grayscale(1) contrast(1.2)' }}
                  ></iframe>
                </div>
                <a href={getGoogleMapsLink(mission.map)} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold' }}>
                  ניווט ב-GOOGLE MAPS
                </a>
              </div>
            )}

            {/* ליווי וזמן */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {mission.escort && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>👤 ליווי</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.escort}</div>
                </div>
              )}
              {mission.hours && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>🕒 שעת יעד</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#dc2626' }}>{mission.hours}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 7. כפתורי ניווט (סיום וחזרה) */}
<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '12px', 
  marginTop: '10px' 
}}>
  
  {/* כפתור סיום משימה */}
  <button 
    onClick={handleNext}
    style={{
      width: '100%', 
      py: '20px', // אם אתה משתמש ב-inline style השתמש ב-padding: '20px'
      padding: '20px',
      backgroundColor: '#dc2626', 
      color: 'white', 
      borderRadius: '1.5rem', 
      border: 'none', 
      fontSize: '18px', 
      fontWeight: '900', 
      cursor: 'pointer', 
      boxShadow: '0 10px 20px rgba(220, 38, 38, 0.3)',
      transition: 'transform 0.1s'
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    סיימנו, המשימה הבאה ⚡
  </button>

  {/* כפתור חזרה - יופיע רק מתחנה 2 ומעלה */}
  {Number(id) > 1 && (
    <button 
      onClick={() => navigate(`/station/${Number(id) - 1}`)}
      style={{
        width: '100%', 
        padding: '12px',
        backgroundColor: 'transparent', 
        color: '#94a3b8', 
        borderRadius: '1rem', 
        border: '1px solid #334155', 
        fontSize: '14px', 
        fontWeight: 'bold', 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <span>⬅️</span> חזרה למשימה הקודמת
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default Station;