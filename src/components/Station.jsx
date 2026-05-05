import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMissionsData, STATION_PASSWORDS, groupsData } from "../missionsData";
import { supabase } from '../supabaseClient';


const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [inputPass, setInputPass] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) { navigate(`/login?s=${id}`); return; }
    
    const user = JSON.parse(savedUser);
    setTeam(user);

    // בדיקת נעילה
    const unlockedStations = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
    if (unlockedStations.includes(`station_${id}`)) {
      setIsUnlocked(true);
    }
    
    setLoading(false);
  }, [id, navigate]);

  const handleUnlock = () => {
    if (inputPass === STATION_PASSWORDS[id]) {
      const unlocked = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
      if (!unlocked.includes(`station_${id}`)) {
        unlocked.push(`station_${id}`);
        localStorage.setItem('unlocked_stations', JSON.stringify(unlocked));
      }
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono">INITIALIZING...</div>;

  const mission = allMissionsData[team?.username]?.[id] || {};
  const groupInfo = mission.group ? groupsData[mission.group]?.[id] : null;

  // --- תצוגת מסך נעילה ---
  if (!isUnlocked && STATION_PASSWORDS[id]) {
    return (
      <div className="station-page flex items-center justify-center bg-slate-950 min-h-screen p-4 text-right" dir="rtl">
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #fbbf24', width: '100%', maxWidth: '380px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔒</div>
          <h2 style={{ color: '#fbbf24', margin: '0 0 10px 0' }}>תחנה {id} נעולה</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '25px' }}>הזן קוד גישה כדי לחשוף את המשימה</p>
          
          <input 
            type="text" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="קוד גישה"
            style={{ 
                width: '100%', padding: '15px', borderRadius: '12px', 
                border: error ? '2px solid #ef4444' : '1px solid #1e293b', 
                background: '#020617', color: 'white', textAlign: 'center', 
                fontSize: '1.2rem', marginBottom: '15px', outline: 'none'
            }}
          />
          
          <button onClick={handleUnlock} style={{ width: '100%', background: '#fbbf24', color: 'black', fontWeight: '900', padding: '15px', borderRadius: '12px', fontSize: '1rem' }}>
            אישור כניסה
          </button>
          {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px', fontWeight: 'bold' }}>קוד שגוי. נסה שוב.</p>}
        </div>
      </div>
    );
  }
const reportExecution = async () => {
  try {
    const { error } = await supabase
      .from('mission_reports')
      .upsert(
        { 
          username: team?.username, 
          station_id: String(id),
          status: 'completed'
        }, 
        { onConflict: 'username' } // אומר לסופבייס: אם השם כבר קיים, תעדכן את השורה שלו במקום ליצור חדשה
      );

    if (error) throw error;
    alert('✅ המיקום עודכן בחמ"ל!');
  } catch (error) {
    console.error('Error:', error.message);
    alert('❌ תקלה בדיווח');
  }
};
  // --- תצוגת התוכן המלאה ---
  return (
    <div className="station-page" dir="rtl">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right', borderTop: '4px solid #dc2626' }}>
          
          {/* כותרת הצוות והתחנה */}
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
             <div>
                <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>{id}</h1>
                <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '10px', margin: 0 }}>STATION_ID</p>
             </div>
             <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'white' }}>{team?.username}</p>
                {mission.group && <p style={{ margin: 0, fontSize: '11px', color: '#fbbf24', fontWeight: 'bold' }}>{mission.group}</p>}
             </div>
          </header>

          <main>
            {/* משימה ראשית */}
            {mission.task && (
              <div style={{ background: 'rgba(220,38,38,0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #dc2626', marginBottom: '15px' }}>
                <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>המשימה:</p>
                <p style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'white' }}>{mission.task}</p>
              </div>
            )}

            {/* רמז (אם יש) */}
            {mission.hint && (
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #3b82f6', marginBottom: '15px' }}>
                <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>💡 רמז לתחנה:</p>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0, color: 'white' }}>{mission.hint}</p>
              </div>
            )}

            {/* בלוק קבוצתי */}
            {groupInfo?.participants && (
              <div style={{ background: 'rgba(251, 191, 36, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.3)', marginBottom: '15px' }}>
                <p style={{ color: '#fbbf24', fontSize: '10px', margin: '0 0 5px 0', fontWeight: 'bold' }}>👥 חברי הקבוצה בתחנה:</p>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>{groupInfo.participants}</p>
              </div>
            )}

            {/* נתונים טכניים (מיקום, מודיעין, זמן, ליווי) */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mission.address && (
                <div style={{ borderBottom: (mission.intel || mission.hours) ? '1px solid #1e293b' : 'none', paddingBottom: '8px' }}>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>📍 מיקום</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', margin: 0, color: 'white' }}>{mission.address}</p>
                </div>
              )}
              
              {mission.intel && (
                <div style={{ borderBottom: (mission.hours || mission.escort) ? '1px solid #1e293b' : 'none', paddingBottom: '8px' }}>
                  <p style={{ color: '#ef4444', fontSize: '10px', margin: 0 }}>🔍 מודיעין שטח</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>{mission.intel}</p>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {mission.hours && (
                  <div>
                    <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>🕒 חלון זמן</p>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0, color: 'white' }}>{mission.hours}</p>
                  </div>
                )}
                {mission.escort && (
                  <div>
                    <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>👤 ליווי</p>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0, color: 'white' }}>{mission.escort}</p>
                  </div>
                )}
              </div>
            </div>

            {/* --- מפה וניווט --- */}
            {mission.map && (
              <div style={{ marginTop: '15px' }}>
                <div style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b', height: '180px' }}>
                  <iframe
                    title="map" width="100%" height="100%" style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mission.map)}&z=15&output=embed`}
                  ></iframe>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mission.map)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    marginTop: '10px', padding: '12px', background: '#1e293b', color: 'white',
                    borderRadius: '12px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', border: '1px solid #334155'
                  }}
                >
                  📍 ניווט ב-Google Maps
                </a>
              </div>
            )}

            {/* --- תמונה (נספח) --- */}
            {mission.img && (
              <div style={{ marginTop: '15px', borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b', background: '#020617' }}>
                 <p style={{ color: '#64748b', fontSize: '9px', padding: '8px 12px 0 0', margin: 0, fontWeight: 'bold' }}>נספח חזותי מסומן</p>
                 <img src={mission.img} alt="Mission Intel" style={{ width: '100%', display: 'block', marginTop: '5px' }} />
              </div>
            )}

          </main>
          
          <button 
  style={{ 
    marginTop: '25px', 
    width: '100%', 
    padding: '15px', 
    borderRadius: '12px', 
    background: '#dc2626', 
    color: 'white', 
    fontWeight: 'bold', 
    border: 'none',
    cursor: 'pointer', // מוסיף סימן של יד במעבר עכבר
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' // קצת עומק לעיצוב
  }}
  onClick={reportExecution}
>
  סיימתי את המשימה
</button>
        </div>
      </div>
    </div>
  );
};

export default Station;
// "פרנקל": {
//       "1": { hint: "", escort: "" },
//       "8": { group: "", address: " ", intel: "  ",task: "",escort: "", hours: "",img: "", map:"" }
//       "8": { group: "", address: " ", intel: "  ",task: "",escort: "", hours: "",img: "", map:"" }
//       "4": { group: "", address: "", intel:"",task:"",escort:"", hours: "", img: "", map:"" },
//       "5": { group: "", address: "", intel:"",task:"",escort:"", hours: "", img: "", map:"" },
//       "6": { group: "", address: "", intel:"",task:"",escort:"", hours: "", img: "", map:"" },
//       "7": { group: "", address: " ", intel: "",task: " ",escort:"", hours: "",img: "" , map:""},
//       "8": { group: "", address: " ", intel: "  ",task: "",escort: "", hours: "",img: "", map:"" }
//     }

//###########################################//
