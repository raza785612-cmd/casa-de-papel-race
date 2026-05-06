import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allMissionsData } from '../missionsData';

const MentorPage = () => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // חילוץ כל שמות הצוותים מהג'ייסון ישירות (כדי למנוע תלות ב-DB לצורך התצוגה)
  const teamsInJson = Object.keys(allMissionsData);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('race_user'));
    if (user && user.is_mentor) {
      setIsAuthorized(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!isAuthorized) return null;

  return (
    <div style={{ 
      padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', 
      direction: 'rtl', fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '25px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a' }}>📋 מרכז בקרה למנטורים</h1>
          <p style={{ color: '#64748b' }}>נתונים מחולצים מתוך קובץ המשימות</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {teamsInJson.map((teamName) => (
            <div key={teamName} style={{ 
              backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0'
            }}>
              
              <button 
                onClick={() => setActiveTeam(activeTeam === teamName ? null : teamName)}
                style={{
                  width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', background: 'white', border: 'none', cursor: 'pointer',
                  textAlign: 'right'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
                  👤 {teamName}
                </span>
                <span style={{ transform: activeTeam === teamName ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }}>
                  ▼
                </span>
              </button>

              {activeTeam === teamName && (
                <div style={{ padding: '0 20px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                  {/* חילוץ הנתונים לפי שם הצוות שנבחר */}
                  {Object.entries(allMissionsData[teamName]).map(([stationId, data]) => (
                    <div key={stationId} style={{ 
                      marginTop: '15px', padding: '15px', backgroundColor: 'white', 
                      borderRadius: '12px', border: '1px solid #e2e8f0' 
                    }}>
                      <div style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '8px' }}>תחנה {stationId}</div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                        <div><strong>🎯 משימה:</strong> {data.task || "חסר"}</div>
                        <div><strong>📍 מיקום:</strong> {data.address || "חסר"}</div>
                        <div><strong>👤 מלווה:</strong> {data.escort || "חסר"}</div>
                        <div><strong>👥 קבוצה:</strong> {data.group || "חסר"}</div>

                        {/* הצגת הנתון tree שקיים רק בג'ייסון */}
                        <div style={{ 
                          marginTop: '8px', padding: '10px', background: '#ecfdf5', 
                          borderRadius: '8px', border: '1px solid #d1fae5', color: '#064e3b'
                        }}>
                          <span style={{ fontSize: '11px', color: '#059669', display: 'block', fontWeight: 'bold' }}>🌳 נתון עץ (פנימי):</span>
                          <span style={{ fontWeight: 'bold' }}>{data.tree || "לא הוזן"}</span>
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
    </div>
  );
};

export default MentorPage;