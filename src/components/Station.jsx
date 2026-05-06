import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMissionsData, STATION_PASSWORDS, groupsData } from "../missionsData";
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = parseInt(id);

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputPass, setInputPass] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  // 1. טעינת נתוני משתמש ובדיקת סטטוס נעילה
  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) { 
      navigate(`/login?s=${id}`); 
      return; 
    }
    
    const user = JSON.parse(savedUser);
    setTeam(user);

    const unlockedStations = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
    if (unlockedStations.includes(`station_${id}`)) {
      setIsUnlocked(true);
    }
    
    setLoading(false);
  }, [id, navigate]);

  // 2. פתיחת התחנה עם קוד גישה (מתוך missionsData)
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

  // 3. סיום משימה ומעבר לתחנה הבאה (מול Supabase)
  const handleNext = async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('station_keys')
        .select('password')
        .eq('station_id', String(currentId))
        .single();

      if (dbError || !data) {
        alert("שגיאה: לא נמצאה סיסמת סיום לתחנה זו בבסיס הנתונים.");
        return;
      }

      const userInput = prompt("סיסמת מלווה לסיום התחנה:");

      if (userInput === data.password) {
        // דיווח לחמ"ל
        await supabase.from('mission_reports').upsert({
          username: team?.username,
          station_id: String(currentId),
          status: 'completed'
        }, { onConflict: 'username' });

        // מעבר לתחנה הבאה
        navigate(`/station/${currentId + 1}`);
        window.scrollTo(0, 0);
      } else {
        alert("קוד שגוי! המשימה עדיין לא הושלמה.");
      }
    } catch (err) {
      console.error(err);
      alert("תקלת תקשורת בביצוע הפעולה.");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic">INITIALIZING...</div>;

  const mission = allMissionsData[team?.username]?.[id] || {};
  const groupInfo = mission.group ? groupsData[mission.group]?.[id] : null;

  // תצוגת מסך נעול
  if (!isUnlocked && STATION_PASSWORDS[id]) {
    return (
      <div className="station-page flex items-center justify-center bg-slate-950 min-h-screen p-4 text-right" dir="rtl">
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #fbbf24', width: '100%', maxWidth: '380px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🔒</div>
          <h2 style={{ color: '#fbbf24', marginBottom: '20px' }}>תחנה {id} נעולה</h2>
          <input 
            type="text" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="הזן קוד גישה"
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: error ? '2px solid #ef4444' : '1px solid #1e293b', background: '#020617', color: 'white', textAlign: 'center', marginBottom: '15px', outline: 'none' }}
          />
          <button onClick={handleUnlock} style={{ width: '100%', background: '#fbbf24', color: 'black', fontWeight: '900', padding: '15px', borderRadius: '12px', cursor: 'pointer' }}>פתח משימה</button>
        </div>
      </div>
    );
  }

  // תצוגת תוכן התחנה
  return (
    <div className="station-page" dir="rtl">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right', borderTop: '4px solid #dc2626' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
             <div>
                <h1 style={{ fontSize: '2.8rem', margin: 0, color: 'white' }}>{id}</h1>
                <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '10px', margin: 0 }}>STATION_ACCESS</p>
             </div>
             <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{team?.username}</p>
                {mission.group && <p style={{ margin: 0, fontSize: '12px', color: '#fbbf24' }}>{mission.group}</p>}
             </div>
          </header>

          <main>
            {mission.task && (
              <div style={{ background: 'rgba(220,38,38,0.1)', padding: '18px', borderRadius: '12px', borderRight: '4px solid #dc2626', marginBottom: '15px' }}>
                <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>המשימה הנוכחית:</p>
                <p style={{ fontSize: '1.15rem', fontWeight: '800', color: 'white', margin: 0 }}>{mission.task}</p>
              </div>
            )}

            {mission.hint && (
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #3b82f6', marginBottom: '15px' }}>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', margin: 0 }}>💡 {mission.hint}</p>
              </div>
            )}

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px', fontSize: '13px', color: '#94a3b8' }}>
              {mission.address && <p style={{ margin: '0 0 8px 0', color: 'white' }}>📍 <strong>מיקום:</strong> {mission.address}</p>}
              {mission.intel && <p style={{ margin: 0 }}>🔍 <strong>מודיעין:</strong> {mission.intel}</p>}
            </div>

            {mission.map && (
              <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                <iframe title="map" width="100%" height="180" src={`https://maps.google.com/maps?q=${encodeURIComponent(mission.map)}&z=15&output=embed`} style={{ border: 0 }}></iframe>
              </div>
            )}
          </main>

          <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
            {currentId > 1 && (
              <button 
                onClick={() => navigate(`/station/${currentId - 1}`)}
                style={{ flex: 1, padding: '15px', borderRadius: '12px', background: '#1e293b', color: 'white', fontWeight: 'bold', border: 'none' }}
              >
                הקודם
              </button>
            )}
            <button 
              onClick={handleNext}
              style={{ flex: 2, padding: '15px', borderRadius: '12px', background: '#dc2626', color: 'white', fontWeight: 'bold', border: 'none' }}
            >
              סיימתי / הבא
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Station;