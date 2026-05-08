import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; 
import Station from './components/Station'; 
import Mentor from './components/Mentor';
import AdminPanel from './components/AdminPanel'; 
import SecretQRPage from './components/SecretQRPage';
// הוסף את הייבוא למעלה
import Finish from './components/Finish';


function App() {
  return (
    <Router>
      <Routes>
        {/* 1. דף לוגין */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. דף המנטור - חייב להופיע לפני ה-* */}
        <Route path="/segel" element={<Mentor />} />
        
        {/* 3. דף התחנה למשתתפים */}
<Route 
  path="/station/:id" 
  element={<Station key={window.location.pathname} />} 
/>        
        {/* 4. דף הבית מפנה ללוגין */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/*דף מנהל שרואה נתונים של כולם */}
        <Route path="/admin-panel" element={<AdminPanel />} />

          {/*דף שמוביל למסעדה */}
        <Route path="/secret-mission/:slug" element={<SecretQRPage />} />
        
        {/* 5. דף שגיאה/כל דבר אחר - תמיד אחרון בתור */}
        <Route path="*" element={<Navigate to="/login" />} />

        {/*דף סיום */}
        <Route path="/finish" element={<Finish />} />

      </Routes>
    </Router>
  );
}

export default App;