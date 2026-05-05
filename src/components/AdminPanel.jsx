import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // הגדרת הסיסמה לחמ"ל
  const ADMIN_PASSWORD = "1234"; 

  useEffect(() => {
    const password = prompt("נא להזין סיסמת חמ''ל:");
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchReports();
      
      // האזנה לכל שינוי (INSERT, UPDATE, DELETE) כדי שהלוח יתעדכן בזמן אמת
      const subscription = supabase
        .channel('admin-realtime')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'mission_reports' }, 
          () => {
            fetchReports(); // רענון הרשימה מול בסיס הנתונים בכל שינוי
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    } else {
      alert("סיסמה שגויה!");
      window.location.href = "/";
    }
  }, []);

  // פונקציה למשיכת הנתונים
  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('mission_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching:", error);
    setReports(data || []);
  };

  // פונקציית איפוס (מחיקת כל הנתונים מהטבלה)
  const clearAllReports = async () => {
    const confirmDelete = window.confirm("⚠️ אזהרה: זה ימחק את כל התקדמות הצוותים. להמשיך?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('mission_reports')
      .delete()
      .neq('username', 'SYSTEM_RESERVED'); // מוחק הכל חוץ משורה שלא קיימת

    if (error) {
      alert("שגיאה במחיקה: " + error.message);
    } else {
      setReports([]);
      alert("הנתונים נמחקו בהצלחה.");
    }
  };

  if (!isAuthenticated) return <div style={{ background: '#020617', minHeight: '100vh' }} />;

  return (
    <div style={{ padding: '20px', background: '#020617', minHeight: '100vh', color: 'white', direction: 'rtl', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '2px solid #dc2626', 
        paddingBottom: '15px',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🛰️ חמ"ל מבצע - סטטוס צוותים</h1>
          <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '14px' }}>מעקב בזמן אמת אחרי התקדמות בשטח</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={clearAllReports} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            🗑️ איפוס מרוץ
          </button>
          <span style={{ background: '#dc2626', padding: '6px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
            {reports.length} צוותים פעילים
          </span>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              <th style={{ padding: '15px', color: '#94a3b8' }}>שם הצוות</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>תחנה אחרונה</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>זמן עדכון</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>ממתין לדיווחים ראשונים מהשטח...</td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid #1e293b', background: 'transparent' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#fbbf24', fontSize: '18px' }}>
                    {report.username}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ background: '#334155', padding: '5px 12px', borderRadius: '8px', border: '1px solid #475569' }}>
                      תחנה {report.station_id}
                    </span>
                  </td>
                  <td style={{ padding: '15px', fontSize: '14px', color: '#94a3b8' }}>
                    {new Date(report.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#22c55e', fontSize: '12px' }}>● מחובר</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;