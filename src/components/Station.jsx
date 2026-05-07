import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { STATION_PASSWORDS, allMissionsData } from '../missionsData';
import { supabase } from '../supabaseClient'; // וודא שהייבוא הזה קיים

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  
 const team = JSON.parse(localStorage.getItem('race_user'));
const fullMissionData = allMissionsData[team?.username]?.[id];

// יצירת עותק נקי ללא המשתנה dest כדי למנוע קונפליקטים בסטיישן
const mission = fullMissionData ? { ...fullMissionData } : null;
if (mission && mission.dest) {
    delete mission.dest; 
}

const sendReport = async () => {
    if (team && team.username) {
      try {
        await supabase
          .from('mission_reports')
          .insert([
            { 
              username: team.username, 
              station_id: id 
            }
          ]);
        console.log("Report sent to HQ");
      } catch (error) {
        console.error("Failed to report to HQ:", error);
      }
    }
  };

  useEffect(() => {
    //DEBUG
    setIsUnlocked(true);
    setInputPass("");
    sendReport();
    window.scrollTo(0, 0);
  }, [id]);

  const handleUnlock = async () => {
    if (inputPass.trim() === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);

      // --- הוספת הדיווח לחמ"ל (AdminPanel) ---
     sendReport();
      
  };}
// פתיחת ניווט/מפה מלאה - תומך בכתובת ובנ.צ
const getGoogleMapsLink = (query) => {
  if (!query) return "#";
  // שימוש ב-search?q מאפשר לגוגל להחליט לבד אם זה נ.צ או כתובת
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
};

// הצגת המפה הקטנה בתוך האפליקציה
const getEmbedMap = (query) => {
  if (!query) return "";
  // הקישור הזה הוא הכי יציב להצגת Pin על המפה ללא API Key
  return "https://maps.google.com/maps?q=" + encodeURIComponent(query) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
};
  if (!mission) {
    return (
      <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '20px' }} dir="rtl">
        <div>
          <h2 style={{ marginBottom: '20px' }}>משימה לא נמצאה במערכת ⚠️</h2>
          <button onClick={() => navigate('/station/1')} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}>חזרה לתחנה 1</button>
        </div>
      </div>
    );
  }

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
          <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '10px' }}>משימה <span style={{ color: '#dc2626' }}>{id}</span></h1>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>בקש קוד מהמדריך המלווה למשימה</p>
          
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
            חשיפת משימה ⚡
          </button>

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
              ⬅️ משימה קודמת
            </button>
            <span style={{ color: '#334155', fontSize: '12px' }}>|</span>
            <button 
              onClick={() => navigate(`/station/${Number(id) + 1}`)}
              style={{ 
                background: 'transparent', color: '#94a3b8', 
                border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
              }}
            >
              משימה הבאה ➡️
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: '#020617', overflowY: 'auto', zIndex: 100 
    }} dir="rtl">
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ backgroundColor: '#0f172a', borderRadius: '2rem', border: '1px solid #1e293b', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          
          {mission.img && (
  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
    <img 
      src={mission.img} 
      alt="Mission" 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      onError={(e) => console.error("Image failed to load:", mission.img)}
    />
  </div>
)}

          <div style={{ padding: '25px', textAlign: 'right' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#dc2626', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>● משימה</div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: 0, lineHeight: '1.2' }}>{mission.task}</h2>
            </div>

            {mission.intel && (
              <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRight: '4px solid #dc2626', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#fecaca', fontStyle: 'italic' }}>{mission.intel}</p>
              </div>
            )}

            {mission.address && (
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>📍מיקום</span>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>מיקום יעד</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{mission.address}</div>
                </div>
              </div>
            )}

           {mission.map && (
  <div style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b', marginBottom: '20px' }}>
    <iframe
      width="100%" height="160" frameBorder="0"
      src={getEmbedMap(mission.map)} // קריאה לפונקציה המעודכנת
      title="map"
      style={{ filter: 'grayscale(1) contrast(1.2)', border: 'none' }}
    ></iframe>
    <a href={getGoogleMapsLink(mission.map)} target="_blank" rel="noopener noreferrer"
       style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold' }}>
      פתיחה ב-GOOGLE MAPS ↗
    </a>
  </div>
)}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {mission.escort && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>👤 מלווה</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>{mission.escort}</div>
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
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>{mission.group}</div>
                </div>
              )}
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Station;