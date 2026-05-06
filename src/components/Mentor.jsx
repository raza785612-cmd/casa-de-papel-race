import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allMissionsData } from '../missionsData';

const MentorPage = () => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- מנגנון הגנה: בדיקת הרשאות מנטור ---
  useEffect(() => {
    const storedUser = localStorage.getItem('race_user');
    
    if (!storedUser) {
      // אם אין משתמש בכלל, שלח לדף התחברות
      navigate('/');
      return;
    }

    const user = JSON.parse(storedUser);
    
    if (user.is_mentor === true) {
      setIsAuthorized(true);
    } else {
      // אם הוא משתמש רגיל (לא מנטור), חסום אותו
      alert("גישה חסומה: דף זה מיועד למנטורים בלבד.");
      navigate('/');
    }
  }, [navigate]);

  if (!isAuthorized) return null; // לא מציג כלום עד סיום הבדיקה

  // שליפת רשימת הצוותים מהג'ייסון
  const allTeams = Object.keys(allMissionsData);

  return (
    <div style={{ 
      padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', 
      direction: 'rtl', fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* כותרת דף */}
        <header style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '5px' }}>
            🕵️ מלווים
          </h1>
          <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#1e293b', color: '#fbbf24', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            מחובר כמנהל מערכת
          </div>
        </header>

        {/* רשימת הצוותים (Accordion) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allTeams.map((teamName) => (
            <div key={teamName} style={{ 
              backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0'
            }}>
              
              {/* כפתור שם הצוות */}
              <button 
                onClick={() => setActiveTeam(activeTeam === teamName ? null : teamName)}
                style={{
                  width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', background: 'white', border: 'none', cursor: 'pointer',
                  textAlign: 'right'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
                   {teamName}
                </span>
                <span style={{ 
                  transform: activeTeam === teamName ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s', fontSize: '14px', color: '#94a3b8'
                }}>
                  ▼
                </span>
              </button>

              {/* תוכן נפתח - פירוט תחנות לכל צוות */}
              {activeTeam === teamName && (
                <div style={{ padding: '0 20px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                  {Object.entries(allMissionsData[teamName]).map(([id, m]) => (
                    <div key={id} style={{ 
                      marginTop: '15px', padding: '15px', backgroundColor: 'white', 
                      borderRadius: '12px', border: '1px solid #e2e8f0' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ background: '#dc2626', color: 'white', padding: '2px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                          תחנה {id}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                        <div><strong style={{ color: '#64748b' }}>🎯 משימה:</strong> {m.task}</div>
                        <div><strong style={{ color: '#64748b' }}>📍 מיקום:</strong> {m.address}</div>
                        <div><strong style={{ color: '#64748b' }}>👤 מלווה:</strong> {m.escort}</div>
                        <div><strong style={{ color: '#64748b' }}>👥 קבוצה/עץ:</strong> {m.group}</div>

                        {/* --- המשתנה שרק המנטור רואה --- */}
                        <div style={{ 
                          marginTop: '10px', padding: '10px', background: '#ecfdf5', 
                          borderRadius: '10px', border: '1px solid #d1fae5'
                        }}>
                          <div style={{ fontSize: '11px', color: '#059669', fontWeight: 'bold', marginBottom: '2px' }}>🌳 נתון "עץ" (מידע פנימי):</div>
                          <div style={{ fontSize: '16px', fontWeight: '900', color: '#064e3b' }}>
                            {m.tree || "⚠️ לא הוזן נתון עץ"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* כפתור יציאה מסודר */}
        <button 
          onClick={() => { localStorage.clear(); navigate('/'); }}
          style={{ 
            width: '100%', marginTop: '30px', padding: '15px', background: 'transparent', 
            color: '#94a3b8', border: '1px solid #cbd5e1', borderRadius: '12px', cursor: 'pointer'
          }}
        >
          התנתקות מהמערכת
        </button>
      </div>
    </div>
  );
};

export default MentorPage;