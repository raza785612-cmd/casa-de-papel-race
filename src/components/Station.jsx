import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { STATION_PASSWORDS, allMissionsData } from '../missionsData';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // חשוב: תמיד מתחיל כ-false כדי שהדף יהיה נעול
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const team = JSON.parse(localStorage.getItem('race_user'));

  // איפוס הנעילה כשעוברים תחנה
  useEffect(() => {
    setIsUnlocked(false);
    setInputPass("");
    window.scrollTo(0, 0);
  }, [id]);

  // שליפת הנתונים של הצוות הספציפי לתחנה הזו מהג'ייסון
  const mission = allMissionsData[team?.username]?.[id];

  const handleUnlock = () => {
    // בדיקה מול מערך הסיסמאות הסטטי
    if (inputPass === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);
    } else {
      alert("קוד תחנה שגוי");
    }
  };

  if (!mission) return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>המשימה לא נמצאה</div>;

  // --- תצוגת דף נעול ---
  if (!isUnlocked) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#020617', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
      }} dir="rtl">
        <div style={{ 
          width: '100%', maxWidth: '350px', backgroundColor: '#0f172a', 
          padding: '30px', borderRadius: '2rem', border: '1px solid #1e293b', textAlign: 'center' 
        }}>
          <h1 style={{ color: 'white', marginBottom: '10px' }}>תחנה <span style={{ color: '#dc2626' }}>{id}</span></h1>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>הזן קוד משימה לחשיפת הפרטים</p>
          
          <input 
            type="text" 
            inputMode="numeric" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="קוד סודי"
            style={{ 
              width: '100%', background: '#020617', border: '1px solid #334155', 
              color: 'white', padding: '16px', borderRadius: '1rem', 
              marginBottom: '15px', textAlign: 'center', fontSize: '1.2rem', outline: 'none'
            }}
          />
          
          <button 
            onClick={handleUnlock} 
            style={{ 
              width: '100%', background: '#dc2626', color: 'white', border: 'none', 
              padding: '18px', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer' 
            }}
          >
            חשיפת משימה ⚡
          </button>
        </div>
      </div>
    );
  }

  // --- תצוגת דף פתוח (המשימה עצמה) ---
  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', padding: '20px' }} dir="rtl">
        {/* כאן נמצא הקוד של כרטיס המשימה שלך עם ה-img, task, address וכו' */}
        <h2 style={{ textAlign: 'center' }}>משימת תחנה {id}</h2>
        <div style={{ background: '#0f172a', padding: '20px', borderRadius: '1rem', border: '1px solid #1e293b' }}>
            <h3 style={{ color: '#dc2626' }}>{mission.task}</h3>
            <p>{mission.address}</p>
            {/* שאר הפרטים... */}
        </div>
        
        <button 
          onClick={() => navigate(`/station/${Number(id) + 1}`)}
          style={{ width: '100%', marginTop: '20px', padding: '20px', background: '#dc2626', borderRadius: '1rem', border: 'none', color: 'white', fontWeight: 'bold' }}
        >
          סיימנו, למשימה הבאה ⚡
        </button>
    </div>
  );
};

export default Station;