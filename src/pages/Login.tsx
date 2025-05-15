import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div style={{padding: 20}}>
      <h1>Café das Estrelas - Login</h1>
      <button onClick={onLogin}>Entrar como convidado (Guest)</button>
    </div>
  );
};

export default Login;