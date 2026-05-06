import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  console.log("מנסה להתחבר עם:", username.trim(), password.trim());

  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('username', username.trim())
    .eq('login_password', password.trim())
    .maybeSingle();

  if (error) {
    console.error("שגיאת Supabase:", error.message);
    alert("שגיאת תקשורת: " + error.message);
    return;
  }

  if (data) {
    console.log("התחברות הצליחה! נתונים:", data);
    localStorage.setItem('race_user', JSON.stringify(data));
    navigate('/station/1');
  } else {
    console.log("לא נמצא משתמש תואם בדאטאבייס");
    alert("שם משתמש או סיסמה שגויים");
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6" dir="rtl">
      <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl border-t-4 border-red-600 w-full max-w-sm">
        <h1 className="text-white text-3xl font-black mb-8 text-center italic tracking-tighter">CASA DE PAPEL</h1>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="שם צוות" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 bg-black border border-slate-800 rounded-xl text-white text-center focus:border-red-600 outline-none transition-colors"
          />
          <input 
            type="password" 
            placeholder="סיסמה" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-black border border-slate-800 rounded-xl text-white text-center focus:border-red-600 outline-none transition-colors"
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-xl active:scale-95 transition-all shadow-lg shadow-red-900/20"
          >
            התחבר למערכת
          </button>
        </div>
        
        <p className="text-slate-500 text-xs text-center mt-6 uppercase tracking-widest">Authorized Personnel Only</p>
      </div>
    </div>
  );
};

export default Login;