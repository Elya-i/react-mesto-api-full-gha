import React from 'react';
import headerLogo from "../images/header-logo.svg";
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  const { pathname } = useLocation();

  const signInPath = '/sign-in';
  const signUpPath = '/sign-up';

  const isMainPage = pathname !== signInPath && pathname !== signUpPath;
  const isSignOut = loggedIn && isMainPage;

  return (
    <header className="header">
      <img className="logo header__logo" alt="Логотип проекта Mesto Russia" src={headerLogo} />
      <div className="header__info">
        {pathname === signInPath && (<Link to={signUpPath} className="header__link">Регистрация</Link>)}
        {pathname === signUpPath && (<Link to={signInPath} className="header__link">Войти</Link>)}
        {isMainPage && <p className="header__email">{email}</p>}
        {isSignOut && (<button type='button' className="header__btn" onClick={onSignOut}>Выйти</button>)}
      </div>
    </header>
  );
}

export default Header;