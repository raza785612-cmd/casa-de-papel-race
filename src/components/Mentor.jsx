import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allMissionsData, STATION_PASSWORDS } from '../missionsData'; 

const Mentor = () => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('race_user'));
    if (user && user.is_mentor) {
      setIsAuthorized(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!isAuthorized) return null;

  const teams = Object.keys(allMissionsData);

  // פונקציה לפתיחת מפה בחלון חדש בצורה בטוחה
  const openMap = (location) => {
    if (!location) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', direction: 'rtl', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>📋 סגל</h1>
        </header>

        {teams.map((teamName) => (
          <div key={teamName} style={{ marginBottom: '12px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setActiveTeam(activeTeam === teamName ? null : teamName)}
              style={{ width: '100%', padding: '20px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>👤 {teamName}</span>
              <span style={{ color: '#64748b' }}>{activeTeam === teamName ? '▲' : '▼'}</span>
            </button>

            {activeTeam === teamName && (
              <div style={{ padding: '0 20px 20px', backgroundColor: '#f8fafc' }}>
                {Object.entries(allMissionsData[teamName]).map(([id, data]) => (
                  <div key={id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '12px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '2px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                            תחנה {id}
                        </div>
                        <div style={{ fontSize: '13px', color: '#1e293b', backgroundColor: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold' }}>
                            🔑 קוד: {STATION_PASSWORDS[id] || "---"}
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '15px' }}><strong>🎯 משימה: </strong> {data.task || "---"}</div>
                      <div style={{ fontSize: '15px' }}><strong>📍 כתובת: </strong> {data.address || "---"}</div>
                      
                      {/* כפתור למפה שמתבסס על המשתנה map */}
                      {data.map && (
                        <button 
                          onClick={() => openMap(data.map)}
                          style={{ alignSelf: 'flex-start', padding: '5px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          📍 פתח מיקום מדויק (נ"צ)
                        </button>
                      )}

                      {data.dest && (
                        <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '15px' }}>
                          <strong>🏁 יעד סופי: </strong> {data.dest}
                        </div>
                      )}

                      <div style={{ fontSize: '15px' }}><strong>👤 מלווה: </strong> {data.escort || "---"}</div>
                      <div style={{ fontSize: '15px' }}><strong>🕒 שעות: </strong> {data.hours || "---"}</div>
                      <div style={{ fontSize: '15px' }}><strong>👥 קבוצה: </strong> {data.group || "---"}</div>

                      <div style={{ marginTop: '10px', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '10px', border: '1px solid #d1fae5', textAlign: 'center' }}>
                        <div style={{ color: '#059669', fontSize: '12px', fontWeight: 'bold' }}>🌳 עץ:</div>
                        <div style={{ color: '#064e3b', fontSize: '18px', fontWeight: '900' }}>{data.tree || "לא הוזן"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentor;