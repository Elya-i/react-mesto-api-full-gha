import React, { useEffect } from 'react';

function InfoTooltip(props) {
  const {
    name,
    isOpen,
    onClose,
    isSuccess,
    successIcon,
    failIcon
  } = props;

  function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
      onClose();
    } 
  }

  useEffect(() => {
    const handleCloseByEsc = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleCloseByEsc);

      return () => {
        document.removeEventListener('keydown', handleCloseByEsc)
      };
    }
  }, [isOpen])

  return (
    <div onClick={closeByOverlayClick} className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img src={isSuccess ? successIcon : failIcon} alt="Успешная регистрация" className="infotooltip__icon"/>
        <p className="infotooltip__message">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p> 
        <button onClick={onClose} type="button" className="popup__button popup__close-btn"></button>
      </div>
    </div>
  )
}

export default InfoTooltip