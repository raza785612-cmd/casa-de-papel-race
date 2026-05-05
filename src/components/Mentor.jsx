import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Mentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // אובייקט הנתונים של המנטור (לפי המבנה שביקשת)
  const allMentorMissions = {
    "אביה": {
      "1": { 
        taskName: "פריצת קו ההגנה הראשון", 
        intel: "ישנם מאבטחים בסיבוב של רחוב הירקון. הצוות צריך להגיע בסימטאות.",
        highlights: "לשים לב שהם לא רצים לכביש, לוודא שהם משתמשים בפנסים.",
        briefing: "תדרוך ברוש: לוודא שהם חתמו על טפסי בטיחות בתחילת התחנה.",
        location: "צומת הרחובות הירקון-אלנבי",
        participants: "צוות אדום + צוות כחול",
        image: "" 
      },
      "2": { 
        taskName: "איסוף רכיבי הקוד", 
        intel: "הקוד מפוצל ל-3 חלקים בתוך המעטפה.",
        highlights: "לא לעזור להם בפתרון החידה, רק לכוון אם הם נתקעים מעל 5 דקות.",
        briefing: "דגשים לברוש: לבדוק דופק קבוצתי.",
        location: "חניון המגדל",
        participants: "צוות ירוק",
        image: "" 
      },
      // המשך התחנות באותו פורמט...
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) {
      navigate(`/login?s=${id}`);
      return;
    }
    const user = JSON.parse(savedUser);
    
    // בדיקה שהמשתמש הוא אכן מנטור או אביה
    if (user.role?.toLowerCase() !== 'mentor' && user.username !== 'אביה') {
      navigate(`/station/${id}`);
      return;
    }

    setMentorData(user);
    setLoading(false);
  }, [id, navigate]);

  const goToNext = () => navigate(`/mentor/${parseInt(id) + 1}`);
  const goToPrev = () => navigate(`/mentor/${parseInt(id) - 1}`);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">טוען נתוני בקרה...</div>;

  const currentMission = allMentorMissions["אביה"]?.[id] || {};

  return (
    <div className="mentor-page">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right' }}>
          
          {/* ניווט בין תחנות */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={goToPrev} disabled={id === "1"} style={{ width: '45px', padding: '10px', background: '#1e293b' }}>➔</button>
            <div style={{ textAlign: 'center' }}>
               <h1 style={{ fontSize: '1.2rem', margin: 0 }}>בקרה: תחנה {id}</h1>
               <p style={{ fontSize: '10px', color: '#ef4444', fontWeight: 'bold' }}>MENTOR_MODE</p>
            </div>
            <button onClick={goToNext} disabled={id === "8"} style={{ width: '45px', padding: '10px', background: '#1e293b' }}>←</button>
          </div>

          <main style={{ textAlign: 'right' }}>
            
            {/* שם המשימה */}
            <div style={{ background: 'rgba(220,38,38,0.1)', padding: '15px', borderRadius: '12px', borderRight: '4px solid #dc2626', marginBottom: '20px' }}>
              <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>משימה:</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '800' }}>{currentMission.taskName || "אין משימה מוגדרת"}</p>
            </div>

            {/* פרטי מיקום ומשתתפים בקטן */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
               <div style={{ background: '#020617', padding: '10px', borderRadius: '10px' }}>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>מיקום</p>
                  <p style={{ fontSize: '12px', fontWeight: 'bold' }}>{currentMission.location || "-"}</p>
               </div>
               <div style={{ background: '#020617', padding: '10px', borderRadius: '10px' }}>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: 0 }}>משתתפים</p>
                  <p style={{ fontSize: '12px', fontWeight: 'bold' }}>{currentMission.participants || "-"}</p>
               </div>
            </div>

            {/* סעיפי תוכן */}
            <div style={{ spaceY: '15px' }}>
              {currentMission.intel && (
                <section style={{ marginBottom: '15px' }}>
                  <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold' }}>🔍 מודיעין:</p>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>{currentMission.intel}</p>
                </section>
              )}

              {currentMission.highlights && (
                <section style={{ marginBottom: '15px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                  <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold' }}>⚠️ דגשים למשתתף:</p>
                  <p style={{ color: '#f8fafc', fontSize: '14px' }}>{currentMission.highlights}</p>
                </section>
              )}

              {currentMission.briefing && (
                <section style={{ marginBottom: '15px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                  <p style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 'bold' }}>🌳 דגשים לברוש:</p>
                  <p style={{ color: '#f8fafc', fontSize: '14px', fontStyle: 'italic' }}>{currentMission.briefing}</p>
                </section>
              )}
            </div>

            {/* הצגת תמונה אם קיימת */}
            {currentMission.image && (
              <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={currentMission.image} alt="Task" style={{ width: '100%' }} />
              </div>
            )}
          </main>

          <button 
            onClick={() => { localStorage.clear(); navigate('/login'); }} 
            style={{ marginTop: '30px', background: 'transparent', border: '1px solid #334155', color: '#64748b', fontSize: '12px', padding: '10px' }}
          >
            התנתק מהמערכת
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentor;







//########################################################
  //  "אביה": {
  //     "1": { 
  //       taskName: "", // משימה
  //       intel: "" //מודיעין
  //       highlights: "" // דגשים למשתתף
  //       briefing: "" // דגשים לברוש
  //       location: "" //מיקום
  //       participants: "" //משתתפים
  //       image: "" 
  //     },

  // const mentorDataBank = {
  //   // כאן תשאיר את האובייקט שלך כפי שהוא
  //   "מאור": {
  //     "1": { 
  //       taskName: "משימה: סיוש לטובת זיהוי וראי 8",
  //       intel: "סבב א': פרנקל בחנות קדמת עדן אלנבי 93, יוני בסטימצקי באלנבי / רוטשילד, סבב ב': דותן מיני מרקט מלצט 5, אדרי סטימצקי אלנבי/רוטשילד",
  //       highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
  //       briefing: "ללא יציאה לדוד",
  //       image: "" 
  //     },
  //     "2": { 
  //       taskName: "סיוש וביצוע טלפרינטר",
  //       intel: "פרנקל / דותן בס.פ חיסין, יוני / אדרי בעץ הבימה",
  //       highlights: "יציאה לדוד עד לעוגן. ברוש של פרנקל / דותן יגיע לכתובת אחד העם 116, ברוש של יוני / אדרי לאנג'ל 4. ",
  //       briefing: "לא להיכנס לתוך העוגן",
  //       image: ""
  //     },"3": { 
  //       taskName: "התקנת ש.ש במסעדה",
  //       intel: " סבב א': פרנקל וענבר, סבב ב': דותן וצוקר",
  //       highlights: "סבב א': ראמה המלך ג'ורג' 38, סבב ב' כפרה מיו המלך ג'ורג' 105",
  //       briefing: "הוזמן מקום גם לברוש וגם להם",
  //       image: ""
  //     },"4": { 
  //       taskName: "רווק תוכי",
  //       intel: "סבב א': קבוצה: פרנקל + אגם + יוני + מתן, סבב ב': דותן + צוקר + אתי + גלעד",
  //       highlights: " בורוכוב בחומוס לוריא",
  //       briefing: "לתת ירקות בורוכב לחניכים, חונכים: מאור ואליקו ",
  //       image: ""
  //     },"5": { 
  //       taskName: "סיוש וביצוע טלפרינטר",
  //       intel: "פרנקל בס.פ חיסין, יוני בעץ הבימה",
  //       highlights: "יציאה לדוד עד לעוגן. ברוש של פרנקל יגיע לכתובת אחד העם 116, ברוש של יוני לאנג'ל 4. ",
  //       briefing: "לא להיכנס לתוך העוגן",
  //       image: ""
  //     }
  //     // תוסיף כאן את שאר התחנות...
  //   },
  //    "אביה": {
  //     "1": { 
  //       taskName: "משימה: סיוש לטובת זיהוי וראי 8",
  //       intel: "סבב א': גליקמן סטימצקי דיזינגוף 109, רובן המרכז למשקפי שמש קינג ג'ורג' / בוגרשוב, סבב ב':, אתי אפרטיף בוטיק יינות דיזינגוף 93, גדי פון מרקט קינג ג'ורג' / בוגרשוב, עזרי סטימצקי דיזינגוף 109",
  //       highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
  //       briefing: "ללא יציאה לדוד",
  //       image: "" 
  //     },
  //     "2": { 
  //       taskName: "סיוש וביצוע טלפרינטר",
  //       intel: "גליקמן / אתי כיכר השוטר, רובן / גדי כיכר דיזינגוף, עזרי 9ד אימהות ",
  //       highlights: "עוגנים:, גליקמן / אתי לוריא 10, רובן / גדי סמולנסקין 7, עזרי עין חרוד 15 ",
  //       briefing: "לא להיכנס לתוך העוגן",
  //       image: ""
  //     },"3": { 
  //       taskName: "התקנת ש.ש במסעדה",
  //       intel: "סבב א': מתן וגליקמן, סבב ב': גלעד אתי ועזרי",
  //       highlights: "סבב א': פרוזדור מנדלי , סבב ב': מקסיקנה בוגרשוב 7",
  //       briefing: "הוזמן מקום גם לברוש וגם להם",
  //       image: ""
  //     },"4": { 
  //       taskName: "רווק תוכי",
  //       intel: "קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי",
  //       highlights: " בורוכוב בחומוס הסנטר",
  //       briefing: "לתת ירקות בורוכב לחניכים, חונכים:  אביה ועמית, נמצאים איתם בהתקנה ! ",
  //       image: ""
  //     },"5": { 
  //       taskName: "לפי מצגת",
  //       intel: "ציר הנדון: מלון סינמה, זמנהוף, קינג ג'ורג' עד לכיכר מסריק, קבוצה א': פרנקל + אגם + יוני + מתן, קבוצה ב': דותן + צוקר + אתי + גלעד",
  //       highlights: "זה לא צוות מצומצם. עליהם להסתמך על המודיעין של ציר ההליכה ולתכנן בדרך.",
  //       briefing: "יאללה מאמץ אחרון",
  //       image: ""
  //     }
  //     // תוסיף כאן את שאר התחנות...
  //   },

  //   "אליקו": {
  //     "1": { 
  //       taskName: "משימה: סיוש לטובת זיהוי וראי 8",
  //       intel: "סבב א': ליו פיד קלין מזאהה 22א, מתן טוישופ מונטיפיורי 33, סבב ב': רני טישלר מוצרי חשמל מונטיפיורי 93, גלעד טוישופ מונטיפיורי 33 ",
  //       highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
  //       briefing: "ללא יציאה לדוד",
  //       image: "" 
  //     },
  //     "2": { 
  //       taskName: "סיוש וביצוע טלפרינטר",
  //       intel: "ליו / רני כיכר אלברט, מתן / גלעד גן נפחא ",
  //       highlights: "עוגנים:, ליו / רני ג'ורג' אליוט 13, מתן / גלעד פיארברג 22 ",
  //       briefing: "לא להיכנס לתוך העוגן",
  //       image: ""
  //     },"3": { 
  //       taskName: "התקנת ש.ש במסעדה",
  //       intel: "סבב א': יוני + רובן, סבב ב': אדרי + גדי",
  //       highlights: "סבב א': הלבנטיני בן יהודה 170, סבב ב': רוסטיקו בזל בזל 42",
  //       briefing: "הוזמן מקום גם לברוש וגם להם",
  //       image: ""
  //     },"4": { 
  //       taskName: "רווק תוכי",
  //       intel: "קבוצה א':פרנקל + אגם + יוני + מתן, קבוצה ב':דותן + צוקר + אתי + גלעד",
  //       highlights: " בורוכוב בחומוס לוריא",
  //       briefing: "לתת ירקות בורוכב לחניכים, חונכים: מאור ואליקו, נמצאים איתם בהתקנה ! ",
  //       image: ""
  //     },"5": { 
  //       taskName: "לפי מצגת",
  //       intel: "ציר הנדון: מלון סינמה, זמנהוף, קינג ג'ורג' עד לכיכר מסריק",
  //       highlights: "זה לא צוות מצומצם. עליהם להסתמך על המודיעין של ציר ההליכה ולתכנן בדרך, קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי.",
  //       briefing: "יאללה מאמץ אחרון",
  //       image: ""
  //     }
  //     // תוסיף כאן את שאר התחנות...
  //   },
  //   "עמית": {
  //     "1": { 
  //       taskName: "משימה: סיוש לטובת זיהוי וראי 8",
  //       intel: "ענבר: אייסי בוגרשוב 26, אגם: לייטוויב בוגרשוב 72, סבב ב': צוקר אייסי בוגרשוב 26, נירו לייטוויב בוגרשוב 72",
  //       highlights: "הישג נדרש: זיהוי לפי תמונה וראי 8 של ברוש",
  //       briefing: "ללא יציאה לדוד",
  //       image: "" 
  //     },
  //     "2": { 
  //       taskName: "סיוש וביצוע טלפרינטר",
  //       intel: "ענבר / צוקר גן מאיר, אגם / נירו כיכר ביאליק ",
  //       highlights: "עוגנים:, ענבר / צוקר צבי ברוק 7 , אגם / נירו הס 1 ",
  //       briefing: "לא להיכנס לתוך העוגן",
  //       image: ""
  //     },"3": { 
  //       taskName: "התקנת ש.ש במסעדה",
  //       intel: " סבב א': ליו + אגם, סבב ב': רני + נירו",
  //       highlights: "סבב א': פנקינה גורדון 39, סבב ב': ארנסטו בן יהודה 90",
  //       briefing: "הוזמן מקום גם לברוש וגם להם",
  //       image: ""
  //     },"4": { 
  //       taskName: "רווק תוכי",
  //       intel: "קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי",
  //       highlights: " בורוכוב בחומוס הסנטר",
  //       briefing: "לתת ירקות בורוכב לחניכים, חונכים:  אביה ועמית, נמצאים איתם בהתקנה ! ",
  //       image: ""
  //     },"5": { 
  //       taskName: "לפי מצגת",
  //       intel: "ציר הנדון: מלון סינמה, זמנהוף, קינג ג'ורג' עד לכיכר מסריק",
  //       highlights: "זה לא צוות מצומצם. עליהם להסתמך על המודיעין של ציר ההליכה ולתכנן בדרך, קבוצה א': ענבר + גליקמן + ליו + רובן, קבוצה ב': נירו + רני + אדרי + גדי + עזרי.",
  //       briefing: "יאללה מאמץ אחרון",
  //       image: ""
  //     }
  //     // תוסיף כאן את שאר התחנות...
  //   }
  // };