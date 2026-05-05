import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- נתוני קבוצות: כאן מגדירים מיקום ומשתתפים לכל קבוצה ---
  const groupsData = {
    "צוות אדום": {
      "6": { groupLocation: "נקודת תצפית מרכזית", participants: "פרנקל, כהן, לוי" },
      "7": { groupLocation: "חניון המגדל קומה 2-", participants: "פרנקל, כהן, לוי" },
      "8": { groupLocation: "פארק הירקון", participants: "כלל משתתפי המבצע" }
    }
  };

  // --- נתוני הצוותים: משימות אישיות ---
  const allMissionsData = {
    "פרנקל": {
      "1": { hint: "חפשו מאחורי העמוד", escort: "מפקד גזרה" },
      "6": { group: "צוות אדום", address: "קפה נחמה", intel: "תדרוך קבוצתי", task: "מפגש סוכנים", hours: "20:00" },
      "7": { group: "צוות אדום", address: "חניון המגדל", intel: "קוד 1234", task: "פריצה לשרת", hours: "22:00" }
      // ניתן להוסיף כאן את שאר התחנות...
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) { navigate(`/login?s=${id}`); return; }
    setTeam(JSON.parse(savedUser));
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-600 font-mono">INITIALIZING...</div>;

  const username = team?.username;
  const mission = allMissionsData[username]?.[id] || {};
  const groupInfo = mission.group ? groupsData[mission.group]?.[id] : null;

  return (
    
    <div className="station-page">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right', borderTop: '4px solid #dc2626' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
             <div>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{id}</h1>
                <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '10px' }}>STATION_ID</p>
             </div>
             <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{username}</p>
                {mission.group && <p style={{ margin: 0, fontSize: '10px', color: '#fbbf24' }}>{mission.group}</p>}
             </div>
          </header>

          <main>
            {/* משימה אישית */}
            {mission.task && (
              <div style={{ background: 'rgba(220,38,38,0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #dc2626', marginBottom: '20px' }}>
                <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold' }}>המשימה:</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800' }}>{mission.task}</p>
              </div>
            )}

            {/* בלוק קבוצתי - בולט בצהוב */}
            {groupInfo && (
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid #fbbf24', marginBottom: '20px' }}>
                <p style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 'bold' }}>🤝הקבוצה:</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '5px 0' }}>{groupInfo.groupLocation}</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', borderTop: '1px solid rgba(251,191,36,0.2)', paddingTop: '5px' }}>
                  הצוות: {groupInfo.participants}
                </p>
              </div>
            )}

            {/* נתונים נוספים */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '15px' }}>
              {mission.address && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>📍 מיקום</p><p style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.address}</p></div>)}
              {mission.hours && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>🕒 זמן</p><p style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.hours}</p></div>)}
              {mission.escort && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>👤 מדריך מלווה</p><p style={{ fontSize: '12px', fontWeight: 'bold' }}>{mission.escort}</p></div>)}
              {mission.budget && (<div><p style={{ color: '#64748b', fontSize: '10px' }}>💰 תקציב</p><p style={{ fontSize: '12px', fontWeight: 'bold', color: '#22c55e' }}>{mission.budget}</p></div>)}
            </div>
          </main>
          
          <button style={{ marginTop: '25px' }} onClick={() => alert('דיווח נשלח')}>CONFIRM_MISSION</button>
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
