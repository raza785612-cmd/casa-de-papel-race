import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // האובייקט שלך (הנתונים ששלחת)
  const allMissionsData = {
    "פרנקל": {
      "1": { hint: "ברוך הבא! עליך להגיע למלון בו הכל מתחיל. הכתובת היא 13 ירקות 22", escort: "מאור" },
      "2": { address: " קדמת עדן, אלנבי 93", intel: "הגיע גזר שמעשיו לא ברורים, מיצים רוצים לדעת א.ב. עתיד להגיע לכתובת שקיבלת בין השעות 13:30 - 14:00",task:"סיוש בעוגן", escort: "מאור", budget: "50", hours: "10:00 - 11:30", img: "URL_TO_IMAGE" },
      "3": { address: "קדמת עדן, אלנבי 93", intel:"המשך המשימה",task:"זיהוי וראי 8 (ללא דוד)", escort: "מאור", budget: "50", hours: "13:30-14:00", img: "URL_TO_IMAGE" },
      "4": { address: "ס.פ 9ד חיסין", intel: "עלה בש.ש. שהנדון התחלה רווק טעמי לבן אילן", task: "סיוש לטובת טלפרינטר",escort:"מאור", budget: "50 שח", hours: "14:30 - 15:30", img: "" },
      "5": { address: "ס.פ 9ד חיסין", intel: "המשך המשימה", task: "טלפרינטר לבן הטעמי, סוף אילן מושב טעמי סוף דוד לעוגן",escort:"מאור", budget: "50 שח", hours: "16:30 - 17:30", img: "" },
      "6": { group: "פרנקל וענבר", address: "מסעדת ראמה, המלך ג'ורג' 38", intel:"ניפגש ב20:00",task:"",escort:"מאור", hours: "20:00 - 21:00", img: "" },
      "7": { group: "פרנקל, אגם, יוני, מתן", address: "חניון לוריא", intel: "הנדון התחלה חומוס את הבורוכב שמנת חומוס לוריא",task: "סוף רווק תוכי לבן בורוכב",escort:"מאור + אליקו", hours: "22:00 - 02:00",img: "" },
      "8": { group: "פרנקל, אגם, יוני, מתן", address: "סדין סינמה", intel: "הנדון התבטא כי יעשה את הציר הבא בשעה 12:00: זמנהוף, המלך ג'ורג' עד כיכר מסריק",task: "מול מדריך מלווה",escort: "אביה", hours: "08:00 - 13:00",img: "" }
    },
    // כאן אפשר להוסיף עוד צוותים באותו פורמט
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) {
      navigate(`/login?s=${id}`);
      return;
    }
    setTeam(JSON.parse(savedUser));
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-slate-950 text-red-600 flex items-center justify-center font-mono">LOADING_MISSION...</div>;

  const username = team?.username;
  const mission = allMissionsData[username]?.[id] || {};

  return (
    <div className="station-page">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right', borderTop: '4px solid #dc2626' }}>
          
          {/* כותרת תחנה */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
             <div>
                <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>{id}</h1>
                <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '12px' }}>STATION_ID</p>
             </div>
             <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{username}</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>ACTIVE_AGENT</p>
             </div>
          </div>

          <div style={{ spaceY: '20px' }}>
            
            {/* משימה ראשית */}
            {mission.task && (
              <div style={{ marginBottom: '20px', background: 'rgba(220,38,38,0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #dc2626' }}>
                <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}> המשימה:</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white' }}>{mission.task}</p>
              </div>
            )}

            {/* פרטי מודיעין */}
            {mission.intel && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold' }}>מודיעין:</p>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>{mission.intel}</p>
              </div>
            )}

            {/* טבלת נתונים טכנית */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '15px' }}>
              {mission.address && (
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>מיקום</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{mission.address}</p>
                </div>
              )}
              {mission.hours && (
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>חלון זמנים</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{mission.hours}</p>
                </div>
              )}
              {mission.budget && (
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>תקציב</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#22c55e' }}>₪ {mission.budget}</p>
                </div>
              )}
              {mission.group && (
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>קבוצה</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#22c55e' }}>{mission.group}</p>
                </div>
              )}
              {mission.escort && (
                <div>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>מדריך מלווה</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{mission.escort}</p>
                </div>
              )}
            </div>

            {/* הצגת רמז לתחנה 1 בנפרד אם קיים */}
            {mission.hint && (
              <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed #334155', borderRadius: '10px' }}>
                <p style={{ color: '#94a3b8', fontSize: '12px' }}>💡 רמז: {mission.hint}</p>
              </div>
            )}
          </div>
          {mission.img && mission.img !== "URL_TO_IMAGE" && (
  <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
    <img src={mission.img} alt="Mission Intel" style={{ width: '100%', display: 'block' }} />
  </div>
)}

          <button 
            onClick={() => alert('המשימה נרשמה כבוצעה במערכת.')}
            style={{ marginTop: '30px', letterSpacing: '2px' }}
          >
            CONFIRM_MISSION
          </button>

          <p style={{ marginTop: '20px', fontSize: '8px', color: '#334155', textAlign: 'center' }}>
            SECURE_CONNECTION_ESTABLISHED // STATION_{id}
          </p>
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
//       "6": { partner: "", address: "", intel:"",task:"",escort:"", hours: "", img: "" },
//       "7": { group: "", address: " ", intel: "",task: " ",escort:"", hours: "",img: "" },
//       "8": { group: " ", address: " ", intel: "  ",task: "",escort: "", hours: "",img: "" }
//     }

//###########################################//
