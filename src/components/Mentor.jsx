import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Mentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // --- נתוני קבוצות (מסונכרן עם סטיישן - ללא מיקום, רק משתתפים) ---
  const groupsData = {
    "צוות אדום": {
      "6": { participants: "פרנקל, כהן, לוי" },
      "7": { participants: "פרנקל, כהן, לוי" },
      "8": { participants: "כלל משתתפי המבצע" }
    }
  };

  // --- נתוני מנטור ---
  const allMentorMissions = {
    "אביה": {
      "7": { 
        taskName: "מבצע סגירה", 
        intel: "הצוותים מגיעים מנקודות שונות.",
        highlights: "לוודא הגעה שקטה ללא חשיפה.",
        briefing: "ברוש: לוודא שכולם בתוך החניון ב-22:00.",
        location: "חניון המגדל", 
        group: "צוות אדום" 
      }
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) { navigate(`/login?s=${id}`); return; }
    setLoading(false);
  }, [id, navigate]);

  const goToNext = () => navigate(`/mentor/${parseInt(id) + 1}`);
  const goToPrev = () => navigate(`/mentor/${parseInt(id) - 1}`);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">טוען נתוני בקרה...</div>;

  const currentMission = allMentorMissions["אביה"]?.[id] || {};
  const groupDetail = currentMission.group ? groupsData[currentMission.group]?.[id] : null;

  return (
    <div className="mentor-page">
      <div className="app-container">
        <div className="card" style={{ textAlign: 'right', borderTop: '4px solid #ef4444' }}>
          
          {/* ניווט תחנות */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={goToPrev} disabled={id === "1"} style={{ width: '40px', padding: '10px', background: '#1e293b', borderRadius: '10px', color: 'white' }}>➔</button>
            <h1 style={{ fontSize: '1.4rem', margin: 0 }}>תחנה {id}</h1>
            <button onClick={goToNext} disabled={id === "8"} style={{ width: '40px', padding: '10px', background: '#1e293b', borderRadius: '10px', color: 'white' }}>←</button>
          </div>

          <main>
            {/* כותרת המשימה */}
            <div style={{ background: 'rgba(220,38,38,0.1)', padding: '15px', borderRadius: '15px', borderRight: '5px solid #dc2626', marginBottom: '20px' }}>
              <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>משימה:</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '900', margin: 0 }}>{currentMission.taskName || "משימה כללית"}</p>
            </div>

            {/* בלוק מיקום וקבוצה */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
               <div style={{ background: '#020617', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                  <p style={{ color: '#64748b', fontSize: '10px', margin: '0 0 4px 0' }}>📍 מיקום</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', margin: 0 }}>{currentMission.location || "-"}</p>
               </div>
               
               {currentMission.group && (
                 <div style={{ background: 'rgba(251, 191, 36, 0.05)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                    <p style={{ color: '#fbbf24', fontSize: '10px', margin: '0 0 4px 0' }}>👥 שיוך קבוצתי</p>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', margin: 0 }}>{currentMission.group}</p>
                 </div>
               )}
            </div>

            {/* רשימת משתתפים בצוות */}
            {groupDetail?.participants && (
              <div style={{ marginBottom: '20px', padding: '12px', background: '#0f172a', borderRadius: '10px', borderRight: '3px solid #fbbf24' }}>
                 <p style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>צוות בתחנה:</p>
                 <p style={{ fontSize: '14px', color: '#f8fafc', margin: 0, lineHeight: '1.4' }}>{groupDetail.participants}</p>
              </div>
            )}

            {/* הנחיות טקסטואליות */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <section>
                  <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>🔍 מודיעין:</p>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>{currentMission.intel}</p>
                </section>

                <section>
                  <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>⚠️ דגשים למשתתף:</p>
                  <p style={{ color: '#f8fafc', fontSize: '14px', margin: 0 }}>{currentMission.highlights}</p>
                </section>

                {currentMission.briefing && (
                  <div style={{ background: 'rgba(251, 191, 36, 0.03)', padding: '12px', borderRadius: '10px', borderRight: '3px solid #fbbf24', marginTop: '5px' }}>
                    <p style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 'bold', margin: '0 0 5px 0' }}>🌳 דגשים לברוש:</p>
                    <p style={{ color: '#f8fafc', fontSize: '14px', fontStyle: 'italic', margin: 0 }}>{currentMission.briefing}</p>
                  </div>
                )}
            </div>

          </main>
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