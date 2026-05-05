import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // נתוני קבוצות - רק רשימת משתתפים
  const groupsData = {
    "צוות אדום": {
      "6": { participants: "פרנקל, אברהם, משה" },
      "7": { participants: "פרנקל, אברהם, משה" },
      "8": { participants: "כל הצוותים" }
    }
  };

  const allMissionsData = {
    "פרנקל": {
      "1": { hint: "חפשו ליד השער הכחול", escort: "מפקד תורן" },
      "2": { address: "הרצל 10, תל אביב", intel: "השומר מתחלף ב-10:15", task: "איסוף מעטפה", escort: "סוכן שטח", budget: "50", hours: "10:00 - 11:00", img: "" },
      "6": { group: "צוות אדום", address: "קפה נחמה", intel: "מפגש ראשון", task: "תדרוך", hours: "20:00 - 21:00" },
      "7": { group: "צוות אדום", address: "חניון המגדל קומה 2-", intel: "קוד כניסה 1234", task: "פריצה", escort: "טכנאי", hours: "22:00" },
      "8": { group: "צוות אדום", address: "פארק הירקון", intel: "סוף מסלול", task: "סיכום", hours: "08:00" }
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) { navigate(`/login?s=${id}`); return; }
    setTeam(JSON.parse(savedUser));
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-black text-red-600 flex items-center justify-center font-mono">LOADING_DATA...</div>;

  const username = team?.username;
  const mission = allMissionsData[username]?.[id] || {};
  const groupInfo = mission.group ? groupsData[mission.group]?.[id] : null;

  return (
    <div className="station-page">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right', borderTop: '4px solid #dc2626' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
             <div>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{id}</h1>
                <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '10px' }}>STATION_ID</p>
             </div>
             <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{username}</p>
                {mission.group && <p style={{ margin: 0, fontSize: '10px', color: '#fbbf24' }}>GROUP: {mission.group}</p>}
             </div>
          </div>

          <main>
             {mission.intel && (
                <div style={{ gridColumn: '1 / -1', pb: '5px' }}>
                  <p style={{ color: '#ef4444', fontSize: '10px' }}>🔍 :מודיעין</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>{mission.intel}</p>
                </div>
              )}
            {mission.task && (
              <div style={{ background: 'rgba(220,38,38,0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #dc2626', marginBottom: '15px' }}>
                <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold' }}>המשימה:</p>
                <p style={{ fontSize: '1.1rem', fontWeight: '800' }}>{mission.task}</p>
              </div>
            )}

            {mission.hint && (
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #3b82f6', marginBottom: '15px' }}>
                <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 'bold' }}>💡 רמז:</p>
                <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{mission.hint}</p>
              </div>
            )}

            {groupInfo?.participants && (
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '12px', borderRadius: '10px', border: '1px solid #fbbf24', marginBottom: '15px' }}>
                <p style={{ color: '#fbbf24', fontSize: '10px', margin: 0, fontWeight: 'bold' }}>👥 הצוות:</p>
                <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{groupInfo.participants}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '15px' }}>
              {mission.address && (
                <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid #1e293b', pb: '5px', mb: '5px' }}>
                  <p style={{ color: '#64748b', fontSize: '10px' }}>📍 מיקום</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{mission.address}</p>
                </div>
              )}
             
              {mission.hours && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>🕒 זמן למשימה</p><p style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.hours}</p></div>)}
              {mission.budget && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>💰 תקציב</p><p style={{ fontSize: '12px', fontWeight: 'bold', color: '#22c55e' }}>{mission.budget}</p></div>)}
              {mission.escort && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>👤 מדריך מלווה</p><p style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.escort}</p></div>)}
            </div>

            {mission.img && mission.img.startsWith('http') && (
              <img src={mission.img} alt="Intel" style={{ width: '100%', borderRadius: '15px', marginTop: '15px' }} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Station;
// "פרנקל": {
//       "1": { hint: "", escort: "" },
//       "2": { address: "  ,  , intel: "", escort: "", budget: "", hours: "", img: "URL_TO_IMAGE" },
//       "3": { address: "", intel:"",task:"", escort: "", budget: "", hours: "", img: "URL_TO_IMAGE" },
//       "4": { address: "", intel: "", task: "",escort:"", budget: " ", hours: "", img: "" },
//       "5": { address: "", intel: "", task: "",escort:"", budget: " ", hours: "", img: "" },
//       "6": { group: "", address: "", intel:"",task:"",escort:"", hours: "", img: "" },
//       "7": { group: "", address: " ", intel: "",task: " ",escort:"", hours: "",img: "" },
//       "8": { group: " ", address: " ", intel: "  ",task: "",escort: "", hours: "",img: "" }
//     }

//###########################################//
