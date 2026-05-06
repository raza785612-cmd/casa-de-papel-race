import React, { useState } from 'react';

const SecretQrPage = () => {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const team = JSON.parse(localStorage.getItem('race_user'));

  const check = () => {
    // בודק מול ה-secret_password שנמשך מהדאטאבייס בלוגין
    if (pass === team?.secret_password) {
      setAuth(true);
    } else {
      alert("קוד סודי שגוי");
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-black" dir="rtl">
        <h2 className="mb-6 font-bold text-xl uppercase tracking-widest">כניסה לארכיון</h2>
        <input 
          type="text" 
          onChange={(e) => setPass(e.target.value)}
          className="border-b-2 border-black text-center text-3xl w-48 mb-8 focus:outline-none"
          placeholder="----"
        />
        <button onClick={check} className="bg-black text-white px-12 py-3 rounded-full font-bold active:scale-95 transition-all">
          אימות
        </button>
        <p className="mt-8 text-gray-400 text-sm italic">רמז: הסיסמה נמצאת אצל המנטור</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-12 text-black text-center" dir="rtl">
      <h1 className="text-3xl font-serif italic border-x-2 border-black px-8 py-4 leading-relaxed">
        {team?.secret_message}
      </h1>
    </div>
  );
};

export default SecretQrPage;