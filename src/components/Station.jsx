
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // הנתונים שלך (השארתי את המבנה כפי ששלחת)
  const allMissionsData = {
    "פרנקל": {
      "1": { hint: "ברוך הבא! עליך להגיע למלון בו הכל מתחיל. הכתובת היא 13 ירקות 22", escort: "מאור" },
      "2": { address: " קדמת עדן, אלנבי 93", intel: "הגיע גזר שמעשיו לא ברורים, מיצים רוצים לדעת א.ב. עתיד להגיע לכתובת שקיבלת בין השעות 13:30 - 14:00",task:"סיוש בעוגן", escort: "מאור", budget: "50", hours: "10:00 - 11:30", img: "URL_TO_IMAGE" },
      "3": { address: "קדמת עדן, אלנבי 93", intel:"המשך המשימה",task:"זיהוי וראי 8 (ללא דוד)", escort: "מאור", budget: "50", hours: "13:30-14:00", img: "URL_TO_IMAGE" },
      "4": { address: "ס.פ 9ד חיסין", intel: "עלה בש.ש. שהנדון התחלה רווק טעמי לבן אילן", task: "סיוש לטובת טלפרינטר",escort:"מאור", budget: "50 שח", hours: "14:30 - 15:30", img: "" },
      "5": { address: "ס.פ 9ד חיסין", intel: "המשך המשימה", task: "טלפרינטר לבן הטעמי, סוף אילן מושב טעמי סוף דוד לעוגן",escort:"מאור", budget: "50 שח", hours: "16:30 - 17:30", img: "" },
      "6": { partner: "ענבר", address: "מסעדת ראמה, המלך ג'ורג' 38", intel:"ניפגש ב20:00",task:"",escort:"מאור", hours: "20:00 - 21:00", img: "" },
      "7": { group: "פרנקל, אגם, יוני, מתן", address: "חניון לוריא", intel: "הנדון התחלה חומוס את הבורוכב שמנת חומוס לוריא",task: "סוף רווק תוכי לבן בורוכב",escort:"מאור + אליקו", hours: "22:00 - 02:00",img: "" },
      "8": { group: "פרנקל, אגם, יוני, מתן", address: "סדין סינמה", intel: "הנדון התבטא כי יעשה את הציר הבא בשעה 12:00: זמנהוף, המלך ג'ורג' עד כיכר מסריק",task: "מול מדריך מלווה",escort: "אביה", hours: "08:00 - 13:00",img: "" }
    },
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    
    if (!savedUser) {
      // אם אין משתמש בכלל, שלח ללוגין עם מספר התחנה הנוכחי
      navigate(`/login?s=${id}`);
      return;
    }

    const userData = JSON.parse(savedUser);

    // --- התיקון כאן ---
    // במקום לחסום, אנחנו פשוט מוודאים שהמשתמש מחובר. 
    // אם אתה רוצה לאפשר לו לצפות בכל תחנה שהוא סורק, פשוט נגדיר את הצוות.
    setTeam(userData);
    setLoading(false);
    
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-600 font-bold font-mono">
      SCANNING_IDENTITY...
    </div>
  );

  // חילוץ הנתונים הספציפיים למשתמש ולתחנה
  const user = team?.username;
  const missionInfo = allMissionsData[user]?.[id] || { 
    title: "משימה סודית", 
    description: "פרטי המשימה יחשפו בקרוב..." 
  };

  return (
    <div className="station-page">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right' }}>
          <header style={{ borderBottom: '1px solid #1e293b', marginBottom: '20px', paddingBottom: '10px' }}>
            <p style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold', margin: 0 }}>
              סוכן בפעולה: {user}
            </p>
            <h1 style={{ fontSize: '1.8rem', margin: '5px 0' }}>תחנה {id}</h1>
          </header>

          <main>
            {/* שימוש בנתונים מתוך האובייקט שלך */}
            <h2 style={{ color: 'white', marginBottom: '15px', fontStyle: 'italic' }}>
              {missionInfo.title || `משימה לתחנה ${id}`}
            </h2>
            
            <div style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '30px' }}>
              {/* כאן אתה יכול להציג שדות ספציפיים מהאובייקט שלך */}
              <p style={{ whiteSpace: 'pre-line' }}>{missionInfo.description || missionInfo.task}</p>
              
              {missionInfo.address && (
                <p style={{ fontSize: '0.9rem', color: '#ef4444' }}>📍 מיקום: {missionInfo.address}</p>
              )}
              {missionInfo.hours && (
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>🕒 זמן: {missionInfo.hours}</p>
              )}
            </div>
            
            <button onClick={() => alert('המשימה הושלמה! עברו לתחנה הבאה.')}>
              סיימתי את המשימה
            </button>
          </main>
          
          <footer style={{ marginTop: '20px', opacity: 0.3, fontSize: '8px', textAlign: 'center', letterSpacing: '1px' }}>
            AGENT_{user?.toUpperCase()}_STATION_{id}_ACCESS_GRANTED
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Station;

