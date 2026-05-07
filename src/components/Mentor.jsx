import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allMissionsData, STATION_PASSWORDS } from '../missionsData'; 

const Mentor = () => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

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

  // פונקציה שאוספת כתובות מכל הצוותים ללא כפילויות למפה הזירתית
  const getGlobalMapUrl = () => {
    const allAddresses = [];
    
    Object.values(allMissionsData).forEach(team => {
      Object.values(team).forEach(m => {
        if (m.address && m.address.trim() !== "") {
          allAddresses.push(m.address.trim());
        }
      });
    });
    
    // סינון כפילויות בעזרת Set
    const uniqueAddresses = [...new Set(allAddresses)];
    
    // איחוד הכתובות למחרוזת חיפוש אחת
    const query = uniqueAddresses.join(' | ');
    
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', direction: 'rtl', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '15px' }}>📋 סגל</h1>
            
            {/* כפתור פתיחת מפה זירתית */}
            <button 
              onClick={() => setShowMapModal(true)}
              style={{
                width: '100%', padding: '15px', backgroundColor: '#1e293b', color: '#fbbf24',
                borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px',
                cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              📍 תצוגת מפה זירתית (כל המשימות)
            </button>
        </header>

        {/* פופ-אפ מפה (Modal) */}
        {showMapModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.9)', zIndex: 2000, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white', width: '100%', maxWidth: '500px', height: '80vh',
              borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
                <strong style={{ fontSize: '18px', color: '#0f172a' }}>מפת פריסת משימות</strong>
                <button 
                  onClick={() => setShowMapModal(false)} 
                  style={{ border: 'none', background: '#f1f5f9', color: '#64748b', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>
              <div style={{ flex: 1, backgroundColor: '#e5e7eb' }}>
                <iframe
                  width="100%" height="100%" frameBorder="0"
                  src={getGlobalMapUrl()}
                  title="global-map"
                  style={{ filter: 'contrast(1.1)' }}
                ></iframe>
              </div>
              <div style={{ padding: '15px', textAlign: 'center', fontSize: '12px', color: '#64748b', background: '#f8fafc' }}>
                * המפה מציגה ריכוז כתובות ללא כפילויות
              </div>
            </div>
          </div>
        )}

        {/* רשימת הצוותים */}
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
                        <div style={{ fontSize: '13px', color: '#1e293b', backgroundColor: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #cbd5e1' }}>
                            🔑 קוד: <span style={{ color: '#dc2626' }}>{STATION_PASSWORDS[id] || "---"}</span>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '15px', color: '#1e293b' }}>
                        <strong style={{ color: '#64748b' }}>🎯 משימה: </strong> {data.task || "---"}
                      </div>
                      <div style={{ fontSize: '15px', color: '#1e293b' }}>
                        <strong style={{ color: '#64748b' }}>📍 מיקום: </strong> {data.address || "---"}
                      </div>
                      <div style={{ fontSize: '15px', color: '#1e293b' }}>
                        <strong style={{ color: '#64748b' }}>👤 מדריך מלווה: </strong> {data.escort || "---"}
                      </div>
                      
                      <div style={{ fontSize: '15px', color: '#1e293b' }}>
                        <strong style={{ color: '#64748b' }}>🕒 שעות פעילות: </strong> {data.hours || "---"}
                      </div>
                      
                      <div style={{ fontSize: '15px', color: '#1e293b' }}>
                        <strong style={{ color: '#64748b' }}>👥 קבוצה: </strong> {data.group || "---"}
                      </div>

                      <div style={{ 
                        marginTop: '10px', padding: '12px', backgroundColor: '#ecfdf5', 
                        borderRadius: '10px', border: '1px solid #d1fae5', textAlign: 'center' 
                      }}>
                        <div style={{ color: '#059669', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>🌳 עץ:</div>
                        <div style={{ color: '#064e3b', fontSize: '18px', fontWeight: '900' }}>
                            {data.tree || "⚠️ לא הוזן"}
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
    </div>
  );
};

export default Mentor;