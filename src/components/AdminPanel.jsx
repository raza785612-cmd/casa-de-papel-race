import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "1234"; 

  useEffect(() => {
    // בדיקה אם המשתמש כבר אימת את עצמו בלשונית הנוכחית
    const isAdmin = sessionStorage.getItem('isAdminConfirmed');
    
    if (isAdmin === 'true') {
      setIsAuthenticated(true);
    } else {
      const password = prompt("נא להזין סיסמת חמ\"ל:");
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdminConfirmed', 'true');
        setIsAuthenticated(true);
      } else {
        alert("סיסמה שגויה!");
        navigate('/');
      }
    }
  }, [navigate]);

  // האפקט הזה ירוץ רק אחרי שהמשתמש אומת
  useEffect(() => {
    if (!isAuthenticated) return;

    // משיכה ראשונית
    fetchReports();
    
    // הגדרת האזנה בזמן אמת
    const subscription = supabase
      .channel('admin-realtime')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'mission_reports' }, 
        (payload) => {
          console.log("דיווח חדש הגיע!", payload);
          // במקום למשוך הכל מחדש, אפשר להוסיף את הדיווח החדש למעלה
          fetchReports(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [isAuthenticated]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('mission_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("שגיאה במשיכת נתונים:", error);
      return;
    }

    const latestReports = [];
    const seenUsers = new Set();

    data.forEach(report => {
      if (!seenUsers.has(report.username)) {
        seenUsers.add(report.username);
        latestReports.push(report);
      }
    });

    setReports(latestReports);
  };

  const clearAllReports = async () => {
    const confirmDelete = window.confirm("⚠️ זה ימחק את כל התקדמות הצוותים. להמשיך?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('mission_reports')
      .delete()
      .neq('username', 'SYSTEM_RESERVED');

    if (error) {
      alert("שגיאה: " + error.message);
    } else {
      setReports([]);
      alert("הנתונים נמחקו.");
    }
  };

  if (!isAuthenticated) return <div style={{ background: '#020617', minHeight: '100vh' }} />;

  return (
    <div style={{ padding: '20px', background: '#020617', minHeight: '100vh', color: 'white', direction: 'rtl', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #dc2626', paddingBottom: '15px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🛰️ חמ"ל מעקב</h1>
          <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '14px' }}>עדכון חי מהשטח</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={clearAllReports} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
            🗑️ איפוס
          </button>
          <span style={{ background: '#dc2626', padding: '6px 15px', borderRadius: '20px', fontWeight: 'bold' }}>
            {reports.length} צוותים
          </span>
        </div>
      </header>

      <div style={{ overflowX: 'auto', background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              <th style={{ padding: '15px', color: '#94a3b8' }}>צוות</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>מיקום</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>זמן</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#fbbf24' }}>{report.username}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ background: '#dc2626', color: 'white', padding: '4px 10px', borderRadius: '6px' }}>תחנה {report.station_id}</span>
                </td>
                <td style={{ padding: '15px', color: '#94a3b8', fontSize: '13px' }}>
                  {new Date(report.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;