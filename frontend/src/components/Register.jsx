import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister, submitText}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password)
  }

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">Регистрация</h2>
        <form className="authorization__form" name="register" noValidate onSubmit={handleSubmit}>
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
                required />
            </div>
            <button className="authorization__submit-btn" type="submit">{submitText}</button>
        </form>
        <div className="authorization__link-container">
          <p className="authorization__link">Уже зарегистрированы? <Link to="/sign-in" className="header__link">Войти</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Register;