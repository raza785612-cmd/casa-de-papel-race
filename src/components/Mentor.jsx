import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allMissionsData, STATION_PASSWORDS } from '../missionsData'; 

const Mentor = () => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showStationsModal, setShowStationsModal] = useState(false);

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
  
  // חילוץ רשימת מספרי התחנות הקיימות (למשל 1, 2, 3...)
  const stationIds = Object.keys(STATION_PASSWORDS).sort((a, b) => a - b);

  // פונקציה שמייצרת מפה לכל הכתובות של תחנה ספציפית מכל הצוותים
  const getMapForStation = (stationId) => {
    const addresses = [];
    Object.values(allMissionsData).forEach(team => {
      if (team[stationId] && team[stationId].address) {
        addresses.push(team[stationId].address.trim());
      }
    });
    
    const uniqueAddresses = [...new Set(addresses)];
    const query = uniqueAddresses.join(' | ');
    return "https://maps.google.com/maps?q=" + encodeURIComponent(query) + "&t=&z=14&ie=UTF8&iwloc=&output=embed";
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', direction: 'rtl', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '15px' }}>📋 סגל</h1>
            
            <button 
              onClick={() => setShowStationsModal(true)}
              style={{
                width: '100%', padding: '15px', backgroundColor: '#dc2626', color: 'white',
                borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px',
                cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              🗺️ תצוגת מפות לפי תחנות
            </button>
        </header>

        {/* מודאל תחנות */}
        {showStationsModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.95)', zIndex: 2000, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '10px'
          }}>
            <div style={{
              backgroundColor: '#f1f5f9', width: '100%', maxWidth: '550px', height: '90vh',
              borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ padding: '20px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
                <strong style={{ fontSize: '20px', color: '#0f172a' }}>ריכוז משימות לפי תחנה</strong>
                <button 
                  onClick={() => setShowStationsModal(false)} 
                  style={{ border: 'none', background: '#fee2e2', color: '#dc2626', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
                {stationIds.map((sId) => (
                  <div key={sId} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontWeight: '900', fontSize: '18px', color: '#dc2626' }}>📍 תחנה {sId}</span>
                        <span style={{ fontSize: '12px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                           קוד: {STATION_PASSWORDS[sId]}
                        </span>
                    </div>
                    
                    <div style={{ width: '100%', height: '200px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                      <iframe
                        width="100%" height="100%" frameBorder="0"
                        src={getMapForStation(sId)}
                        title={`map-station-${sId}`}
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* רשימת הצוותים כפי שהייתה */}
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

                      <div style={{ marginTop: '10px', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '10px', border: '1px solid #d1fae5', textAlign: 'center' }}>
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