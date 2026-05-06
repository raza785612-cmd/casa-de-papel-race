import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; 
import Station from './components/Station'; 
import Mentor from './components/Mentor';
import AdminPanel from './components/AdminPanel'; // וודא שהנתיב והשם מדויקים


function App() {
  return (
    <Router>
      <Routes>
        {/* 1. דף לוגין */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. דף המנטור - חייב להופיע לפני ה-* */}
        <Route path="/mentor/:id" element={<Mentor />} />
        
        {/* 3. דף התחנה למשתתפים */}
        <Route path="/station/:id" element={<Station />} />    
        
        {/* 4. דף הבית מפנה ללוגין */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/*דף מנהל שרואה נתונים של כולם */}
        <Route path="/hq-control-room" element={<AdminPanel />} />

          {/*דף שמוביל למסעדה */}
        <Route path="/secret-mission/:slug" element={<SecretQRPage />} />
        
        {/* 5. דף שגיאה/כל דבר אחר - תמיד אחרון בתור */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;