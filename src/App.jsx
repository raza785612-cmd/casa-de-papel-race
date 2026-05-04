import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // וודא שהנתיב לקובץ הלוגין נכון
import Station from './components/Station'; // וודא שהנתיב לקובץ התחנה נכון

function App() {
  return (
    <Router>
      <Routes>
        {/* דף לוגין - באותיות קטנות */}
        <Route path="/login" element={<Login />} />
        
        {/* דף התחנה - עם פרמטר id */}
        <Route path="/station/:id" element={<Station />} />    
        
        {/* דף הבית מפנה אוטומטית ללוגין */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* בונוס: אם מישהו מקליד כתובת לא קיימת, שלח אותו ללוגין */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;