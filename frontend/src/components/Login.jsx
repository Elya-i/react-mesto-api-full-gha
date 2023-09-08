import React, { useState } from 'react';

function Login({ onLogin, submitText}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password)
  }

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">Вход</h2>
        <form className="authorization__form" name="login" noValidate onSubmit={handleSubmit}>
            <div className="authorization__input-container">
              <input
                id="email-input"
                className="authorization__input"
                type="email"
                placeholder="Email"
                name="email"
                minLength="2"
                maxLength="40"
                value={email || ''}
                onChange={({ target:{ value }}) => setEmail(value)}
                noValidate
                required />
              <input
                id="password-input"
                className="authorization__input"
                type="password"
                placeholder="Пароль"
                name="password"
                minLength="2"
                maxLength="200"
                value={password || ''}
                onChange={({ target:{ value }}) => setPassword(value)}
                noValidate
                required />
            </div>
            <button className="authorization__submit-btn" type="submit">{submitText}</button>
        </form>
      </div>
    </section>
  );
};

export default Login;