import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SecretQRPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  
  // שליפת שם המשתמש מהאחסון המקומי
  const currentUser = localStorage.getItem('username');

  // אובייקט המכיל את המסרים האישיים לכל משתתף
  const personalMessages = {
    "פרנקל": "המפתח שלך נמצא מאחורי המקרר במטבח.",
    "דנה": "את צריכה למצוא את המעטפה הכחולה בתיק של המדריך.",
    "רועי": "הקוד הסודי שלך למשימה הבאה הוא 9944.",
    "מיכל": "גשי לעץ האלון הגדול וחכי להוראות נוספות.",
    // תוכל להוסיף כאן את כל 17 המשתתפים...
    "default": "כל הכבוד! הגעת למשימה, פנה למלווה לקבלת הוראות."
  };

  useEffect(() => {
    const checkAccess = async () => {
      // 1. הגנה: אם אין יוזר מחובר, שלח אותו להתחבר
      if (!currentUser) {
        alert("עליך להתחבר למערכת קודם!");
        return navigate('/');
      }

      // 2. משיכת סיסמה מה-DB
      const { data, error } = await supabase
        .from('secret_keys')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!data || error) return navigate('/');

      // 3. בקשת סיסמה
      const entry = prompt(data.hint);
      if (entry === data.password) {
        // התאמת המסר האישי
        const msg = personalMessages[currentUser] || personalMessages["default"];
        setUserMessage(msg);
        setUnlocked(true);
        
        // דיווח לחמ"ל שהמשתמש הספציפי פתח את הדף
        reportToAdmin(currentUser);
      } else {
        alert("סיסמה שגויה!");
        navigate('/');
      }
    };

    checkAccess();
  }, [slug, currentUser, navigate]);

  const reportToAdmin = async (user) => {
    await supabase.from('mission_reports').upsert({
      username: user,
      station_id: `סודי: ${slug}`,
      status: 'unlocked'
    }, { onConflict: 'username' });
  };

  if (!unlocked) return <div style={{ background: 'white', minHeight: '100vh' }} />;

  return (
    <div style={{ 
      background: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'black', 
      direction: 'rtl',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>שלום {currentUser},</h1>
      <div style={{ 
        border: '4px solid black', 
        padding: '30px', 
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '400px',
        boxShadow: '8px 8px 0px #eee'
      }}>
        <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>
          {userMessage}
        </p>
      </div>
      <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
        סודי ביותר - אין להראות למשתתפים אחרים!
      </p>
    </div>
  );
};

export default SecretQRPage;