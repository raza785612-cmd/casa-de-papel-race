import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams(); // שואב את מספר התחנה מה-URL
  const navigate = useNavigate();
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- כאן אתה ממלא את התוכן של המשימות בעברית ---
  const localMissions = {
    "1": {
      title: "המשימה הראשונה: הפריצה למרתף",
      description: `שלום לסוכנים של פרופסור. המשימה הראשונה שלכם מתחילה כאן.
      עליכם למצוא את המעטפה האדומה המסתתרת באזור...
      לאחר שתמצאו את הקוד, הזינו אותו והמשיכו לתחנה הבאה.`
    },
    "2": {
      title: "משימה 2: נטרול האזעקה",
      description: "כאן תכתוב את המלל של משימה 2. למשל: פתרו את החידה הבאה..."
    },
    "3": {
      title: "משימה 3: חדר הבקרה",
      description: "כאן תכתוב את המלל של משימה 3..."
    },
    "4": {
      title: "משימה 4: הכספת הראשית",
      description: "כאן תכתוב את המלל של משימה 4..."
    },
    "5": {
      title: "משימה 5: הבריחה הגדולה",
      description: "כאן תכתוב את המלל של משימה 5..."
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('race_user');
      if (!savedUser) {
        navigate('/login');
        return;
      }
      setTeam(JSON.parse(savedUser));
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-red-600 flex items-center justify-center font-bold">
        טוען נתונים מהמפקדה...
      </div>
    );
  }

  // בחירת המשימה להצגה (לפי ה-ID בכתובת)
  const currentMission = localMissions[id] || {
    title: "תחנה לא מזוהה",
    description: "נראה שסרקתם קוד QR לא תקין או שהתחנה טרם הוגדרה במערכת."
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6" dir="rtl">
      <div className="max-w-md mx-auto pt-8">
        
        {/* כותרת הצוות */}
        <header className="mb-10 text-center">
          <div className="text-red-600 text-sm font-bold tracking-widest mb-1">סוכן בפעולה: {team?.username}</div>
          <div className="h-1 w-20 bg-red-600 mx-auto"></div>
        </header>

        {/* כרטיס המשימה */}
        <main className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* אפקט דקורטיבי של "בית הנייר" */}
          <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">🎭</div>
          
          <h1 className="text-3xl font-black mb-6 text-zinc-100 italic border-r-4 border-red-600 pr-4">
            תחנה {id}: <br/>
            <span className="text-red-600 not-italic">{currentMission.title}</span>
          </h1>

          <div className="space-y-4 text-zinc-300 text-lg leading-relaxed mb-10">
            {/* whitespace-pre-line שומר על ירידות שורה מהטקסט שכתבת למעלה */}
            <p className="whitespace-pre-line">
              {currentMission.description}
            </p>
          </div>

          {/* כפתור סיום */}
          <button 
            onClick={() => alert('המשימה הושלמה! עברו לתחנה הבאה וסרקו את ה-QR שלה.')}
            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black text-xl rounded-xl shadow-lg shadow-red-900/40 transition-all active:scale-95"
          >
            סיימתי את המשימה
          </button>
        </main>

        <footer className="mt-12 text-center text-zinc-600 text-xs uppercase tracking-tighter">
          CASA DE PAPEL • MISSION CONTROL SYSTEM • STATION_{id}
        </footer>
      </div>
    </div>
  );
};

export default Station;