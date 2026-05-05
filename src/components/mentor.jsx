import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Mentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  // סה"כ תחנות לניווט
  const totalStations = 8; 

  // --- כאן מדביקים את אובייקט הנתונים (DataBank) ---
  const mentorDataBank = {
   "מאור": {
      "1": { 
        taskName: "משימה: סיוש לטובת זיהוי וראי 8",
        intel: "סבב א': פרנקל בחנות קדמת עדן אלנבי 93, יוני בסטימצקי באלנבי / רוטשילד, סבב ב': דותן מיני מרקט מלצט 5, אדרי סטימצקי אלנבי/רוטשילד",
        highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
        briefing: "ללא יציאה לדוד",
        image: "" 
      },
      "2": { 
        taskName: "סיוש וביצוע טלפרינטר",
        intel: "פרנקל / דותן בס.פ חיסין, יוני / אדרי בעץ הבימה",
        highlights: "יציאה לדוד עד לעוגן. ברוש של פרנקל / דותן יגיע לכתובת אחד העם 116, ברוש של יוני / אדרי לאנג'ל 4. ",
        briefing: "לא להיכנס לתוך העוגן",
        image: ""
      },"3": { 
        taskName: "התקנת ש.ש במסעדה",
        intel: " סבב א': פרנקל וענבר, סבב ב': דותן וצוקר",
        highlights: "סבב א': ראמה המלך ג'ורג' 38, סבב ב' כפרה מיו המלך ג'ורג' 105",
        briefing: "הוזמן מקום גם לברוש וגם להם",
        image: ""
      },"4": { 
        taskName: "רווק תוכי",
        intel: "סבב א': קבוצה: פרנקל + אגם + יוני + מתן, סבב ב': דותן + צוקר + אתי + גלעד",
        highlights: " בורוכוב בחומוס לוריא",
        briefing: "לתת ירקות בורוכב לחניכים, חונכים: מאור ואליקו ",
        image: ""
      },"5": { 
        taskName: "סיוש וביצוע טלפרינטר",
        intel: "פרנקל בס.פ חיסין, יוני בעץ הבימה",
        highlights: "יציאה לדוד עד לעוגן. ברוש של פרנקל יגיע לכתובת אחד העם 116, ברוש של יוני לאנג'ל 4. ",
        briefing: "לא להיכנס לתוך העוגן",
        image: ""
      }
      // תוסיף כאן את שאר התחנות...
    },
     "אביה": {
      "1": { 
        taskName: "משימה: סיוש לטובת זיהוי וראי 8",
        intel: "גליקמן סטימצקי דיזינגוף 109, רובן המרכז למשקפי שמש קינג ג'ורג' / בוגרשוב, אתי אפרטיף בוטיק יינות דיזינגוף 93, גדי פון מרקט קינג ג'ורג' / בוגרשוב, עזרי סטימצקי דיזינגוף 109",
        highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
        briefing: "ללא יציאה לדוד",
        image: "" 
      },
      "2": { 
        taskName: "סיוש וביצוע טלפרינטר",
        intel: "גליקמן / אתי כיכר השוטר, רובן / גדי כיכר דיזינגוף, עזרי 9ד אימהות ",
        highlights: "עוגנים:, גליקמן / אתי לוריא 10, רובן / גדי סמולנסקין 7, עזרי עין חרוד 15 ",
        briefing: "לא להיכנס לתוך העוגן",
        image: ""
      },"3": { 
        taskName: "התקנת ש.ש במסעדה",
        intel: "סבב א': מתן וגליקמן, סבב ב': גלעד אתי ועזרי",
        highlights: "סבב א': פרוזדור מנדלי , סבב ב': מקסיקנה בוגרשוב 7",
        briefing: "הוזמן מקום גם לברוש וגם להם",
        image: ""
      },"4": { 
        taskName: "רווק תוכי",
        intel: "קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי",
        highlights: " בורוכוב בחומוס הסנטר",
        briefing: "לתת ירקות בורוכב לחניכים, חונכים:  אביה ועמית, נמצאים איתם בהתקנה ! ",
        image: ""
      },"5": { 
        taskName: "לפי מצגת",
        intel: "ציר הנדון: מלון סינמה, זמנהוף, קינג ג'ורג' עד לכיכר מסריק, קבוצה א': פרנקל + אגם + יוני + מתן, קבוצה ב': דותן + צוקר + אתי + גלעד",
        highlights: "זה לא צוות מצומצם. עליהם להסתמך על המודיעין של ציר ההליכה ולתכנן בדרך.",
        briefing: "יאללה מאמץ אחרון",
        image: ""
      }
      // תוסיף כאן את שאר התחנות...
    },

    "אליקו": {
      "1": { 
        taskName: "משימה: סיוש לטובת זיהוי וראי 8",
        intel: "סבב א': ליו פיד קלין מזאהה 22א, מתן טוישופ מונטיפיורי 33, סבב ב': רני טישלר מוצרי חשמל מונטיפיורי 93, גלעד טוישופ מונטיפיורי 33 ",
        highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
        briefing: "ללא יציאה לדוד",
        image: "" 
      },
      "2": { 
        taskName: "סיוש וביצוע טלפרינטר",
        intel: "ליו / רני כיכר אלברט, מתן / גלעד גן נפחא ",
        highlights: "עוגנים:, ליו / רני ג'ורג' אליוט 13, מתן / גלעד פיארברג 22 ",
        briefing: "לא להיכנס לתוך העוגן",
        image: ""
      },"3": { 
        taskName: "התקנת ש.ש במסעדה",
        intel: "סבב א': יוני + רובן, סבב ב': אדרי + גדי",
        highlights: "סבב א': הלבנטיני בן יהודה 170, סבב ב': רוסטיקו בזל בזל 42",
        briefing: "הוזמן מקום גם לברוש וגם להם",
        image: ""
      },"4": { 
        taskName: "רווק תוכי",
        intel: "קבוצה א':פרנקל + אגם + יוני + מתן, קבוצה ב':דותן + צוקר + אתי + גלעד",
        highlights: " בורוכוב בחומוס לוריא",
        briefing: "לתת ירקות בורוכב לחניכים, חונכים: מאור ואליקו, נמצאים איתם בהתקנה ! ",
        image: ""
      },"5": { 
        taskName: "לפי מצגת",
        intel: "ציר הנדון: מלון סינמה, זמנהוף, קינג ג'ורג' עד לכיכר מסריק",
        highlights: "זה לא צוות מצומצם. עליהם להסתמך על המודיעין של ציר ההליכה ולתכנן בדרך, קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי.",
        briefing: "יאללה מאמץ אחרון",
        image: ""
      }
      // תוסיף כאן את שאר התחנות...
    },
    "עמית": {
      "1": { 
        taskName: "משימה: סיוש לטובת זיהוי וראי 8",
        intel: "ענבר: אייסי בוגרשוב 26, אגם: לייטוויב בוגרשוב 72, סבב ב': צוקר אייסי בוגרשוב 26, נירו לייטוויב בוגרשוב 72",
        highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
        briefing: "ללא יציאה לדוד",
        image: "" 
      },
      "2": { 
        taskName: "סיוש וביצוע טלפרינטר",
        intel: "ענבר / צוקר גן מאיר, אגם / נירו כיכר ביאליק ",
        highlights: "עוגנים:, ענבר / צוקר צבי ברוק 7 , אגם / נירו הס 1 ",
        briefing: "לא להיכנס לתוך העוגן",
        image: ""
      },"3": { 
        taskName: "התקנת ש.ש במסעדה",
        intel: " סבב א': ליו + אגם, סבב ב': רני + נירו",
        highlights: "סבב א': פנקינה גורדון 39, סבב ב': ארנסטו בן יהודה 90",
        briefing: "הוזמן מקום גם לברוש וגם להם",
        image: ""
      },"4": { 
        taskName: "רווק תוכי",
        intel: "קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי",
        highlights: " בורוכוב בחומוס הסנטר",
        briefing: "לתת ירקות בורוכב לחניכים, חונכים:  אביה ועמית, נמצאים איתם בהתקנה ! ",
        image: ""
      },"5": { 
        taskName: "לפי מצגת",
        intel: "ציר הנדון: מלון סינמה, זמנהוף, קינג ג'ורג' עד לכיכר מסריק",
        highlights: "זה לא צוות מצומצם. עליהם להסתמך על המודיעין של ציר ההליכה ולתכנן בדרך, קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי.",
        briefing: "יאללה מאמץ אחרון",
        image: ""
      }
      // תוסיף כאן את שאר התחנות...
    }
  };
  // ------------------------------------------------

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    
    // 1. אם אין משתמש בזיכרון - שלח ללוגין
    if (!savedUser) {
      console.log("No user found in localStorage, redirecting...");
      navigate(`/login?s=${id}`);
      return;
    }

    const userData = JSON.parse(savedUser);
    const role = userData.role ? userData.role.toLowerCase().trim() : '';

    // 2. אם המשתמש הוא לא חונך - שלח אותו לדף התחנה הרגיל
    if (role !== 'mentor') {
      console.log("User is not a mentor, redirecting to station page");
      navigate(`/station/${id}`);
      return;
    }

    // 3. אם הכל תקין
    setMentor(userData);
    setLoading(false);
  }, [id, navigate]);

  // פונקציות ניווט בין תחנות
  const goToNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= totalStations) navigate(`/mentor/${nextId}`);
  };

  const goToPrev = () => {
    const prevId = parseInt(id) - 1;
    if (prevId >= 1) navigate(`/mentor/${prevId}`);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-blue-500 font-mono animate-pulse uppercase tracking-[0.2em]">Authenticating_Mentor...</div>
    </div>
  );

  // שליפת המידע הספציפי
  const currentMentorInfo = mentorDataBank[mentor?.username]?.[id];

  // הגנה: אם החונך מחובר אבל השם שלו לא קיים באובייקט או התחנה חסרה
  if (!currentMentorInfo) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <div className="text-red-600 text-6xl mb-4 italic">🎭</div>
        <h2 className="text-white text-xl font-black mb-2 italic uppercase">User Not Synced</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          המשתמש <span className="text-blue-500 font-bold underline">{mentor?.username}</span> מחובר למערכת, <br/>
          אך לא נמצאו נתונים תואמים עבור <span className="text-white">תחנה {id}</span> באובייקט הקוד.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-blue-900/40"
        >
          חזרה למסך הזיהוי
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24 font-sans" dir="rtl">
      <div className="max-w-md mx-auto pt-2">
        
        {/* סרגל ניווט עליון - חצים */}
        <nav className="flex justify-between items-center mb-8 bg-slate-900/80 backdrop-blur-sm p-4 rounded-3xl border border-slate-800 shadow-2xl sticky top-2 z-50">
          <button 
            onClick={goToPrev}
            disabled={parseInt(id) === 1}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${parseInt(id) === 1 ? 'opacity-20 grayscale' : 'bg-slate-800 text-blue-500 hover:bg-blue-600 hover:text-white'}`}
          >
            <span className="text-2xl font-bold">→</span>
          </button>

          <div className="text-center">
            <span className="block text-[10px] text-blue-500 font-mono font-bold uppercase tracking-widest mb-1 italic">Tactical View</span>
            <span className="text-2xl font-black text-white">תחנה {id}</span>
          </div>

          <button 
            onClick={goToNext}
            disabled={parseInt(id) === totalStations}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${parseInt(id) === totalStations ? 'opacity-20 grayscale' : 'bg-slate-800 text-blue-500 hover:bg-blue-600 hover:text-white'}`}
          >
            <span className="text-2xl font-bold">←</span>
          </button>
        </nav>

        {/* תוכן הדף המרכזי */}
        <div className="space-y-6">
          
          {/* תמונה מבצעית */}
          {currentMentorInfo.image && (
            <div className="rounded-3xl overflow-hidden border-2 border-blue-600/20 shadow-2xl group">
              <img 
                src={currentMentorInfo.image} 
                alt="Intel" 
                className="w-full h-52 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="bg-slate-900 py-2 text-center text-[10px] text-blue-500 font-mono uppercase tracking-[0.3em]">
                Field_Intel_Visual
              </div>
            </div>
          )}

          {/* שם המשימה */}
          <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative shadow-lg">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-600"></div>
            <h3 className="text-blue-500 font-black text-[11px] mb-2 uppercase tracking-widest italic">המשימה:</h3>
            <p className="text-2xl font-black text-white leading-tight italic">
              {currentMentorInfo.taskName}
            </p>
          </section>

          {/* ה"נ - הערות נוספות */}
          <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg border-b-2 border-b-slate-800">
            <h3 className="text-blue-500 font-black text-[11px] mb-3 uppercase tracking-widest italic underline decoration-blue-900 underline-offset-4">ה"נ (מידע פנימי):</h3>
            <p className="text-slate-300 font-medium leading-relaxed">
              {currentMentorInfo.intel || "אין מידע מודיעיני נוסף לתחנה זו."}
            </p>
          </section>

          {/* דגשי חניכה */}
          <section className="bg-blue-900/10 rounded-2xl p-6 border border-blue-900/20 shadow-inner">
            <h3 className="text-blue-400 font-black text-[11px] mb-4 uppercase tracking-widest italic">דגשי חניכה:</h3>
            <ul className="space-y-4">
              {currentMentorInfo.highlights?.split(',').map((item, index) => (
                <li key={index} className="flex items-start text-slate-300 text-sm">
                  <span className="w-6 h-6 flex-shrink-0 bg-blue-600 text-white rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ml-3 mt-0.5 shadow-lg shadow-blue-900/50">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{item.trim()}</span>
                </li>
              )) || <li className="text-slate-600 italic">אין דגשים מוגדרים.</li>}
            </ul>
          </section>

          {/* תדריך לחניכים */}
          <section className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 border-dashed">
            <h3 className="text-slate-500 font-black text-[11px] mb-3 uppercase tracking-widest italic">תדריך לצוותים:</h3>
            <div className="relative">
              <p className="text-slate-400 italic text-[15px] leading-relaxed pr-2 border-r-2 border-slate-700 font-serif">
                "{currentMentorInfo.briefing || "המשך לפי הנחיות הפרויקט."}"
              </p>
            </div>
          </section>

          {/* כפתור יציאה מאובטח */}
          <div className="pt-6">
            <button 
              onClick={() => {
                if(window.confirm("בטוח שברצונך להתנתק?")) {
                  localStorage.clear();
                  navigate('/login');
                }
              }}
              className="w-full py-4 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-[0.5em] hover:text-red-500 transition-colors"
            >
              [ Terminate_Authorized_Session ]
            </button>
          </div>
        </div>

        <footer className="mt-10 text-center opacity-20">
          <p className="text-[8px] text-slate-500 font-mono tracking-[0.2em] uppercase">Sector_{id}_Control_Log // Node_Active</p>
        </footer>
      </div>
    </div>
  );
};

export default Mentor;







//########################################################
