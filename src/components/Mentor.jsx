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
  <div className="mentor-page">
    <div className="app-container">
      <div className="card" style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={goToPrev} disabled={id === "1"} style={{ width: '50px', padding: '10px' }}>➔</button>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>מנטור - תחנה {id}</h1>
          <button onClick={goToNext} disabled={id === "8"} style={{ width: '50px', padding: '10px' }}>←</button>
        </div>

        <div className="mission-info" style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
           <h3 style={{ color: '#ef4444', fontSize: '14px' }}>שם המשימה:</h3>
           <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{currentMentorInfo.taskName}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#ef4444', fontSize: '14px' }}>דגשי חניכה:</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>{currentMentorInfo.intel}</p>
        </div>

        <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ background: 'transparent', border: '1px solid #334155', color: '#64748b', fontSize: '12px' }}>
          ניתוק מהמערכת
        </button>
      </div>
    </div>
  </div>
);
};

export default Mentor;







//########################################################
  