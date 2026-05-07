export const STATION_PASSWORDS = {
  "1": "1705",//הגעה למלון
  "2": "1404",//סיוש בעוגן
  "3": "1610",//ראי 8 בעוגן
  "4": "1808",//סיוש לספסל
  "5": "1605",//הובלה לעוגן
  "6": "0403",//מסעדה
  "7": "1107",//תוכי
  "8": "סיום"//דנה
};

// --- Global Variables (Titles) ---
const HOTEL_TITLE = "הגעה למלון 🏨";
const SCOUT_STORE = "סיוש בעוגן";
const PHOTO_STORE = "ראי 8 בעוגן";
const SCOUT_PARK = "סיוש בפארק";
const PARK_ADDR_TITLE = "תצפית והובלה לעוגן";
const RESTURANT = "סיוש וביצוע התקנה במסעדה";
const TUKI = "התקנת תוכי";
const DANA = "משימת סיום";

// --- Global Variables (Intel) ---
const INTEL_TASK1 = "ברוך הבא למשימה האחרונה בפרק הפרט / מצומצם. לפניך יומיים מאתגרים. סומכים עליך. בהצלחה !";
const INTEL_TASK2 = "על פי מידע שבידנו, הגיע אדם לתא השטח עליו אנו רוצים להרחיב מידע. פנה/י למדריך המלווה להרחבה";
const INTEL_TASK3 = "על פי מידע שבידינו האדם יגיע לקניות אישיות בחנות";
const INTEL_TASK4 = "האדם יעביר מידע לאדם אחר בכתובת שלך";
const INTEL_TASK5 = "האדם העביר מידע לאדם אחר בכתובת שלך";
const INTEL_TASK6 = "האדם והנוסף יפגשו במסעדה";
const INTEL_TASK7 = "האדם החנה את רכבו בחניון. לקבלת פרטים פנה/י למדריך המלווה";
const INTEL_TASK8 = "הנדון יצא ממלון סינמה, כיכר דיזינגוף";

// --- Global Variables (Tasks) ---
const TASK1 = "עליך להגיע למלון, לקבל מפתח מהמדריך המלווה, להיכנס לחדר להתארגנות ולעבור למשימה הראשונה";
const TASK2 = "סיוש בעוגן";
const TASK3 = "איתור וצילום האדם";
const TASK4 = "סיוש לטובת תצפית";
const TASK5 = "איתור מרוקן ודוד לעוגן";
const TASK6 = "ביצוע סיוש לטובת התקנה והתקנת השולחן, פנה/י למדריך המלווה לפרטים וקבלת כלי";
const TASK7 = "סיוש וביצוע התקנת הרכב";
const TASK8 = "פנה/י למדריך המלווה";

// --- Global Variables (Hours) ---
const HOURS_T1 = "09:00 - 10:00";
const HOURS_T2 = "10:00 - 11:30";
const HOURS_T3 = "13:50 - 14:20";
const HOURS_T4 = "14:30 - 15:30";
const HOURS_T5 = "16:30 - 18:30";
const HOURS_T6 = "19:00 - 22:00";
const HOURS_T7 = "22:00 - 02:00";
const HOURS_T8 = "08:00 - 13:00";

//Groups
const COUPLE1 = "פרנקל וענבר";
const COUPLE2 = "מתן ורובן";
const COUPLE3 = "ליו ואגם";
const COUPLE4 = "יוני וגליקמן";
const COUPLE5 = "דותן וצוקר";
const COUPLE6 = "אדרי וגדי";
const COUPLE7 = "רני ונירו";
const COUPLE8 = "גלעד אתי ועזרי";

const GROUP1 = "פרנקל, אגם, יוני, מתן";
const GROUP2 = "ענבר, גליקמן, ליו, רובן";
const GROUP3 = "דותן, צוקר, אתי, גלעד";
const GROUP4 = "נירו, רני, אדרי, גדי, עזרי";

//parking
const CENTER = "32.07558285331122, 34.77540084755848";
const LURIA = "32.077673773401, 34.77180668751434";

//hotels
const CINEMA_HOTEL = "32.07797377105609, 34.77473565972941";
const ROTCHILD_22 = "32.062940,34.771376";
const C_TOWER = "32.076823592894776, 34.76745580285819";
const CINEMA_NAME = "מלון סינמה";
const ROTCHILD_NAME = "מלון רוטשילד 22";
const C_TOWER_NAME = "מלון סי טאוור";

//tree
const BROSH = "ברוש";
const ILAN = "אילן";
const MANGO = "מנגו";
const PAPAYA = "פפאיה";
const LIMON = "לימון";

export const allMissionsData = {};

const participants = [
  "פרנקל", "ענבר", "דותן", "צוקר", "מתן", "רובן", 
  "אדרי", "גדי", "ליו", "אגם", "רני", "נירו", 
  "ניירו", "יוני", "גליקמן", "גלעד", "אתי", "עזרי"
];

// יצירת השלד לכולם
participants.forEach(name => {
  allMissionsData[name] = {
    "1": { title: HOTEL_TITLE, intel: INTEL_TASK1, task: TASK1, hours: HOURS_T1, img: "/missions/depapel.png", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "2": { title: SCOUT_STORE, intel: INTEL_TASK2, task: TASK2, hours: HOURS_T2, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "3": { title: PHOTO_STORE, intel: INTEL_TASK3, task: TASK3, hours: HOURS_T3, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "4": { title: SCOUT_PARK, intel: INTEL_TASK4, task: TASK4, hours: HOURS_T4, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "5": { title: PARK_ADDR_TITLE, intel: INTEL_TASK5, task: TASK5, hours: HOURS_T5, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "6": { title: RESTURANT, intel: INTEL_TASK6, task: TASK6, hours: HOURS_T6, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "7": { title: TUKI, intel: INTEL_TASK7, task: TASK7, hours: HOURS_T7, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" },
    "8": { title: DANA, intel: INTEL_TASK8, task: TASK8, hours: HOURS_T8, img: "", group: "", address: "", map: "", tree: "", escort: "", dest: "" }
  };
});

// =====================================================================
// עריכה ידנית לכל משתתף - 8 תחנות לכל שם
// =====================================================================

// --- פרנקל ---
allMissionsData["פרנקל"]["1"].address = ROTCHILD_NAME;
allMissionsData["פרנקל"]["1"].map = ROTCHILD_22;
allMissionsData["פרנקל"]["1"].group = "";
allMissionsData["פרנקל"]["1"].tree = BROSH;
allMissionsData["פרנקל"]["1"].escort = "מאור";

allMissionsData["פרנקל"]["2"].address = "קדמת עדן, אלנבי 93 תל אביב";
allMissionsData["פרנקל"]["2"].map = "אלנבי 93 תל אביב";
allMissionsData["פרנקל"]["2"].group = "";
allMissionsData["פרנקל"]["2"].tree = BROSH;
allMissionsData["פרנקל"]["2"].img = "/missions/kidmat.jpg";
allMissionsData["פרנקל"]["2"].escort = "מאור";

allMissionsData["פרנקל"]["3"].address = "קדמת עדן, אלנבי 93 תל אביב";
allMissionsData["פרנקל"]["3"].map = "אלנבי 93 תל אביב";
allMissionsData["פרנקל"]["3"].group = "";
allMissionsData["פרנקל"]["3"].tree = BROSH;
allMissionsData["פרנקל"]["3"].img = "/missions/kidmat.jpg";
allMissionsData["פרנקל"]["3"].escort = "מאור";

allMissionsData["פרנקל"]["4"].address = "גן חיסין";
allMissionsData["פרנקל"]["4"].map = "32.07366599931782, 34.778004364620315";
allMissionsData["פרנקל"]["4"].group = "";
allMissionsData["פרנקל"]["4"].tree = ILAN;
allMissionsData["פרנקל"]["4"].img = "/missons/hisin1.jpg";
allMissionsData["פרנקל"]["4"].escort = "מאור";

allMissionsData["פרנקל"]["4"].address = "גן חיסין";
allMissionsData["פרנקל"]["4"].map = "32.07366599931782, 34.778004364620315";
allMissionsData["פרנקל"]["5"].group = "";
allMissionsData["פרנקל"]["5"].tree = ILAN;
allMissionsData["פרנקל"]["5"].img = "/missons/hisin1.jpg";
allMissionsData["פרנקל"]["5"].escort = "מאור";
allMissionsData["פרנקל"]["5"].dest = "אחד העם 116 תל אביב";

allMissionsData["פרנקל"]["6"].address = "ראמה, המלך גורג 38";
allMissionsData["פרנקל"]["6"].map = "32.073125200251646, 34.7748640451862";
allMissionsData["פרנקל"]["6"].group = COUPLE1;
allMissionsData["פרנקל"]["6"].tree = BROSH;
allMissionsData["פרנקל"]["6"].escort = "מאור";

allMissionsData["פרנקל"]["7"].address = "חניון לוריא";
allMissionsData["פרנקל"]["7"].map = LURIA;
allMissionsData["פרנקל"]["7"].group = GROUP1;
allMissionsData["פרנקל"]["7"].tree = BROSH;
allMissionsData["פרנקל"]["7"].escort = "מאור + אליקו";

allMissionsData["פרנקל"]["8"].address = CINEMA_NAME;
allMissionsData["פרנקל"]["8"].map = CINEMA_HOTEL;
allMissionsData["פרנקל"]["8"].group = GROUP1;
allMissionsData["פרנקל"]["8"].tree = BROSH;
allMissionsData["פרנקל"]["8"].escort = "מאור + אליקו";

// --- ענבר ---
allMissionsData["ענבר"]["1"].address = C_TOWER_NAME;
allMissionsData["ענבר"]["1"].map = C_TOWER;
allMissionsData["ענבר"]["1"].group = "";
allMissionsData["ענבר"]["1"].tree = PAPAYA;
allMissionsData["ענבר"]["1"].escort = "מאור";

allMissionsData["ענבר"]["2"].address = "Lightwave, בוגרשוב 72";
allMissionsData["ענבר"]["2"].map = "בוגרשוב 72 תל אביב";
allMissionsData["ענבר"]["2"].group = "";
allMissionsData["ענבר"]["2"].tree = PAPAYA;
allMissionsData["ענבר"]["2"].escort = "עמית";

allMissionsData["ענבר"]["3"].address = "Lightwave, בורשוב 72 תל אביב";
allMissionsData["ענבר"]["3"].map = "בוגרשוב 72 תל אביב";
allMissionsData["ענבר"]["3"].group = "";
allMissionsData["ענבר"]["3"].tree = PAPAYA;
allMissionsData["ענבר"]["3"].escort = "עמית";

allMissionsData["ענבר"]["4"].address = "";
allMissionsData["ענבר"]["4"].map = "";
allMissionsData["ענבר"]["4"].group = "";
allMissionsData["ענבר"]["4"].tree = "";
allMissionsData["ענבר"]["4"].escort = "";

allMissionsData["ענבר"]["5"].address = "";
allMissionsData["ענבר"]["5"].map = "";
allMissionsData["ענבר"]["5"].group = "";
allMissionsData["ענבר"]["5"].tree = "";
allMissionsData["ענבר"]["5"].escort = "";
allMissionsData["ענבר"]["5"].dest = "חוף הים";

allMissionsData["ענבר"]["6"].address = "";
allMissionsData["ענבר"]["6"].map = "";
allMissionsData["ענבר"]["6"].group = "";
allMissionsData["ענבר"]["6"].tree = "";
allMissionsData["ענבר"]["6"].escort = "";

allMissionsData["ענבר"]["7"].address = "";
allMissionsData["ענבר"]["7"].map = "";
allMissionsData["ענבר"]["7"].group = "";
allMissionsData["ענבר"]["7"].tree = "";
allMissionsData["ענבר"]["7"].escort = "";

allMissionsData["ענבר"]["8"].address = "";
allMissionsData["ענבר"]["8"].map = "";
allMissionsData["ענבר"]["8"].group = "";
allMissionsData["ענבר"]["8"].tree = "";
allMissionsData["ענבר"]["8"].escort = "";

// --- דותן ---
allMissionsData["דותן"]["1"].address = "מלון רוטשילד 22";
allMissionsData["דותן"]["1"].map = "32.062940,34.771376";
allMissionsData["דותן"]["1"].group = "";
allMissionsData["דותן"]["1"].tree = "ברוש";
allMissionsData["דותן"]["1"].escort = "מאור";

allMissionsData["דותן"]["2"].address = "";
allMissionsData["דותן"]["2"].map = "";
allMissionsData["דותן"]["2"].group = "";
allMissionsData["דותן"]["2"].tree = "";
allMissionsData["דותן"]["2"].escort = "";

allMissionsData["דותן"]["3"].address = "";
allMissionsData["דותן"]["3"].map = "";
allMissionsData["דותן"]["3"].group = "";
allMissionsData["דותן"]["3"].tree = "";
allMissionsData["דותן"]["3"].escort = "";

allMissionsData["דותן"]["4"].address = "";
allMissionsData["דותן"]["4"].map = "";
allMissionsData["דותן"]["4"].group = "";
allMissionsData["דותן"]["4"].tree = "";
allMissionsData["דותן"]["4"].escort = "";

allMissionsData["דותן"]["5"].address = "";
allMissionsData["דותן"]["5"].map = "";
allMissionsData["דותן"]["5"].group = "";
allMissionsData["דותן"]["5"].tree = "";
allMissionsData["דותן"]["5"].escort = "";
allMissionsData["דותן"]["5"].dest = "חוף הים";

allMissionsData["דותן"]["6"].address = "";
allMissionsData["דותן"]["6"].map = "";
allMissionsData["דותן"]["6"].group = "";
allMissionsData["דותן"]["6"].tree = "";
allMissionsData["דותן"]["6"].escort = "";

allMissionsData["דותן"]["7"].address = "";
allMissionsData["דותן"]["7"].map = "";
allMissionsData["דותן"]["7"].group = "";
allMissionsData["דותן"]["7"].tree = "";
allMissionsData["דותן"]["7"].escort = "";

allMissionsData["דותן"]["8"].address = "";
allMissionsData["דותן"]["8"].map = "";
allMissionsData["דותן"]["8"].group = "";
allMissionsData["דותן"]["8"].tree = "";
allMissionsData["דותן"]["8"].escort = "";

// --- צוקר ---
allMissionsData["צוקר"]["1"].address = "מלון רוטשילד 22";
allMissionsData["צוקר"]["1"].map = "32.062940,34.771376";
allMissionsData["צוקר"]["1"].group = "";
allMissionsData["צוקר"]["1"].tree = "ברוש";
allMissionsData["צוקר"]["1"].escort = "מאור";

allMissionsData["צוקר"]["2"].address = "";
allMissionsData["צוקר"]["2"].map = "";
allMissionsData["צוקר"]["2"].group = "";
allMissionsData["צוקר"]["2"].tree = "";
allMissionsData["צוקר"]["2"].escort = "";

allMissionsData["צוקר"]["3"].address = "";
allMissionsData["צוקר"]["3"].map = "";
allMissionsData["צוקר"]["3"].group = "";
allMissionsData["צוקר"]["3"].tree = "";
allMissionsData["צוקר"]["3"].escort = "";

allMissionsData["צוקר"]["4"].address = "";
allMissionsData["צוקר"]["4"].map = "";
allMissionsData["צוקר"]["4"].group = "";
allMissionsData["צוקר"]["4"].tree = "";
allMissionsData["צוקר"]["4"].escort = "";

allMissionsData["צוקר"]["5"].address = "";
allMissionsData["צוקר"]["5"].map = "";
allMissionsData["צוקר"]["5"].group = "";
allMissionsData["צוקר"]["5"].tree = "";
allMissionsData["צוקר"]["5"].escort = "";
allMissionsData["צוקר"]["5"].dest = "חוף הים";

allMissionsData["צוקר"]["6"].address = "";
allMissionsData["צוקר"]["6"].map = "";
allMissionsData["צוקר"]["6"].group = "";
allMissionsData["צוקר"]["6"].tree = "";
allMissionsData["צוקר"]["6"].escort = "";

allMissionsData["צוקר"]["7"].address = "";
allMissionsData["צוקר"]["7"].map = "";
allMissionsData["צוקר"]["7"].group = "";
allMissionsData["צוקר"]["7"].tree = "";
allMissionsData["צוקר"]["7"].escort = "";

allMissionsData["צוקר"]["8"].address = "";
allMissionsData["צוקר"]["8"].map = "";
allMissionsData["צוקר"]["8"].group = "";
allMissionsData["צוקר"]["8"].tree = "";
allMissionsData["צוקר"]["8"].escort = "";

// --- מתן ---
allMissionsData["מתן"]["1"].address = "מלון רוטשילד 22";
allMissionsData["מתן"]["1"].map = "32.062940,34.771376";
allMissionsData["מתן"]["1"].group = "";
allMissionsData["מתן"]["1"].tree = "ברוש";
allMissionsData["מתן"]["1"].escort = "מאור";

allMissionsData["מתן"]["2"].address = "";
allMissionsData["מתן"]["2"].map = "";
allMissionsData["מתן"]["2"].group = "";
allMissionsData["מתן"]["2"].tree = "";
allMissionsData["מתן"]["2"].escort = "";

allMissionsData["מתן"]["3"].address = "";
allMissionsData["מתן"]["3"].map = "";
allMissionsData["מתן"]["3"].group = "";
allMissionsData["מתן"]["3"].tree = "";
allMissionsData["מתן"]["3"].escort = "";

allMissionsData["מתן"]["4"].address = "";
allMissionsData["מתן"]["4"].map = "";
allMissionsData["מתן"]["4"].group = "";
allMissionsData["מתן"]["4"].tree = "";
allMissionsData["מתן"]["4"].escort = "";

allMissionsData["מתן"]["5"].address = "";
allMissionsData["מתן"]["5"].map = "";
allMissionsData["מתן"]["5"].group = "";
allMissionsData["מתן"]["5"].tree = "";
allMissionsData["מתן"]["5"].escort = "";
allMissionsData["מתן"]["5"].dest = "חוף הים";

allMissionsData["מתן"]["6"].address = "";
allMissionsData["מתן"]["6"].map = "";
allMissionsData["מתן"]["6"].group = "";
allMissionsData["מתן"]["6"].tree = "";
allMissionsData["מתן"]["6"].escort = "";

allMissionsData["מתן"]["7"].address = "";
allMissionsData["מתן"]["7"].map = "";
allMissionsData["מתן"]["7"].group = "";
allMissionsData["מתן"]["7"].tree = "";
allMissionsData["מתן"]["7"].escort = "";

allMissionsData["מתן"]["8"].address = "";
allMissionsData["מתן"]["8"].map = "";
allMissionsData["מתן"]["8"].group = "";
allMissionsData["מתן"]["8"].tree = "";
allMissionsData["מתן"]["8"].escort = "";

// --- רובן ---
allMissionsData["רובן"]["1"].address = "מלון רוטשילד 22";
allMissionsData["רובן"]["1"].map = "32.062940,34.771376";
allMissionsData["רובן"]["1"].group = "";
allMissionsData["רובן"]["1"].tree = "ברוש";
allMissionsData["רובן"]["1"].escort = "מאור";

allMissionsData["רובן"]["2"].address = "";
allMissionsData["רובן"]["2"].map = "";
allMissionsData["רובן"]["2"].group = "";
allMissionsData["רובן"]["2"].tree = "";
allMissionsData["רובן"]["2"].escort = "";

allMissionsData["רובן"]["3"].address = "";
allMissionsData["רובן"]["3"].map = "";
allMissionsData["רובן"]["3"].group = "";
allMissionsData["רובן"]["3"].tree = "";
allMissionsData["רובן"]["3"].escort = "";

allMissionsData["רובן"]["4"].address = "";
allMissionsData["רובן"]["4"].map = "";
allMissionsData["רובן"]["4"].group = "";
allMissionsData["רובן"]["4"].tree = "";
allMissionsData["רובן"]["4"].escort = "";

allMissionsData["רובן"]["5"].address = "";
allMissionsData["רובן"]["5"].map = "";
allMissionsData["רובן"]["5"].group = "";
allMissionsData["רובן"]["5"].tree = "";
allMissionsData["רובן"]["5"].escort = "";
allMissionsData["רובן"]["5"].dest = "חוף הים";

allMissionsData["רובן"]["6"].address = "";
allMissionsData["רובן"]["6"].map = "";
allMissionsData["רובן"]["6"].group = "";
allMissionsData["רובן"]["6"].tree = "";
allMissionsData["רובן"]["6"].escort = "";

allMissionsData["רובן"]["7"].address = "";
allMissionsData["רובן"]["7"].map = "";
allMissionsData["רובן"]["7"].group = "";
allMissionsData["רובן"]["7"].tree = "";
allMissionsData["רובן"]["7"].escort = "";

allMissionsData["רובן"]["8"].address = "";
allMissionsData["רובן"]["8"].map = "";
allMissionsData["רובן"]["8"].group = "";
allMissionsData["רובן"]["8"].tree = "";
allMissionsData["רובן"]["8"].escort = "";

// --- אדרי ---
allMissionsData["אדרי"]["1"].address = "מלון רוטשילד 22";
allMissionsData["אדרי"]["1"].map = "32.062940,34.771376";
allMissionsData["אדרי"]["1"].group = "";
allMissionsData["אדרי"]["1"].tree = "ברוש";
allMissionsData["אדרי"]["1"].escort = "מאור";

allMissionsData["אדרי"]["2"].address = "";
allMissionsData["אדרי"]["2"].map = "";
allMissionsData["אדרי"]["2"].group = "";
allMissionsData["אדרי"]["2"].tree = "";
allMissionsData["אדרי"]["2"].escort = "";

allMissionsData["אדרי"]["3"].address = "";
allMissionsData["אדרי"]["3"].map = "";
allMissionsData["אדרי"]["3"].group = "";
allMissionsData["אדרי"]["3"].tree = "";
allMissionsData["אדרי"]["3"].escort = "";

allMissionsData["אדרי"]["4"].address = "";
allMissionsData["אדרי"]["4"].map = "";
allMissionsData["אדרי"]["4"].group = "";
allMissionsData["אדרי"]["4"].tree = "";
allMissionsData["אדרי"]["4"].escort = "";

allMissionsData["אדרי"]["5"].address = "";
allMissionsData["אדרי"]["5"].map = "";
allMissionsData["אדרי"]["5"].group = "";
allMissionsData["אדרי"]["5"].tree = "";
allMissionsData["אדרי"]["5"].escort = "";
allMissionsData["אדרי"]["5"].dest = "חוף הים";

allMissionsData["אדרי"]["6"].address = "";
allMissionsData["אדרי"]["6"].map = "";
allMissionsData["אדרי"]["6"].group = "";
allMissionsData["אדרי"]["6"].tree = "";
allMissionsData["אדרי"]["6"].escort = "";

allMissionsData["אדרי"]["7"].address = "";
allMissionsData["אדרי"]["7"].map = "";
allMissionsData["אדרי"]["7"].group = "";
allMissionsData["אדרי"]["7"].tree = "";
allMissionsData["אדרי"]["7"].escort = "";

allMissionsData["אדרי"]["8"].address = "";
allMissionsData["אדרי"]["8"].map = "";
allMissionsData["אדרי"]["8"].group = "";
allMissionsData["אדרי"]["8"].tree = "";
allMissionsData["אדרי"]["8"].escort = "";

// --- גדי ---
allMissionsData["גדי"]["1"].address = "מלון רוטשילד 22";
allMissionsData["גדי"]["1"].map = "32.062940,34.771376";
allMissionsData["גדי"]["1"].group = "";
allMissionsData["גדי"]["1"].tree = "ברוש";
allMissionsData["גדי"]["1"].escort = "מאור";

allMissionsData["גדי"]["2"].address = "";
allMissionsData["גדי"]["2"].map = "";
allMissionsData["גדי"]["2"].group = "";
allMissionsData["גדי"]["2"].tree = "";
allMissionsData["גדי"]["2"].escort = "";

allMissionsData["גדי"]["3"].address = "";
allMissionsData["גדי"]["3"].map = "";
allMissionsData["גדי"]["3"].group = "";
allMissionsData["גדי"]["3"].tree = "";
allMissionsData["גדי"]["3"].escort = "";

allMissionsData["גדי"]["4"].address = "";
allMissionsData["גדי"]["4"].map = "";
allMissionsData["גדי"]["4"].group = "";
allMissionsData["גדי"]["4"].tree = "";
allMissionsData["גדי"]["4"].escort = "";

allMissionsData["גדי"]["5"].address = "";
allMissionsData["גדי"]["5"].map = "";
allMissionsData["גדי"]["5"].group = "";
allMissionsData["גדי"]["5"].tree = "";
allMissionsData["גדי"]["5"].escort = "";
allMissionsData["גדי"]["5"].dest = "חוף הים";

allMissionsData["גדי"]["6"].address = "";
allMissionsData["גדי"]["6"].map = "";
allMissionsData["גדי"]["6"].group = "";
allMissionsData["גדי"]["6"].tree = "";
allMissionsData["גדי"]["6"].escort = "";

allMissionsData["גדי"]["7"].address = "";
allMissionsData["גדי"]["7"].map = "";
allMissionsData["גדי"]["7"].group = "";
allMissionsData["גדי"]["7"].tree = "";
allMissionsData["גדי"]["7"].escort = "";

allMissionsData["גדי"]["8"].address = "";
allMissionsData["גדי"]["8"].map = "";
allMissionsData["גדי"]["8"].group = "";
allMissionsData["גדי"]["8"].tree = "";
allMissionsData["גדי"]["8"].escort = "";

// --- ליו ---
allMissionsData["ליו"]["1"].address = "מלון רוטשילד 22";
allMissionsData["ליו"]["1"].map = "32.062940,34.771376";
allMissionsData["ליו"]["1"].group = "";
allMissionsData["ליו"]["1"].tree = "ברוש";
allMissionsData["ליו"]["1"].escort = "מאור";

allMissionsData["ליו"]["2"].address = "";
allMissionsData["ליו"]["2"].map = "";
allMissionsData["ליו"]["2"].group = "";
allMissionsData["ליו"]["2"].tree = "";
allMissionsData["ליו"]["2"].escort = "";

allMissionsData["ליו"]["3"].address = "";
allMissionsData["ליו"]["3"].map = "";
allMissionsData["ליו"]["3"].group = "";
allMissionsData["ליו"]["3"].tree = "";
allMissionsData["ליו"]["3"].escort = "";

allMissionsData["ליו"]["4"].address = "";
allMissionsData["ליו"]["4"].map = "";
allMissionsData["ליו"]["4"].group = "";
allMissionsData["ליו"]["4"].tree = "";
allMissionsData["ליו"]["4"].escort = "";

allMissionsData["ליו"]["5"].address = "";
allMissionsData["ליו"]["5"].map = "";
allMissionsData["ליו"]["5"].group = "";
allMissionsData["ליו"]["5"].tree = "";
allMissionsData["ליו"]["5"].escort = "";
allMissionsData["ליו"]["5"].dest = "חוף הים";

allMissionsData["ליו"]["6"].address = "";
allMissionsData["ליו"]["6"].map = "";
allMissionsData["ליו"]["6"].group = "";
allMissionsData["ליו"]["6"].tree = "";
allMissionsData["ליו"]["6"].escort = "";

allMissionsData["ליו"]["7"].address = "";
allMissionsData["ליו"]["7"].map = "";
allMissionsData["ליו"]["7"].group = "";
allMissionsData["ליו"]["7"].tree = "";
allMissionsData["ליו"]["7"].escort = "";

allMissionsData["ליו"]["8"].address = "";
allMissionsData["ליו"]["8"].map = "";
allMissionsData["ליו"]["8"].group = "";
allMissionsData["ליו"]["8"].tree = "";
allMissionsData["ליו"]["8"].escort = "";

// --- אגם ---
allMissionsData["אגם"]["1"].address = "מלון רוטשילד 22";
allMissionsData["אגם"]["1"].map = "32.062940,34.771376";
allMissionsData["אגם"]["1"].group = "";
allMissionsData["אגם"]["1"].tree = "ברוש";
allMissionsData["אגם"]["1"].escort = "מאור";

allMissionsData["אגם"]["2"].address = "";
allMissionsData["אגם"]["2"].map = "";
allMissionsData["אגם"]["2"].group = "";
allMissionsData["אגם"]["2"].tree = "";
allMissionsData["אגם"]["2"].escort = "";

allMissionsData["אגם"]["3"].address = "";
allMissionsData["אגם"]["3"].map = "";
allMissionsData["אגם"]["3"].group = "";
allMissionsData["אגם"]["3"].tree = "";
allMissionsData["אגם"]["3"].escort = "";

allMissionsData["אגם"]["4"].address = "";
allMissionsData["אגם"]["4"].map = "";
allMissionsData["אגם"]["4"].group = "";
allMissionsData["אגם"]["4"].tree = "";
allMissionsData["אגם"]["4"].escort = "";

allMissionsData["אגם"]["5"].address = "";
allMissionsData["אגם"]["5"].map = "";
allMissionsData["אגם"]["5"].group = "";
allMissionsData["אגם"]["5"].tree = "";
allMissionsData["אגם"]["5"].escort = "";
allMissionsData["אגם"]["5"].dest = "חוף הים";

allMissionsData["אגם"]["6"].address = "";
allMissionsData["אגם"]["6"].map = "";
allMissionsData["אגם"]["6"].group = "";
allMissionsData["אגם"]["6"].tree = "";
allMissionsData["אגם"]["6"].escort = "";

allMissionsData["אגם"]["7"].address = "";
allMissionsData["אגם"]["7"].map = "";
allMissionsData["אגם"]["7"].group = "";
allMissionsData["אגם"]["7"].tree = "";
allMissionsData["אגם"]["7"].escort = "";

allMissionsData["אגם"]["8"].address = "";
allMissionsData["אגם"]["8"].map = "";
allMissionsData["אגם"]["8"].group = "";
allMissionsData["אגם"]["8"].tree = "";
allMissionsData["אגם"]["8"].escort = "";

// --- רני ---
allMissionsData["רני"]["1"].address = "מלון רוטשילד 22";
allMissionsData["רני"]["1"].map = "32.062940,34.771376";
allMissionsData["רני"]["1"].group = "";
allMissionsData["רני"]["1"].tree = "ברוש";
allMissionsData["רני"]["1"].escort = "מאור";

allMissionsData["רני"]["2"].address = "";
allMissionsData["רני"]["2"].map = "";
allMissionsData["רני"]["2"].group = "";
allMissionsData["רני"]["2"].tree = "";
allMissionsData["רני"]["2"].escort = "";

allMissionsData["רני"]["3"].address = "";
allMissionsData["רני"]["3"].map = "";
allMissionsData["רני"]["3"].group = "";
allMissionsData["רני"]["3"].tree = "";
allMissionsData["רני"]["3"].escort = "";

allMissionsData["רני"]["4"].address = "";
allMissionsData["רני"]["4"].map = "";
allMissionsData["רני"]["4"].group = "";
allMissionsData["רני"]["4"].tree = "";
allMissionsData["רני"]["4"].escort = "";

allMissionsData["רני"]["5"].address = "";
allMissionsData["רני"]["5"].map = "";
allMissionsData["רני"]["5"].group = "";
allMissionsData["רני"]["5"].tree = "";
allMissionsData["רני"]["5"].escort = "";
allMissionsData["רני"]["5"].dest = "חוף הים";

allMissionsData["רני"]["6"].address = "";
allMissionsData["רני"]["6"].map = "";
allMissionsData["רני"]["6"].group = "";
allMissionsData["רני"]["6"].tree = "";
allMissionsData["רני"]["6"].escort = "";

allMissionsData["רני"]["7"].address = "";
allMissionsData["רני"]["7"].map = "";
allMissionsData["רני"]["7"].group = "";
allMissionsData["רני"]["7"].tree = "";
allMissionsData["רני"]["7"].escort = "";

allMissionsData["רני"]["8"].address = "";
allMissionsData["רני"]["8"].map = "";
allMissionsData["רני"]["8"].group = "";
allMissionsData["רני"]["8"].tree = "";
allMissionsData["רני"]["8"].escort = "";

// --- נירו ---
allMissionsData["נירו"]["1"].address = "מלון רוטשילד 22";
allMissionsData["נירו"]["1"].map = "32.062940,34.771376";
allMissionsData["נירו"]["1"].group = "";
allMissionsData["נירו"]["1"].tree = "ברוש";
allMissionsData["נירו"]["1"].escort = "מאור";

allMissionsData["נירו"]["2"].address = "";
allMissionsData["נירו"]["2"].map = "";
allMissionsData["נירו"]["2"].group = "";
allMissionsData["נירו"]["2"].tree = "";
allMissionsData["נירו"]["2"].escort = "";

allMissionsData["נירו"]["3"].address = "";
allMissionsData["נירו"]["3"].map = "";
allMissionsData["נירו"]["3"].group = "";
allMissionsData["נירו"]["3"].tree = "";
allMissionsData["נירו"]["3"].escort = "";

allMissionsData["נירו"]["4"].address = "";
allMissionsData["נירו"]["4"].map = "";
allMissionsData["נירו"]["4"].group = "";
allMissionsData["נירו"]["4"].tree = "";
allMissionsData["נירו"]["4"].escort = "";

allMissionsData["נירו"]["5"].address = "";
allMissionsData["נירו"]["5"].map = "";
allMissionsData["נירו"]["5"].group = "";
allMissionsData["נירו"]["5"].tree = "";
allMissionsData["נירו"]["5"].escort = "";
allMissionsData["נירו"]["5"].dest = "חוף הים";

allMissionsData["נירו"]["6"].address = "";
allMissionsData["נירו"]["6"].map = "";
allMissionsData["נירו"]["6"].group = "";
allMissionsData["נירו"]["6"].tree = "";
allMissionsData["נירו"]["6"].escort = "";

allMissionsData["נירו"]["7"].address = "";
allMissionsData["נירו"]["7"].map = "";
allMissionsData["נירו"]["7"].group = "";
allMissionsData["נירו"]["7"].tree = "";
allMissionsData["נירו"]["7"].escort = "";

allMissionsData["נירו"]["8"].address = "";
allMissionsData["נירו"]["8"].map = "";
allMissionsData["נירו"]["8"].group = "";
allMissionsData["נירו"]["8"].tree = "";
allMissionsData["נירו"]["8"].escort = "";

// --- ניירו ---
allMissionsData["ניירו"]["1"].address = "מלון רוטשילד 22";
allMissionsData["ניירו"]["1"].map = "32.062940,34.771376";
allMissionsData["ניירו"]["1"].group = "";
allMissionsData["ניירו"]["1"].tree = "ברוש";
allMissionsData["ניירו"]["1"].escort = "מאור";

allMissionsData["ניירו"]["2"].address = "";
allMissionsData["ניירו"]["2"].map = "";
allMissionsData["ניירו"]["2"].group = "";
allMissionsData["ניירו"]["2"].tree = "";
allMissionsData["ניירו"]["2"].escort = "";

allMissionsData["ניירו"]["3"].address = "";
allMissionsData["ניירו"]["3"].map = "";
allMissionsData["ניירו"]["3"].group = "";
allMissionsData["ניירו"]["3"].tree = "";
allMissionsData["ניירו"]["3"].escort = "";

allMissionsData["ניירו"]["4"].address = "";
allMissionsData["ניירו"]["4"].map = "";
allMissionsData["ניירו"]["4"].group = "";
allMissionsData["ניירו"]["4"].tree = "";
allMissionsData["ניירו"]["4"].escort = "";

allMissionsData["ניירו"]["5"].address = "";
allMissionsData["ניירו"]["5"].map = "";
allMissionsData["ניירו"]["5"].group = "";
allMissionsData["ניירו"]["5"].tree = "";
allMissionsData["ניירו"]["5"].escort = "";
allMissionsData["ניירו"]["5"].dest = "חוף הים";

allMissionsData["ניירו"]["6"].address = "";
allMissionsData["ניירו"]["6"].map = "";
allMissionsData["ניירו"]["6"].group = "";
allMissionsData["ניירו"]["6"].tree = "";
allMissionsData["ניירו"]["6"].escort = "";

allMissionsData["ניירו"]["7"].address = "";
allMissionsData["ניירו"]["7"].map = "";
allMissionsData["ניירו"]["7"].group = "";
allMissionsData["ניירו"]["7"].tree = "";
allMissionsData["ניירו"]["7"].escort = "";

allMissionsData["ניירו"]["8"].address = "";
allMissionsData["ניירו"]["8"].map = "";
allMissionsData["ניירו"]["8"].group = "";
allMissionsData["ניירו"]["8"].tree = "";
allMissionsData["ניירו"]["8"].escort = "";

// --- יוני ---
allMissionsData["יוני"]["1"].address = "מלון רוטשילד 22";
allMissionsData["יוני"]["1"].map = "32.062940,34.771376";
allMissionsData["יוני"]["1"].group = "";
allMissionsData["יוני"]["1"].tree = "ברוש";
allMissionsData["יוני"]["1"].escort = "מאור";

allMissionsData["יוני"]["2"].address = "";
allMissionsData["יוני"]["2"].map = "";
allMissionsData["יוני"]["2"].group = "";
allMissionsData["יוני"]["2"].tree = "";
allMissionsData["יוני"]["2"].escort = "";

allMissionsData["יוני"]["3"].address = "";
allMissionsData["יוני"]["3"].map = "";
allMissionsData["יוני"]["3"].group = "";
allMissionsData["יוני"]["3"].tree = "";
allMissionsData["יוני"]["3"].escort = "";

allMissionsData["יוני"]["4"].address = "";
allMissionsData["יוני"]["4"].map = "";
allMissionsData["יוני"]["4"].group = "";
allMissionsData["יוני"]["4"].tree = "";
allMissionsData["יוני"]["4"].escort = "";

allMissionsData["יוני"]["5"].address = "";
allMissionsData["יוני"]["5"].map = "";
allMissionsData["יוני"]["5"].group = "";
allMissionsData["יוני"]["5"].tree = "";
allMissionsData["יוני"]["5"].escort = "";
allMissionsData["יוני"]["5"].dest = "חוף הים";

allMissionsData["יוני"]["6"].address = "";
allMissionsData["יוני"]["6"].map = "";
allMissionsData["יוני"]["6"].group = "";
allMissionsData["יוני"]["6"].tree = "";
allMissionsData["יוני"]["6"].escort = "";

allMissionsData["יוני"]["7"].address = "";
allMissionsData["יוני"]["7"].map = "";
allMissionsData["יוני"]["7"].group = "";
allMissionsData["יוני"]["7"].tree = "";
allMissionsData["יוני"]["7"].escort = "";

allMissionsData["יוני"]["8"].address = "";
allMissionsData["יוני"]["8"].map = "";
allMissionsData["יוני"]["8"].group = "";
allMissionsData["יוני"]["8"].tree = "";
allMissionsData["יוני"]["8"].escort = "";

// --- גליקמן ---
allMissionsData["גליקמן"]["1"].address = "מלון רוטשילד 22";
allMissionsData["גליקמן"]["1"].map = "32.062940,34.771376";
allMissionsData["גליקמן"]["1"].group = "";
allMissionsData["גליקמן"]["1"].tree = "ברוש";
allMissionsData["גליקמן"]["1"].escort = "מאור";

allMissionsData["גליקמן"]["2"].address = "";
allMissionsData["גליקמן"]["2"].map = "";
allMissionsData["גליקמן"]["2"].group = "";
allMissionsData["גליקמן"]["2"].tree = "";
allMissionsData["גליקמן"]["2"].escort = "";

allMissionsData["גליקמן"]["3"].address = "";
allMissionsData["גליקמן"]["3"].map = "";
allMissionsData["גליקמן"]["3"].group = "";
allMissionsData["גליקמן"]["3"].tree = "";
allMissionsData["גליקמן"]["3"].escort = "";

allMissionsData["גליקמן"]["4"].address = "";
allMissionsData["גליקמן"]["4"].map = "";
allMissionsData["גליקמן"]["4"].group = "";
allMissionsData["גליקמן"]["4"].tree = "";
allMissionsData["גליקמן"]["4"].escort = "";

allMissionsData["גליקמן"]["5"].address = "";
allMissionsData["גליקמן"]["5"].map = "";
allMissionsData["גליקמן"]["5"].group = "";
allMissionsData["גליקמן"]["5"].tree = "";
allMissionsData["גליקמן"]["5"].escort = "";
allMissionsData["גליקמן"]["5"].dest = "חוף הים";

allMissionsData["גליקמן"]["6"].address = "";
allMissionsData["גליקמן"]["6"].map = "";
allMissionsData["גליקמן"]["6"].group = "";
allMissionsData["גליקמן"]["6"].tree = "";
allMissionsData["גליקמן"]["6"].escort = "";

allMissionsData["גליקמן"]["7"].address = "";
allMissionsData["גליקמן"]["7"].map = "";
allMissionsData["גליקמן"]["7"].group = "";
allMissionsData["גליקמן"]["7"].tree = "";
allMissionsData["גליקמן"]["7"].escort = "";

allMissionsData["גליקמן"]["8"].address = "";
allMissionsData["גליקמן"]["8"].map = "";
allMissionsData["גליקמן"]["8"].group = "";
allMissionsData["גליקמן"]["8"].tree = "";
allMissionsData["גליקמן"]["8"].escort = "";

// --- גלעד ---
allMissionsData["גלעד"]["1"].address = "מלון רוטשילד 22";
allMissionsData["גלעד"]["1"].map = "32.062940,34.771376";
allMissionsData["גלעד"]["1"].group = "";
allMissionsData["גלעד"]["1"].tree = "ברוש";
allMissionsData["גלעד"]["1"].escort = "מאור";

allMissionsData["גלעד"]["2"].address = "";
allMissionsData["גלעד"]["2"].map = "";
allMissionsData["גלעד"]["2"].group = "";
allMissionsData["גלעד"]["2"].tree = "";
allMissionsData["גלעד"]["2"].escort = "";

allMissionsData["גלעד"]["3"].address = "";
allMissionsData["גלעד"]["3"].map = "";
allMissionsData["גלעד"]["3"].group = "";
allMissionsData["גלעד"]["3"].tree = "";
allMissionsData["גלעד"]["3"].escort = "";

allMissionsData["גלעד"]["4"].address = "";
allMissionsData["גלעד"]["4"].map = "";
allMissionsData["גלעד"]["4"].group = "";
allMissionsData["גלעד"]["4"].tree = "";
allMissionsData["גלעד"]["4"].escort = "";

allMissionsData["גלעד"]["5"].address = "";
allMissionsData["גלעד"]["5"].map = "";
allMissionsData["גלעד"]["5"].group = "";
allMissionsData["גלעד"]["5"].tree = "";
allMissionsData["גלעד"]["5"].escort = "";
allMissionsData["גלעד"]["5"].dest = "חוף הים";

allMissionsData["גלעד"]["6"].address = "";
allMissionsData["גלעד"]["6"].map = "";
allMissionsData["גלעד"]["6"].group = "";
allMissionsData["גלעד"]["6"].tree = "";
allMissionsData["גלעד"]["6"].escort = "";

allMissionsData["גלעד"]["7"].address = "";
allMissionsData["גלעד"]["7"].map = "";
allMissionsData["גלעד"]["7"].group = "";
allMissionsData["גלעד"]["7"].tree = "";
allMissionsData["גלעד"]["7"].escort = "";

allMissionsData["גלעד"]["8"].address = "";
allMissionsData["גלעד"]["8"].map = "";
allMissionsData["גלעד"]["8"].group = "";
allMissionsData["גלעד"]["8"].tree = "";
allMissionsData["גלעד"]["8"].escort = "";

// --- אתי ---
allMissionsData["אתי"]["1"].address = "מלון רוטשילד 22";
allMissionsData["אתי"]["1"].map = "32.062940,34.771376";
allMissionsData["אתי"]["1"].group = "";
allMissionsData["אתי"]["1"].tree = "ברוש";
allMissionsData["אתי"]["1"].escort = "מאור";

allMissionsData["אתי"]["2"].address = "";
allMissionsData["אתי"]["2"].map = "";
allMissionsData["אתי"]["2"].group = "";
allMissionsData["אתי"]["2"].tree = "";
allMissionsData["אתי"]["2"].escort = "";

allMissionsData["אתי"]["3"].address = "";
allMissionsData["אתי"]["3"].map = "";
allMissionsData["אתי"]["3"].group = "";
allMissionsData["אתי"]["3"].tree = "";
allMissionsData["אתי"]["3"].escort = "";

allMissionsData["אתי"]["4"].address = "";
allMissionsData["אתי"]["4"].map = "";
allMissionsData["אתי"]["4"].group = "";
allMissionsData["אתי"]["4"].tree = "";
allMissionsData["אתי"]["4"].escort = "";

allMissionsData["אתי"]["5"].address = "";
allMissionsData["אתי"]["5"].map = "";
allMissionsData["אתי"]["5"].group = "";
allMissionsData["אתי"]["5"].tree = "";
allMissionsData["אתי"]["5"].escort = "";
allMissionsData["אתי"]["5"].dest = "חוף הים";

allMissionsData["אתי"]["6"].address = "";
allMissionsData["אתי"]["6"].map = "";
allMissionsData["אתי"]["6"].group = "";
allMissionsData["אתי"]["6"].tree = "";
allMissionsData["אתי"]["6"].escort = "";

allMissionsData["אתי"]["7"].address = "";
allMissionsData["אתי"]["7"].map = "";
allMissionsData["אתי"]["7"].group = "";
allMissionsData["אתי"]["7"].tree = "";
allMissionsData["אתי"]["7"].escort = "";

allMissionsData["אתי"]["8"].address = "";
allMissionsData["אתי"]["8"].map = "";
allMissionsData["אתי"]["8"].group = "";
allMissionsData["אתי"]["8"].tree = "";
allMissionsData["אתי"]["8"].escort = "";

// --- עזרי ---
allMissionsData["עזרי"]["1"].address = "מלון רוטשילד 22";
allMissionsData["עזרי"]["1"].map = "32.062940,34.771376";
allMissionsData["עזרי"]["1"].group = "";
allMissionsData["עזרי"]["1"].tree = "ברוש";
allMissionsData["עזרי"]["1"].escort = "מאור";

allMissionsData["עזרי"]["2"].address = "";
allMissionsData["עזרי"]["2"].map = "";
allMissionsData["עזרי"]["2"].group = "";
allMissionsData["עזרי"]["2"].tree = "";
allMissionsData["עזרי"]["2"].escort = "";

allMissionsData["עזרי"]["3"].address = "";
allMissionsData["עזרי"]["3"].map = "";
allMissionsData["עזרי"]["3"].group = "";
allMissionsData["עזרי"]["3"].tree = "";
allMissionsData["עזרי"]["3"].escort = "";

allMissionsData["עזרי"]["4"].address = "";
allMissionsData["עזרי"]["4"].map = "";
allMissionsData["עזרי"]["4"].group = "";
allMissionsData["עזרי"]["4"].tree = "";
allMissionsData["עזרי"]["4"].escort = "";

allMissionsData["עזרי"]["5"].address = "";
allMissionsData["עזרי"]["5"].map = "";
allMissionsData["עזרי"]["5"].group = "";
allMissionsData["עזרי"]["5"].tree = "";
allMissionsData["עזרי"]["5"].escort = "";
allMissionsData["עזרי"]["5"].dest = "חוף הים";

allMissionsData["עזרי"]["6"].address = "";
allMissionsData["עזרי"]["6"].map = "";
allMissionsData["עזרי"]["6"].group = "";
allMissionsData["עזרי"]["6"].tree = "";
allMissionsData["עזרי"]["6"].escort = "";

allMissionsData["עזרי"]["7"].address = "";
allMissionsData["עזרי"]["7"].map = "";
allMissionsData["עזרי"]["7"].group = "";
allMissionsData["עזרי"]["7"].tree = "";
allMissionsData["עזרי"]["7"].escort = "";

allMissionsData["עזרי"]["8"].address = "";
allMissionsData["עזרי"]["8"].map = "";
allMissionsData["עזרי"]["8"].group = "";
allMissionsData["עזרי"]["8"].tree = "";
allMissionsData["עזרי"]["8"].escort = "";

