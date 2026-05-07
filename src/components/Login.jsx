const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('username', username)
      .eq('login_password', password)
      .single();

    if (data && !error) {
      localStorage.setItem('race_user', JSON.stringify(data));

      // ניתוב לפי שם המשתמש שהזנת בדאטאבייס
      if (data.username === 'admin') {
        sessionStorage.setItem('isAdminConfirmed', 'true'); // פותר את הצורך בסיסמה נוספת (1234)
        navigate('/admin-panel', { replace: true });
      } 
      else if (data.username === 'mentor') {
        navigate('/mentor', { replace: true });
      } 
      else {
        // כל שאר הצוותים (פרנקל, ענבר, דותן וכו')
        navigate('/station/1', { replace: true });
      }
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
    setLoading(false);
  };