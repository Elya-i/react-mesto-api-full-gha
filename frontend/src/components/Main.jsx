import React, { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-block">
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar"/>
            <button onClick={onEditAvatar} type="button" className="profile__avatar-edit-btn"></button>
          </div>
          <div className="profile__info">
            <div className="profile__edit-container">
                <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit-btn"></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button onClick={onAddPlace} className="profile__add-btn" type="button"></button> 
        </section>
    
        <section className="elements" aria-label="Карточки с изображениями">
          <ul className="elements__list">
            {cards.slice().reverse().map(card => (
                <Card 
                  key={card['_id']}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
              />)
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;