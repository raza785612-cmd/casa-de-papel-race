import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Mentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalStations = 8; 

  const mentorDataBank = {
    // כאן תשאיר את האובייקט שלך כפי שהוא
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
    if (!savedUser) {
      navigate(`/login?s=${id}`);
      return;
    }

    const userData = JSON.parse(savedUser);
    const role = userData.role ? userData.role.toLowerCase().trim() : '';

    if (role !== 'mentor') {
      navigate(`/station/${id}`);
      return;
    }

    setMentor(userData);
    setLoading(false);
  }, [id, navigate]);

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
      <div className="text-blue-500 font-mono animate-pulse tracking-widest">LOADING_INTERFACE...</div>
    </div>
  );

  const currentMentorInfo = mentorDataBank[mentor?.username]?.[id];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-4 pb-24" dir="rtl">
      <div className="max-w-md mx-auto pt-2">
        
        {/* סרגל ניווט טקטי */}
        <nav className="flex justify-between items-center mb-8 bg-zinc-900/50 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl sticky top-2 z-50">
          <button 
            onClick={goToPrev}
            disabled={parseInt(id) === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${parseInt(id) === 1 ? 'opacity-10' : 'bg-zinc-800 text-blue-400 active:scale-90 hover:bg-blue-500/20'}`}
          >
            <span className="text-xl">➔</span>
          </button>

          <div className="text-center">
            <span className="block text-[9px] text-blue-500 font-mono uppercase tracking-[0.3em] mb-1">Sector_Control</span>
            <span className="text-xl font-black tracking-tighter">תחנה {id}</span>
          </div>

          <button 
            onClick={goToNext}
            disabled={parseInt(id) === totalStations}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${parseInt(id) === totalStations ? 'opacity-10' : 'bg-zinc-800 text-blue-400 active:scale-90 hover:bg-blue-500/20'}`}
          >
            <span className="text-xl">←</span>
          </button>
        </nav>

        {/* תוכן המשימה */}
        <div className="space-y-6">
          
          {/* תמונה עם אפקט זכוכית */}
          {currentMentorInfo?.image && (
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
              <img src={currentMentorInfo.image} alt="Intel" className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="bg-zinc-900/80 py-1.5 text-center text-[9px] text-blue-500 font-mono uppercase tracking-widest">Visual_Intelligence_Sync</div>
            </div>
          )}

          {/* משימה - כרטיס בולט */}
          <section className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-blue-600"></div>
            <h3 className="text-blue-500 font-bold text-[10px] mb-2 uppercase tracking-widest italic">Mission_Objective:</h3>
            <p className="text-2xl font-black text-white leading-tight">
              {currentMentorInfo?.taskName || "מידע חסר"}
            </p>
          </section>

          {/* מידע פנימי - רקע כחול עדין */}
          <section className="bg-blue-600/5 rounded-2xl p-6 border border-blue-900/20 shadow-lg">
            <h3 className="text-blue-400 font-bold text-[10px] mb-3 uppercase tracking-widest italic">ה"נ (Intelligence):</h3>
            <p className="text-slate-300 font-medium leading-relaxed">
              {currentMentorInfo?.intel || "אין הערות נוספות."}
            </p>
          </section>

          {/* דגשים - רשימה עם בולטים מעוצבים */}
          <section className="bg-zinc-900/30 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-zinc-500 font-bold text-[10px] mb-4 uppercase tracking-widest italic underline underline-offset-8">דגשי חניכה:</h3>
            <ul className="space-y-4">
              {currentMentorInfo?.highlights?.split(',').map((item, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="w-5 h-5 bg-blue-600/20 text-blue-400 rounded-md flex items-center justify-center text-[10px] font-mono ml-3 mt-0.5">0{index + 1}</span>
                  <span className="text-slate-300">{item.trim()}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* תדריך - ציטוט */}
          <section className="bg-zinc-900/80 rounded-2xl p-6 border-l-4 border-zinc-700 italic">
            <h3 className="text-zinc-600 font-bold text-[9px] mb-2 uppercase tracking-widest">Briefing_Script:</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-serif">
              "{currentMentorInfo?.briefing}"
            </p>
          </section>

          <button 
            onClick={() => { localStorage.clear(); navigate('/login'); }}
            className="w-full mt-10 py-4 text-zinc-700 text-[9px] font-mono uppercase tracking-[0.4em] hover:text-red-500 transition-colors border-t border-zinc-900"
          >
            [ Terminate_Authorized_Session ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentor;







//########################################################
  