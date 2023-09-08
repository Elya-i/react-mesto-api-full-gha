import React from 'react';
import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);
  const cardDeleteButtonClassName = (`element__delete-btn ${isOwn ? '' : 'element__delete-btn_disable'}`);

  const cardLikeButtonClassName = (`element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`);
  
  const handleCardClick = () => {
    onCardClick(card);
  }
  
  const handleDeleteClick = () => {
    onCardDelete(card);
  }
  
  const handleLikeClick = () => {
    onCardLike(card);
  }

  return (
    <li className="element">
      <article>
      <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      <div className="element__caption">
          <h2 className="element__name">{card.name}</h2>
          <div className="element__like">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;