


  //###################################//
  import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- כאן מזינים את כל הנתונים ---
  const allMissionsData = {
    "אמסלם": {
      "1": { hint: "ברוך הבא! עליך להגיע למלון בו הכל מתחיל. הכתובת היא 13 ירקות 22", escort: "מאור" },
      "2": { address: " קדמת עדן, אלנבי 93", intel: "הגיע גזר שמעשיו לא ברורים, מיצים רוצים לדעת א.ב. עתיד להגיע לכתובת שקיבלת בין השעות 13:30 - 14:00",task:"סיוש בעוגן", escort: "מאור", budget: "50", hours: "10:00 - 11:30", img: "URL_TO_IMAGE" },
      "3": { address: "קדמת עדן, אלנבי 93", intel:"המשך המשימה",task:"זיהוי וראי 8 (ללא דוד)", escort: "מאור", budget: "50", hours: "13:30-14:00", img: "URL_TO_IMAGE" },
      "4": { address: "ס.פ 9ד חיסין", intel: "עלה בש.ש. שהנדון התחלה רווק טעמי לבן אילן", task: "סיוש לטובת טלפרינטר",escort:"מאור", budget: "50 שח", hours: "14:30 - 15:30", img: "" },
      "5": { address: "ס.פ 9ד חיסין", intel: "המשך המשימה", task: "טלפרינטר לבן הטעמי, סוף אילן מושב טעמי סוף דוד לעוגן",escort:"מאור", budget: "50 שח", hours: "16:30 - 17:30", img: "" },
      "6": { partner: "ענבר", address: "מסעדת ראמה, המלך ג'ורג' 38", intel:"ניפגש ב20:00",task:"",escort:"מאור", hours: "20:00 - 21:00", img: "" },
      "7": { group: "פרנקל, אגם, יוני, מתן", address: "חניון לוריא", intel: "הנדון התחלה חומוס את הבורוכב שמנת חומוס לוריא",task: "סוף רווק תוכי לבן בורוכב",escort:"מאור + אליקו", hours: "22:00 - 02:00",img: "" },
      "8": { group: "פרנקל, אגם, יוני, מתן", address: "סדין סינמה", intel: "הנדון התבטא כי יעשה את הציר הבא בשעה 12:00: זמנהוף, המלך ג'ורג' עד כיכר מסריק",task: "מול מדריך מלווה",escort: "אביה", hours: "08:00 - 13:00",img: "" }
    },
    // כאן תוכל להוסיף "שם_משתמש": { ... } עבור שאר המשתתפים
  };

  useEffect(() => {
  const savedUser = localStorage.getItem('race_user');
  
  if (!savedUser) {
    navigate(`/login?s=${id}`);
    return;
  }

  const userData = JSON.parse(savedUser);

  // --- הבדיקה הקריטית ---
  // אם התחנה ב-URL לא זהה לתחנה שהמשתמש סרק בלוגין
  if (userData.authorizedStation !== id) {
    alert("גישה חסומה! עליך לסרוק את ה-QR של התחנה כדי לצפות בתוכן.");
    localStorage.removeItem('race_user'); // מנתק אותו ליתר ביטחון
    navigate(`/login?s=${id}`);
    return;
  }

  setTeam(userData);
  setLoading(false);
}, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold">טוען נתוני משימה...</div>;

  const user = team?.username;
  const currentData = allMissionsData[user]?.[id] || {};

  // ה-Return הארוך - זהו העיצוב של התצוגה
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 pb-12" dir="rtl">
      <div className="max-w-md mx-auto pt-4">
        
        {/* כותרת עליונה */}
        <header className="mb-6 border-b border-red-600 pb-2 flex justify-between items-end">
          <div>
            <p className="text-red-600 font-bold text-sm italic">סוכן: {user} 🎭</p>
            <h1 className="text-2xl font-black italic text-zinc-100">תחנה {id}</h1>
          </div>
          <div className="text-zinc-600 text-[10px] font-mono tracking-tighter uppercase">Mission_Auth_Secure</div>
        </header>

        {/* כרטיס המשימה המרכזי */}
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
          
          {/* תמונת משימה */}
          {currentData.img && (
            <div className="w-full h-48 overflow-hidden border-b border-zinc-800">
              <img src={currentData.img} alt="Mission" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 space-y-6">
            
            {/* רמז (יופיע רק אם מולא) */}
            {currentData.hint && (
              <div className="bg-red-600/10 p-4 rounded-xl border border-red-600/30">
                <h3 className="text-red-500 font-bold text-xs mb-1 uppercase tracking-wider">רמז למיקום:</h3>
                <p className="text-xl font-medium text-red-50">{currentData.hint}</p>
              </div>
            )}

            {/* שותף או קבוצה */}
            {(currentData.partner || currentData.group) && (
              <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                <h3 className="text-zinc-500 font-bold text-xs mb-1 uppercase">
                  {currentData.partner ? "שותף למשימה:" : "חברי הקבוצה:"}
                </h3>
                <p className="text-lg font-bold text-white">
                  {currentData.partner || currentData.group}
                </p>
              </div>
            )}

            {/* כתובת */}
            {currentData.address && (
              <div>
                <h3 className="text-red-600 font-bold text-xs mb-1 uppercase italic">כתובת יעד:</h3>
                <p className="text-2xl font-black text-zinc-100 leading-tight">{currentData.address}</p>
              </div>
            )}

            {/* אינטל (מודיעין) */}
            {currentData.intel && (
              <div className="bg-zinc-800/50 p-4 rounded-xl border-r-4 border-zinc-600">
                <h3 className="text-zinc-500 font-bold text-xs mb-1 uppercase tracking-tighter">מידע מודיעיני (Intel):</h3>
                <p className="text-zinc-200 leading-relaxed font-medium">{currentData.intel}</p>
              </div>
            )}

            {/* משימה */}
            {currentData.task && (
              <div>
                <h3 className="text-red-600 font-bold text-xs mb-1 uppercase italic">המשימה:</h3>
                <p className="text-lg text-zinc-300 leading-relaxed">{currentData.task}</p>
              </div>
            )}

            {/* שורת נתונים נוספים */}
            {(currentData.escort || currentData.budget || currentData.hours) && (
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800">
                {currentData.escort && (
                  <div>
                    <h4 className="text-zinc-600 text-[10px] uppercase font-bold">מלווה:</h4>
                    <p className="text-sm font-bold text-zinc-300">{currentData.escort}</p>
                  </div>
                )}
                {currentData.budget && (
                  <div>
                    <h4 className="text-zinc-600 text-[10px] uppercase font-bold">תקציב:</h4>
                    <p className="text-sm font-bold text-green-500">{currentData.budget}</p>
                  </div>
                )}
                {currentData.hours && (
                  <div className="col-span-2">
                    <h4 className="text-zinc-600 text-[10px] uppercase font-bold">חלון זמנים:</h4>
                    <p className="text-sm font-bold text-zinc-300">{currentData.hours}</p>
                  </div>
                )}
              </div>
            )}

            <button 
  onClick={() => {
    // מוחק את פרטי ההתחברות מהמכשיר
    localStorage.removeItem('race_user'); 
    alert('המשימה הושלמה ודווחה! המערכת ננעלת עד לסריקת התחנה הבאה.');
    // שולח אותם חזרה ללוגין (ריק)
    navigate('/login'); 
  }}
  className="..."
>
  אישור ביצוע משימה
</button>

          </div>
        </div>
        
        <footer className="mt-8 text-center text-zinc-700 text-[10px] font-mono tracking-widest uppercase">
          Transmission Secure // End of File_{id}
        </footer>
      </div>
    </div>
  );
};

export default Station;