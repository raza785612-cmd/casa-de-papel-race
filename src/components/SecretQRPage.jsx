import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SecretQRPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // שליפת שם המשתמש מה-localStorage (השם שהזינו בכניסה לאתר)
  const currentUser = localStorage.getItem('username');

  // --- ניהול התוכן האישי בקוד ---
  const personalMessages = {
    "פרנקל": "המשימה שלך: מצא את המפתח המודבק מתחת לשולחן בלובי.",
    "default": "כל הכבוד הגעת למשימה הסודית! פנה למלווה לקבלת הוראות."
  };

  useEffect(() => {
    const initMission = async () => {
      // 1. הגנה: אם המשתמש לא "מחובר" (אין שם ב-storage), נשלח אותו לדף הבית
      if (!currentUser) {
        alert("נא להתחבר למערכת קודם!");
        navigate('/');
        return;
      }

      // 2. משיכת ה"מפתח" (סיסמה ורמז) מהדאטאבייס
      const { data, error } = await supabase
        .from('secret_keys')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error("Mission not found in DB");
        navigate('/');
        return;
      }

      setLoading(false);

      // 3. בקשת הסיסמה מהמשתמש
      const entry = prompt(data.hint || "הזן סיסמה למשימה הסודית:");
      
      if (entry === data.password) {
        // התאמת המסר האישי לפי השם
        const msg = personalMessages[currentUser] || personalMessages["default"];
        setUserMessage(msg);
        setUnlocked(true);
        
        // 4. דיווח אוטומטי לחמ"ל (AdminPanel)
        reportToAdmin();
      } else {
        alert("סיסמה שגויה!");
        navigate('/');
      }
    };

    initMission();
  }, [slug, currentUser, navigate]);

  const reportToAdmin = async () => {
    await supabase.from('mission_reports').upsert({
      username: currentUser,
      station_id: `סודי: ${slug}`,
      status: 'unlocked'
    }, { onConflict: 'username' });
  };

  // בזמן הטעינה או לפני פתיחה - דף לבן נקי
  if (loading || !unlocked) {
    return <div style={{ background: '#ffffff', minHeight: '100vh' }} />;
  }

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: '#000000', 
      direction: 'rtl',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>שלום {currentUser}</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>מצאת משימה סודית!</p>
        
        <div style={{ 
          border: '3px solid #000', 
          padding: '40px 20px', 
          borderRadius: '0px', // עיצוב נקי וחד
          fontSize: '1.5rem',
          fontWeight: 'bold',
          lineHeight: '1.4',
          boxShadow: '10px 10px 0px #eeeeee'
        }}>
          {userMessage}
        </div>

        <button 
          onClick={() => navigate('/')}
          style={{ 
            marginTop: '40px', 
            background: 'none', 
            border: '1px solid #ccc', 
            padding: '10px 20px', 
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          חזרה למפה
        </button>
      </div>
    </div>
  );
};

export default SecretQRPage;