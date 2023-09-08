import React, { useEffect } from 'react';

function PopupWithForm(props) {
  const {
    name,
    title,
    submitText,
    isOpen,
    isDisabled,
    children,
    onClose,
    onSubmit
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
        <h2 className="popup__title">{title}</h2>
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button
            disabled={isDisabled}
            type="submit"
            className={`popup__button popup__button-submit ${isDisabled ? 'popup__button_disabled' : ''} `}>
              {submitText}
            </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;