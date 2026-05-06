const handleLogin = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('teams') 
        .select('*')
        .eq('username', username.trim())
        // שיניתי כאן ל-login_password כפי שמופיע בדאטאבייס שלך
        .eq('login_password', password.trim()); 

      if (error) {
        console.error("שגיאה:", error.message);
        alert("שגיאת מערכת: " + error.message);
      } else if (!data || data.length === 0) {
        alert("שם צוות או סיסמה שגויים");
      } else {
        const user = data[0];
        localStorage.setItem('race_user', JSON.stringify(user));
        navigate('/station/1');
      }
    } catch (err) {
      alert("משהו השתבש בחיבור");
    } finally {
      setLoading(false);
    }
  };