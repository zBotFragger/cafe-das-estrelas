import React, { useState } from 'react';
import Game from './pages/Game';
import Login from './pages/Login';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? <Game /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
};

export default App;