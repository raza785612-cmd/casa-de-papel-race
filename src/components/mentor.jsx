import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Mentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  // סה"כ תחנות במשחק (עדכן אם יש יותר או פחות)
  const totalStations = 8; 

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

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    
    // חסימת כניסה למי שלא מחובר
    if (!savedUser) {
      navigate(`/login?s=${id}`);
      return;
    }

    const userData = JSON.parse(savedUser);
    
    // בדיקה שהוא אכן חונך
    if (userData.role !== 'mentor') {
      navigate(`/station/${id}`);
      return;
    }

    setMentor(userData);
    setLoading(false);
  }, [id, navigate]);

  // פונקציות ניווט
  const goToNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= totalStations) navigate(`/mentor/${nextId}`);
  };

  const goToPrev = () => {
    const prevId = parseInt(id) - 1;
    if (prevId >= 1) navigate(`/mentor/${prevId}`);
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500 font-mono">LOADING_COMMAND_CENTER...</div>;

  const currentMentorInfo = mentorDataBank[mentor?.username]?.[id] || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-24" dir="rtl">
      <div className="max-w-md mx-auto pt-4">
        
        {/* סרגל ניווט עליון - חצים */}
        <nav className="flex justify-between items-center mb-6 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-lg">
          <button 
            onClick={goToPrev}
            disabled={parseInt(id) === 1}
            className={`p-2 rounded-lg transition-all ${parseInt(id) === 1 ? 'text-slate-700' : 'text-blue-500 hover:bg-blue-500/10 active:scale-90'}`}
          >
            <span className="text-2xl">➔</span> {/* חץ ימינה לתחנה קודמת */}
          </button>

          <div className="text-center">
            <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-widest">Current Sector</span>
            <span className="text-xl font-black text-white">תחנה {id}</span>
          </div>

          <button 
            onClick={goToNext}
            disabled={parseInt(id) === totalStations}
            className={`p-2 rounded-lg transition-all ${parseInt(id) === totalStations ? 'text-slate-700' : 'text-blue-500 hover:bg-blue-500/10 active:scale-90'}`}
          >
            <span className="text-2xl">←</span> {/* חץ שמאלה לתחנה הבאה */}
          </button>
        </nav>

        {/* תוכן הדף */}
        <div className="space-y-6">
          {/* תמונה */}
          {currentMentorInfo.image && (
            <div className="rounded-2xl overflow-hidden border-2 border-blue-600/30 shadow-xl">
              <img src={currentMentorInfo.image} alt="Intel" className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          )}

          {/* משימה */}
          <section className="bg-slate-900 rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-blue-600"></div>
            <h3 className="text-blue-400 font-bold text-[10px] mb-2 uppercase tracking-widest text-shadow">המשימה:</h3>
            <p className="text-xl font-bold text-white leading-tight">{currentMentorInfo.taskName || "טרם הוזן שם משימה"}</p>
          </section>

          {/* ה"נ */}
          <section className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl">
            <h3 className="text-blue-400 font-bold text-[10px] mb-2 uppercase tracking-widest">ה"נ (מידע פנימי):</h3>
            <p className="text-slate-300 font-medium">{currentMentorInfo.intel || "אין הערות."}</p>
          </section>

          {/* דגשים */}
          <section className="bg-blue-600/5 rounded-2xl p-5 border border-blue-900/30">
            <h3 className="text-blue-500 font-bold text-[10px] mb-3 uppercase tracking-widest">דגשי חניכה:</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              {currentMentorInfo.highlights?.split(',').map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 ml-2 font-mono italic">{index + 1}.</span>
                  {item.trim()}
                </li>
              )) || <li>אין דגשים.</li>}
            </ul>
          </section>

          {/* תדריך */}
          <section className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
            <h3 className="text-slate-500 font-bold text-[10px] mb-2 uppercase tracking-widest">תדריך לחניכים:</h3>
            <p className="text-slate-400 italic text-sm italic">"{currentMentorInfo.briefing || "המשך כרגיל."}"</p>
          </section>
        </div>

        {/* כפתור יציאה בתחתית */}
        <button 
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="w-full mt-10 py-3 text-slate-600 text-xs font-mono uppercase tracking-[0.2em] border border-slate-800 rounded-xl hover:bg-red-950/20 hover:text-red-500 transition-all"
        >
          Terminate Session // Logout
        </button>
      </div>
    </div>
  );
};

export default Mentor;