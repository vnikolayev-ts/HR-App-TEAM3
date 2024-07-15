export const isAuthenticated = () => {
    return localStorage.getItem('auth') === 'true';
  };
  
  export const login = (loginUser) => {
    localStorage.setItem('auth', 'true');
   
    localStorage.setItem('loginUser', JSON.stringify(loginUser));
  };
  
  export const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('loginUser');
    localStorage.setItem('theme', 'light');
  };
  